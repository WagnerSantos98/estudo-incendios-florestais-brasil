import os
from app import create_app

# Inicializar o app Flask
app = create_app()

if __name__ == '__main__':
    # Detectar se estamos em desenvolvimento (local) ou produção (Render)
    is_dev = os.environ.get("FLASK_ENV") == "development"

    if is_dev:
        # Só usa ngrok no ambiente local
        from pyngrok import ngrok, conf
        conf.get_default().auth_token = "SEU_TOKEN_NGROK"
        public_url = ngrok.connect(5000)
        print(f"Sua API local está disponível em: {public_url}")

    port = int(os.environ.get("PORT", 5000))
    app.run(debug=is_dev, host="0.0.0.0", port=port)
