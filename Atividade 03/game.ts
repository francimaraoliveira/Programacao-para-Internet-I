import * as WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 3000 });

interface GameState {
  word: string;
  revealed: boolean[];
  guesses: string[];
  remainingAttempts: number;
}

function createGameState(word: string): GameState {
  const revealed = Array.from({ length: word.length }, () => false);
  return { word, revealed, guesses: [], remainingAttempts: 6 };
}

function updateGameState(state: GameState, guess: string): void {
  if (!state.word.includes(guess)) {
    state.remainingAttempts--;
  } else {
    for (let i = 0; i < state.word.length; i++) {
      if (state.word[i] === guess) {
        state.revealed[i] = true;
      }
    }
  }
  state.guesses.push(guess);
}

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  let gameState: GameState | null = null;

  ws.on('message', (message: string) => {
    if (gameState) {
      updateGameState(gameState, message);
      ws.send(JSON.stringify(gameState));
    } else {
      gameState = createGameState(message);
      ws.send(JSON.stringify(gameState));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
