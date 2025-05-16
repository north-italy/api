export default async function handler(req, res) {
  //const { url, method } = req;
  //res.setHeader('Content-Type', 'application/json');
  
  switch (req.url) {
    case '':
    case '/':
      return res.status(200).json(
        { message: "Welcome to Alpey Api!" },
        { statusText: "OK" });
    case '/users':
      return res.status(200).json(
        [{ id: 1, name: 'Alice Smith', email: 'alice@example.com' },
         { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
         { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }],
        { statusText: "OK" });
    case '/post':
      if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Bad Request', { expected: 'Method must be "POST"' }, is: req.method });
      } else {
        return res.status(202).json({ message: 'Endpoint for making POST-Calls' }, { statusText: "OK" });
      }
    default:
      return res.status(404).json({ message: 'Endpoint not found' });
  }
}
