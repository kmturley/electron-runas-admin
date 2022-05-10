// Run when Electron needs elevated privileges

import fs from 'fs';

interface Arguments {
  path: string;
}

function getArguments(): Arguments {
  return {
    path: process.argv[3],
  };
}

async function init() {
  const argv: Arguments = getArguments();
  console.log('init', argv.path);
  fs.readdir(argv.path, (err, files) => {
    if (err) {
      console.log('init.error', err);
    } else {
      console.log('init.success', files);
    }
  })
}

init();
