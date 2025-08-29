# 使用 Node.js 18 作為基礎鏡像
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 安裝 serve 來提供靜態文件
RUN npm install -g serve

# 暴露端口
EXPOSE 3000

# 啟動命令
CMD ["serve", "-s", "build", "-l", "3000"]
