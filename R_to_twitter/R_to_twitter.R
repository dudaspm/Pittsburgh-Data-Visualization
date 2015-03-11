# Install dependencies
install.packages(c("devtools", "rjson", "bit64", "httr"))
# I suggest restarting R at this point

# devtools will help with downloading from github
library(devtools)

# twitteR is the main library, check out: http://cran.r-project.org/web/packages/twitteR/twitteR.pdf for more information/details
install_github("geoffjentry/twitteR")
library(twitteR)

######################################################
########### Twitter Developer Site ###################
######################################################
# go to https://dev.twitter.com/ and create a new project
# Consumer Key (API Key)
api_key <- "xxxx"
# Consumer Secret (API Secret)
api_secret <- "xxxx"

# in the same project, find "Token Actions" and generate an access token/secret
# Access Token
access_token <- "xxxx-xxxx"
# Access Token Secret
access_token_secret <- "xxxx"
 
setup_twitter_oauth(api_key,api_secret,access_token,access_token_secret)
# Choose Yes if you would like this authorization reloaded each time you load the Twitter library.
######################################################
# example search:
searchTwitter('#ebola', n=50)
