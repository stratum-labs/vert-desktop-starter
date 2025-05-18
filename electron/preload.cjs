const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getVersions: () => process.versions,
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
});

window.addEventListener('DOMContentLoaded', async () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  const versions = window.electronAPI.getVersions();
  if (versions) {
    for (const type of ['chrome', 'node', 'electron']) {
      if (versions[type]) {
        replaceText(`${type}-version`, versions[type]);
      }
    }
  }

  console.log('preload.cjs loaded and versions exposed via contextBridge');
});
