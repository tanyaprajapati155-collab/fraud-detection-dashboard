#!/usr/bin/env node

/**
 * Node.js HTTP Server for Fraud Detection Dashboard
 * Alternative server implementation for environments without Python
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.argv[2] || 8000;

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Default file to serve
const defaultFile = 'index.html';

// Create server
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Handle root path
    if (pathname === '/') {
        pathname = '/' + defaultFile;
    }
    
    // Remove leading slash for file system
    const filePath = path.join(__dirname, pathname.substring(1));
    
    // Security check - prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // File not found, try to serve index.html
            const indexPath = path.join(__dirname, defaultFile);
            fs.readFile(indexPath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(`
                        <html>
                            <head><title>404 - File Not Found</title></head>
                            <body>
                                <h1>404 - File Not Found</h1>
                                <p>The requested file could not be found.</p>
                                <p>Make sure you're running this server from the fraud-detection-dashboard directory.</p>
                            </body>
                        </html>
                    `);
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            return;
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            
            // Determine content type
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Start server
server.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 FRAUD DETECTION DASHBOARD - LOCAL SERVER (Node.js)');
    console.log('='.repeat(60));
    console.log(`📡 Server running at: http://localhost:${PORT}`);
    console.log(`📁 Serving directory: ${__dirname}`);
    console.log('='.repeat(60));
    console.log('🌐 Open your browser and navigate to:');
    console.log(`   http://localhost:${PORT}`);
    console.log('='.repeat(60));
    console.log('📋 Available endpoints:');
    console.log(`   • Dashboard: http://localhost:${PORT}/index.html`);
    console.log(`   • API Docs: http://localhost:${PORT}/api-endpoints.js`);
    console.log('='.repeat(60));
    console.log('⏹️  Press Ctrl+C to stop the server');
    console.log('='.repeat(60));
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
        server.listen(PORT + 1);
    } else {
        console.error('❌ Server error:', err);
        process.exit(1);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server stopped by user');
    server.close(() => {
        process.exit(0);
    });
});
