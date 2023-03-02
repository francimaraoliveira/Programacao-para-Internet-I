import requests
import requests_cache
from bs4 import BeautifulSoup


requests_cache.install_cache('buscador')


def search(keyword: str, url: str, depth: int):
    visited = set()
    queue = [(url, 0)]
    occurrences = {}
    
    while queue:
        current_url, current_depth = queue.pop(0)
        
        if current_url not in visited and current_depth <= depth:
            soup, visited = request(current_url, visited)
            links = buscar_links(soup)
            
            for link in links:
                if link.startswith('http'):
                    queue.append((link, current_depth + 1))
            
            posicoes = encontrar_ocorrencias(keyword, soup)
            if posicoes:
                guardar_ocorrencias(soup, posicoes, current_url, occurrences, keyword)
    
    ler_dicionario(occurrences)


def buscar_links(soup):
    requisicao_feita = soup.find_all('a')
    links = []
    
    for link in requisicao_feita:
        ref = link.get('href')
        links.append(ref)

    return links


def request(url: str, visited: set):
    if url not in visited:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        visited.add(url)
        return soup, visited


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
