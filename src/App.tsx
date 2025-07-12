import React, { useState } from 'react';
import QueryInput from './components/QueryInput';
import ChartDisplay from './components/ChartDisplay';
import InsightPanel from './components/InsightPanel';
import ApiKeyInput from './components/ApiKeyInput';
import { analyzeDataDirect } from './services/directApi';
import './App.css';

interface AnalysisResult {
  chartType: string;
  insights: string[];
  explanation: string;
  recommendations: string[];
}

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [apiConfig, setApiConfig] = useState<{apiKey: string, model: string} | null>(() => {
    const savedKey = localStorage.getItem('doubao_api_key');
    const savedModel = localStorage.getItem('doubao_model');
    return savedKey && savedModel ? { apiKey: savedKey, model: savedModel } : null;
  });

  const handleApiConfig = (apiKey: string, model: string) => {
    setApiConfig({ apiKey, model });
  };

  const handleAnalyze = async (query: string, data: any[]) => {
    if (!apiConfig) return;
    
    setLoading(true);
    setResult(null);
    setOriginalData(data);
    try {
      const analysis = await analyzeDataDirect(query, data, apiConfig.apiKey, apiConfig.model);
      setResult(analysis);
    } catch (error) {
      console.error('分析失败:', error);
      alert('分析失败，请检查API配置或网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>InsightGraph</h1>
        <p>智能数据分析工具</p>
      </header>
      
      <main className="app-main">
        <ApiKeyInput onSave={handleApiConfig} />
        
        {apiConfig && (
          <QueryInput onAnalyze={handleAnalyze} loading={loading} />
        )}
        
        {result && (
          <div className="results">
            <ChartDisplay 
              chartType={result.chartType}
              data={originalData}
            />
            <InsightPanel 
              insights={result.insights}
              explanation={result.explanation}
              recommendations={result.recommendations}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;