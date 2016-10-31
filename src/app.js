import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello world');
}).listen(3001, '127.0.0.1');

console.log('Server is running...');
