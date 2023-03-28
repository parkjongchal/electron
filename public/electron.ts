import * as path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import * as isDev from 'electron-is-dev'
import {IPC_TEST} from "../src/constants";

const BASE_URL = 'http://localhost:3000'

let mainWindow: BrowserWindow | null

const createMainWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            devTools: isDev,
            preload: path.join(__dirname, 'preload.js')
        },
    })

    await mainWindow.loadURL(isDev ? BASE_URL : `file://${path.join(__dirname, '../build/index.html')}`)

    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: "detach" })
    }

    mainWindow.setResizable(true)
    mainWindow.on('closed', (): void => {
        mainWindow = null
    })
    mainWindow.focus()
}

app.on('ready', async ()=> {
    ipcMain.on(IPC_TEST.SEND_TITLE, (event, title) => {
        console.log('main')
        console.log(title)
        event.returnValue = 'pong'
    })
    await createMainWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', async () => {
    if (mainWindow === null) {
       await createMainWindow()
    }
})
