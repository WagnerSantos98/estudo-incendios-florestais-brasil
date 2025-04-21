import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const EstatisticasEstado = ({ estado }) => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    // Aqui você deve fazer a chamada para a API para obter os dados do estado
    // Por enquanto, vou usar dados mockados
    const dadosMockados = {
      media: 1500,
      mediana: 1200,
      moda: 1000,
      distribuicao: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        valores: [1000, 1200, 1500, 1800, 2000, 1500]
      }
    };
    setDados(dadosMockados);
  }, [estado]);

  if (!dados) return null;

  const data = {
    labels: dados.distribuicao.labels,
    datasets: [
      {
        label: 'Número de Incêndios',
        data: dados.distribuicao.valores,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição de Incêndios por Ano',
      },
    },
  };

  return (
    <div className="estatisticas-card">
      <h2>Estatísticas de Incêndios - {estado.nome}</h2>
      <div className="estatisticas-numeros">
        <div className="estatistica">
          <h3>Média</h3>
          <p>{dados.media}</p>
        </div>
        <div className="estatistica">
          <h3>Mediana</h3>
          <p>{dados.mediana}</p>
        </div>
        <div className="estatistica">
          <h3>Moda</h3>
          <p>{dados.moda}</p>
        </div>
      </div>
      <div className="grafico">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EstatisticasEstado; 