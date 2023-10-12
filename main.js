const { trace } = require("console");
const { app, BrowserWindow ,dialog,globalShortcut,Tray,Menu,ipcMain} = require("electron");
ipcMain.on("msg",(event,arg)=>{
  console.log("arg",arg)
  event.reply("back-msg",'thank you for data')
})
const windowStateKeeper=require('electron-window-state')
let win;
console.log("i am main process");
let template =[{label:'check1'},{label:"check2"},{role:'minimize'}]
let contextMenu=Menu.buildFromTemplate(template);
// let isMac=process.platform =='darwin'
// const globalTemplate =[
//  ...isMac ? {label:'Blog',submenu:[{label:'About'},{label:'Version'}]}:[],
//   {label:'File'}, 
//   {label:'Operation',submenu:[{role:'quit',label:'close'},{label:'Zoom'}]}
// ]
// let menu =Menu.buildFromTemplate(globalTemplate);
//Menu.setApplicationMenu(menu)
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
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  // const child =new BrowserWindow()
  // child.loadFile('index.html')
  // child.show()
  win.loadFile("index.html");
  win.webContents.on("context-menu",()=>{
    contextMenu.popup();
  })
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
//tray start
 tray = new Tray('food.png')
// tray.setToolTip("tray for electron app")
// tray.on('click',()=>{
//   win.isVisible()?win.hide():win.show();
// })
//tray with sub menus
//let template =[{label:"item 1"},{label:"quit"}]
const contextMenu=Menu.buildFromTemplate(template);
tray.setContextMenu(contextMenu)
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
