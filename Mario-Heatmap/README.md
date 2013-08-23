This is a type of heat-map which was focused on creating an "8-bit" rendering of Mario. 
Files needed for these examples include:

marioStanding.csv 

marioWalking1.csv

marioWalking2.csv

marioWalking3.csv

Example 1 - standing.html

Introduction into creating 3 layers for a heat-map, which when visualized will feature Mario

Example 2 - standing2.html

Puts all 3 layers into a single matrix/vector

Example 3 - standing3.html

Uses d3's csv function to parse the file and produce the same array

Example 4 - standing4.html

Ommited - same as 5

Example 5 - standing5.html

Instead of d3's csv function, uses AJAX instead

Example 6 - marioMoving.html

Uses 4 AJAX calls (non-async) to collect the above csv files, with multidimensional arrays. Then creates and transitions through all four states.
This completed using chaining transitions.

Example 7 - marioMoving2.html

Uses 4 AJAX calls (async) to collect the above csv files, with an object and array. Then creates and transitions through all four states.
This completed using chaining transitions.
