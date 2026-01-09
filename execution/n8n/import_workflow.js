const http = require('http');
const fs = require('fs');

async function req(path, method, data, cookie) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5678,
            path: '/rest' + path,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (cookie) options.headers['Cookie'] = cookie;

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    resolve({ status: res.statusCode, headers: res.headers, body: json });
                } catch (e) { resolve({ status: res.statusCode, headers: res.headers, body }); }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

(async () => {
    try {
        console.log('Logging in...');
        const login = await req('/login', 'POST', { emailOrLdapLoginId: 'admin@gabrielnetto.com', password: 'GabrielNetto2026!' });
        console.log('Login Status:', login.status);
        const cookie = login.headers['set-cookie'] ? login.headers['set-cookie'][0].split(';')[0] : null;

        console.log('Reading workflow...');
        const wf = JSON.parse(fs.readFileSync('/tmp/ai_workflow.json', 'utf8'));

        console.log('Checking for existing workflow...');
        const list = await req('/workflows', 'GET', null, cookie);
        if (list.body.data) {
            const existing = list.body.data.find(w => w.name === wf.name);
            if (existing) {
                console.log('Deleting existing workflow:', existing.id);
                await req('/workflows/' + existing.id, 'DELETE', null, cookie);
            }
        }

        console.log('Importing...');
        const imp = await req('/workflows', 'POST', { ...wf, active: true }, cookie);
        console.log('Import Status:', imp.status);
        console.log('Import Body:', JSON.stringify(imp.body));
        const validId = imp.body.id || (imp.body.data && imp.body.data.id);
        const versionId = imp.body.versionId || (imp.body.data && imp.body.data.versionId); // Extract versionId
        console.log('Resolved ID:', validId);
        console.log('Resolved VersionID:', versionId);

        if (validId && versionId) {
            console.log('Activating via POST with versionId...');
            const act = await req('/workflows/' + validId + '/activate', 'POST', { versionId: versionId }, cookie);
            console.log('Activation Status:', act.status);
            console.log('Activation Body:', JSON.stringify(act.body));

            console.log('Verifying active workflow...');
            const finalWf = await req('/workflows/' + validId, 'GET', null, cookie);
            console.log('Final Workflow Config:', JSON.stringify(finalWf.body));
        }
    } catch (e) { console.error(e); }
})();
