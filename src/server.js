export default async function handler(req, res) {
  const { url, method } = req;

  res.setHeader('Content-Type', 'application/json');

  // Logik basierend auf dem URL
  if (url === '/api/hallo' && method === 'GET') {
    // Logik für /api/hallo
    res.status(200).json({
      message: 'Hallo von deiner Vanilla JS API auf Vercel (via server.js)!',
      method: method,
      timestamp: new Date().toISOString()
    });

  } else if (url === '/api/users' && method === 'GET') {
    // Logik für /api/users
    const users = [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
      { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
    ];
    res.status(200).json(users);

  } else {
    // Fallback für nicht gefundene Routen oder Methoden
    res.status(404).json({ message: 'Endpunkt nicht gefunden oder Methode nicht erlaubt' });
  }
}
