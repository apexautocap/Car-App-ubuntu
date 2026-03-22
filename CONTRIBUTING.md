# Contributing to Car Rental App - Ubuntu Edition

Thank you for your interest in contributing to the Car Rental App! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Ubuntu 18.04+ (or compatible Linux distribution)
- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and Electron

### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/Car-App-ubuntu.git
cd Car-App-ubuntu

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow the existing code style
- Write clear, descriptive commit messages
- Test your changes thoroughly

### 3. Test Your Changes
```bash
# Run tests
npm test

# Build and test the app
npm run electron:pack

# Test the full installer
npm run electron:build
```

### 4. Submit a Pull Request
- Push your branch to your fork
- Create a pull request with a clear description
- Reference any related issues

## 📝 Code Style Guidelines

### TypeScript/React
- Use TypeScript for all new code
- Follow React functional component patterns
- Use proper TypeScript types (avoid `any`)
- Implement proper error handling

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages/routes
├── services/      # API and business logic
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── data/          # Static data and types
```

### Naming Conventions
- **Components**: PascalCase (`CarCard.tsx`)
- **Files**: kebab-case (`car-service.ts`)
- **Variables**: camelCase (`carData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# E2E tests (if available)
npm run test:e2e

# Lint code
npm run lint
```

### Writing Tests
- Write unit tests for utility functions
- Test React components with React Testing Library
- Include integration tests for critical user flows

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: Ubuntu version, Node.js version
2. **Steps to reproduce**: Clear, numbered steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console logs**: Any error messages

## ✨ Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the problem** the feature would solve
3. **Propose a solution** with implementation details
4. **Consider alternatives** and their trade-offs

## 🏗️ Build System

### Understanding the Build Process
1. **Frontend Build**: Vite builds React app to `dist/`
2. **Electron Packaging**: `pack.js` creates Linux x64 package
3. **Debian Package**: `build-installer.js` creates `.deb` installer

### Build Scripts
- `npm run build` - Build frontend only
- `npm run electron:pack` - Package Electron app
- `npm run electron:build` - Full build with .deb installer

## 📦 Release Process

### Version Bumping
1. Update version in `package.json`
2. Update version in `build-installer.js`
3. Create git tag: `git tag v1.0.1`

### Creating Releases
1. Build the installer: `npm run electron:build`
2. Test installation on clean Ubuntu system
3. Create GitHub release with `.deb` file attached

## 🔧 Ubuntu-Specific Considerations

### System Integration
- Desktop entries must follow freedesktop.org standards
- Icons should support multiple resolutions
- Dependencies must be available in Ubuntu repositories

### Packaging
- Follow Debian packaging guidelines
- Test on multiple Ubuntu versions (18.04, 20.04, 22.04+)
- Ensure proper file permissions and ownership

## 📚 Resources

- [Electron Documentation](https://electronjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Ubuntu Packaging Guide](https://packaging.ubuntu.com/)
- [Debian Policy Manual](https://www.debian.org/doc/debian-policy/)

## 🤝 Community

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Use GitHub Issues for bugs and feature requests
- **Code of Conduct**: Be respectful and inclusive

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Car Rental App! 🚗✨