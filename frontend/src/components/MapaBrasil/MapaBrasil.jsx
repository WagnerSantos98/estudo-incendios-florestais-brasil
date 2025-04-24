import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMapaBrasil } from "../../hooks/useMapaBrasil";
import { chartOptions, getChartData } from "../../utils/chartConfig";
import "./MapaBrasil.css";
import "./EstatisticasCard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MapaBrasil = () => {
    const {
        regioes,
        currentData,
        chartData,
        loading,
        analiseDados,
        estadoSelecionado,
        regiaoSelecionada,
        estadosFiltrados,
        rankingEstados,
        handleRegiaoChange,
        handleEstadoChange,
        getNomeEstado,
        setEstadoSelecionado,
        setCurrentData,
        estatisticasGeral,
} = useMapaBrasil();

if (loading) return <div>Carregando...</div>;

return(
    <div className="mapa-wrapper">
      <div className="estatisticas-card">
        <div className="card-header">
          <h2>{getNomeEstado()}</h2>
          {estadoSelecionado && (
            <button
              onClick={() => {
                setEstadoSelecionado(null);
                setCurrentData(estatisticasGeral);
              }}
              className="estatisticas-gerais-btn"
            >
              Voltar para Estatísticas Gerais
            </button>
          )}
        </div>

        {/* Card Informações Gerais - [Média, Mediana e Moda] (Esquerdo Superior) */}
        <div className="card-content">
          <div className="info-section">
            <h3>Informações Gerais</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Média:</span>
                <span className="info-value">
                  {" "}
                  {currentData?.média?.toFixed(2) || "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Mediana:</span>
                <span className="info-value">
                  {" "}
                  {currentData?.mediana?.toFixed(2) || "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Moda:</span>
                <span className="info-value">
                  {" "}
                  {currentData?.moda?.toFixed(1) || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Card Análise dos Dados - [Visualização inicial, valores ausentes, tamanho do dataset e registros duplicados]  (Esquerdo) */}
          <div className="info-section">
            <h3>Análise dos Dados</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Visualização Inicial:</span>
                <table className="tabela-visualizacao-inicial">
                  <thead>
                    <tr>
                        <th>#</th>
                        <th>Ano<br /> <span>(year)</span></th>
                        <th>Estado<br /> <span>(state)</span></th>
                        <th>Mês<br /> <span>(month)</span></th>
                        <th>Número<br /> <span>(number)</span></th>
                        <th>Data<br /> <span>(date)</span></th>
                    </tr>  
                  </thead>
                  <tbody>
                    {analiseDados?.visualizacao_inicial?.map((linha, index) => (
                      <tr key={index}>
                        <td>{linha.id}</td>
                        <td>{linha.year}</td>
                        <td>{linha.state}</td>
                        <td>{linha.month}</td>
                        <td>{linha.number}</td>
                        <td>{linha.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="info-item">
                <span className="info-label">Valores ausentes por coluna:</span>
                <div className="info-value">
                  {analiseDados?.valores_ausentes ? (
                    <table className="tabela-valores-ausentes">
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        {Object.entries(analiseDados.valores_ausentes).map(
                          ([chave, valor]) => (
                            <tr key={chave}>
                              <td>{chave}</td>
                              <td>{valor}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
              <div className="info-item">
                <span className="info-label">
                  Tamanho do Dataset: (linhas, colunas)
                </span>
                <br></br>
                <span className="info-value">
                  {" "}
                  {analiseDados?.tamanho?.linhas || "N/A"},{" "}
                  {analiseDados?.tamanho?.colunas || "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Registros Duplicados:</span>
                <span className="info-value">
                  {" "}
                  {analiseDados?.duplicados !== undefined
                    ? analiseDados.duplicados
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Card Gráfio de Distribuição (Esquerdo Inferior) */}
          {chartData && (
            <div className="info-section grafico-section">
              <h3>Gráfico de Distribuição</h3>
              <div className="chart-container">
                <Bar options={chartOptions} data={getChartData(chartData)} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card de Seleção de Estado e Região (Direito Superior) */}
      <div className="mapa-container">
        <div className="estados-menu">
          <h3>Selecione um Estado</h3>
          <div className="select-container">
            <select
              value={regiaoSelecionada}
              onChange={handleRegiaoChange}
              className="select-regiao"
            >
              <option value="">Selecione uma região</option>
              {regioes.map((regiao) => (
                <option key={regiao.id} value={regiao.id}>
                  {regiao.nome}
                </option>
              ))}
            </select>

            <select
              value={estadoSelecionado || ""}
              onChange={handleEstadoChange}
              className="select-estado"
              disabled={!regiaoSelecionada}
            >
              <option value="">Selecione um estado</option>
              {estadosFiltrados.map((estado) => (
                <option key={estado.idA} value={estado.idA}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Card Ranking dos Estados (Direito Inferior) */}
      <div className="ranking-card">
        <h3>Ranking de Estados</h3>
        <div className="ranking-list">
          {rankingEstados.slice(0, 5).map((item, index) => (
            <div key={item.estado} className="ranking-item">
              <span className="ranking-position">{index + 1}º</span>
              <span className="ranking-estado">{item.estado}</span>
              <span className="ranking-total">
                {item.total.toLocaleString()} incêndios
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Fonte de Dados (Direito Inferior) */}
      <div className="fonte-dados-card">
        <h3>Fonte de Dados</h3>
        <div className="fonte-dados-content">
          <ul>
            <li>
              Fonte principal: <span>Kaggle</span>
            </li>
            <li>
              Dados referentes ao período de 10 anos: <span>1998 a 2017</span>
            </li>
            <li>
              Dados coletados através do:{" "}
              <span>Sistema Brasileiro de Informações Florestais</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapaBrasil;
