# Distributing Kapi Lite

This document explains how to distribute Kapi Lite to end users without exposing the source code.

## Available Distribution Formats

Kapi Lite can be distributed in several formats:

### Linux
- **AppImage**: A standalone executable that can be run on most Linux distributions without installation
- **Snap**: A package for Linux distributions that support Snap
- **Unpacked Directory**: A directory containing the unpacked application

### Windows
- **NSIS Installer**: A user-level installer for Windows (no admin privileges required)
- **Portable**: A standalone executable that can be run without installation

### macOS
- **DMG**: A disk image for macOS
- **ZIP**: A compressed archive for macOS

## Building Distributions

### Prerequisites
- Node.js and npm installed (only needed for building, not for running the distributed application)
- For cross-platform builds, you may need additional dependencies (see below)
- Proper icon files for each platform:
  - Windows: `build/icon.ico` (must be a valid ICO file)
  - macOS: `build/icon.icns` (must be a valid ICNS file)
  - Linux: `build/icon.png` (PNG file, at least 512x512 pixels)

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
- `Kapi Lite-0.1.0.AppImage`: Standalone executable for Linux
- `kapi-lite_0.1.0_amd64.snap`: Snap package for Linux
- `linux-unpacked/`: Directory containing the unpacked application

### Windows
- `Kapi Lite Setup 0.1.0.exe`: Installer for Windows
- `win-unpacked/`: Directory containing the unpacked application

### macOS
- `Kapi Lite-0.1.0.dmg`: Disk image for macOS
- `Kapi Lite-0.1.0-mac.zip`: Compressed archive for macOS
- `mac/`: Directory containing the unpacked application

## Running the Distributed Application

### Linux
- **AppImage**: Make the file executable (`chmod +x "Kapi Lite-0.1.0.AppImage"`) and run it (`./Kapi\ Lite-0.1.0.AppImage`)
- **Snap**: Install the snap package (`sudo snap install kapi-lite_0.1.0_amd64.snap --dangerous`) and run it (`kapi-lite`)
- **Unpacked Directory**: Run the executable (`./release/linux-unpacked/kapi-lite`)

### Windows
- **NSIS Installer**: Run the installer and follow the prompts. No administrator privileges are required.
- **Portable**: Run the executable (`release\Kapi Lite 0.1.0.exe`). This is completely portable and requires no installation.

### macOS
- **DMG**: Mount the disk image, drag the application to the Applications folder, and run it. No administrator privileges are required.
- **ZIP**: Extract the archive and run the application. This is completely portable and requires no installation.

## Cross-Platform Building

### Building for Windows from Linux or macOS
To build for Windows from Linux or macOS, you need Wine installed:

```bash
# Ubuntu/Debian
sudo apt-get install wine

# macOS
brew install --cask wine-stable
```

### Building for macOS from Linux or Windows
Building for macOS from Linux or Windows is not officially supported by electron-builder. It's recommended to use a macOS machine for building macOS distributions.

### Building for Linux from Windows or macOS
No additional dependencies are required.

## Customizing the Build

You can customize the build by modifying the `build` section in `package.json`. See the [electron-builder documentation](https://www.electron.build/configuration/configuration) for more information.

## Updating the Application

To update the application, simply build a new version and distribute it to your users. Electron-builder supports auto-updates, but that requires additional setup.

## Security Considerations

- The source code is packaged in the `app.asar` file, which provides basic obfuscation but is not encryption
- The application is configured to install at the user level, not requiring administrator privileges
- For Windows, the NSIS installer is configured for per-user installation
- For macOS, the application is configured to run without requiring special permissions
- For additional security, consider using a code signing certificate to sign your application
- Consider implementing a license key system if you want to restrict usage

## Troubleshooting

- If the application doesn't start, check the logs (usually in `~/.config/kapi-lite/logs` on Linux, `%APPDATA%\kapi-lite\logs` on Windows, or `~/Library/Logs/kapi-lite` on macOS)
- Make sure all dependencies are included in the build
- If you're using native modules, make sure they're properly rebuilt for the target platform
