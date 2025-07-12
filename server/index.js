import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 调用豆包API
async function callDoubaoAPI(message) {
  try {
    const response = await axios.post('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      model: process.env.DOUBAO_MODEL,
      messages: [
        { role: 'system', content: '你是专业的数据分析师，请分析用户的数据查询请求，并返回JSON格式的分析结果。' },
        { role: 'user', content: message }
      ],
      max_tokens: 1000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DOUBAO_API_KEY}`
      }
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('豆包API调用失败:', error.response?.data || error.message);
    throw error;
  }
}

// API路由
app.post('/api/analyze', async (req, res) => {
  try {
    const { query, data } = req.body;
    
    const prompt = `分析以下数据查询请求，返回JSON格式结果：

用户查询: ${query}
数据: ${JSON.stringify(data)}

返回JSON包含：
- chartType: 图表类型 (line, bar, pie, scatter)
- insights: 数据洞察数组
- explanation: 详细解释
- recommendations: 建议`;
    
    const result = await callDoubaoAPI(prompt);
    const analysis = JSON.parse(result);
    
    res.json(analysis);
  } catch (error) {
    console.error('分析错误:', error);
    res.status(500).json({ error: '分析失败' });
  }
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});