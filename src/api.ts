import { ipcRenderer } from 'electron';

function isAdmin(): Promise<boolean> {
  return ipcRenderer.invoke('isAdmin');
}

async function runProcess(): Promise<string> {
  return ipcRenderer.invoke('runProcess');
}

async function runProcessElevated(): Promise<string> {
  return ipcRenderer.invoke('runProcessElevated');
}

export default {
  isAdmin,
  runProcess,
  runProcessElevated
};
