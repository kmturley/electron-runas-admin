// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

document.getElementById('runProcessBtn').addEventListener('click', function(e) {
  console.log('runProcessBtn click');
  window.electronAPI.runProcess().then((output) => {
    window.alert(output);
  });
});

document.getElementById('runProcessElevatedBtn').addEventListener('click', function(e) {
  console.log('runProcessElevatedBtn click');
  window.electronAPI.runProcessElevated().then((output) => {
    window.alert(output);
  });
});
