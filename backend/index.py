from app import create_app
from pyngrok import ngrok, conf

#Configurar o ngrok
conf.get_default().auth_token = "2voNji2NDgkw69IfyBsexJ1wp2b_4HYDgYfhr8iFbY3Q4yjSn"

#Inicializar o aplicativo Flask
app = create_app()

#Iniciar o túnel ngrok para Expor a API
public_url = ngrok.connect(5000)
print(f"Sua API está disponívek em: {public_url}")

#Rodar o servidor Flask
if __name__ == '__main__':
    app.run(port=5000, debug=False, use_reloader=False)