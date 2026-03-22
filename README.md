# 🚗 Car Rental App - Ubuntu Edition

A modern desktop car rental management application built with **Electron**, **React**, and **TypeScript**, specifically optimized for Ubuntu Linux systems.

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

- 🖥️ **Native Ubuntu Desktop App** - Full system integration with .deb installer
- 🚗 **Car Rental Management** - Browse, filter, and book rental cars
- 🔄 **Real-time Updates** - Live booking status and availability
- 📧 **Email Integration** - Automated booking confirmations
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI components
- 🔒 **Offline Capable** - Works without internet connection
- ⚡ **Fast Performance** - Optimized Electron build with embedded Node.js server

## 🚀 Quick Start

### Prerequisites
- **Ubuntu 18.04+** (or compatible Debian-based distribution)
- **Node.js 18+** and **npm** (for development)

### Installation

#### Option 1: Download Release (Recommended)
1. Go to [Releases](https://github.com/BuildWithLogic/Car-App-ubuntu/releases)
2. Download `car-rental-app_1.0.0_amd64.deb`
3. Install: `sudo apt install ./car-rental-app_1.0.0_amd64.deb`

#### Option 2: Build from Source
```bash
# Clone the repository
git clone https://github.com/BuildWithLogic/Car-App-ubuntu.git
cd Car-App-ubuntu

# Install dependencies
npm install

# Build the .deb installer
npm run electron:build

# Install the built package
./install-ubuntu.sh
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Package for Linux (without installer)
npm run electron:pack

# Build complete .deb installer
npm run electron:build

# Run tests
npm test

# Lint code
npm run lint
```

## 📦 Build System

The project uses a custom build pipeline optimized for Ubuntu:

- **Frontend**: Vite + React + TypeScript
- **Backend**: Express.js API (embedded)
- **Packaging**: Custom `@electron/packager` + `dpkg-deb`
- **Installer**: Debian package (.deb) with proper system integration

### Build Output
- **Packaged App**: `release/car-rental-app-linux-x64/`
- **Debian Package**: `release/car-rental-app_1.0.0_amd64.deb`
- **Size**: ~110 MB installer, ~365 MB installed

## 🏗️ Project Structure

```
Car-App-ubuntu/
├── src/                    # React frontend source
│   ├── components/         # UI components
│   ├── pages/             # Application pages
│   ├── services/          # API services
│   └── data/              # Static data
├── electron/              # Electron main process
├── server/                # Node.js backend API
├── public/                # Static assets
├── release/               # Build output (gitignored)
├── pack.js                # Linux packaging script
├── build-installer.js     # .deb builder
└── install-ubuntu.sh      # Installation script
```

## 🔧 System Integration

The app integrates seamlessly with Ubuntu:

- **Installation Path**: `/opt/car-rental-app/`
- **Desktop Entry**: Applications menu integration
- **Command Line**: `car-rental-app` command
- **Icon**: System icon theme integration
- **Dependencies**: Automatic dependency resolution

## 📋 System Requirements

- **OS**: Ubuntu 18.04+ (amd64)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Dependencies**: Automatically installed
  - libgtk-3-0, libnotify4, libnss3, libxss1, libxtst6
  - xdg-utils, libatspi2.0-0, libuuid1, libsecret-1-0

## 🚀 Usage

### Launch the App
- **GUI**: Search "Car Rental App" in Activities
- **Terminal**: `car-rental-app`
- **Direct**: `/opt/car-rental-app/car-rental-app`

### Uninstall
```bash
sudo apt remove car-rental-app
```

## 🔄 Migration from Windows

This is the Ubuntu-optimized version of the original Windows Car Rental App. Key changes:

- ✅ Linux Electron binary (x64)
- ✅ Debian package (.deb) installer
- ✅ Ubuntu system integration
- ✅ Linux file paths and permissions
- ✅ Removed Windows-specific dependencies
- ✅ dpkg-deb build system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/BuildWithLogic/Car-App-ubuntu/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/BuildWithLogic/Car-App-ubuntu/discussions)

## 🙏 Acknowledgments

- Built with [Electron](https://electronjs.org/)
- UI components from [Radix UI](https://radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Made with ❤️ for the Ubuntu community**