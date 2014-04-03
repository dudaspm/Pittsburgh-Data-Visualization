#!/home/pmd18/Python-2.6.7/python

from definitions import *
import MySQLdb
import math

conn = MySQLdb.connect(hostname,username,password,database)
cur = conn.cursor ()

origin_x = int(long(675) / 2)
origin_y = int(long(675) / 2)
angle_step = float(360 / float(552))
nudgeLeft = 250
nudgeUp = 15
stops = []
paths = {}
names = {}
buses = []
nums = {}
query = """select routeID, name, busNum from stops;"""
cur.execute(query)
results = cur.fetchall()
for row in results:	 
	paths.setdefault(row[0], []).append(row[1])
	names.setdefault(row[1], []).append(row[2])
	
	if row[1] not in stops:  
		stops.append(row[1])
	if row[2] not in buses:  
		buses.append(row[2])	
	
print "Content-type: application/json"
print
json_form = "{"    
json_form = json_form + "\t\"nodes\": ["
counter = 0
for stop in stops:
	nums[buses.index(names[stop][0])] = nums.get(buses.index(names[stop][0]), 0) + 1
	theta = (angle_step * math.pi / 180) * counter
	center_x = (int(origin_x * math.cos(theta)) + origin_x) + nudgeLeft
	center_y = (int(origin_y * math.sin(theta)) + origin_y) + nudgeUp	
	append_json = """{"name":"%s", "nodeID":%s, "group":"%s", "row":%s, "col":%s, "cx":%s, "cy":%s, "fixed":false},""" % (stop, stops.index(stop), names[stop], buses.index(names[stop][0]), nums[buses.index(names[stop][0])], center_x, center_y) 
	json_form = json_form + append_json
	counter = counter + 1

json_form = json_form[:-1]	
json_form = json_form + "\t],"
json_form = json_form + "\t\"links\":["	
#json_form = json_form[:-1]	
for path in paths:
	for i in range(len(paths[path])-1):
		append_json = """{"source":%s,"target":%s,"value":1},""" % (stops.index(paths[path][i]),stops.index(paths[path][i+1])) 
		json_form = json_form + append_json
json_form = json_form[:-1]	
json_form = json_form + "\t]\n"
json_form = json_form + "}"	
print json_form

