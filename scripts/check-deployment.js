#!/usr/bin/env node

// Deployment checker script
import https from 'https';
import fs from 'fs';

const DOMAIN = 'redtest.ai';
const WWW_DOMAIN = 'www.redtest.ai';

function checkSSL(hostname) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname,
            port: 443,
            path: '/',
            method: 'GET',
            timeout: 10000
        };

        const req = https.request(options, (res) => {
            const cert = res.connection.getPeerCertificate();
            resolve({
                hostname,
                statusCode: res.statusCode,
                ssl: {
                    valid: res.connection.authorized,
                    issuer: cert.issuer?.O,
                    validFrom: cert.valid_from,
                    validTo: cert.valid_to,
                    subject: cert.subject?.CN
                }
            });
        });

        req.on('error', (error) => {
            reject({ hostname, error: error.message });
        });

        req.on('timeout', () => {
            req.destroy();
            reject({ hostname, error: 'Request timeout' });
        });

        req.end();
    });
}

async function checkDeployment() {
    console.log('🔍 Checking RedTest.ai deployment...\n');

    const checks = [
        { name: 'Main Domain', url: DOMAIN },
        { name: 'WWW Domain', url: WWW_DOMAIN }
    ];

    for (const check of checks) {
        try {
            console.log(`Checking ${check.name} (${check.url})...`);
            const result = await checkSSL(check.url);
            
            console.log(`✅ ${check.name}: HTTPS working`);
            console.log(`   Status: ${result.statusCode}`);
            console.log(`   SSL Valid: ${result.ssl.valid ? 'Yes' : 'No'}`);
            console.log(`   Issuer: ${result.ssl.issuer || 'Unknown'}`);
            console.log(`   Expires: ${result.ssl.validTo}`);
            console.log('');
            
        } catch (error) {
            console.log(`❌ ${check.name}: ${error.error}`);
            console.log('');
        }
    }

    // Check if AWS configuration exists
    if (fs.existsSync('.env.aws')) {
        console.log('📄 AWS Configuration found:');
        const config = fs.readFileSync('.env.aws', 'utf8');
        config.split('\n').forEach(line => {
            if (line.trim()) {
                console.log(`   ${line}`);
            }
        });
    } else {
        console.log('⚠️  No AWS configuration file found (.env.aws)');
    }

    console.log('\n🎉 Deployment check complete!');
}

checkDeployment().catch(console.error);