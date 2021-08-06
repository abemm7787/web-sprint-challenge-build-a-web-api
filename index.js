
const server = require("./api/server");

const port = 6000;

server.listen(port, () => {
  console.log(`Listening on port ${port} `);
});

