from funcoes import *
import requests
import requests_cache
from bs4 import BeautifulSoup

requests_cache.install_cache('buscador')


def buscar_links(soup):
    requisicao_feita = soup.find_all('a')
    links = []
    
    for link in requisicao_feita:
        ref = link.get('href')
        links.append(ref)

    return links


def request(url: str, acessados: list):
    if url not in acessados:
        resposta = requests.get(url)
        soup = BeautifulSoup(resposta.text, 'html.parser')
        acessados.append(url)
        
        return soup, acessados


def encontrar_ocorrencias(substring: str, soup):
    texto = soup.get_text()
    posicoes = []
    posicao = -1

    while True:
        posicao = texto.find(substring, posicao + 1)
        if posicao == -1:
            break
        posicoes.append(posicao)

    return posicoes


def guardar_ocorrencias(soup, posicao: list, url, dicionario, substring):
    texto = soup.get_text()
    contador = 1
    
    for x in posicao:
        if x >= 20 or x <= len(texto - 20):
            dicionario[f'Ocorrencia {contador}:'] = f'||{texto[x - 20 : x + (20 + len(substring))] }|| em: {url}'
            contador += 1

    return dicionario


def ler_dicionario(dicionario: dict):
    for chave, valor in dicionario.items():
        print(chave, "->", valor)


dicionario_de_ocorrencias = {}
links_encontrados = []
links_acessados = []
url = "https://www.uol.com.br/esporte"
depth = 0
requisicao, links_acessados = request(url, links_acessados) 
chave = 'esporte'
contador_depth = 0

while contador_depth <= depth:
    posicoes = encontrar_ocorrencias(chave, requisicao)

    if len(posicoes) > 0:
        dicionario_de_ocorrencias = guardar_ocorrencias(requisicao, posicoes, url, dicionario_de_ocorrencias, palavra_chave)

    ler_dicionario(dicionario_de_ocorrencias)

    links = buscar_links(requisicao)

    for link in links:
        if link not in links_encontrados:
            links_encontrados.append(link)
            request(link, links_acessados)
    
    contador_depth += 1
