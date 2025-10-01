# 🚀 Fraud Detection Dashboard - Local Hosting Guide

## 📋 Quick Start

### Option 1: Python Server (Recommended)
```bash
# Make the script executable (Linux/Mac)
chmod +x start-server.sh

# Start the server
./start-server.sh

# Or run directly with Python
python3 server.py
```

### Option 2: Node.js Server
```bash
# Start with Node.js
node server.js

# Or with custom port
node server.js 3000
```

### Option 3: Simple HTTP Server
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000
```

## 🌐 Access Your Dashboard

Once the server is running, open your browser and navigate to:

- **Main Dashboard**: http://localhost:8000
- **Direct Link**: http://localhost:8000/index.html

## 📁 Project Structure

```
fraud-detection-dashboard/
├── index.html              # Main dashboard page
├── app.js                  # Core application logic
├── style.css               # Styling and themes
├── security.js             # Security features
├── realtime.js             # Real-time functionality
├── analytics.js            # Advanced analytics
├── user-management.js      # User management system
├── api-endpoints.js        # RESTful API endpoints
├── server.py               # Python HTTP server
├── server.js               # Node.js HTTP server
├── start-server.sh         # Startup script
└── README.md               # This file
```

## 🔧 Features Available

### ✅ Implemented Features
- 🔐 **Advanced Authentication** with MFA support
- 👥 **User Management System** with roles and permissions
- 🔄 **Real-time Data Streaming** with WebSocket connections
- 📊 **Advanced Analytics** with predictive modeling
- 🛡️ **Security Dashboard** with audit logging
- 🌐 **RESTful API Endpoints** for external integrations
- 📱 **Responsive Design** optimized for all devices
- 🔔 **Notification System** with real-time alerts
- 📋 **Advanced Reporting** with custom reports
- ⚡ **Performance Optimizations** for smooth operation

### 🎯 Dashboard Sections
1. **Overview** - Main metrics and KPIs
2. **Transaction Analysis** - Real-time transaction monitoring
3. **Alerts** - Comprehensive alert management
4. **Analytics** - Advanced fraud detection analytics
5. **Reports** - Custom report generation
6. **Settings** - System configuration
7. **Security** - Security monitoring and management
8. **User Management** - User and role management

## 🚀 Getting Started

1. **Start the Server**:
   ```bash
   python3 server.py
   ```

2. **Open Your Browser**:
   Navigate to `http://localhost:8000`

3. **Login**:
   - Username: `admin`
   - Password: `admin123`
   - MFA Code: `123456` (for demo purposes)

## 🔧 Configuration

### Custom Port
```bash
# Python server
python3 server.py 3000

# Node.js server
node server.js 3000
```

### Environment Variables
```bash
# Set custom port
export PORT=3000
python3 server.py
```

## 📊 Demo Data

The dashboard comes with comprehensive demo data including:
- 20,000+ sample transactions
- Real-time fraud detection metrics
- Historical analytics data
- User management examples
- Security event logs

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# The server will automatically try the next available port
# Or specify a different port:
python3 server.py 3000
```

### File Not Found Errors
- Make sure you're running the server from the project directory
- Ensure all files are present in the directory
- Check file permissions

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## 🔒 Security Notes

- This is a **demo/development server**
- **Do not use in production** without proper security measures
- Default credentials are for demonstration only
- Enable HTTPS in production environments

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify all files are present
3. Ensure proper file permissions
4. Try a different port if needed

## 🎉 Enjoy Your Dashboard!

Your fraud detection dashboard is now running locally with all advanced features enabled!
