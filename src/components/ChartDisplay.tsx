import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler, RadialLinearScale } from 'chart.js';
import { Line, Bar, Pie, Scatter, Radar, PolarArea, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler, RadialLinearScale);

interface ChartDisplayProps {
  chartType: string;
  data: any[];
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ chartType, data }) => {
  // 生成不同类型的图表数据
  const generateChartData = () => {
    const labels = data.map(item => Object.values(item)[0] as string);
    const values = data.map(item => {
      const value = Object.values(item)[1] as string;
      return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
    });

    const baseConfig = {
      label: Object.keys(data[0] || {})[1] || '数据',
      data: values,
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2
    };

    const colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 205, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)'
    ];

    switch (chartType) {
      case 'area':
        return {
          labels,
          datasets: [{
            ...baseConfig,
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            fill: true
          }]
        };
      case 'scatter':
        return {
          datasets: [{
            label: baseConfig.label,
            data: data.map((item, index) => ({
              x: index,
              y: parseFloat(Object.values(item)[1] as string) || 0
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: baseConfig.borderColor
          }]
        };
      case 'pie':
      case 'doughnut':
        return {
          labels,
          datasets: [{
            ...baseConfig,
            backgroundColor: colors
          }]
        };
      case 'radar':
        return {
          labels,
          datasets: [{
            ...baseConfig,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)'
          }]
        };
      case 'polarArea':
        return {
          labels,
          datasets: [{
            ...baseConfig,
            backgroundColor: colors
          }]
        };
      case 'bubble':
        return {
          datasets: [{
            label: baseConfig.label,
            data: data.map((item, index) => ({
              x: index,
              y: parseFloat(Object.values(item)[1] as string) || 0,
              r: Math.abs(parseFloat(Object.values(item)[1] as string)) / 100 || 5
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: baseConfig.borderColor
          }]
        };
      default:
        return {
          labels,
          datasets: [{
            ...baseConfig,
            backgroundColor: 'rgba(54, 162, 235, 0.2)'
          }]
        };
    }
  };

  const chartData: any = generateChartData();

  const options: any = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: '数据可视化' }
    }
  };

  const renderChart = () => {
    if (!data || data.length === 0) {
      return <div>暂无数据</div>;
    }
    
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'area':
        return <Line data={chartData} options={options} />;
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      case 'radar':
        return <Radar data={chartData} options={options} />;
      case 'polarArea':
        return <PolarArea data={chartData} options={options} />;
      case 'scatter':
      case 'bubble':
        return <Scatter data={chartData} options={options} />;
      case 'funnel':
      case 'mosaic':
      case 'sankey':
        return <div className="chart-placeholder">
          <p>{chartType}暂不支持</p>
          <p>将使用柱状图代替显示</p>
          <Bar data={chartData} options={options} />
        </div>;
      default:
        return <Line data={chartData} options={options} />;
    }
  };

  return (
    <div className="chart-container">
      {renderChart()}
    </div>
  );
};

export default ChartDisplay;