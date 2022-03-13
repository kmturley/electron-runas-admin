// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

var runProcessBtn: HTMLButtonElement = document.getElementById('runProcessBtn') as HTMLButtonElement;
var runProcessElevatedBtn: HTMLButtonElement = document.getElementById('runProcessElevatedBtn') as HTMLButtonElement;

runProcessBtn.addEventListener('click', function(e) {
  runProcessBtn.disabled = true;
  window.electronAPI.runProcess().then((output) => {
    runProcessBtn.disabled = false;
    window.alert(output);
  }).catch((error) => {
    runProcessElevatedBtn.disabled = false;
    window.alert(error);
  });
});

runProcessElevatedBtn.addEventListener('click', function(e) {
  runProcessElevatedBtn.disabled = true;
  window.electronAPI.runProcessElevated().then((output) => {
    runProcessElevatedBtn.disabled = false;
    window.alert(output);
  }).catch((error) => {
    runProcessElevatedBtn.disabled = false;
    window.alert(error);
  });
});
