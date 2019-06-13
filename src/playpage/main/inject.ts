import { ipcRenderer } from 'electron';
import utils from './utils';

export class badgeCount {
  constructor() {
    setInterval(() => {
      const countDom: any = document.querySelector(
        '#menu-pannel .unread-num .ng-binding',
      );
      let count;
      if (countDom) {
        count = countDom.innerText;
        count = parseInt(count, 10);
      }

      if (count > 0) {
        ipcRenderer.send(
          utils.ipcChan.renderSendBadgeCountChange,
          count.toString(),
        );
      } else {
        ipcRenderer.send(utils.ipcChan.renderSendBadgeCountChange, '');
      }
    }, 1500);
  }
}

export class windowResize {
  constructor() {
    this.init();
  }

  init() {
    const key = setInterval(() => {
      // layout-container 去掉 justify-content 属性
      const layoutContainer = document.getElementById('layout-container');
      if (layoutContainer) {
        layoutContainer.style.justifyContent = 'inherit';
      }
      const layoutMain = document.getElementById('layout-main');
      if (layoutMain) {
        layoutMain.style.width = '100%';
        ipcRenderer.send(utils.ipcChan.renderSendResizeToMain, 'resize');
        clearInterval(key);
      }
    }, 1000);
  }

  // 重置
  doResize(x, y, fixPx) {
    // layout-main
    // 1. flex 设置成当前高度
    // 2. width 100%
    const layoutMain = document.getElementById('layout-main');
    if (layoutMain) {
      layoutMain.style.flexBasis = `${y}px`;
    }

    // body 设置 成当前高度 - 59px
    const body = document.getElementById('body');
    if (body) {
      body.style.height = `${y - fixPx}px`;
    }
  }
}

export class InjectsPreload {
  resize

  badgeCount

  ECVApp

  constructor() {
    this.resize = new windowResize();
    this.badgeCount = new badgeCount();
    this.ECVApp = window.ECVApp;
    this.bindObj();
  }

  init() {
    window.onresize = () => {
      ipcRenderer.send(utils.ipcChan.renderSendResizeToMain, 'resize');
    };
  }

  bindObj() {
    this.ECVApp.doResize = this.resize.doResize;
  }
}

new InjectsPreload().init();
