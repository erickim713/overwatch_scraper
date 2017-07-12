import scrapy

class ChampionInfo(scrapy.Spider):
    name = 'ChampionInfo'
    start_urls = []
    def __init__(self, filename = None):
        if filename:
            with open(filename) as f:
                content = f.readlines()
                content = [x.strip() for x in content]
            baseURL = "https://www.owfire.com/overwatch/wiki/heroes/"
            for entry in content:
                print(entry)
                self.start_urls.append(baseURL + entry)
    # crawl the wiki heroes for hero information
    # what information is needed to do the matching suggestion?
    # let's first make the hero classes
    def parse(self, response):
        # let's first get all the information about the champion

        #name of champion
        name = response.xpath('//*[@id="wiki"]/div[1]/div[1]')
        championName = name.css("h2::text").extract_first()

        #strongAgainst these champions (just pull until greenbar is greater than red bar)
        strongAgainstThis = []
        for x in range(24):
            strongAgainst = response.xpath('//*[@id="counter-lists"]/div[2]/div/div[' + str(x+1) + ']')
            temp = {}
            temp['name'] = strongAgainst.css('div.desc > h4::text').extract_first()
            temp['yes'] = strongAgainst.css('div.desc > span.up::text').extract_first()
            temp['no'] = strongAgainst.css('div.desc > span.down::text').extract_first()
            strongAgainstThis.append(temp)

        card = {}
        card.setdefault('Name', championName)
        card['weakAgainst'] = strongAgainstThis
        yield card
