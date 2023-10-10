const { app, BrowserWindow } = require("electron");
console.log("i am main process");
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#FFEBCD",
    // frame:false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // const child =new BrowserWindow()
  // child.loadFile('index.html')
  // child.show()
  win.loadFile("index.html");
  win.webContents.openDevTools();
}
app.whenReady().then(createWindow);
