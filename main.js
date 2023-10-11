const { app, BrowserWindow } = require("electron");
const windowStateKeeper=require('electron-window-state')
let win;
console.log("i am main process");
function createWindow() {
  let mainWindowState=windowStateKeeper({
    defaultHeight:800,
    defaultWidth:500
  })
  const win = new BrowserWindow({
    x:mainWindowState.x,
    y:mainWindowState.y,
    defaultHeight:mainWindowState.height,
    defaultWidth:mainWindowState.width,
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
 // win.webContents.openDevTools();
 mainWindowState.manage(win)
}
// app.on('will-quit',(e)=>{
//   console.log("call quit app")
//   e.preventDefault();
// })
//app.whenReady().then(createWindow);
app.on('before-quit',()=>{
  console.log("you are clossing the app")
})
app.on('browser-window-focus',()=>{
  console.log("you are on app")
})
app.on('browser-window-blur',()=>{
  console.log("you are unfocus app")
})
app.on('ready',()=>{
  createWindow();
  console.warn("app is ready you can write some code here")
})