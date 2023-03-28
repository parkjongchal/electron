export interface IElectronAPI {
    sendTitle: (title: string) => string,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}