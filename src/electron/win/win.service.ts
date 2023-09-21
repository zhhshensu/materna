import { Injectable, OnModuleInit } from '@nestjs/common'
import { isProd } from '../common/env'
import {
  app as electronApp,
  App as ElectronApp,
  BrowserWindow,
  WebPreferences,
} from 'electron'
import * as path from 'path'

@Injectable()
export class WinService implements OnModuleInit {
  public mainWindow: BrowserWindow
  onModuleInit() {
    if (electronApp) {
      //https://github.com/electron/electron/issues/30966
      //GPU process crashes when electron is in a folder with unicode characters
      electronApp.commandLine.appendSwitch('no-sandbox')
      electronApp.commandLine.appendSwitch('disable-gpu')
      electronApp.commandLine.appendSwitch('disable-software-rasterizer')
      electronApp.commandLine.appendSwitch('disable-gpu-compositing')
      electronApp.commandLine.appendSwitch('disable-gpu-rasterization')
      electronApp.commandLine.appendSwitch('disable-gpu-sandbox')
      electronApp.commandLine.appendSwitch('--no-sandbox')
      electronApp.disableDomainBlockingFor3DAPIs() // 关闭3D api, 提高兼容性
      electronApp.disableHardwareAcceleration() // 关闭硬件加速, 减少渲染问题

      const isDuplicateInstance = electronApp.requestSingleInstanceLock()
      if (!isDuplicateInstance) {
        // dialog.showErrorBox('Error', 'Another instance of the app is already running.');
        electronApp.quit()
        return
      }
      electronApp.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          electronApp.quit()
        }
      })
      electronApp.whenReady().then(() => {
        console.log('whenReady')
        this.createMainWindow(electronApp)
      })
    }
  }

  async createMainWindow(electronApp: ElectronApp) {
    const WebPreferences = this.getWebPreferences({
      // preload: path.join(__dirname, 'preload.js'),
    })
    this.mainWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 650,
      minWidth: 800,
      minHeight: 500,
      hasShadow: true,
      resizable: true,
      useContentSize: true,
      // frame: false,
      webPreferences: WebPreferences,
    })
    this.mainWindow.once('ready-to-show', () => {
      // 添加日志
    })
    this.mainWindow.on('closed', () => {
      this.mainWindow.destroy()
      electronApp.quit()
    })
    // TODO 登录
    this.loadLoginPage()
  }

  async loadLoginPage() {
    this.mainWindow.resizable = true
    this.mainWindow.setBackgroundColor('#000000') //背景颜色
    this.mainWindow.show()
    this.mainWindow.maximize()
    if (isProd()) {
      const LoginFile = path.resolve(__dirname, '../../app/index.html')
      await this.mainWindow.loadFile(LoginFile)
    } else {
      await this.mainWindow.loadURL('http://127.0.0.1:5173/')
    }
    this.mainWindow.webContents.once('dom-ready', () => {})
  }

  getWebPreferences(otherParams = {}): WebPreferences {
    return {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true, //TODO 会影响自动登录。如果设置为true的话, 当页面中存在iframe 会执行preload. 由于不同域会执行报错
      devTools: true,
      plugins: true, //是否应该启用插
      sandbox: false,
      allowRunningInsecureContent: true, //允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
      webSecurity: false, // 它将禁用同源策略
      //上下文隔离功能将确保您的 预加载脚本 和 Electron的内部逻辑 运行在所加载的 webcontent网页 之外的另一个独立的上下文环境里。 这对安全性很重要，因为它有助于阻止网站访问 Electron 的内部组件 和 您的预加载脚本可访问的高等级权限的API 。
      contextIsolation: true, //如果设置为false管理系统打不开,控制台提示jquery找不到
      ...otherParams,
    }
  }
}
