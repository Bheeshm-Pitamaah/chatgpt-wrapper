# Rohit Bot

<div align="center">
  <img src="assets/icons/logo.png" alt="Rohit Bot Logo" width="200"/>
  <h3>Your AI-Powered Development Companion</h3>
  <p><em>Code smarter, build faster, learn deeper</em></p>
</div>

## Vision

Rohit Bot is a simple lightweight application aimed at revolutionizing the way developers interact with their code. By bringing advanced AI capabilities directly into your development workflow, we want to create a more intuitive, efficient, and enlightening coding experience. Think of it as having a senior developer, technical architect, and coding mentor - all rolled into one intelligent companion.

### 🌟 Key Features

- **Intelligent Code Reviews**: Get instant, AI-powered code reviews that go beyond syntax - understanding context, patterns, and potential improvements
- **Real-time Development Assistance**: Interactive chat interface for immediate help with coding questions, debugging, and architecture decisions
- **Local-First Architecture**: Your code stays on your machine, with secure, privacy-focused AI integration
- **Cross-Platform Support**: Seamlessly works on Windows, macOS, and Linux
- **Smart Context Understanding**: Analyzes your codebase to provide relevant, contextual suggestions

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Or build and run the application: `npm run start:prod`

## Project Structure

The project is organized into the following directories:

- `src/` - Main application source code
- `electron/` - Electron main process files
- `public/` - Public web assets
- `assets/` - Static assets (icons, images)
- `scripts/` - Build and utility scripts
- `tests/` - Test files
- `docs/` - Documentation

For detailed information about the project structure, see [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md).

### Available Scripts

- `npm run dev` - Start the application in development mode with hot reloading (recommended for development)
- `npm start` - Run the built application in production mode (requires a previous build)
- `npm run start:dev` - Run the application in development mode without hot reloading
- `npm run start:prod` - Build the application and then run it in production mode
- `npm run build` - Build the application without packaging
- `npm run build:dir` - Build the application and package it in a directory format
- `npm run build:prod` - Build the application and create installers
- `npm run dist` - Create installers for your current platform
- `npm run dist:win` - Create Windows installers
- `npm run dist:linux` - Create Linux installers
- `npm run dist:mac` - Create macOS installers

## 🔒 Privacy & Security

Rohit Bot is built with a privacy-first approach:
- All code analysis happens locally on your machine
- Selective code sharing with AI - you control what gets shared
- No data storage or collection
- Open source and transparent

## Technical Implementation

### Code Review System

The code review functionality is integrated directly into the Chat interface for a seamless experience:

1. **Trigger via Chat Command**:
   - Start with `CodeReview:` (case insensitive)
   - Add your review request
   - Example: `CodeReview: Check for security vulnerabilities in my authentication code`

2. **Directory Selection**:
   - Select directories for analysis
   - Automatic filtering of non-code files
   - Smart context gathering

3. **AI Analysis**:
   - Comprehensive code review
   - Actionable improvement suggestions
   - Pattern recognition and best practices

### Architecture

#### Directory Permission System
1. **Permission Collection**
   - User-selected directory analysis
   - Persistent permission management
   - Intuitive permission UI

2. **Security Layer**
   - Validated file operations
   - Protected system directories
   - Secure access patterns

#### File System Integration
1. **Smart Scanning**
   - Recursive directory analysis
   - .gitignore respect
   - Quick access indexing

2. **Content Analysis**
   - Structure extraction
   - Complexity analysis
   - Change detection

#### LLM Integration
1. **Processing Pipeline**
   - Contextual bundling
   - Smart prompt generation
   - Efficient API integration

2. **Result Presentation**
   - Inline suggestions
   - Actionable feedback
   - User interaction system

## Contributing

We welcome contributions! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation
- 🎨 UI/UX improvements

Check our [Contributing Guidelines](CONTRIBUTING.md) to get started.

<div align="center">
  <p>Built with ❤️ by Rohit</p>
  <p>Making development more intuitive, one line at a time.</p>
</div>