const { app, BrowserWindow ,dialog,globalShortcut} = require("electron");
const windowStateKeeper=require('electron-window-state')
let win;
console.log("i am main process");
function createWindow() {
  let mainWindowState=windowStateKeeper({
    defaultHeight:50,
    defaultWidth:100
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
  win.webContents.openDevTools();
 mainWindowState.manage(win)
 globalShortcut.register("shift+k",()=>{
  dialog.showOpenDialog({
    defaultPath:app.getPath('desktop')
  })
 })
 //Open a dialog
//  win.webContents.on("did-finish-load",()=>{
//   dialog.showOpenDialog({
//     defaultPath:app.getPath('desktop')
//   })
//  })
let wc =win.webContents
wc.on('dom-ready',()=>{
  console.log("dom is ready")
})
wc.on('did-finish-load',()=>{
  console.log("did-finish-load")
})
wc.on('new-window',()=>{
  console.log("new window open")
})
wc.on("before-input-event",()=>{
  console.log("some key is pressed")
})
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
