// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog} = require('electron');
const path = require('path');
let myWindow;


const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore();
      myWindow.focus();
	  dialog.showMessageBoxSync(myWindow, {
		type: "none",
		title: "Second Instance Launch Attempt Detected",
		message: commandLine[0]
	  });
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
	createWindow();
  })
}


function createWindow () {
  // Create the browser window.
  myWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  myWindow.loadFile('index.html');
 

  // Open the DevTools.
  myWindow.webContents.openDevTools()
}


app.on('window-all-closed', function () {
  app.quit();
})

