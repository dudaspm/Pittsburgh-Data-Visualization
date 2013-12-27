#!/home/pmd18/Python-2.6.7/python

import simplejson as json
import urllib
import cgi


form = cgi.FieldStorage()
addressName = form["addressName"].value
#addressName = "1492 Harbor EDinburg Road Edinburg PA"
getLatLong = "http://maps.googleapis.com/maps/api/geocode/json?address="+addressName+"&sensor=false"
fhand = urllib.urlopen(getLatLong)
# Convert to JSON
results = json.load(fhand)
#### Print All
json_form = "{\n"    
json_form = json_form + "\t\"location\": [\n"
json_form = json_form + "\t\t{\"lat\":\"" + `results['results'][0]['geometry']['location']['lat']` + "\"},\n"
json_form = json_form + "\t\t{\"lng\":\"" + `results['results'][0]['geometry']['location']['lng']` + "\"},\n"
json_form = json_form[:-2]
json_form = json_form + "\t]\n";
json_form = json_form + "}"; 
print "Content-type: application/json"
print
print json_form
