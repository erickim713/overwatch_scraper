import scrapy

class CharacterSpider(scrapy.Spider):
    name = 'CharacterSpider'
    start_urls = ['https://playoverwatch.com/en-us/heroes/']
    # official overwatch hero index page.
    # this crawl spider is for collecting the names of the overwatch

    def parse(self, response):
        for champions in response.css("span.portrait-title"):
            yield{
                'champion' : champions.css("span.portrait-title::text").extract_first()
            }
