from flask import Flask, url_for, render_template
from markupsafe import escape
import assemblyai as aai


aai.settings.api_key = "efb13838f2c647a8b1bfeda80b2baea2"


# FILE_URL = "https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3"

FILE_URL = "./sinach.mp3"






transcriber = aai.Transcriber()
transcript = transcriber.transcribe(FILE_URL)


print(transcript.text)




app = Flask(__name__)
@app.route('/')
def index():
   return render_template("index.html")
@app.route('/login')
def login():
   return render_template("main.html", transcript=transcript.text)
@app.route('/user/<username>')
def profile(username):
   return '{}\'s profile'.format(escape(username))
with app.test_request_context():
   print(url_for('index'))
   print(url_for('login'))
   print(url_for('login', next='/'))
   print(url_for('profile', username='John Doe'))
   
   
   
   
if __name__ == "__main__":
   app.run(debug = True)