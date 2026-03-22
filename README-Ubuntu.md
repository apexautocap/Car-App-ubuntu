# Car Rental App - Ubuntu Edition

A desktop car rental management application built with Electron, optimized for Ubuntu Linux.

## 🚀 Quick Install

```bash
# Build the installer
npm run electron:build

# Install on Ubuntu
./install-ubuntu.sh
```

## 📋 System Requirements

- **OS**: Ubuntu 18.04+ (or compatible Debian-based distro)
- **Architecture**: x64 (amd64)
- **Dependencies**: Automatically installed
  - libgtk-3-0, libnotify4, libnss3, libxss1, libxtst6, xdg-utils
  - libatspi2.0-0, libuuid1, libsecret-1-0

## 🛠️ Development

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Package for Linux
npm run electron:pack

# Build .deb installer
npm run electron:build
```

## 📦 Build Output

- **Packaged App**: `release/car-rental-app-linux-x64/`
- **Debian Package**: `release/car-rental-app_1.0.0_amd64.deb`
- **Size**: ~110 MB installer, ~365 MB installed

## 🔧 Installation Details

- **Install Location**: `/opt/car-rental-app/`
- **Binary Symlink**: `/usr/local/bin/car-rental-app`
- **Desktop Entry**: `/usr/share/applications/car-rental-app.desktop`
- **Icon**: `/usr/share/icons/hicolor/256x256/apps/car-rental-app.png`

## 🗑️ Uninstall

```bash
sudo apt remove car-rental-app
```

## 🐛 Troubleshooting

### Missing Dependencies
```bash
sudo apt update
sudo apt install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils
```

### Permission Issues
```bash
# Fix installation permissions
sudo apt-get install -f
```

### Manual Installation
```bash
sudo dpkg -i release/car-rental-app_1.0.0_amd64.deb
```

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js Express API (embedded)
- **Desktop**: Electron (Linux x64)
- **Packaging**: Custom dpkg-deb build system
- **Process**: Main app + detached server (`car-rental-logger`)

## 📝 Changes from Windows Version

- ✅ Linux Electron binary (x64)
- ✅ Debian package (.deb) instead of NSIS installer
- ✅ Linux file paths and permissions
- ✅ Ubuntu system integration (desktop entry, icons)
- ✅ dpkg-deb build system
- ✅ Linux-compatible server binary naming
- ✅ Removed Windows-specific dependencies

## 🎯 Features

- Car rental management interface
- Embedded backend server
- Offline-capable desktop app
- System tray integration
- Auto-start capabilities
- Professional Ubuntu integration