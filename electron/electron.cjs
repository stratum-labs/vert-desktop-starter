const path = require('path');
const { app, BrowserWindow, shell, ipcMain } = require('electron');

const isDev = process.env.IS_DEV == "true" ? true : false;

// Disable hardware acceleration for Linux/Windows
if (process.platform !== 'darwin') {
  app.disableHardwareAcceleration();
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: true,
    resizable: true,
    minWidth: 800,
    minHeight: 600,
    frame: process.platform !== 'darwin', // Use native frame on macOS
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
    trafficLightPosition: { x: 12, y: 10 }, // Adjust traffic light position on macOS
    show: false, // Don't show until ready
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      devTools: true
    },
  });

  // Security-focused CSP for development
  if (isDev) {
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: http://localhost:* ws://localhost:*"
          ]
        }
      });
    });
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => { mainWindow.show() });

  // Purpose: Handles requests to open new windows or navigate via links.
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  // Hot Reload in Development
  if (isDev) {
    const loadURL = async () => {
      try {
        await mainWindow.loadURL('http://localhost:3000');
      } catch (e) {
        console.error('Failed to load URL:', e);
        setTimeout(loadURL, 1000);
      }
    };
    loadURL();

    // Watch for changes
    try {
      require('electron-reloader')(module, {
        debug: true,
        watchRenderer: true
      });
    } catch (err) {
      console.error('Error setting up electron-reloader:', err);
    }
  } else {
    // Purpose: Loads the app from the compiled static files in the 'dist' directory.
    // Essential for running the packaged/production version of the app.
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }

  return mainWindow;
}

// Store mainWindow reference in a variable accessible to IPC handlers
let mainWindow;

app.whenReady().then(async () => {
  // Set default security policies
  app.on('web-contents-created', (event, contents) => {
    // Disable navigation
    contents.on('will-navigate', (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      if (isDev && parsedUrl.origin === 'http://localhost:3000') {
        return;
      }
      event.preventDefault();
    });

    // Disable new window creation
    contents.setWindowOpenHandler(({ url }) => {
      if (isDev && url.startsWith('http://localhost:3000')) {
        return { action: 'allow' };
      }
      shell.openExternal(url);
      return { action: 'deny' };
    });
  });

  // Run the createWindow function to create the main window.
  mainWindow = createWindow();

  // Purpose: Creates a new window if none exists when the app is activated.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
  });
});

// Quits the app when all windows are closed (except on macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Window control IPC handlers
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
ipcMain.on('window-close', () => mainWindow?.close());
