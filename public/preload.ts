import { contextBridge, ipcRenderer } from 'electron'
import {IPC_TEST} from "../src/constants";

contextBridge.exposeInMainWorld('electronAPI', {
    sendTitle: (title: string): string => {
        console.log(IPC_TEST.SEND_TITLE)
        return ipcRenderer.sendSync(IPC_TEST.SEND_TITLE, title)
    }
})