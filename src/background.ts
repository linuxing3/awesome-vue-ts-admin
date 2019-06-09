'use strict';

/* global __static */
import {
  app, protocol, BrowserWindow, ipcMain, globalShortcut, Menu, shell,
} from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import http from 'http';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWin: BrowserWindow | null;
let playWin: BrowserWindow | null;
let createdAppProtocol = false;

let APP_URL = '';
if (isDevelopment) {
  APP_URL = process.env.WEBPACK_DEV_SERVER_URL as string;
  console.log(`App working on ${APP_URL}`);
} else {
  APP_URL = 'app://./index.html';
}

// Scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });

function registerOpenDevShortcut(winVar: BrowserWindow, accelarator: string) {
  if (winVar === null) {
    console.log('Window you call is null, can not register shortcut. Exit...');
    return;
  }
  globalShortcut.register(accelarator, () => {
    if (!process.env.IS_TEST) winVar.webContents.openDevTools();
  });
}

function pollServer() {
  http.get(APP_URL, (res) => {
    if (res.statusCode === 200) {
      mainWin.loadURL(APP_URL);
    } else {
      console.log('restart poolServer');
      setTimeout(pollServer, 300);
    }
  })
    .on('error', pollServer);
}

function createAloneWindow() {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
    // icon: path.join(global.__static, 'icon.png')
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // pollServer()
    // Load the url of the dev server if in development mode
    mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
  } else {
    createProtocol('app');
    mainWin.loadURL('app://./index.html');
  }

  mainWin.on('closed', () => {
    mainWin = null;
  });
}

function createWindows(winVar, devPath, prodPath) {
  winVar = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    winVar.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
  } else {
    if (!createdAppProtocol) {
      createProtocol('app');
      createdAppProtocol = true;
    }
    winVar.loadURL(`app://./${prodPath}`);
  }

  winVar.on('closed', () => {
    winVar = null;
  });

  if (winVar === null) {
    console.log('restart creating window...');
    setTimeout(() => {
      createWindows(winVar, devPath, prodPath);
    }, 300);
  }
  return Promise.resolve(winVar);
}

function bootstrap() {
  createWindows(mainWin, '', 'index.html')
    .then(win => setTimeout(() => registerOpenDevShortcut(win, 'CommandOrControl+Shift+X'), 300));
  createWindows(playWin, 'playpage', 'playpage.html')
    .then(win => setTimeout(() => registerOpenDevShortcut(win, 'CommandOrControl+Shift+Y'), 300));
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  bootstrap();
});

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  bootstrap();
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

// Ipc events
ipcMain.on('async-open-dev', (event, arg) => {
  if (arg.openDevTools) {
    console.log('async-open-dev send arg: ', arg);
    if (!process.env.IS_TEST) {
      const focusedWin = BrowserWindow.getFocusedWindow();
      focusedWin.webContents.openDevTools();
    }
  }
  event.sender.send('async-open-dev', {
    devtoolsOpend: true,
  });
});

ipcMain.on('async-show-menu', (event, arg) => {
  if (arg.showMenu) {
    console.log('async-show-menu send arg: ', arg);
    const menu = Menu.buildFromTemplate(arg.template);
    Menu.setApplicationMenu(menu);
  }
  event.sender.send('async-show-menu', {
    menuOpened: true,
  });
});

ipcMain.on('async-add-jumplist', (event, arg) => {
  console.log('async-add-jumplist send arg: ', arg);
  // { type: 'file', path: 'C:\\Projects\\project1.proj' }
  const items = [];
  items.push(arg.item);
  app.setJumpList([
    {
      type: 'custom',
      name: 'Recent files',
      items,
    },
  ]);
  shell.openExternal(arg.path);
  event.sender.send('async-add-jumplist', {
    added: true,
  });
});
