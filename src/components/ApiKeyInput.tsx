import React, { useState } from 'react';

interface ApiKeyInputProps {
  onSave: (apiKey: string, model: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('doubao_api_key') || '');
  const [model, setModel] = useState(localStorage.getItem('doubao_model') || 'ep-xxx');
  const [showConfig, setShowConfig] = useState(!apiKey);

  const handleSave = () => {
    if (apiKey.trim() && model.trim()) {
      localStorage.setItem('doubao_api_key', apiKey);
      localStorage.setItem('doubao_model', model);
      onSave(apiKey, model);
      setShowConfig(false);
    }
  };

  if (!showConfig && apiKey) {
    return (
      <div className="api-config-bar">
        <span>API已配置</span>
        <button onClick={() => setShowConfig(true)}>重新配置</button>
      </div>
    );
  }

  return (
    <div className="api-config">
      <h3>配置豆包API</h3>
      <div className="form-group">
        <label>API Key:</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="输入你的豆包API Key"
        />
      </div>
      <div className="form-group">
        <label>模型名称:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="ep-xxx"
        />
      </div>
      <button onClick={handleSave} disabled={!apiKey.trim() || !model.trim()}>
        保存配置
      </button>
    </div>
  );
};

export default ApiKeyInput;