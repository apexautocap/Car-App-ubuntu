#!/bin/bash
# Ubuntu Installation Script for Car Rental App

set -e

DEB_FILE="release/car-rental-app_1.0.0_amd64.deb"
APP_NAME="car-rental-app"

echo "🚗 Car Rental App - Ubuntu Installer"
echo "======================================"

# Check if .deb file exists
if [ ! -f "$DEB_FILE" ]; then
    echo "❌ Error: $DEB_FILE not found"
    echo "   Run 'npm run electron:build' first to create the installer"
    exit 1
fi

echo "📦 Installing Car Rental App..."

# Install the .deb package
if sudo dpkg -i "$DEB_FILE"; then
    echo "✅ Installation completed successfully!"
    echo ""
    echo "🎉 Car Rental App is now installed!"
    echo ""
    echo "You can:"
    echo "  • Launch from Applications menu"
    echo "  • Run from terminal: $APP_NAME"
    echo "  • Create desktop shortcut from the app menu"
    echo ""
    echo "📍 Installed to: /opt/$APP_NAME"
    echo "🗑️  To uninstall: sudo apt remove $APP_NAME"
else
    echo "❌ Installation failed. Trying to fix dependencies..."
    sudo apt-get install -f
    echo "🔄 Retrying installation..."
    if sudo dpkg -i "$DEB_FILE"; then
        echo "✅ Installation completed successfully!"
    else
        echo "❌ Installation failed. Please check the error messages above."
        exit 1
    fi
fi