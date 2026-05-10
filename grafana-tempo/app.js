const express = require('express');
const app = express();
const port = 3030;

app.get('/', async (req, res) => {
  for (let index = 0; index < 1000000000; index++) {
   
    
  }
  res.send('Hello from OpenTelemetry Node.js app!');

});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
