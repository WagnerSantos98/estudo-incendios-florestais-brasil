# Estudo sobre Incêndios Florestais no Brasil

Este projeto acadêmico desenvolvido para analisar e disponibilizar informações sobre incêndios florestais no Brasil utilizando Python, Flask e Pandas.

## Objetivo

O objetivo principal deste projeto é construir uma API que forneça dados e estatísticas

# Análise de Incêndios Florestais no Brasil

Este projeto visa analisar dados de incêndios florestais no Brasil, fornecendo estatísticas e visualizações interativas.

## Demonstração
![Demonstração da Aplicação](frontend/public/img/forest.gif)

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- `backend/`: API Flask que processa e fornece os dados
- `frontend/`: Interface React para visualização dos dados

## Pré-requisitos

- Python 3.8 ou superior
- Node.js 16 ou superior
- npm ou yarn

## Configuração do Ambiente

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Crie um ambiente virtual Python:
```bash
python -m venv venv
```

3. Ative o ambiente virtual:
- No Windows:
```bash
venv\Scripts\activate
```
- No Linux/Mac:
```bash
source venv/bin/activate
```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

5. Inicie o servidor backend:
```bash
python run.py
```

O servidor backend estará rodando em `http://localhost:5000`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
yarn dev
```

O servidor frontend estará rodando em `http://localhost:5173`

## Testando a Aplicação

1. Certifique-se de que tanto o backend quanto o frontend estão rodando
2. Acesse `http://localhost:5173` no seu navegador
3. Você deverá ver:
   - Card de estatísticas gerais à esquerda
   - Menu de seleção de estados à direita
   - Card de ranking de estados abaixo do menu
   - Card de fonte de dados na parte inferior direita

## Rotas da API

- `GET /estatisticas/geral`: Estatísticas gerais dos incêndios
- `GET /estatisticas/grafico`: Dados para o gráfico de distribuição anual
- `GET /analise/descricao`: Descrição da análise dos dados
- `GET /ranking/estados`: Ranking dos estados por número de incêndios
- `GET /estatisticas/estado/<estado>`: Estatísticas específicas de um estado

## Solução de Problemas

### Erros de CORS

Se encontrar erros de CORS, verifique se:
1. O backend está rodando na porta 5000
2. O frontend está rodando na porta 5174
3. O ambiente virtual do Python está ativado
4. Todas as dependências foram instaladas corretamente

### Problemas de Conexão

Se as requisições não estiverem funcionando:
1. Verifique se ambos os servidores estão rodando
2. Confirme se as portas não estão sendo usadas por outros processos
3. Tente reiniciar ambos os servidores


## Desenvolvido por
Wagner Santos de Jesus

Sinta-se à vontade para entrar em contato e compartilhar feedbacks!
- LinkedIn: https://www.linkedin.com/in/wagnersjesus/
- Portfólio: https://wagnersantos.dev.br/