class Post {
    constructor(id, text, likes) {
      this.id = id;
      this.text = text;
      this.likes = likes;
    }
}
  
class Microblog {
    constructor() {
      this.posts = [];
    }
  
    create(post) {
      this.posts.push(post);
    }
  
    retrieve(id) {
      return this.posts.find((post) => post.id === id);
    }
  
    update(updatedPost) {
      const index = this.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
    }
  
    delete(id) {
      const index = this.posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        this.posts.splice(index, 1);
      }
    }
  
    retrieveAll() {
      return this.posts;
    }
  }
  
  // Instanciando a classe Microblog
  const microblog = new Microblog();
  
  // Criando posts
  const post1 = { id: 1, text: 'Post 1', likes: 0 };
  const post2 = { id: 2, text: 'Post 2', likes: 0 };
  const post3 = { id: 3, text: 'Post 3', likes: 0 };
  
  // Adicionando posts à coleção usando o método create
  microblog.create(post1);
  microblog.create(post2);
  microblog.create(post3);
  
  // Excluindo um post da coleção usando o método delete
  microblog.delete(2);
  
  // Atualizando um post da coleção usando o método update
  const updatedPost = { id: 1, text: 'Updated Post 1', likes: 5 };
  microblog.update(updatedPost);
  
  // Obtendo todos os itens da coleção usando o método retrieveAll
  const allPosts = microblog.retrieveAll();
  console.log(allPosts);
  
  
  // Express
  const express = require('express');
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
    
  // Endpoints
  app.get('/', (request, response) => {
    response.send("A request deu certo uhuuu")
  });


  app.get('/posts', (request, response) => {
    const posts = microblog.retrieveAll();
    response.json(posts);
  });
  
  app.get('/posts/:id', (request, response) => {
    const { id } = request.params;
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      response.json(post);
    } else {
      response.sendStatus(404);
    }
  });
  
  app.delete('/posts/:id', (request, response) => {
    const { id } = request.params;
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      microblog.delete(parseInt(id));
      response.sendStatus(204);
    } else {
      response.sendStatus(404);
    }
  });
  
  app.post('/posts', (request, response) => {
    const { text } = request.body;
    const id = generateUniversalId(); // Função para gerar um ID único (implementação não fornecida)
    const likes = 0;
    const post = new Post(id, text, likes);
    microblog.create(post);
    response.status(201).json(post);
  });
  
  app.put('/posts/:id', (request, response) => {
    const { id } = request.params;
    const updatedPost = request.body;
    updatedPost.id = parseInt(id);
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      microblog.update(updatedPost);
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });
  
  app.patch('/posts/:id', (request, response) => {
    const { id } = request.params;
    const updatedFields = request.body;
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      const updatedPost = { ...post, ...updatedFields };
      microblog.update(updatedPost);
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });
  
  app.patch('/posts/:id/like', (request, response) => {
    const { id } = request.params;
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      post.likes++;
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });
  
  // Função para gerar um id universal
  function generateUniversalId() {
    return Math.floor(Math.random() * 1000);
  }  

  // Iniciar o servidor
  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });
  