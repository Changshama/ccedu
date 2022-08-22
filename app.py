from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
from model.model_nlp import video_to_text, WordList, PhraseList
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)
cors = CORS(app)


@app.route("/", methods=["POST", "GET"])
@cross_origin()
def index():
    if request.method == "POST":
        # data = json.loads(request.data)
        data = request.get_json()
        print(data)
        # print(data["query"])
        # print(data["items"])
        # query = data["query"]
        # items = data["items"]
        # ans = Similar(query, items)
        transcript = video_to_text(data['video_id'])
        ans = WordList(transcript)
        print(ans)
        return jsonify({"ans": ans}), 200
    else:
        return "welcome to CCedU", 200


if __name__ == "__main__":
    app.run()
