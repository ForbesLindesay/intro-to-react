const crypto = require('crypto');
const fs = require('fs');
const cp = require('child_process');
const lsr = require('lsr').lsrSync;
const rimraf = require('rimraf').sync;

const stepsDir = __dirname + '/../src/steps';
const oldData = JSON.parse(fs.readFileSync(__dirname + '/file-checksums.json', 'utf8'));
const newData = [];

const steps = fs.readdirSync(stepsDir).filter(step => /^\d\d\-/.test(step));

const result = cp.spawnSync('node', [__dirname + '/prepare-dependencies.js'], {
  stdio: 'inherit'
});
if (result.status !== 0) {
  process.exit(result.status);
}

steps.forEach((step, i) => {
  rimraf(stepsDir + '/' + step + '/build');
  if (i !== 0 && oldData[i - 1]) {
    const newFiles = newData[i - 1];
    const oldFiles = oldData[i - 1].reduce((map, entry) => {
      map[entry.path] = entry.hash;
      return map;
    }, {});
    newFiles.forEach(entry => {
      if (entry.hash === oldFiles[entry.path]) {
        // the file hasn't changed
        return;
      }
      const fullPath = stepsDir + '/' + step + '/' + entry.path;
      try {
        const hash = crypto
          .createHash('md5')
          .update(fs.readFileSync(fullPath, 'utf8'))
          .digest('hex');
        if (hash === oldFiles[entry.path]) {
          // the file was a match, but has changed
          fs.writeFileSync(fullPath, entry.src);
          console.log('UPDATE ' + step + '/' + entry.path);
        }
      } catch (ex) {
        if (ex.code !== 'ENOENT') {
          throw ex;
        }
        // the file didn't exist, we need to create it
        fs.writeFileSync(fullPath, entry.src);
        console.log('CREATE ' + step + '/' + entry.path);
      }
    });
  }
  const files = [];
  lsr(stepsDir + '/' + step, {
    filter(element) {
      return (
        element.name !== 'node_modules' &&
        element.name !== 'package-lock.json' &&
        element.name !== 'yarn.lock' &&
        element.name !== 'package.json' &&
        element.name !== '.DS_Store'
      );
    }
  }).forEach(entry => {
    if (entry.isFile()) {
      const src = fs.readFileSync(entry.fullPath, 'utf8');
      files.push({
        path: entry.path.substr(2),
        src,
        hash: crypto
          .createHash('md5')
          .update(src)
          .digest('hex')
      });
    }
  });
  newData.push(files);
});

fs.writeFileSync(
  __dirname + '/file-checksums.json',
  JSON.stringify(
    newData.map(files => files.map(f => ({path: f.path, hash: f.hash}))),
    null,
    '  '
  )
);
