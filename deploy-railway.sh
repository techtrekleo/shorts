#!/bin/bash

echo "🚂 開始 Railway 部署..."

# 檢查是否安裝了 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI 未安裝，正在安裝..."
    npm install -g @railway/cli
fi

# 檢查是否已登入 Railway
if ! railway whoami &> /dev/null; then
    echo "🔐 請先登入 Railway..."
    railway login
fi

# 構建應用
echo "🔨 構建應用..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 構建失敗！"
    exit 1
fi

echo "✅ 構建成功！"

# 部署到 Railway
echo "🚀 部署到 Railway..."
railway up

if [ $? -eq 0 ]; then
    echo "🎉 部署成功！"
    echo "🌐 打開應用..."
    railway open
else
    echo "❌ 部署失敗！"
    exit 1
fi
