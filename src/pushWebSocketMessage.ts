export async function pushWebSocketMessage(url: string, message: string): Promise<void> {
  try {
    const ws = new WebSocket(url);

    await new Promise<void>((resolve, reject) => {
      ws.onopen = () => {
        console.log('WebSocket connected');
        ws.send(message);
      };

      ws.addEventListener('message', (event) => {
        console.log('Received response:', event.data);
      });

      ws.addEventListener('close', () => {
        console.log('WebSocket closed');
        resolve();
      });

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      setTimeout(() => {
        ws.close();
      }, 1000);
    });

  } catch (error) {
    console.error('WebSocket error:', error);
    throw new Error(`Failed to send WebSocket message: ${error}`);
  }
}
