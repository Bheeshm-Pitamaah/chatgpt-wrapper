# Build and Distribution Instructions for Rohit Bot

This document provides detailed instructions for building and distributing Rohit Bot for different platforms.

## Prerequisites

Before building the application, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **Git** (for cloning the repository)

For cross-platform builds, you may need additional dependencies:

- **Windows builds from Linux/macOS**: Wine (v1.6 or later)
- **macOS builds from Linux/Windows**: Not officially supported by electron-builder
- **Linux builds from Windows/macOS**: No additional dependencies required

## Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/Bheeshm-Pitamaah/chatgpt-wrapper.git
   cd chatgpt-wrapper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application in development mode:
   ```bash
   npm run dev
   ```

## Building for Distribution

### Building for the Current Platform

To build for your current platform:

```bash
npm run build:prod
```

This will create distributable files in the `release` directory.

### Building for Specific Platforms

#### Linux
```bash
npm run dist:linux
```

#### Windows
```bash
npm run dist:win
```

#### macOS
```bash
npm run dist:mac
```

## Distribution Files

After building, you'll find the following files in the `release` directory:

### Linux
- `Rohit Bot-0.1.0.AppImage`: Standalone executable for Linux
- `rohit-bot_0.1.0_amd64.snap`: Snap package for Linux
- `linux-unpacked/`: Directory containing the unpacked application

### Windows
- `Rohit Bot Setup 0.1.0.exe`: Installer for Windows
- `win-unpacked/`: Directory containing the unpacked application

### macOS
- `Rohit Bot-0.1.0.dmg`: Disk image for macOS
- `Rohit Bot-0.1.0-mac.zip`: Compressed archive for macOS
- `mac/`: Directory containing the unpacked application

## How to Distribute Your Application

You now have several options for distributing your application:

### For Linux users:
- Share the AppImage file (`release/Rohit Bot-0.1.0.AppImage`)
- Users can simply make it executable (`chmod +x "Rohit Bot-0.1.0.AppImage"`) and run it
- No npm, Node.js, or installation required
- Alternatively, you can share the Snap package for systems that support it

### For Windows users:
- Run `npm run dist:win` to create a Windows installer
- Share the installer (`release/Rohit Bot Setup 0.1.0.exe`)
- Users can run the installer and then run the application from the Start menu
- No administrator privileges are required

### For macOS users:
- Run `npm run dist:mac` to create a macOS disk image
- Share the disk image (`release/Rohit Bot-0.1.0.dmg`)
- Users can mount the disk image, drag the application to the Applications folder, and run it
- No administrator privileges are required

## Running the Distributed Application

### Linux
- **AppImage**: Make the file executable (`chmod +x "Rohit Bot-0.1.0.AppImage"`) and run it (`./Rohit\ Bot-0.1.0.AppImage`)
- **Snap**: Install the snap package (`sudo snap install rohit-bot_0.1.0_amd64.snap --dangerous`) and run it (`rohit-bot`)
- **Unpacked Directory**: Run the executable (`./release/linux-unpacked/rohit-bot`)

### Windows
- **NSIS Installer**: Run the installer and follow the prompts. No administrator privileges are required.
- **Portable**: Run the executable (`release\Rohit Bot 0.1.0.exe`). This is completely portable and requires no installation.

### macOS
- **DMG**: Mount the disk image, drag the application to the Applications folder, and run it. No administrator privileges are required.
- **ZIP**: Extract the archive and run the application. This is completely portable and requires no installation.

## Customizing the Build

You can customize the build by modifying the `build` section in `package.json`. The following options are available:

- **appId**: The application ID (default: `com.rohit-bot.app`)
- **productName**: The name of the application (default: `Rohit Bot`)
- **copyright**: The copyright notice (default: `Copyright © 2025 Balaji Viswanathan`)
- **directories**: The directories to use for the build
- **files**: The files to include in the build
- **mac**: macOS-specific options
- **win**: Windows-specific options
- **linux**: Linux-specific options

## Security Considerations

- The source code is packaged in the `app.asar` file, which provides basic obfuscation but is not encryption
- The application is configured to install at the user level, not requiring administrator privileges
- For Windows, the NSIS installer is configured for per-user installation
- For macOS, the application is configured to run without requiring special permissions
- For additional security, consider using a code signing certificate to sign your application

## Troubleshooting

- If the application doesn't start, check the logs (usually in `~/.config/rohit-bot/logs` on Linux, `%APPDATA%\rohit-bot\logs` on Windows, or `~/Library/Logs/rohit-bot` on macOS)
- Make sure all dependencies are included in the build
- If you're using native modules, make sure they're properly rebuilt for the target platform

## Updating the Application

To update the application, simply build a new version and distribute it to your users. Electron-builder supports auto-updates, but that requires additional setup.

## Icon Requirements

Make sure you have the proper icon files for each platform:

- **Windows**: `build/icon.ico` (must be a valid ICO file)
- **macOS**: `build/icon.icns` (must be a valid ICNS file)
- **Linux**: `build/icon.png` (PNG file, at least 512x512 pixels)

## Additional Resources

- [Electron Builder Documentation](https://www.electron.build/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)
