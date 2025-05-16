import { app, BrowserWindow, protocol, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import { initializeFileSystemHandlers, cleanupFileSystemHandlers } from './fileSystemHandlers'

// Declare isQuitting property
declare global {
  namespace Electron {
    interface App {
      isQuitting: boolean;
    }
  }
}

// Initialize isQuitting property
app.isQuitting = false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit()
}

// Helper function to get the correct index.html path
const getIndexPath = () => {
  console.log('NODE_ENV:', process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development') {
    // Check if Vite dev server is running
    try {
      const request = require('http').request({
        hostname: 'localhost',
        port: 5173,
        path: '/',
        method: 'HEAD',
        timeout: 1000
      });

      return new Promise((resolve) => {
        request.on('response', () => {
          console.log('Vite dev server is running');
          resolve('http://localhost:5173');
        });

        request.on('error', () => {
          console.log('Vite dev server is not running, falling back to local files');
          resolve(path.join(app.getAppPath(), 'dist', 'index.html'));
        });

        request.on('timeout', () => {
          console.log('Vite dev server connection timed out, falling back to local files');
          request.destroy();
          resolve(path.join(app.getAppPath(), 'dist', 'index.html'));
        });

        request.end();
      });
    } catch (error) {
      console.error('Error checking Vite dev server:', error);
      return path.join(app.getAppPath(), 'dist', 'index.html');
    }
  }

  // In production, first try the ASAR path
  const asarPath = path.join(process.resourcesPath, 'app.asar', 'dist', 'index.html')
  if (fs.existsSync(asarPath)) {
    return asarPath
  }

  // Fallback to non-ASAR path
  const nonAsarPath = path.join(app.getAppPath(), 'dist', 'index.html')
  if (fs.existsSync(nonAsarPath)) {
    return nonAsarPath
  }

  // If neither exists, log error and return the ASAR path (will trigger error handling)
  console.error('Could not find index.html in either location:', {
    asarPath,
    nonAsarPath,
    resourcesPath: process.resourcesPath,
    appPath: app.getAppPath()
  })
  return asarPath
}

// Helper function to show error page
const showErrorPage = (window, errorMessage) => {
  window.webContents.loadURL(`data:text/html;charset=utf-8,
    <html>
      <head><title>Error</title></head>
      <body style="background: #1a1a1a; color: white; padding: 20px;">
        <h2>Failed to load application</h2>
        <pre>${errorMessage}</pre>
        <p>Please check the console for more details.</p>
      </body>
    </html>
  `);
};

// Create the browser window
const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, '../public/assets/logos/icon.png'),
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#f5f5dc', // Cream color
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true, // DevTools are enabled but won't open automatically
    },
  });

  // Load the app
  const indexPath = await Promise.resolve(getIndexPath());
  console.log('Resolved index path:', indexPath);

  // DevTools can be opened manually with Ctrl+Shift+I (or Cmd+Option+I on Mac)

  // Listen for console messages
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[WebContents] ${message} (${sourceId}:${line})`);
  });

  // Listen for page errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error(`Failed to load: ${errorDescription} (${errorCode}) for URL: ${validatedURL}`);
  });

  // Listen for page title updates (indicates page has loaded)
  mainWindow.webContents.on('page-title-updated', (event, title) => {
    console.log(`Page title updated to: ${title}`);
  });

  if (indexPath.startsWith('http')) {
    // Load from URL (dev server)
    console.log('Loading from URL:', indexPath);
    mainWindow.loadURL(indexPath).catch((err) => {
      console.error('Failed to load URL:', err);
      showErrorPage(mainWindow, err.message);
    });
  } else {
    // Load from file
    console.log('Loading from file:', indexPath);
    mainWindow.loadFile(indexPath).catch((err) => {
      console.error('Failed to load index.html:', err);
      showErrorPage(mainWindow, err.message);
    });
  }

  // Handle router in Electron for SPA
  mainWindow.webContents.on('did-fail-load', async (_event, _code, _desc, url) => {
    console.error('Failed to load URL:', url);
    if (url.includes('localhost:5173') || url.includes('file://')) {
      const indexPath = await Promise.resolve(getIndexPath());
      if (indexPath.startsWith('http')) {
        mainWindow.loadURL(indexPath).catch(err => {
          console.error('Failed to load URL after did-fail-load:', err);
          showErrorPage(mainWindow, err.message);
        });
      } else {
        mainWindow.loadFile(indexPath).catch(err => {
          console.error('Failed to load index.html after did-fail-load:', err);
          showErrorPage(mainWindow, err.message);
        });
      }
    }
  });

  // Prevent window from being destroyed, hide it instead (macOS behavior)
  mainWindow.on('close', (event) => {
    if (process.platform === 'darwin' && !app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Log useful information about paths
  console.log('App paths:', {
    resourcesPath: process.resourcesPath,
    appPath: app.getAppPath(),
    execPath: process.execPath,
    indexPath: indexPath
  });
}

// Register protocol for handling file:// URLs in production
app.whenReady().then(async () => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7) // remove "file://"
    try {
      return callback(url)
    } catch (error) {
      console.error('ERROR:', error)
      return callback('404')
    }
  })

  // Initialize file system handlers
  initializeFileSystemHandlers()

  // Handle app path requests
  ipcMain.handle('app:getPath', (_event, name) => {
    return app.getPath(name)
  })

  await createWindow()

  app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) await createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Clean up when quitting
app.on('will-quit', () => {
  cleanupFileSystemHandlers();
});

// Handle file:// URLs in production
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    // Intercept and handle internal routes
    const parsedUrl = new URL(navigationUrl)
    if (parsedUrl.protocol === 'file:' && !parsedUrl.pathname.endsWith('index.html')) {
      event.preventDefault()
      contents.loadFile(path.join(__dirname, '../dist/index.html'))
    }
  })
})

// Update the quit handler
app.on('before-quit', () => {
  app.isQuitting = true;
});
