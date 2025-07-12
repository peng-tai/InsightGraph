import axios from 'axios';

// 直接在前端调用豆包API
export const analyzeDataDirect = async (query: string, data: any[], apiKey: string, model: string) => {
  try {
    const prompt = `分析以下数据查询请求，返回JSON格式结果：

用户查询: ${query}
数据: ${JSON.stringify(data)}

返回JSON包含：
- chartType: 图表类型 (line, bar, pie, scatter, area, radar, doughnut, polarArea)
- insights: 数据洞察数组
- explanation: 详细解释
- recommendations: 建议`;

    const response = await axios.post('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      model: model,
      messages: [
        { role: 'system', content: '你是专业的数据分析师，请分析用户的数据查询请求，并返回JSON格式的分析结果。' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    const result = response.data.choices[0].message.content;
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      return {
        chartType: 'line',
        insights: ['数据分析结果解析失败'],
        explanation: '无法解析AI返回的结果，请检查API配置',
        recommendations: ['请检查API Key和模型配置是否正确']
      };
    }
  } catch (error) {
    console.error('API调用失败:', error);
    throw error;
  }
};