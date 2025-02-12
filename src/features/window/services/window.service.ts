import { BrowserWindow } from 'electron';
import path from 'node:path';
import { IWindowConfig, IWindowService } from '../../../core/types/window.types';
import { windowLogger as logger } from '../../../shared/services/logger.service';

export class WindowService implements IWindowService {
  public async createMainWindow(config: IWindowConfig): Promise<BrowserWindow> {
    try {
      logger.debug('Creating main window with config:', config);
      const defaultConfig = {
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
        },
      };

      const mergedConfig = { ...defaultConfig, ...config };
      const window = new BrowserWindow(mergedConfig);
      logger.info('Main window created successfully');
      return window;
    } catch (error) {
      logger.error('Failed to create main window', error as Error);
      throw error;
    }
  }

  public async loadContent(window: BrowserWindow): Promise<void> {
    try {
      logger.debug("Loading window content");
      if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        await window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        logger.debug("Loaded development server URL");
      } else {
        await window.loadFile(
          path.join(
            __dirname,
            `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
          )
        );
        logger.debug("Loaded production HTML file");
      }

      // Verificação do ambiente de desenvolvimento pode ser movida para a configuração
      if (process.env.NODE_ENV === "development") {
        window.webContents.openDevTools();
        logger.debug("Opened DevTools in development mode");
      }

      logger.info("Window content loaded successfully");
    } catch (error) {
      logger.error('Failed to load window content', error as Error);
      throw error;
    }
  }
}
