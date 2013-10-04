import oauth2 as oauth # you need to install https://github.com/simplegeo/python-oauth2

consumerKey = "SXYrbPmwFJcx02GDdndVOQ"
consumerSecret = "VTGjzS4sl1T8DC69RrSVq5ThvyXJy59PiM3cIpC3FzM"
accessToken = "126798187-ENW7OeCproZeXqCZd8BoyDKKyDAhJ8ERo5bCtvAJ"
accessTokenSecret = "yHPUkSKw75eLEfW5Mg9d8eSVOev47SZM9bVXO9IPrw"
searchQuery = "pittsburgh"

consumer = oauth.Consumer(key=consumerKey, secret=consumerSecret)
token = oauth.Token(key=accessToken, secret=accessTokenSecret)
client = oauth.Client(consumer, token)
url = "https://api.twitter.com/1.1/search/tweets.json?q="+searchQuery+"&include_entities=true&result_type=recent"
header, fhand = client.request(url, method="GET")
print fhand
