import {
  app, protocol, Menu, ipcMain, BrowserWindow, shell,
} from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import { writeFile } from 'fs';
import MainWindows from './mainWindow';
import menu from './menu';

import utils from './utils';

const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerStandardSchemes(['app'], { secure: true });

class ECVApp {
  mainWindow: MainWindows

  playWindow: MainWindows

  createdAppProtocol = false;

  devPath = ''

  prodPath = 'index.html'

  isPlay = false

  constructor() {
    this.mainWindow = null;
    this.playWindow = null;
  }

  init(options = { isPlay: false }) {
    this.isPlay = options.isPlay;
    this.addEventListener();
    this.addIpcEventListener();
  }

  addIpcEventListener() {
    const that = this;

    ipcMain.on(utils.ipcChan.renderSendResizeToMain, () => {
      that.mainWindow.resize();
    });

    ipcMain.on(utils.ipcChan.renderSendTrayDbclickToMain, () => {
      that.mainWindow.showOrHide();
    });

    ipcMain.on(utils.ipcChan.renderSendTrayExitToMain, () => {
      that.exit();
    });

    ipcMain.on(utils.ipcChan.openDevTools, (event, arg) => {
      if (arg.openDevTools) {
        console.log('async-open-dev send arg: ', arg);
        if (!process.env.IS_TEST) {
          const focusedWin = BrowserWindow.getFocusedWindow();
          focusedWin.webContents.openDevTools();
        }
      }
      event.sender.send(utils.ipcChan.openDevTools, {
        devtoolsOpend: true,
      });
    });

    ipcMain.on(utils.ipcChan.openGraphqlTools, (event, arg) => {
      if (arg.graphqlServerURL) {
        console.log('async-open-graphql send arg: ', arg);
        if (!process.env.IS_TEST) {
          const focusedWin = BrowserWindow.getFocusedWindow();
          focusedWin.loadURL(arg.graphqlServerURL);
        }
      }
      event.sender.send(utils.ipcChan.openGraphqlTools, {
        graphqlServerOpened: true,
      });
    });

    ipcMain.on(utils.ipcChan.setAppMenu, (event, arg) => {
      if (arg.showMenu) {
        console.log('async-show-menu send arg: ', arg);
        const menu = Menu.buildFromTemplate(arg.template);
        Menu.setApplicationMenu(menu);
      } else {
        Menu.setApplicationMenu(menu);
      }
      event.sender.send(utils.ipcChan.setAppMenu, {
        menuOpened: true,
      });
    });

    ipcMain.on(utils.ipcChan.addJumpList, (event, arg) => {
      console.log('async-add-jumplist send arg: ', arg);
      const items = [];
      items.push(arg.item);
      const settings = app.getJumpListSettings();
      console.log(settings);
      app.setJumpList([
        {
          type: 'custom',
          name: 'Recent files',
          items,
        },
      ]);
      // shell.openExternal(arg.item.path);
      event.sender.send(utils.ipcChan.addJumpList, {
        added: true,
      });
    });

    ipcMain.on(utils.ipcChan.printPdf, (event, arg) => {
      console.log('print send arg: ', arg);
      this.mainWindow.browserWindow.webContents.printToPDF({}, (error, data) => {
        if (error) throw error;
        writeFile(this.mainWindow.printPdfPath, data, (error) => {
          if (error) alert('write pdf file error');
          shell.openExternal(this.mainWindow.printPdfPath);
        });
      });
      // shell.openExternal(arg.item.path);
      event.sender.send(utils.ipcChan.printPdf, {
        printed: true,
      });
    });
  }

  addEventListener() {
    this.onAppReady();
    this.onAppWindowAllClosed();
  }

  onAppReady() {
    app.on('ready', async () => {
      if (this.isPlay) {
        this.createPlayWindow();
        await this.installDevtools();
        this.devPath = 'playpage';
        this.prodPath = 'playpage.html';
        this.loadUrl(this.playWindow);
      } else {
        this.createMainWindow();
        await this.installDevtools();
        this.loadUrl(this.mainWindow);
      }
    });
  }

  loadUrl(win: MainWindows | BrowserWindow) {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      win.loadURL(
        process.env.WEBPACK_DEV_SERVER_URL + this.devPath,
      );
    } else {
      if (!this.createdAppProtocol) {
        createProtocol('app');
        this.createdAppProtocol = true;
      }
      win.loadURL(`app://./${this.prodPath}`);
    }
  }

  async installDevtools() {
    if (isDevelopment && !process.env.IS_TEST) {
      try {
        await installVueDevtools();
      } catch (e) {
        console.error('failed:', e.toString());
      }
    }
  }

  onAppWindowAllClosed() {
    // 当所有窗口被关闭了，退出。
    app.on('window-all-closed', () => {
      // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
      // 应用会保持活动状态
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }

  createMainWindow() {
    const options = {
      width: 1000,
      height: 600,
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: true,
      },
    };
    this.mainWindow = new MainWindows(options);
  }

  createPlayWindow() {
    const options = {
      width: 800,
      height: 600,
    };
    this.playWindow = new MainWindows(options);
  }

  exit() {
    app.exit(0);
  }
}

// bootstrap
export default ECVApp;
