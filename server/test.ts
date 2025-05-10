import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Server is running');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
