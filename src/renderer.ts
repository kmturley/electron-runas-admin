// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

function setupButton(btn: HTMLElement, method: Function, command: string) {
  const btnElement = btn as HTMLButtonElement;
  btnElement.addEventListener('click', function(e) {
    btnElement.disabled = true;
    method(command).then((output: any) => {
      btnElement.disabled = false;
      window.alert(output);
    }).catch((error: any) => {
      btnElement.disabled = false;
      window.alert(error);
    });
  });
}

setupButton(document.getElementById('runProcessBtn'), window.electronAPI.runProcess, 'whoami');
setupButton(document.getElementById('runProcessElevatedBtn'), window.electronAPI.runProcessElevated, 'whoami');

window.electronAPI.getAppPath().then((appPath: string) => {
  const appPathClean: string = appPath.replace('app.asar', 'app.asar.unpacked');
  setupButton(document.getElementById('runProcessNodeBtn'), window.electronAPI.runProcess, `node "${appPathClean}/main/cli.js" --path ~/`);
  setupButton(document.getElementById('runProcessNodeElevatedBtn'), window.electronAPI.runProcessElevated, `node "${appPathClean}/main/cli.js" --path ~/`);;
});
