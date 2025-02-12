import { app } from 'electron';
import started from 'electron-squirrel-startup';

import { WindowService } from './features/window/services/window.service';
import { configService } from './shared/config/config.service';
import { AppHandler } from './main/handlers/app.handler';
import { mainLogger as logger } from './shared/services/logger.service';

logger.info('Starting Electron application');

// Manipula a criação/remoção de atalhos no Windows ao instalar/desinstalar
if (started) {
  logger.info('Windows installer is running, quitting application');
  app.quit();
}

/**
* Inicializa serviços e manipuladores de aplicativos
* Seguindo o padrão de injeção de dependência para melhor testabilidade e manutenibilidade
*/
function bootstrap(): void {
  try {
    logger.debug('Bootstrapping application services');
    const windowService = new WindowService();
    new AppHandler(windowService, configService);
    logger.info('Application services initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize application', error as Error);
    app.quit();
  }
}

// Inicializar o aplicativo
bootstrap();
