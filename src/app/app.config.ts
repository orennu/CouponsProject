import { InjectionToken } from '@angular/core';


export const APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {
    apiBaseEndpoint: string;
}

export const AppConfig: IAppConfig = {
    apiBaseEndpoint: 'http://localhost:8080/'
}