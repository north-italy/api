export default async function handler(req, res) {
  //const { url, method } = req;
  //res.setHeader('Content-Type', 'application/json');
  
  switch (req.url) {
    case '':
    case '/':
      return res.json(
        { message: "Welcome to Alpey Api!" },
        { status: 200, statusText: "OK" });
    case '/users':
      return res.json(
        [{ id: 1, name: 'Alice Smith', email: 'alice@example.com' },
         { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
         { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }],
        { status: 200, statusText: "OK" });
    default:
      return res.status(404).json(
        { message: 'Endpoint not found' },
        { statusText: "Not Found" });
  }
}
