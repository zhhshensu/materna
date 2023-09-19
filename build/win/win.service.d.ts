import { OnModuleInit } from '@nestjs/common';
import { App as ElectronApp, BrowserWindow, WebPreferences } from 'electron';
export declare class WinService implements OnModuleInit {
    mainWindow: BrowserWindow;
    onModuleInit(): void;
    createMainWindow(electronApp: ElectronApp): Promise<void>;
    loadLoginPage(): Promise<void>;
    getWebPreferences(otherParams?: {}): WebPreferences;
}
