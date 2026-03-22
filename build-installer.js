/**
 * build-installer.js — builds a Debian (.deb) package for Ubuntu
 * using dpkg-deb (available by default on Ubuntu/Debian systems).
 *
 * Prerequisites: dpkg-deb (sudo apt install dpkg)
 */
const { spawnSync, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const APP_NAME = 'car-rental-app';
const APP_VERSION = '1.0.0';
const APP_DISPLAY = 'Car Rental App';
const ARCH = 'amd64';
const APP_FOLDER = path.join(__dirname, 'release', 'car-rental-app-linux-x64');
const DEB_ROOT = path.join(__dirname, 'release', 'deb-staging');
const OUT_DEB = path.join(__dirname, 'release', `${APP_NAME}_${APP_VERSION}_${ARCH}.deb`);
const INSTALL_DIR = `/opt/${APP_NAME}`;

if (!fs.existsSync(APP_FOLDER)) {
  console.error('App folder not found:', APP_FOLDER);
  console.error('Run "npm run electron:build" first.');
  process.exit(1);
}

// Check dpkg-deb is available
const check = spawnSync('which', ['dpkg-deb']);
if (check.status !== 0) {
  console.error('dpkg-deb not found. Install it with: sudo apt install dpkg');
  process.exit(1);
}

// ── Clean staging dir ────────────────────────────────────────────────────────
if (fs.existsSync(DEB_ROOT)) fs.rmSync(DEB_ROOT, { recursive: true, force: true });

const installDest = path.join(DEB_ROOT, INSTALL_DIR.slice(1)); // strip leading /
const debianDir = path.join(DEB_ROOT, 'DEBIAN');
const applicationsDir = path.join(DEB_ROOT, 'usr', 'share', 'applications');
const iconsDir = path.join(DEB_ROOT, 'usr', 'share', 'icons', 'hicolor', '256x256', 'apps');
const binDir = path.join(DEB_ROOT, 'usr', 'local', 'bin');

for (const d of [installDest, debianDir, applicationsDir, iconsDir, binDir]) {
  fs.mkdirSync(d, { recursive: true });
}

// ── Copy packaged app ────────────────────────────────────────────────────────
console.log('Copying app files...');
execSync(`cp -r "${APP_FOLDER}/." "${installDest}"`, { stdio: 'inherit' });

// Make the main binary executable
const mainBin = path.join(installDest, APP_NAME);
if (fs.existsSync(mainBin)) fs.chmodSync(mainBin, 0o755);

// ── Copy icon ────────────────────────────────────────────────────────────────
const iconSrc = path.join(__dirname, 'public', 'favicon.png');
if (fs.existsSync(iconSrc)) {
  fs.copyFileSync(iconSrc, path.join(iconsDir, `${APP_NAME}.png`));
}

// ── Symlink in /usr/local/bin ────────────────────────────────────────────────
const symlinkPath = path.join(binDir, APP_NAME);
fs.writeFileSync(symlinkPath, `#!/bin/sh\nexec "${INSTALL_DIR}/${APP_NAME}" "$@"\n`);
fs.chmodSync(symlinkPath, 0o755);

// ── .desktop entry ───────────────────────────────────────────────────────────
fs.writeFileSync(path.join(applicationsDir, `${APP_NAME}.desktop`), `[Desktop Entry]
Version=1.0
Type=Application
Name=${APP_DISPLAY}
Comment=Car Rental Application
Exec=${INSTALL_DIR}/${APP_NAME} --no-sandbox
Icon=${APP_NAME}
Terminal=false
Categories=Utility;
`);

// ── DEBIAN/control ───────────────────────────────────────────────────────────
fs.writeFileSync(path.join(debianDir, 'control'), `Package: ${APP_NAME}
Version: ${APP_VERSION}
Section: utils
Priority: optional
Architecture: ${ARCH}
Depends: libgtk-3-0, libnotify4, libnss3, libxss1, libxtst6, xdg-utils, libatspi2.0-0, libuuid1, libsecret-1-0
Maintainer: Car Rental App <support@carrental.app>
Description: Car Rental Application
 A desktop car rental management application built with Electron.
`);

// ── DEBIAN/postinst ──────────────────────────────────────────────────────────
const postinst = path.join(debianDir, 'postinst');
fs.writeFileSync(postinst, `#!/bin/sh
set -e
update-desktop-database /usr/share/applications || true
gtk-update-icon-cache /usr/share/icons/hicolor || true
`);
fs.chmodSync(postinst, 0o755);

// ── DEBIAN/prerm ─────────────────────────────────────────────────────────────
const prerm = path.join(debianDir, 'prerm');
fs.writeFileSync(prerm, `#!/bin/sh
set -e
pkill -f "${APP_NAME}" || true
`);
fs.chmodSync(prerm, 0o755);

// ── Build .deb ───────────────────────────────────────────────────────────────
console.log('Building .deb package...');
const result = spawnSync('dpkg-deb', ['--build', '--root-owner-group', DEB_ROOT, OUT_DEB], {
  stdio: 'inherit'
});

if (result.status !== 0) {
  console.error('dpkg-deb build failed');
  process.exit(1);
}

if (fs.existsSync(OUT_DEB)) {
  const sizeMB = (fs.statSync(OUT_DEB).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅ Installer ready: ${OUT_DEB}`);
  console.log(`   Size: ${sizeMB} MB`);
} else {
  console.error('❌ .deb file not found after build.');
  process.exit(1);
}
