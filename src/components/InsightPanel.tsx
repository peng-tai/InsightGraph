import React from 'react';

interface InsightPanelProps {
  insights: string[];
  explanation: string;
  recommendations: string[];
}

const InsightPanel: React.FC<InsightPanelProps> = ({ insights, explanation, recommendations }) => {
  return (
    <div className="insight-panel">
      <div className="explanation-section">
        <h3>数据解释</h3>
        <p>{explanation}</p>
      </div>
      
      <div className="insights-section">
        <h3>关键洞察</h3>
        <ul>
          {insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
      
      <div className="recommendations-section">
        <h3>建议</h3>
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightPanel;