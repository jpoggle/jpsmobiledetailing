#!/bin/bash
# ================================================
# JP's Mobile Detailing — Fix Nginx (Run This!)
# Usage: bash fix-nginx.sh
# ================================================
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_ROOT="/var/www/jpsmobiledetailing"

echo "================================================"
echo " JP's Mobile Detailing — Nginx Fix"
echo "================================================"

# 1. Create web root and copy files
echo "[1/5] Copying site files to $WEB_ROOT ..."
sudo mkdir -p "$WEB_ROOT"
sudo cp -r "$PROJECT_DIR"/{index.html,services.html,about.html,contact.html,booking.html,sitemap.xml,robots.txt,css,js,assets} "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"
sudo chmod -R 755 "$WEB_ROOT"

# 2. Write nginx config
echo "[2/5] Writing nginx config..."
sudo tee /etc/nginx/sites-available/jpsmobiledetailing > /dev/null << 'NGINXCONF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name localhost jpsmobiledetailing.org www.jpsmobiledetailing.org;

    root /var/www/jpsmobiledetailing;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_types text/html text/css application/javascript application/json image/svg+xml application/xml;
    gzip_min_length 1024;

    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
NGINXCONF

# 3. Enable site, remove default
echo "[3/5] Enabling site..."
sudo ln -sf /etc/nginx/sites-available/jpsmobiledetailing /etc/nginx/sites-enabled/jpsmobiledetailing
sudo rm -f /etc/nginx/sites-enabled/default

# 4. Test config
echo "[4/5] Testing nginx config..."
sudo nginx -t

# 5. Reload
echo "[5/5] Reloading nginx..."
sudo systemctl reload nginx

echo ""
echo "✅ Done! Open your browser and go to:"
echo "   http://localhost"
echo ""
echo "IMPORTANT: After editing files in $PROJECT_DIR"
echo "run this to push changes to the web root:"
echo "   bash $PROJECT_DIR/deploy.sh"
