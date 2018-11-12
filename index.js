const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// Receives the video file form webApp
ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    //send the video duration to the webApp
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
});
