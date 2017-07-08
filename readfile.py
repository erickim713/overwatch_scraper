import json
from pprint import pprint

with open('oScraper/oScraper/spiders/cName.json') as data_file:
	data = json.load(data_file)


for champions in data:
    print(champions['champion'])
