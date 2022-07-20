from flask import Flask
from flask_session import Session

from controller.user_controller import uc
from flask_cors import CORS

if __name__ == '__main__':
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.secret_key = 'siju123$mariyam456'
    app.config['SESSION_TYPE'] = 'filesystem'
 # Instructs our webserver to tell browsers that any origin is allowed. By origin we mean the
    # source where the HTML, CSS, and JS are originating from

    app.register_blueprint(uc)

    app.run(port=8080, debug=True)

