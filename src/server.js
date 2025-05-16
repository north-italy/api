export default async function handler(req, res) {
  const { url, method } = req;
  res.setHeader('Content-Type', 'application/json');
  
  switch (url) {
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
      if (method !== 'POST') {
        return res.status(400).json({
          message: 'Bad Request',
          is: `Method is ${method}`,
          expected: 'Method to be "POST"'
        });
      } else {
        const requestBody = req.body;
        // Überprüfe, ob ein Body gesendet wurde und ob er geparst wurde
        if (!requestBody) {
          return res.status(400).json({ message: 'Kein Request Body gefunden' });
          //return; // Wichtig: Beende die Funktion nach dem Senden der Antwort
        }
        
        let reqBody = {some: null};
        try {
          let message = 'Body is good';
          //let reqBody = await req.json();
          //reqBody = req.body.json();
          reqBody = JSON.parse(req.body);
          
          const requiredParams = new Map([
            ['token', 'string'],
            ['value', 'number']
          ]);

          let typ;
          for (let k in reqBody) {
            typ = requiredParams.get(k);
            if (typ) {
              if (typeof reqBody[k] !== typ) {
                message = `Parameter '${k}' in body expected to be of type '${typ}' but is: '${typeof reqBody[k]}'`;
                break;
              }
            } else {
              message = `Parameter '${k}' not allowed`;
              break;
            }
          }
        } catch (err) {
            return res.status(406).json({
            message: 'Not Acceptable',
            error: err.message,
              reqBody
          });
        }
        return res.status(202).json({ message }, { statusText: "OK" });
      } 
    default:
      return res.status(404).json({ message: 'Endpoint not found' });
  }
}
