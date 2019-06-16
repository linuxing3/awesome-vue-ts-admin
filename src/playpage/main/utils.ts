import { join } from 'path';
const utils: any = {
  ipcChan: {
    renderSendNewMsgToMain: 'on-new-msg',
    mainSendResizeToRender: 'on-mainwindow-resize',
    renderSendResizeToMain: 'on-mainwindow-resize-sm',
    renderSendTrayDbclickToMain: 'on-tray-dbclick',
    renderSendTrayExitToMain: 'on-tray-exit',
    renderSendBadgeCountChange: 'on-badge-change',
    openDevTools: 'async-open-dev',
    openGraphqlTools: 'async-open-graph',
    setAppMenu: 'async-show-menu',
    addJumpList: 'async-add-jumplist',
    createConfigManager: 'create-config-manager',
    createPlayground: 'create-playground',
    dispatch: 'dispatch',
    printPdf: 'print-pdf',
  },
  assets(name) {
    return join(__dirname, `/../../assets/${name}`);
  },
};

export default utils;
