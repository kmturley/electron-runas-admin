import { app, ipcRenderer } from 'electron';

function getAppPath(): Promise<string> {
  return ipcRenderer.invoke('getAppPath');
}

function isAdmin(): Promise<boolean> {
  return ipcRenderer.invoke('isAdmin');
}

async function runProcess(command: string): Promise<string> {
  return ipcRenderer.invoke('runProcess', command);
}

async function runProcessElevated(command: string): Promise<string> {
  return ipcRenderer.invoke('runProcessElevated', command);
}

export default {
  getAppPath,
  isAdmin,
  runProcess,
  runProcessElevated
};
