export default async function handler(req, res) {
  // Setze den Statuscode und die Header
  res.setHeader('Content-Type', 'application/json');

  // Überprüfe die HTTP-Methode (optional)
  if (req.method === 'GET') {
    // Sende eine JSON-Antwort
    res.status(200).json({
      message: 'Hallo von deiner Vanilla JS API auf Vercel!',
      method: req.method,
      timestamp: new Date().toISOString()
    });
  } else {
    // Behandle andere Methoden (optional)
    res.status(405).json({ message: 'Methode nicht erlaubt' });
  }
}
