import { app, BrowserWindow } from 'electron';
import { IWindowService } from '../../core/types/window.types';
import { IConfigService } from '../../core/types/config.types';
import { mainLogger as logger } from '../../shared/services/logger.service';

export class AppHandler {
  constructor(
    private readonly windowService: IWindowService,
    private readonly configService: IConfigService
  ) {
    logger.info('Initializing application handler');
    this.initializeApp();
  }

  private initializeApp(): void {
    app.on('ready', () => this.createMainWindow());
    app.on('window-all-closed', this.handleWindowsClosed);
    app.on('activate', this.handleActivation);
  }

  private async createMainWindow(): Promise<void> {
    try {
      logger.debug('Creating main application window');
      const config = this.configService.getConfig();
      const mainWindow = await this.windowService.createMainWindow({
        width: config.window.width,
        height: config.window.height,
        isDev: this.configService.isDevelopment(),
      });

      await this.windowService.loadContent(mainWindow);
      logger.info('Main window created and loaded successfully');
    } catch (error) {
      logger.error('Failed to create main window', error as Error);
      app.quit();
    }
  }

  private handleWindowsClosed = (): void => {
    logger.debug('All windows closed');
    if (process.platform !== 'darwin') {
      logger.info('Quitting application (non-macOS platform)');
      app.quit();
    }
  };

  private handleActivation = async (): Promise<void> => {
    logger.debug('Application activated');
    if (BrowserWindow.getAllWindows().length === 0) {
      logger.info('No windows found, creating new main window');
      await this.createMainWindow();
    }
  };
}
