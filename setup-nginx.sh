#!/bin/bash
# ================================================
# JP's Mobile Detailing — Nginx Local Setup Script
# Run: bash setup-nginx.sh
# ================================================

set -e

SITE_NAME="jpsmobiledetailing"
SITES_AVAILABLE="/etc/nginx/sites-available"
SITES_ENABLED="/etc/nginx/sites-enabled"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "================================================"
echo " JP's Mobile Detailing — Nginx Setup"
echo "================================================"
echo "Project directory: $PROJECT_DIR"
echo ""

# Copy config
echo "[1/4] Installing nginx config..."
sudo cp "$PROJECT_DIR/nginx.conf" "$SITES_AVAILABLE/$SITE_NAME"

# Update the root path in the installed config
sudo sed -i "s|root /home/parallels/jpsmobiledetailing;|root $PROJECT_DIR;|g" \
    "$SITES_AVAILABLE/$SITE_NAME"

# Enable site
echo "[2/4] Enabling site..."
sudo ln -sf "$SITES_AVAILABLE/$SITE_NAME" "$SITES_ENABLED/$SITE_NAME"

# Remove default site if it exists (it conflicts on port 80)
if [ -f "$SITES_ENABLED/default" ]; then
    echo "[3/4] Removing default nginx site to free port 80..."
    sudo rm -f "$SITES_ENABLED/default"
else
    echo "[3/4] No default site to remove."
fi

# Test and reload nginx
echo "[4/4] Testing nginx config and reloading..."
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "✅ Done! Your site is live at:"
echo "   http://localhost"
echo ""
echo "To stop the site later, run:"
echo "   sudo rm /etc/nginx/sites-enabled/$SITE_NAME && sudo systemctl reload nginx"
