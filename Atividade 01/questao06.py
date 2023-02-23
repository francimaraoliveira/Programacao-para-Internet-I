import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://www.tabeladobrasileirao.net/'

response = requests.get(url)

soup = BeautifulSoup(response.content, 'html.parser')

tabela_html = str(soup.find("table"))

dfs = pd.read_html(tabela_html)
tabela = dfs[0].dropna(how="all")

print(tabela)