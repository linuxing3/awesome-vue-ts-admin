import { BrowserWindow, globalShortcut, BrowserWindowConstructorOptions } from 'electron';

export default class MainWindows {
  browserWindow: BrowserWindow = null

  constructor() {
    this.browserWindow = null;
    this.createBrowserWindow();
    this.addEventListener();
  }

  createBrowserWindow() {
    const options: BrowserWindowConstructorOptions = {
      width: 1000,
      height: 600,
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: true,
      },
    };
    this.browserWindow = new BrowserWindow(options);
  }

  addEventListener() {
    this.onReadyToShow();
    this.onClose();
    this.onResize();
    this.onFocus();
    this.onBlur();
  }

  onReadyToShow() {
    const that = this;
    this.browserWindow.on('ready-to-show', () => {
      that.show();
    });
    this.registerglobalShortcut();
  }

  onClose() {
    const that = this;
    this.browserWindow.on('close', (e) => {
      if (that.browserWindow.isVisible()) {
        e.preventDefault();
        that.hide();
      }
    });
  }

  onResize() {
    const that = this;
    this.browserWindow.on('resize', () => {
      that.resize();
    });
  }

  onFocus() {
    this.browserWindow.on('focus', this.registerglobalShortcut);
  }

  onBlur() {
    this.browserWindow.on('blur', this.unregisterglobalShortcut);
  }

  show() {
    if (!this.browserWindow.isVisible()) {
      this.browserWindow.show();
    }
    if (!this.browserWindow.isFocused()) {
      this.browserWindow.focus();
    }
    this.registerglobalShortcut();
  }

  hide() {
    if (this.browserWindow.isVisible()) {
      this.browserWindow.hide();
    }
    this.unregisterglobalShortcut();
  }

  focus() {
    this.browserWindow.setFocusable(true);
  }

  loadURL(url) {
    this.browserWindow.loadURL(url);
  }

  showOrHide() {
    if (this.browserWindow.isVisible()) {
      this.browserWindow.hide();
    } else {
      this.browserWindow.show();
    }
  }

  resize() {
    const winSize = this.browserWindow.getSize();
    const x = winSize[0];
    const y = winSize[1];
    const fixPx = 59;
    this.browserWindow.webContents.executeJavaScript(
      'console.log("Resizing...")',
      // `window.DingDingApp.doResize(` + x + `,` + y + `,` + fixPx + `)`
    );
  }

  registerglobalShortcut() {
    const that = this;
    globalShortcut.register('ESC', () => {
      that.hide();
    });
    globalShortcut.register('CommandOrControl+Shift+X', () => {
      that.browserWindow.webContents.openDevTools();
    });
  }

  unregisterglobalShortcut() {
    globalShortcut.unregisterAll();
  }
}
