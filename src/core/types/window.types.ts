import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export interface IWindowConfig extends BrowserWindowConstructorOptions {
  isDev?: boolean;
}

export interface IWindowService {
  createMainWindow(config: IWindowConfig): Promise<BrowserWindow>;
  loadContent(window: BrowserWindow): Promise<void>;
}
