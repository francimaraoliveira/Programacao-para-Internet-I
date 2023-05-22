class Post {
    id: number;
    text: string;
    likes: number;
  
    constructor(id: number, text: string, likes: number) {
      this.id = id;
      this.text = text;
      this.likes = likes;
    }
  }
  
  class Microblog {
    posts: Post[];
  
    constructor() {
      this.posts = [];
    }
  
    create(post: Post) {
      this.posts.push(post);
    }
  
    retrieve(id: number) {
      return this.posts.find((post) => post.id === id);
    }
  
    update(updatedPost: Post) {
      const index = this.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
    }
  
    delete(id: number) {
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
  const post1 = new Post(1, 'Post 1', 0);
  const post2 = new Post(2, 'Post 2', 0);
  const post3 = new Post(3, 'Post 3', 0);
  
  // Adicionando posts à coleção usando o método create
  microblog.create(post1);
  microblog.create(post2);
  microblog.create(post3);
  
  // Excluindo um post da coleção usando o método delete
  microblog.delete(2);
  
  // Atualizando um post da coleção usando o método update
  const updatedPost = new Post(1, 'Updated Post 1', 5);
  microblog.update(updatedPost);
  
  // Obtendo todos os itens da coleção usando o método retrieveAll
  const allPosts = microblog.retrieveAll();
  console.log(allPosts);
  
  // Express
  import express, { Application, Request, Response } from 'express'
  
  const app : Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Endpoints
  app.get('/', (request: Request, response: Response) => {
    response.send('A request deu certo uhuuu');
  });
  
  app.get('/posts', (request: Request, response: Response) => {
    const posts = microblog.retrieveAll();
    response.json(posts);
  });
  
  app.get('/posts/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      response.json(post);
    } else {
      response.sendStatus(404);
    }
  });
  
  app.delete('/posts/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      microblog.delete(parseInt(id));
      response.sendStatus(204);
    } else {
      response.sendStatus(404);
    }
  });
  
  app.post('/posts', (request: Request, response: Response) => {
    const { text } = request.body;
    const id = generateUniversalId(); // Função para gerar um ID único (implementação não fornecida)
    const likes = 0;
    const post = new Post(id, text, likes);
    microblog.create(post);
    response.status(201).json(post);
  });
  
  app.put('/posts/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const updatedPost = request.body as Post;
    updatedPost.id = parseInt(id);
    const post = microblog.retrieve(parseInt(id));
    if (post) {
      microblog.update(updatedPost);
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });
  
  app.patch('/posts/:id', (request: Request, response: Response) => {
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
  
  app.patch('/posts/:id/like', (request: Request, response: Response) => {
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
  