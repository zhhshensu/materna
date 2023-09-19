var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/.pnpm/electron@26.2.1/node_modules/electron/index.js
var require_electron = __commonJS({
  "node_modules/.pnpm/electron@26.2.1/node_modules/electron/index.js"(exports, module2) {
    var fs = require("fs");
    var path2 = require("path");
    var pathFile = path2.join(__dirname, "path.txt");
    function getElectronPath() {
      let executablePath;
      if (fs.existsSync(pathFile)) {
        executablePath = fs.readFileSync(pathFile, "utf-8");
      }
      if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
        return path2.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath || "electron");
      }
      if (executablePath) {
        return path2.join(__dirname, "dist", executablePath);
      } else {
        throw new Error("Electron failed to install correctly, please delete node_modules/electron and try installing again");
      }
    }
    module2.exports = getElectronPath();
  }
});

// src/electron/win/win.module.ts
var win_module_exports = {};
__export(win_module_exports, {
  WinModule: () => WinModule
});
module.exports = __toCommonJS(win_module_exports);
var import_common3 = require("@nestjs/common");

// src/electron/win/win.service.ts
var import_common = require("@nestjs/common");

// src/electron/common/env.ts
var isProd = () => {
  return process.env.NODE_ENV === "production";
};

// src/electron/win/win.service.ts
var import_electron = __toESM(require_electron());
var path = __toESM(require("path"));
var WinService = class {
  onModuleInit() {
    console.log(
      "\u{1F680} ~ file: electron.service.ts:15 ~ ElectronService ~ onModuleInit ~ electronApp:",
      import_electron.app
    );
    if (import_electron.app) {
      import_electron.app.commandLine.appendSwitch("no-sandbox");
      import_electron.app.commandLine.appendSwitch("disable-gpu");
      import_electron.app.commandLine.appendSwitch("disable-software-rasterizer");
      import_electron.app.commandLine.appendSwitch("disable-gpu-compositing");
      import_electron.app.commandLine.appendSwitch("disable-gpu-rasterization");
      import_electron.app.commandLine.appendSwitch("disable-gpu-sandbox");
      import_electron.app.commandLine.appendSwitch("--no-sandbox");
      import_electron.app.disableDomainBlockingFor3DAPIs();
      import_electron.app.disableHardwareAcceleration();
      const isDuplicateInstance = import_electron.app.requestSingleInstanceLock();
      if (!isDuplicateInstance) {
        import_electron.app.quit();
        return;
      }
      import_electron.app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
          import_electron.app.quit();
        }
      });
      import_electron.app.whenReady().then(() => {
        console.log("whenReady");
        this.createMainWindow(import_electron.app);
      });
    }
  }
  async createMainWindow(electronApp2) {
    const WebPreferences2 = this.getWebPreferences({
      // preload: path.join(__dirname, 'preload.js'),
    });
    this.mainWindow = new import_electron.BrowserWindow({
      show: false,
      width: 1024,
      height: 650,
      minWidth: 800,
      minHeight: 500,
      hasShadow: true,
      resizable: true,
      useContentSize: true,
      // frame: false,
      webPreferences: WebPreferences2
    });
    this.mainWindow.once("ready-to-show", () => {
    });
    this.mainWindow.on("closed", () => {
      this.mainWindow.destroy();
      electronApp2.quit();
    });
    this.loadLoginPage();
  }
  async loadLoginPage() {
    this.mainWindow.resizable = true;
    this.mainWindow.setBackgroundColor("#000000");
    this.mainWindow.show();
    this.mainWindow.maximize();
    if (isProd()) {
      const LoginFile = path.resolve(__dirname, "../index.html");
      await this.mainWindow.loadFile(LoginFile);
    } else {
      await this.mainWindow.loadURL("http://127.0.0.1:5173/");
    }
    this.mainWindow.webContents.once("dom-ready", () => {
    });
  }
  getWebPreferences(otherParams = {}) {
    return {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      //TODO 会影响自动登录。如果设置为true的话, 当页面中存在iframe 会执行preload. 由于不同域会执行报错
      devTools: true,
      plugins: true,
      //是否应该启用插
      sandbox: false,
      allowRunningInsecureContent: true,
      //允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
      webSecurity: false,
      // 它将禁用同源策略
      //上下文隔离功能将确保您的 预加载脚本 和 Electron的内部逻辑 运行在所加载的 webcontent网页 之外的另一个独立的上下文环境里。 这对安全性很重要，因为它有助于阻止网站访问 Electron 的内部组件 和 您的预加载脚本可访问的高等级权限的API 。
      contextIsolation: true,
      //如果设置为false管理系统打不开,控制台提示jquery找不到
      ...otherParams
    };
  }
};
WinService = __decorateClass([
  (0, import_common.Injectable)()
], WinService);

// src/electron/win/win.controller.ts
var import_common2 = require("@nestjs/common");
var WinController = class {
};
WinController = __decorateClass([
  (0, import_common2.Controller)("win")
], WinController);

// src/electron/win/win.module.ts
var WinModule = class {
};
WinModule = __decorateClass([
  (0, import_common3.Module)({
    providers: [WinService],
    controllers: [WinController],
    exports: [WinService]
  })
], WinModule);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WinModule
});
