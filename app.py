from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["API_KEY"])
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    gemini_response = get_gemini_response(user_input)
    return jsonify({'response': gemini_response})

if __name__ == '__main__':
    app.run(debug=True)
