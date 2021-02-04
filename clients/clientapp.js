const http = require('http');

const options = {
    hostname: 'lbserver',
    port: 80,
    path: '/messenger',
    method: 'GET'
};
const N = 100;
for (let i = 0; i < N; i++) {
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            process.stdout.write(d);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.end();
}
