import React, { useState } from 'react';

interface QueryInputProps {
  onAnalyze: (query: string, data: any[]) => void;
  loading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onAnalyze, loading }) => {
  const [query, setQuery] = useState('显示销售趋势图');
  const [csvData, setCsvData] = useState(`月份,销售额
1月,12000
2月,15000
3月,18000
4月,14000
5月,20000
6月,22000`);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCsvData(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !csvData.trim()) return;

    // 简单CSV解析
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || '';
        return obj;
      }, {} as any);
    });

    onAnalyze(query, data);
  };

  return (
    <form onSubmit={handleSubmit} className="query-form">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div className="loading-text">AI正在分析数据...</div>
        </div>
      )}
      
      <div className="form-group">
        <label>自然语言查询:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例如: 显示销售趋势图"
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label>数据 (CSV格式):</label>
        <div className="file-upload-section">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={loading}
            className="file-input"
          />
          <span className="file-hint">或直接粘贴CSV数据</span>
        </div>
        <textarea
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          placeholder="月份,销售额&#10;1月,1000&#10;2月,1200"
          rows={6}
          disabled={loading}
        />
      </div>
      
      <button type="submit" disabled={loading || !query.trim() || !csvData.trim()}>
        {loading ? '分析中...' : '开始分析'}
      </button>
    </form>
  );
};

export default QueryInput;