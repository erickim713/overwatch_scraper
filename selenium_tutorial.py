# from selenium import webdriver
# from selenium.webdriver.common import action_chains, keys
# import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("http://overwatch.inven.co.kr/overank/")

assert "OVERANK" in driver.title
driver.implicitly_wait(100)
elem = driver.find_element_by_xpath('//*[@id="search_form"]/input')
print elem
elem.clear()
elem.send_keys("Eric#34845")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source
driver.close()
