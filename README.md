# InsightGraph

智能数据分析和可视化工具 - 通过自然语言生成图表并自动解释数据含义

## 技术栈

- **前端**: React + TypeScript + Vite
- **后端**: Node.js + Express
- **AI**: 火山引擎豆包API
- **图表**: Chart.js + react-chartjs-2

## 功能特性

- 🗣️ 自然语言查询数据
- 📊 智能生成图表
- 🧠 自动数据洞察分析
- 💡 智能建议生成

## 快速开始

1. 安装依赖:
```bash
npm install
```

2. 配置环境变量:
```bash
cp .env.example .env
# 编辑 .env 文件，添加你的豆包 API Key
```

3. 启动后端服务:
```bash
npm run server
```

4. 启动前端开发服务器:
```bash
npm run dev
```

5. 访问 http://localhost:3000

## 使用方法

1. 在查询框中输入自然语言描述，如"显示销售趋势"
2. 在数据框中粘贴CSV格式的数据
3. 点击"开始分析"按钮
4. 查看生成的图表和智能分析结果