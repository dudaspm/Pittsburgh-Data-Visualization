
import urllib2
from bs4 import BeautifulSoup
transit = {"1":"Freeport Road","2":"Mount Royal","4":"Troy Hill","6":"Spring Hill","7":"Spring Garden","8":"Perrysville","11":"Fineview","12":"McKnight","13":"Bellevue","14":"Ohio Valley","15":"Charles","16":"Brighton","17":"Shadeland","18":"Manchester","19L":"Emsworth Limited","20":"Kennedy","21":"Coraopolis","22":"McCoy","24":"West Park","26":"Chartiers","27":"Fairywood","28X":"Airport Flyer","29":"Robinson","31":"Bridgeville","36":"Banksville","38":"Green Tree","39":"Brookline","40":"Mount Washington","41":"Bower Hill","43":"Bailey","44":"Knoxville","48":"Arlington","51":"Carrick","51L":"Carrick Limited","52L":"Homeville Limited","53":"Homestead Park","53L":"Homestead Park Limited","54":"North Side-Oakland-South Side","55":"Glassport","56":"Lincoln Place","57":"Hazelwood","58":"Greenfield","59":"Mon Valley","60":"Walnut-Crawford Village","61A":"North Braddock","61B":"Braddock-Swissvale","61C":"McKeesport-Homestead","61D":"Murray","64":"Lawrenceville-Waterfront","65":"Squirrel Hill","67":"Monroeville","68":"Braddock Hills","69":"Trafford","71":"Edgewood Town Center","71A":"Negley","71B":"Highland Park","71C":"Point Breeze","71D":"Hamilton","74":"Homewood-Squirrel Hill","75":"Ellsworth","77":"Penn Hills","78":"Oakmont","79":"East Hills","81":"Oak Hill","82":"Lincoln","83":"Bedford Hill","86":"Liberty","87":"Friendship","88":"Penn","89":"Garfield Commons","91":"Butler Street","93":"Lawrenceville-Oakland","BLLB":"Library via Overbrook","BLSV":"South Hills Village via Overbrook","G2":"West Busway","G3":"Moon Flyer","G31":"Bridgeville Flyer","O1":"Ross Flyer","O12":"McKnight Flyer","O5":"Thompson Run Flyer","P1":"East Busway-All Stops","P10":"Allegheny Valley Flyer","P12":"Holiday Park Flyer","P13":"Mount Royal Flyer","P16":"Penn Hills Flyer","P17":"Lincoln Park Flyer","P2":"East Busway Short","P3":"East Busway-Oakland","P67":"Monroeville Flyer","P68":"Braddock Hills Flyer","P69":"Trafford Flyer","P7":"McKeesport Flyer","P71":"Swissvale Flyer","P76":"Lincoln Highway Flyer","P78":"Oakmont Flyer","RED":"Castle Shannon via Beechview","SL":"Subway Local","Y1":"Large Flyer","Y45":"Baldwin Manor Flyer","Y46":"Elizabeth Flyer","Y47":"Curry Flyer","Y49":"Prospect Flyer"}
smalltransit = {"1":"Freeport Road"}
u = "http://www.portauthority.org/tripplanner20/TimeTable.aspx?Route="
d = "&Direction=I"
s = "&servicetype=week"

def cleanIt(word):
	word = word.encode('utf-8')
	word = ''.join([x for x in word if ord(x) < 256])
	word = word.replace('\n','')
	word = word.replace('\r','')
	return word

sch = {}	
loc = []
a = []
for key in smalltransit:
	html = urllib2.urlopen(u + key + d + s).read()
	soup = BeautifulSoup(html)
	table = soup.find( "table", {"id":"dgTimeTable"} )
	rowHeader = table.find( "tr", {"class":"tableheadblueschedule"} )
	#print rowHeader
	for td in rowHeader.findAll("td"):
		#locANDstop = td.b.string.split(" - ", 1)
		loc.append(td.b.string)
		sch[td.b.string] = []
	times=list()
	
	for tr in table.findAll("tr"):
		times.append(tr)


	for time in times: 
		counter = 0
		for td in time.findAll("td"):
			sch[loc[counter]].append(td.string)
			counter = counter + 1
		
	print sch['New Kensington - 4TH AVE & CENTRAL CITY PLAZA']
