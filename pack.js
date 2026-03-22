/**
 * pack.js — builds Vite frontend, packages Electron app for Linux (x64),
 * copies server as loose files into app.asar.unpacked/server.
 */
const { packager } = require('@electron/packager');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirSync(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function rmDir(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

(async () => {
  const appDir = __dirname;

  // 1. Install server production deps
  console.log('Installing server production dependencies...');
  execSync('npm install --omit=dev --no-audit --no-fund', {
    cwd: path.join(appDir, 'server'),
    stdio: 'inherit'
  });

  // 2. Package Electron app for Linux
  const options = {
    dir: appDir,
    name: 'car-rental-app',
    platform: 'linux',
    arch: 'x64',
    out: path.join(appDir, 'release'),
    overwrite: true,
    asar: true,
    ignore: [
      /^\/node_modules/,
      /^\/src/,
      /^\/server/,
      /^\/release/,
      /^\/\.git/,
      /^\/public/,
      /^\/playwright/,
      /^\/vitest\.config/,
      /^\/tsconfig/,
      /^\/eslint\.config/,
      /^\/postcss\.config/,
      /^\/tailwind\.config/,
      /^\/vite\.config/,
      /^\/README/,
      /^\/EMAIL/,
      /^\/installer\.nsi/,
      /^\/installer\.sh/,
      /^\/build-installer\.js/,
      /^\/pack\.js/,
      /^\/components\.json/,
      /^\/index\.html/,
      /^\/package-lock\.json/,
      /^\/car\.jfif/,
      /^\/car-icon\.ico/,
      /^\/download\./,
      /^\/installer-sidebar/,
      /^\/playwright-fixture/,
      /^\/playwright\.config/,
    ],
    prune: true,
    derefSymlinks: true,
    icon: path.join(appDir, 'public', 'favicon.png'),
  };

  console.log('Packaging Electron app for Linux...');
  const [appPath] = await packager(options);
  console.log('Packaged to:', appPath);

  // 3. Copy server into app.asar.unpacked/server
  const serverSrc = path.join(appDir, 'server');
  const unpackedDest = path.join(appPath, 'resources', 'app.asar.unpacked', 'server');
  console.log('Copying server to:', unpackedDest);
  copyDirSync(serverSrc, unpackedDest);

  // Remove devDeps from copied server node_modules
  rmDir(path.join(unpackedDest, 'node_modules', 'nodemon'));

  // Strip test/doc files
  const serverNM = path.join(unpackedDest, 'node_modules');
  if (fs.existsSync(serverNM)) {
    for (const pkg of fs.readdirSync(serverNM)) {
      const pkgDir = path.join(serverNM, pkg);
      for (const junk of ['test', 'tests', '__tests__', 'docs', 'example', 'examples', '.github']) {
        rmDir(path.join(pkgDir, junk));
      }
    }
  }

  // 4. Copy node binary as car-rental-logger (Linux, no .exe)
  const nodeDest = path.join(unpackedDest, 'car-rental-logger');
  console.log('Copying node as car-rental-logger...');
  fs.copyFileSync(process.execPath, nodeDest);
  fs.chmodSync(nodeDest, 0o755);
  console.log('car-rental-logger copied');

  // 5. Verify
  const check = path.join(unpackedDest, 'src', 'server.js');
  if (fs.existsSync(check)) {
    console.log('Server successfully copied to app.asar.unpacked/server');
  } else {
    console.error('Server copy failed — server.js not found at', check);
    process.exit(1);
  }

  // 6. Report size
  function dirSizeMB(dir) {
    let total = 0;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, f.name);
      total += f.isDirectory() ? dirSizeMB(fp) : fs.statSync(fp).size;
    }
    return total;
  }
  const mb = (dirSizeMB(appPath) / 1024 / 1024).toFixed(1);
  console.log(`Packaged app size: ${mb} MB  ->  ${appPath}`);
})().catch(err => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
