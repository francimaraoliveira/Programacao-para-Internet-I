import requests
from bs4 import BeautifulSoup

url = input("Insira a URL da página a ser buscada: ")
termo = input("Insira o termo a ser buscado: ")

response = requests.get(url)

soup = BeautifulSoup(response.content, 'html.parser')
texto = soup.get_text()

ocorrencias = 0
for i, linha in enumerate(texto.split("\n")):
    if termo in linha:
        inicio = max(0, linha.index(termo) - 20)
        fim = min(len(linha), linha.index(termo) + 20 + len(termo))
        print(f"Ocorrência {i+1}: {linha[inicio:fim]}")
        ocorrencias += 1

print(f"Total de ocorrências encontradas: {ocorrencias}")