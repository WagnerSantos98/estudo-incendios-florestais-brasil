from flask import Blueprint, jsonify, request
import pandas as pd
import numpy as np

# Criar o Blueprint
main = Blueprint('main', __name__)

# Carregar o dataset
df = pd.read_csv('data/amazon.csv', encoding='latin1')


# Converter colunas para os tipos corretos
df['date'] = pd.to_datetime(df['date'], errors='coerce').dt.strftime('%d/%m/%Y')
df['number'] = pd.to_numeric(df['number'], errors='coerce')

# Mapeamento de siglas para nomes completos
estados_map = {
    'AC': 'Acre', 'ac': 'Acre',
    'AL': 'Alagoas', 'al': 'Alagoas',
    'AP': 'Amapa', 'ap': 'Amapa',
    'AM': 'Amazonas', 'am': 'Amazonas',
    'BA': 'Bahia', 'ba': 'Bahia',
    'CE': 'Ceara', 'ce': 'Ceara',
    'DF': 'Distrito Federal', 'df': 'Distrito Federal',
    'ES': 'Espirito Santo', 'es': 'Espirito Santo',
    'GO': 'Goias', 'go': 'Goias',
    'MA': 'Maranhao', 'ma': 'Maranhao',
    'MT': 'Mato Grosso', 'mt': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul', 'ms': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais', 'mg': 'Minas Gerais',
    'PA': 'Pará', 'pa': 'Pará',
    'PB': 'Paraiba', 'pb': 'Paraiba',
    'PR': 'Paraná', 'pr': 'Paraná',
    'PE': 'Pernambuco', 'pe': 'Pernambuco',
    'PI': 'Piau', 'pi': 'Piau',
    'RJ': 'Rio', 'rj': 'Rio',
    'RN': 'Rio Grande do Norte', 'rn': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul', 'rs': 'Rio Grande do Sul',
    'RO': 'Rondonia', 'ro': 'Rondonia',
    'RR': 'Roraima', 'rr': 'Roraima',
    'SC': 'Santa Catarina', 'sc': 'Santa Catarina',
    'SP': 'Sao Paulo', 'sp': 'Sao Paulo',
    'SE': 'Sergipe', 'se': 'Sergipe',
    'TO': 'Tocantins', 'to': 'Tocantins'
}
@main.route('/api/test', methods=['GET'])
def test():
    return "API funcionando!"

@main.route('/')
def home():
    return "API funcionando!"

@main.route('/estatisticas/geral', methods=['GET'])
def get_estatisticas_geral():
    try:
        # Calcular estatísticas gerais
        estatisticas = {
            'média': float(df['number'].mean()),
            'mediana': float(df['number'].median()),
            'moda': float(df['number'].mode().iloc[0] if not df['number'].mode().empty else 0)
        }
        return jsonify(estatisticas)
    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@main.route('/estatisticas/estado/<estado>', methods=['GET'])
def get_estatisticas_estado(estado):
    try:
        # Verificar se é uma sigla e converter para nome completo
        if estado in estados_map:
            estado = estados_map[estado]
        
        # Filtrar dados do estado
        df_estado = df[df['state'] == estado]
        
        if df_estado.empty:
            return jsonify({'error': 'Estado não encontrado'}), 404
        
        # Calcular estatísticas do estado
        estatisticas = {
            'nome': estado,
            'média': float(df_estado['number'].mean()),
            'mediana': float(df_estado['number'].median()),
            'moda': float(df_estado['number'].mode().iloc[0] if not df_estado['number'].mode().empty else 0)
        }
        return jsonify(estatisticas)
    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@main.route('/estatisticas/grafico', methods=['GET'])
def get_dados_grafico():
    try:
        # Agrupar por ano e somar os incêndios
        incendios_por_ano = df.groupby('year')['number'].sum()
        return jsonify(incendios_por_ano.to_dict())
    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@main.route('/analise/descricao', methods=['GET'])
def get_analise_dados():
    try:
        df_visualizacao = df.head().copy()
        df_visualizacao.reset_index(drop=True, inplace=True)
        # Análise descritiva dos dados
        analise = {
            'tamanho': {
                'linhas': len(df),
                'colunas': len(df.columns)
            },
            'valores_ausentes': df.isnull().sum().to_dict(),
            'duplicados': int(df.duplicated().sum()),
            'visualizacao_inicial': df_visualizacao.to_dict(orient='records')
        }
        return jsonify(analise)
    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@main.route('/ranking/estados', methods=['GET'])
def ranking_estados():
    try:
        total_por_estado = df.groupby('state')['number'].sum().sort_values(ascending=False)
        return jsonify(total_por_estado.to_dict())
    except Exception as e:
        return jsonify({'erro': str(e)}), 400