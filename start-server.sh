#!/bin/bash

# Fraud Detection Dashboard - Local Server Startup Script

echo "🚀 Starting Fraud Detection Dashboard Server..."
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    python3 server.py "$@"
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    python server.py "$@"
else
    echo "❌ Python not found. Please install Python 3"
    echo ""
    echo "Alternative: Use Node.js server"
    if command -v node &> /dev/null; then
        echo "✅ Node.js found, starting alternative server..."
        node server.js "$@"
    else
        echo "❌ Neither Python nor Node.js found"
        echo "Please install Python 3 or Node.js to run the server"
        exit 1
    fi
fi
