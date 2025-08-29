# 🚂 Railway 部署指南

## 📋 部署前準備

### 1. 安裝 Railway CLI
```bash
npm install -g @railway/cli
```

### 2. 登入 Railway
```bash
railway login
```

## 🚀 部署步驟

### 方法一：使用 Railway CLI

1. **初始化 Railway 項目**
```bash
railway init
```

2. **連接 GitHub Repository**
```bash
railway link
```

3. **部署到 Railway**
```bash
railway up
```

4. **查看部署狀態**
```bash
railway status
```

5. **打開應用**
```bash
railway open
```

### 方法二：使用 Railway Dashboard

1. 訪問 [Railway Dashboard](https://railway.app/dashboard)
2. 點擊 "New Project"
3. 選擇 "Deploy from GitHub repo"
4. 選擇您的 `shorts` repository
5. 點擊 "Deploy Now"

## ⚙️ 環境變數配置

在 Railway Dashboard 中設置以下環境變數：

```bash
NODE_ENV=production
PORT=3000
```

## 🔧 自定義域名

1. 在 Railway Dashboard 中選擇您的項目
2. 點擊 "Settings" 標籤
3. 在 "Domains" 部分添加自定義域名
4. 配置 DNS 記錄指向 Railway 提供的 CNAME

## 📊 監控和日誌

### 查看日誌
```bash
railway logs
```

### 查看實時日誌
```bash
railway logs --follow
```

### 查看應用狀態
```bash
railway status
```

## 🚨 故障排除

### 常見問題

1. **構建失敗**
   - 檢查 `package.json` 中的依賴
   - 確認 Node.js 版本兼容性
   - 查看構建日誌

2. **應用無法啟動**
   - 檢查端口配置
   - 確認環境變數設置
   - 查看啟動日誌

3. **依賴安裝失敗**
   - 檢查 `package-lock.json`
   - 確認 npm 版本
   - 清除 npm 緩存

### 重啟應用
```bash
railway restart
```

### 重新部署
```bash
railway up
```

## 💰 成本優化

1. **使用免費計劃**
   - Railway 提供免費的部署選項
   - 每月有一定數量的免費使用時間

2. **自動休眠**
   - 配置應用在不使用時自動休眠
   - 節省計算資源

3. **資源限制**
   - 設置合理的 CPU 和內存限制
   - 避免不必要的資源浪費

## 🔄 持續部署

### 自動部署設置

1. 在 Railway Dashboard 中啟用自動部署
2. 每次推送到 `main` 分支時自動部署
3. 可設置部署分支和觸發條件

### 部署通知

- 配置 Slack 或 Discord 通知
- 部署成功/失敗時發送通知
- 監控部署狀態

## 📱 移動端優化

確保您的 Shorts 製作中心在移動設備上運行良好：

1. 響應式設計
2. 觸控友好的界面
3. 移動端文件上傳優化
4. 性能優化

## 🎯 部署檢查清單

- [ ] 所有依賴已安裝
- [ ] 環境變數已配置
- [ ] 構建腳本正常運行
- [ ] 健康檢查通過
- [ ] 自定義域名已配置
- [ ] SSL 證書已啟用
- [ ] 監控和日誌已設置
- [ ] 備份策略已制定

## 📞 支援

如果遇到部署問題：

1. 查看 Railway 文檔
2. 檢查 Railway 狀態頁面
3. 聯繫 Railway 支援
4. 查看 GitHub Issues

---

**祝您部署順利！** 🎉
