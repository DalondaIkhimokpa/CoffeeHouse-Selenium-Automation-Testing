#!/bin/bash

mkdir -p logs screenshots

echo "🔍 Running Selenium tests..."
npm test | tee logs/selenium-core.log

echo "📦 Moving screenshots to screenshots/ folder..."
mv -f *.png screenshots/

echo "🖼️ Running visual regression check..."
node visual-regression.js

