import { IAppConfig, IConfigService } from '../../core/types/config.types';

export class ConfigService implements IConfigService {
  private readonly config: IAppConfig;

  constructor() {
    this.config = {
      isDevMode: process.env.NODE_ENV === 'development',
      window: {
        width: 800,
        height: 600,
        devTools: process.env.NODE_ENV === 'development',
      },
    };
  }

  public getConfig(): IAppConfig {
    return this.config;
  }

  public isDevelopment(): boolean {
    return this.config.isDevMode;
  }
}

// Instância singleton para acesso global
export const configService = new ConfigService();
