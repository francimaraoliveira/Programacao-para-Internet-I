import requests
from bs4 import BeautifulSoup

url = input('https://www.uol.com.br')

tag = input('músicas')

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    tag_content = soup.find(tag).text
    print(tag_content)
else:
    print('Erro ao baixar a página')