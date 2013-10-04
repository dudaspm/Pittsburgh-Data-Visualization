import oauth2 as oauth # you need to install https://github.com/simplegeo/python-oauth2

consumerKey = "xxxxxxxx"
consumerSecret = "xxxxxxxx"
accessToken = "xxxxxxxx-xxxxxxxx"
accessTokenSecret = "xxxxxxxx"
searchQuery = "xxxxxxxx"

consumer = oauth.Consumer(key=consumerKey, secret=consumerSecret)
token = oauth.Token(key=accessToken, secret=accessTokenSecret)
client = oauth.Client(consumer, token)
url = "https://api.twitter.com/1.1/search/tweets.json?q="+searchQuery+"&include_entities=true&result_type=recent"
header, fhand = client.request(url, method="GET")
print fhand
