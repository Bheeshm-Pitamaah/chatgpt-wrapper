# Project Structure

This document describes the organized structure of the Rohit Bot Electron application.

## Directory Structure

```
chatgpt-wrapper/
├── assets/                 # Static assets
│   └── icons/             # Application icons and images
│       ├── icon.icns      # macOS icon
│       ├── icon_image.ico # Windows icon
│       ├── image.png      # Application image
│       ├── logo.ico       # Main logo icon
│       └── logo.png       # Logo image
├── docs/                  # Documentation
│   ├── BUILD_INSTRUCTIONS.md
│   └── PROJECT_STRUCTURE.md
├── electron/              # Electron main process files
├── node_modules/          # Dependencies (auto-generated)
├── public/                # Public web assets
├── scripts/               # Build and utility scripts
│   ├── convert-icons.js   # Icon conversion utility
│   └── update-electron-builder.js
├── src/                   # Source code
├── tests/                 # Test files
│   ├── test-app-models.js
│   └── test-gemini-api.js
├── .gitattributes         # Git attributes
├── .gitignore            # Git ignore rules
├── DISTRIBUTION.md       # Distribution documentation
├── index.html           # Main HTML file
├── package.json         # Project configuration
├── package-lock.json    # Dependency lock file
├── README.md            # Project README
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # Node TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

## Build Directories (Auto-generated)

These directories are created during the build process and are ignored by Git:

- `dist/` - Vite build output
- `dist-electron/` - Electron build output
- `release/` - Final application packages
- `win-unpacked/` - Unpacked Windows build
- `large-files/` - Large executable files

## Key Files

### Configuration Files
- `package.json` - Project metadata and dependencies
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript compiler configuration
- `.gitignore` - Files and directories to ignore in version control

### Source Code
- `src/` - Main application source code
- `electron/` - Electron main process code
- `public/` - Static web assets

### Build Scripts
- `scripts/convert-icons.js` - Utility for converting images to icons
- `scripts/update-electron-builder.js` - Electron builder update script

## Development Workflow

1. **Install dependencies**: `npm install`
2. **Development**: `npm run dev`
3. **Build**: `npm run build`
4. **Package**: `npm run dist`

## Cleanup Notes

The following large files and build artifacts have been removed:
- Removed ~600MB of build artifacts and large executable files
- Consolidated icon files into `assets/icons/`
- Organized utility scripts into `scripts/`
- Moved documentation to `docs/`
- Moved test files to `tests/`
- Updated `.gitignore` to prevent future build artifact commits
