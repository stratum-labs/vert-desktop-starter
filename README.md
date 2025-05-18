# Vite + React + TypeScript + Electron Template

A minimal template for building desktop applications using Electron, React, TypeScript, and Vite. Features hot-reload in development and proper production builds.

## Features

- **Vite** - Lightning fast build tool
- **React 18** with TypeScript
- **Electron 28+** with proper security defaults
- **Hot Reload** for both React and Electron
- **Shadcn/UI + Tailwind CSS** for styling
- **TypeScript** for type safety
- **Bun** for fast package management

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v18+)
- [Bun](https://bun.sh/) (v1.0+)

## Getting Started

1. Clone the repository:
```bash
git clone <https://github.com/stratum-labs/vert-desktop-starter.git
cd vert-desktop-starter
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
# Start in development mode with hot reload
bun run electron:dev
```

## Available Scripts

- `bun dev` - Start the app in development mode
- `bun build` - Build the app for production
- `bun preview` - Preview the production build locally
- `bun lint` - Run ESLint
- `bun type-check` - Run TypeScript type checking

## Project Structure

```
vert-desktop-starter/
├── electron/           # Electron main process files
├── public/            # Static assets
├── src/
│   ├── assets/       # Media assets
│   ├── components/   # React components
│   │   └── ui/      # Shadcn/UI components
│   └── lib/         # Utility functions
└── package.json
```

## Development Notes

- The app uses a custom title bar on Windows/Linux and native traffic lights on macOS
- Hot reload is enabled for both the renderer (React) and main (Electron) processes
- Security best practices are enforced by default:
  - Context isolation enabled
  - Remote content disabled
  - Node integration disabled
  - CSP configured for development

## Building for Production

```bash
# Build the app
bun build

# Preview the production build
bun preview
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
