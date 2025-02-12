export interface IAppConfig {
  isDevMode: boolean;
  window: {
    width: number;
    height: number;
    devTools: boolean;
  };
}

export interface IConfigService {
  getConfig(): IAppConfig;
  isDevelopment(): boolean;
}
