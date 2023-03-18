from bs4 import BeautifulSoup
import requests
import re
import sqlite3

connection = sqlite3.connect('buscador.db')
db = connection.cursor()

db.execute('''CREATE TABLE IF NOT EXISTS urls (ocorrencia int, urls str, keyword str)''')

global historico
historico = []

def search(keyword, url, depth, new):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html5lib')
    links = soup.find_all('a')
    html = soup.find_all(string=True)

    text = ''
    blacklist = [
        '[document]',
        'noscript',
        'header',
        'html',
        'meta',
        'head',
        'input',
        'script',
    ]

    for t in html:
        if t.parent.name not in blacklist:
            text += '{} '.format(t)

    urls_normais = []

    for link in links:
        try:
            # tratando urls
            url_re = re.findall('(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+', str(link['href']))

            if str(link['href'])[0] == '/':
                url_re = url + url_re
                urls_normais.append(str(link['href'])[1:])
            elif len(url_re) > 0:
                urls_normais.append(url_re[0])

        except Exception:
            continue
    db.execute("select * from urls where keyword = '%s'" %keyword)
    query = db.fetchall()
    
    if len(query) > 0 and new == False:
        for i in range(len(query)):
            print('%iº - %s - %i encontradas'%(i+1,query[i][1],query[i][0]))
        
    else:
        search_key = ('.'*20) + keyword + ('.'*20)
        ocorrencias = re.findall(search_key, text, re.IGNORECASE)
        i = len(ocorrencias)
        if i > 0:
        	print("%s, %d resultados" %(url,i))
        	historico.append([i, url, keyword])
        if depth > 0:
            depth -= 1
            quantidade_link = len(urls_normais)
            for i in range(quantidade_link):
                try:
                	search(keyword=keyword, url=urls_normais[i], depth=depth, new=True)
                except Exception:
                    continue

search('noticias', 'https://www.uol.com.br', 1, True)
historico.sort(reverse=True) 
db.executemany('INSERT INTO urls VALUES (?,?,?)', historico)
connection.commit()
connection.close()

#test
print('-------------resultados-------------')
for i in range(len(historico)):
    print('%iº - %s - %i encontradas'%(i+1,historico[i][1],historico[i][0]))