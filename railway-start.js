const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 提供靜態文件
app.use(express.static(path.join(__dirname, 'build')));

// 健康檢查端點
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 所有其他請求都返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚂 Shorts 製作中心已啟動在端口 ${PORT}`);
  console.log(`🌐 環境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ 啟動時間: ${new Date().toISOString()}`);
});

// 優雅關閉
process.on('SIGTERM', () => {
  console.log('🛑 收到 SIGTERM 信號，正在關閉服務器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 收到 SIGINT 信號，正在關閉服務器...');
  process.exit(0);
});
