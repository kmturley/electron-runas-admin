import { BrowserWindow, app, ipcMain } from 'electron';
import * as path from 'path';

// Import new dependencies
import isElevated from 'native-is-elevated';
import sudoPrompt from '@vscode/sudo-prompt';
import { exec } from 'child_process';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Modified version of VSCode isAdmin() method
// https://github.com/microsoft/vscode/blob/main/src/vs/platform/native/electron-main/nativeHostMainService.ts#L480
ipcMain.handle('isAdmin', () => {
  console.log('isAdmin');
  let isAdmin: boolean;
  if (process.platform === 'win32') {
    isAdmin = isElevated();
  } else {
    isAdmin = process.getuid() === 0;
  }
  return isAdmin;
});

// Run a simple command without elevated privileges
ipcMain.handle('runProcess', async () => {
  console.log('runProcess');
  return new Promise<string>((resolve, reject) => {
    exec('whoami', (error, stdout, stderr) => {
      if (stdout) {
        console.log('runProcess', stdout);
      }
      if (stderr) {
        console.log('runProcess', stderr);
      }
      if (error) {
        reject(error);
      } else {
        resolve(stdout.toString());
      }
    });
  });
});


// Modified version of VSCode writeElevated() method 
// https://github.com/microsoft/vscode/blob/main/src/vs/platform/native/electron-main/nativeHostMainService.ts#L491
ipcMain.handle('runProcessElevated', async () => {
  console.log('runProcessElevated');
  return new Promise<string>((resolve, reject) => {
    sudoPrompt.exec('whoami', { name: 'Electron Runas Admin' }, (error, stdout, stderr) => {
      if (stdout) {
        console.log('runProcessElevated', stdout);
      }
      if (stderr) {
        console.log('runProcessElevated', stderr);
      }
      if (error) {
        reject(error);
      } else {
        resolve(stdout.toString());
      }
    });
  });
});
