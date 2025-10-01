#!/usr/bin/env python3
"""
Simple HTTP Server for Fraud Detection Dashboard
Serves the dashboard locally with proper MIME types and CORS headers
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class FraudDetectionHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for API requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.end_headers()
    
    def guess_type(self, path):
        """Override to set correct MIME types"""
        mimetype, encoding = super().guess_type(path)
        
        # Ensure JavaScript files are served with correct MIME type
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.json'):
            return 'application/json'
        
        return mimetype
    
    def log_message(self, format, *args):
        """Custom log format"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def start_server(port=8000):
    """Start the local server"""
    try:
        with socketserver.TCPServer(("", port), FraudDetectionHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("🚀 FRAUD DETECTION DASHBOARD - LOCAL SERVER")
            print("=" * 60)
            print(f"📡 Server running at: http://localhost:{port}")
            print(f"📁 Serving directory: {os.getcwd()}")
            print("=" * 60)
            print("🌐 Open your browser and navigate to:")
            print(f"   http://localhost:{port}")
            print("=" * 60)
            print("📋 Available endpoints:")
            print(f"   • Dashboard: http://localhost:{port}/index.html")
            print(f"   • API Docs: http://localhost:{port}/api-endpoints.js")
            print("=" * 60)
            print("⏹️  Press Ctrl+C to stop the server")
            print("=" * 60)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Trying port {port + 1}...")
            start_server(port + 1)
        else:
            print(f"❌ Error starting server: {e}")
            sys.exit(1)

if __name__ == "__main__":
    # Get port from command line argument or use default
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    start_server(port)
