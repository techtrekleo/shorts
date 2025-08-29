#!/bin/bash

echo "🚀 啟動 Shorts 製作中心..."

# 檢查 Node.js 版本
echo "📋 檢查 Node.js 版本..."
node --version
npm --version

# 安裝依賴
echo "📦 安裝依賴..."
npm install

# 啟動開發服務器
echo "🔥 啟動開發服務器..."
npm start
