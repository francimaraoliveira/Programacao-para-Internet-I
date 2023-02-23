import requests
from bs4 import BeautifulSoup

cep = input(str('Digite um cep no formato 00.000-000: '))

cep = cep.replace("-", "").replace(".", "").replace(" ", "")

if len(cep) == 8:
    url = f'https://viacep.com.br/ws/{cep}/json/'

    requisicao = requests.get(url)
    
    print(requisicao)

    dic_requisicao = requisicao.json()

    uf = dic_requisicao['uf']
    cidade = dic_requisicao['localidade']
    bairro = dic_requisicao['bairro']
    print(dic_requisicao)
else:
    print("CEP Inválido")

