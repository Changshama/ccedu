from youtube_transcript_api import YouTubeTranscriptApi
import requests
import spacy
# from nltk.corpus import words
import enchant
from nltk.stem.snowball import SnowballStemmer

snowBallStemmer = SnowballStemmer("english")
nlp = spacy.load("en_core_web_sm")
engword = enchant.Dict("en_US")

def WordList(vid):
  english_most_common_10k = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears.txt'
  response = requests.get(english_most_common_10k)
  data = response.text
  # match with stemmed common words
  set_of_common_words = {snowBallStemmer.stem(x) for x in data.split('\n')} 

  transcript = YouTubeTranscriptApi.get_transcript(vid)
  word_list = ''
  ts_list = ''
  for sentence in transcript:
    doc = nlp(sentence.get('text'))
    tokens = [(token.text, token.lemma_) for token in doc if token.pos_ in ["VERB","ADV","ADJ","NOUN"]]
    for token in tokens:
      if snowBallStemmer.stem(token[0].lower()) not in set_of_common_words:
        # check if it's an English word
        # nltk check is slow
        # if token[0].lower() in words.words(): 
        if engword.check(token[0].lower()): 
          word_list += token[0] +'\n'
          ts_list += str(sentence.get('start')) +'\n'
          break
  return word_list, ts_list

# def video_to_text(vid):
#   transcript = YouTubeTranscriptApi.get_transcript(vid)
#   text = ''
#   for sentence in transcript:
#     text += sentence.get('text') + ' '
#   return text

# def WordList(text):
#   english_most_common_10k = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears.txt'
#   response = requests.get(english_most_common_10k)
#   data = response.text
#   set_of_common_words = {x for x in data.split('\n')} 
#   doc = nlp(text)
#   tokens = [(token.text, token.lemma_) for token in doc if token.pos_ in ["VERB","ADV","ADJ","NOUN"]]
#   word_list = ''
#   for token in tokens:
#     if token[1].lower() not in set_of_common_words:
#       # word_list.append(token[0])
#       word_list += token[0]+'\n'
#   return word_list

def PhraseList(text):
  doc = nlp(text)
  phrase_list = []
  for tok in doc:
    if tok.dep_ == 'prt':
        if tok.pos_ in ["VERB","ADV","ADJ","NOUN"]: #and tok.text.lower() in words.words()
          phrase_list.append(tok.text)
  return phrase_list
