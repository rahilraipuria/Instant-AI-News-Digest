from flask import Flask, request, jsonify
from flask_cors import CORS  
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

contentData = "" 

@app.route('/scrape', methods=['POST'])
def scrape():
    global contentData  
    data = request.get_json()
    html = data.get('html', '')
    soup = BeautifulSoup(html, 'html.parser')

    paragraphs = [p.get_text() for p in soup.find_all('p')]
    result = " ".join(paragraphs)
    contentData = result  
    
    return jsonify({"contentData": result})

@app.route('/getContent', methods=['GET'])
def get_data():
    return jsonify({"contentData": contentData})  

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)