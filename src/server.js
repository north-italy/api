async function streamToJson(stream) {
  let chunks = [];

  // Lies Daten-Chunks aus dem Stream
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  // Verbinde die Chunks zu einem einzigen Buffer
  const bodyBuffer = Buffer.concat(chunks);

  // Konvertiere den Buffer in einen String (meist UTF-8)
  const bodyString = bodyBuffer.toString('utf-8');

  // Parse den String als JSON
  try {
    const jsonBody = JSON.parse(bodyString);
    return jsonBody;
  } catch (error) {
    // Behandle Fehler beim Parsen (z.B. ungültiges JSON)
    console.error('Fehler beim Parsen des JSON-Streams:', error);
    throw new Error('Ungültiges JSON erhalten'); // Wirf den Fehler erneut
  }
}

export default async function handler(req, res) {
  const { url, method } = req;
  res.setHeader('Content-Type', 'application/json');
  
  switch (url) {
    case '':
    case '/':
      res.status(200).json(
        { message: "Welcome to Alpey Api!" },
        { statusText: "OK" });
      return;
    case '/users':
      res.status(200).json(
        [{ id: 1, name: 'Alice Smith', email: 'alice@example.com' },
         { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
         { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }],
        { statusText: "OK" });
      return;
    case '/post':
      if (method !== 'POST') {
        res.status(400).json({
          message: 'Bad Request',
          is: `Method is ${method}`,
          expected: 'Method to be "POST"'
        });
        return;
      } else {
try {
const {token, value} = req.body;
return res.status(200).json({ message: `All good. Your value is: [${value}]` }, { statusText: "OK" });
} catch (err) {
return res.status(404).json({ message: 'Error occurred' });
}
/*
        const requestBody = req.body;
        // Überprüfe, ob ein Body gesendet wurde und ob er geparst wurde
        if (!requestBody) {
          res.status(400).json({ message: 'Kein Request Body gefunden' });
          return; // Wichtig: Beende die Funktion nach dem Senden der Antwort
        }
        
        let reqBody = {some: null};
        try {
          //reqBody = await requestBody.json();
          reqBody = await streamToJson(red);
        } catch(err) {
          res.status(400).json({ message: 'Failed to parse body' });
          return; // Wichtig: Beende die Funktion nach dem Senden der Antwort
        }
        try {
          let message = 'Body is good';
          //let reqBody = await req.json();
          //reqBody = req.body.json();
          //reqBody = JSON.parse(req.body);
          
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
*/
        return res.status(202).json({ message }, { statusText: "OK" });
      } 
    default:
      return res.status(404).json({ message: 'Endpoint not found' });
  }
}
