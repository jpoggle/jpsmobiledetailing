#!/bin/bash
# ============================================================
# JP's Mobile Detailing — Deploy / Sync to Nginx Web Root
# Run this after ANY file change to push it live.
# Usage: bash deploy.sh
#
# One-time setup (run once in terminal):
#   sudo chown -R parallels:parallels /var/www/jpsmobiledetailing
# After that, this script needs no sudo, ever.
# ============================================================
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_ROOT="/var/www/jpsmobiledetailing"

# Check web root is accessible without sudo
if [ ! -w "$WEB_ROOT" ]; then
  echo "❌ Cannot write to $WEB_ROOT"
  echo ""
  echo "Run this once to fix it:"
  echo "  sudo chown -R parallels:parallels $WEB_ROOT"
  exit 1
fi

echo "📦 Syncing to $WEB_ROOT ..."

cp -r "$PROJECT_DIR/css"         "$WEB_ROOT/"
cp -r "$PROJECT_DIR/js"          "$WEB_ROOT/"
cp -r "$PROJECT_DIR/assets"      "$WEB_ROOT/"
cp    "$PROJECT_DIR/index.html"   "$WEB_ROOT/"
cp    "$PROJECT_DIR/services.html" "$WEB_ROOT/"
cp    "$PROJECT_DIR/gallery.html" "$WEB_ROOT/"
cp    "$PROJECT_DIR/about.html"   "$WEB_ROOT/"
cp    "$PROJECT_DIR/contact.html" "$WEB_ROOT/"
cp    "$PROJECT_DIR/sitemap.xml"  "$WEB_ROOT/"
cp    "$PROJECT_DIR/robots.txt"   "$WEB_ROOT/"

echo ""
echo "✅ Done! Your site is live at http://localhost"
echo ""
echo "Pages deployed:"
echo "  • Home        → http://localhost/"
echo "  • Services    → http://localhost/services.html"
echo "  • Gallery     → http://localhost/gallery.html"
echo "  • About       → http://localhost/about.html"
echo "  • Contact     → http://localhost/contact.html"
