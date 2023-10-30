const { ipcRenderer } = require("electron");
// console.log(ipcRenderer);
// console.log("preload.js");
// window.ipcRenderer = ipcRenderer;

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on },
});
