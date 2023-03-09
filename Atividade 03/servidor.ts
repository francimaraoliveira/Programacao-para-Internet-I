import * as net from 'net';

const PORT = 3000;

const server = net.createServer();
const clients = new Set<net.Socket>();

server.on('connection', (socket: net.Socket) => {
  const { remoteAddress, remotePort } = socket;
  console.log(`Novo cliente conectado: ${remoteAddress}:${remotePort}`);

  clients.add(socket);

  socket.on('data', (data: Buffer) => {
    const messageFromClient = data.toString();
    console.log(messageFromClient);

    if (messageFromClient === 'end') {
      console.log(`Desconectando cliente: ${remoteAddress}:${remotePort}`);
      socket.end();
      return;
    }

    clients.forEach((client) => {
      if (client !== socket) {
        const messageToOtherClients = `${remoteAddress}:${remotePort} diz: ${messageFromClient}`;
        client.write(messageToOtherClients);
      }
    });
  });

  socket.on('end', () => {
    console.log(`Cliente desconectado: ${remoteAddress}:${remotePort}`);
    clients.delete(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
