const fs = require('fs');
const http = require('http');

const email = 'admin@gabrielnetto.com';
const password = 'GabrielNetto2026!';
const host = '127.0.0.1';
const port = 5678;

async function run() {
    try {
        // 1. Login
        console.log('Logging in...');
        const authData = JSON.stringify({ emailOrLdapLoginId: email, password: password });
        const authReq = await req('/rest/login', 'POST', authData);
        if (!authReq.headers['set-cookie']) throw new Error('No cookie received');
        const cookie = authReq.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
        console.log('Logged in.');

        // 2. List Credentials
        console.log('Listing Credentials...');
        const creds = await req('/credentials', 'GET', null, cookie);
        console.log('Credentials:', creds.body);

    } catch (e) {
        console.error('Error:', e.message);
    }
}

function req(path, method, data, cookie) {
    return new Promise((resolve, reject) => {
        const options = {
            host: host,
            port: port,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (cookie) options.headers['Cookie'] = cookie;
        if (data) options.headers['Content-Length'] = Buffer.byteLength(data);

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    if (body) body = JSON.parse(body);
                } catch (e) { }
                resolve({ body: body, headers: res.headers, statusCode: res.statusCode });
            });
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

run();
