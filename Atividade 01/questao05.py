import requests
from bs4 import BeautifulSoup

termo = input('Digite o termo que deseja buscar: ')

url = 'http://www.google.com/search'

params = {'q': termo}

response = requests.get(url, params=params)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    
    links = soup.find_all('a')
    
    for link in links:
        title = link.text
        url = link.get('href')
        if url.startswith('/url?q='):
            print(title)
            print(url[7:])
            print()
else:
    print('Erro ao buscar no Google')