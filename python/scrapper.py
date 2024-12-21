from flask import Flask, request, jsonify
from flask_cors import CORS  
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

TARGET_SERVER_URL = ""
@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    html = data.get('html', '')
    soup = BeautifulSoup(html, 'html.parser')

    
    paragraphs = [p.get_text() for p in soup.find_all('p')]

    result = " ".join(paragraphs)
    
    try:
        response = requests.post(TARGET_SERVER_URL, json={"paragraphs": paragraphs})
        if response.status_code == 200:
            return jsonify({"status": "success", "message": "Data sent to target server!"})
        else:
            return jsonify({"status": "error", "message": "Failed to send data to target server."}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    return jsonify({"paragraphs": result})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
