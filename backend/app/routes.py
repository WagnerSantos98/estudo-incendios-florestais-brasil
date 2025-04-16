from flask import Blueprint, jsonify, request
import pandas as pd

#Carregar os dados
df = pd.read_csv('data/amazon.csv', encoding='latin-1')
df = df.copy()
df.loc[:, 'date'] = pd.to_datetime(df['date'], errors='coerce')
df.loc[:, 'number'] = pd.to_numeric(df['number'], errors='coerce')
df.loc[:, 'yaer'] = pd.to_numeric(df['year'], errors='coerce')

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "API funcionando!"

@main.route('/dados')
def get_dados():
    return jsonify(df.head(10).to_dict(orient='records'))

@main.route('/filtrar', methods=['GET'])
def filtrar():
    year = request.args.get('year')
    if year:
        try:
            year = int(year)
            resultado = df[df['year'] == year]
            return jsonify(resultado.to_dict(orient='records'))
        except ValueError:
            return jsonify({'erro': 'Ano inválido'}), 400
    return jsonify({'erro': 'Parâmetro "year" obrigatório'}), 400

@main.route('/estatisticas/medias', methods=['GET'])
def calcular_estatisticas():
    estado_agrupado = df.groupby('state')['number']
    estatisticas = pd.DataFrame({
        'média': estado_agrupado.mean(),
        'mediana': estado_agrupado.median(),
        'moda': estado_agrupado.apply(lambda x: x.mode().iloc[0] if not x.mode().empty else None)
    })
    estatisticas = estatisticas.round(2)
    return jsonify(estatisticas.to_dict(orient='records'))

@main.route('/estatisticas/distribuicao', methods=['GET'])
def distribuicao_por_ano():
    incendio_por_ano = df.groupby('ano')['incendios'].sum()
    return jsonify(incendio_por_ano.to_dict())