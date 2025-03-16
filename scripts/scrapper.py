from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import bleach
from waitress import serve  # ✅ Import Waitress

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    html = data.get('html', '')

    soup = BeautifulSoup(html, 'html.parser')
    paragraphs = [bleach.clean(p.get_text()) for p in soup.find_all('p')]
    result = " ".join(paragraphs)

    return jsonify({"contentData": result})

@app.route('/getContent', methods=['GET'])
def get_data():
    return jsonify({"contentData": "This is test content."})

# ✅ Use Waitress for deployment
if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=5000)
