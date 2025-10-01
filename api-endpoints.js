// RESTful API Endpoints for Fraud Detection Dashboard
// Implements comprehensive API for external integrations and data access

class FraudDetectionAPI {
    constructor() {
        this.baseURL = '/api/v1';
        this.endpoints = new Map();
        this.middleware = [];
        this.rateLimiter = new Map();
        this.requestLog = [];
        
        this.initializeAPI();
    }

    // Initialize API system
    initializeAPI() {
        this.setupEndpoints();
        this.setupMiddleware();
        this.setupRateLimiting();
        this.setupCORS();
        this.setupErrorHandling();
    }

    // Setup API endpoints
    setupEndpoints() {
        // Authentication endpoints
        this.addEndpoint('POST', '/auth/login', this.handleLogin);
        this.addEndpoint('POST', '/auth/logout', this.handleLogout);
        this.addEndpoint('GET', '/auth/verify', this.handleVerifyToken);
        
        // Transaction endpoints
        this.addEndpoint('GET', '/transactions', this.handleGetTransactions);
        this.addEndpoint('POST', '/transactions', this.handleCreateTransaction);
        this.addEndpoint('GET', '/transactions/:id', this.handleGetTransaction);
        this.addEndpoint('PUT', '/transactions/:id', this.handleUpdateTransaction);
        this.addEndpoint('DELETE', '/transactions/:id', this.handleDeleteTransaction);
        
        // Fraud detection endpoints
        this.addEndpoint('POST', '/fraud/detect', this.handleFraudDetection);
        this.addEndpoint('GET', '/fraud/alerts', this.handleGetAlerts);
        this.addEndpoint('PUT', '/fraud/alerts/:id', this.handleUpdateAlert);
        
        // Analytics endpoints
        this.addEndpoint('GET', '/analytics/dashboard', this.handleGetDashboardData);
        this.addEndpoint('GET', '/analytics/reports', this.handleGetReports);
        this.addEndpoint('POST', '/analytics/export', this.handleExportData);
        
        // User management endpoints
        this.addEndpoint('GET', '/users', this.handleGetUsers);
        this.addEndpoint('POST', '/users', this.handleCreateUser);
        this.addEndpoint('GET', '/users/:id', this.handleGetUser);
        this.addEndpoint('PUT', '/users/:id', this.handleUpdateUser);
        this.addEndpoint('DELETE', '/users/:id', this.handleDeleteUser);
        
        // System endpoints
        this.addEndpoint('GET', '/system/health', this.handleSystemHealth);
        this.addEndpoint('GET', '/system/metrics', this.handleSystemMetrics);
        this.addEndpoint('POST', '/system/webhook', this.handleWebhook);
    }

    // Add endpoint
    addEndpoint(method, path, handler) {
        const key = `${method}:${path}`;
        this.endpoints.set(key, {
            method,
            path,
            handler,
            middleware: []
        });
    }

    // Setup middleware
    setupMiddleware() {
        // Authentication middleware
        this.addMiddleware('auth', this.authenticateRequest);
        
        // Rate limiting middleware
        this.addMiddleware('rateLimit', this.checkRateLimit);
        
        // Logging middleware
        this.addMiddleware('logging', this.logRequest);
        
        // CORS middleware
        this.addMiddleware('cors', this.handleCORS);
    }

    // Add middleware
    addMiddleware(name, handler) {
        this.middleware.push({ name, handler });
    }

    // Handle API request
    async handleRequest(method, path, body = null, headers = {}) {
        try {
            const endpointKey = `${method}:${path}`;
            const endpoint = this.endpoints.get(endpointKey);
            
            if (!endpoint) {
                return this.createErrorResponse(404, 'Endpoint not found');
            }
            
            // Apply middleware
            for (const middleware of this.middleware) {
                const result = await middleware.handler(method, path, body, headers);
                if (result.error) {
                    return result;
                }
            }
            
            // Execute endpoint handler
            const result = await endpoint.handler(method, path, body, headers);
            
            // Log successful request
            this.logRequest(method, path, body, headers, result);
            
            return result;
            
        } catch (error) {
            console.error('API Error:', error);
            return this.createErrorResponse(500, 'Internal server error');
        }
    }

    // Authentication handlers
    async handleLogin(method, path, body, headers) {
        try {
            const { username, password, mfaCode } = body;
            
            if (!username || !password) {
                return this.createErrorResponse(400, 'Username and password required');
            }
            
            // Use UserManagementSystem for authentication
            if (window.UserManagementSystem) {
                const result = window.UserManagementSystem.authenticateUser(username, password, mfaCode);
                
                if (result.success) {
                    const token = this.generateJWT(result.user);
                    
                    return this.createSuccessResponse({
                        token: token,
                        user: {
                            id: result.user.id,
                            firstName: result.user.firstName,
                            lastName: result.user.lastName,
                            email: result.user.email,
                            role: result.user.role,
                            permissions: result.user.permissions
                        },
                        expiresIn: 3600 // 1 hour
                    });
                } else {
                    return this.createErrorResponse(401, result.message || 'Authentication failed');
                }
            } else {
                return this.createErrorResponse(500, 'Authentication system not available');
            }
            
        } catch (error) {
            return this.createErrorResponse(500, 'Login failed');
        }
    }

    async handleLogout(method, path, body, headers) {
        try {
            const token = this.extractToken(headers);
            if (token) {
                // Invalidate token (in production, add to blacklist)
                this.invalidateToken(token);
            }
            
            return this.createSuccessResponse({ message: 'Logged out successfully' });
            
        } catch (error) {
            return this.createErrorResponse(500, 'Logout failed');
        }
    }

    async handleVerifyToken(method, path, body, headers) {
        try {
            const token = this.extractToken(headers);
            
            if (!token) {
                return this.createErrorResponse(401, 'Token required');
            }
            
            const decoded = this.verifyJWT(token);
            
            if (decoded) {
                return this.createSuccessResponse({
                    valid: true,
                    user: decoded.user
                });
            } else {
                return this.createErrorResponse(401, 'Invalid token');
            }
            
        } catch (error) {
            return this.createErrorResponse(401, 'Token verification failed');
        }
    }

    // Transaction handlers
    async handleGetTransactions(method, path, body, headers) {
        try {
            const queryParams = this.parseQueryParams(path);
            const limit = parseInt(queryParams.limit) || 50;
            const offset = parseInt(queryParams.offset) || 0;
            const status = queryParams.status;
            
            // Get transactions from application data
            let transactions = applicationData.transactions || [];
            
            // Apply filters
            if (status) {
                transactions = transactions.filter(t => t.status === status);
            }
            
            // Apply pagination
            const paginatedTransactions = transactions.slice(offset, offset + limit);
            
            return this.createSuccessResponse({
                transactions: paginatedTransactions,
                pagination: {
                    total: transactions.length,
                    limit: limit,
                    offset: offset,
                    hasMore: offset + limit < transactions.length
                }
            });
            
        } catch (error) {
            return this.createErrorResponse(500, 'Failed to fetch transactions');
        }
    }

    async handleCreateTransaction(method, path, body, headers) {
        try {
            const { amount, type, originAccount, destinationAccount, metadata } = body;
            
            if (!amount || !type || !originAccount || !destinationAccount) {
                return this.createErrorResponse(400, 'Required fields missing');
            }
            
            // Create transaction
            const transaction = {
                id: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                amount: amount,
                type: type,
                originAccount: originAccount,
                destinationAccount: destinationAccount,
                timestamp: new Date().toISOString(),
                status: 'pending',
                metadata: metadata || {}
            };
            
            // Perform fraud detection
            if (window.AdvancedAnalytics) {
                const analysis = window.AdvancedAnalytics.analyzeTransaction(transaction);
                transaction.fraudAnalysis = analysis;
                transaction.riskScore = analysis.riskScore;
                transaction.fraudProbability = analysis.fraudProbability;
            }
            
            // Add to application data
            if (!applicationData.transactions) {
                applicationData.transactions = [];
            }
            applicationData.transactions.push(transaction);
            
            return this.createSuccessResponse({
                transaction: transaction,
                message: 'Transaction created successfully'
            });
            
        } catch (error) {
            return this.createErrorResponse(500, 'Failed to create transaction');
        }
    }

    // Fraud detection handlers
    async handleFraudDetection(method, path, body, headers) {
        try {
            const { transaction } = body;
            
            if (!transaction) {
                return this.createErrorResponse(400, 'Transaction data required');
            }
            
            if (window.AdvancedAnalytics) {
                const analysis = window.AdvancedAnalytics.analyzeTransaction(transaction);
                
                return this.createSuccessResponse({
                    analysis: analysis,
                    recommendation: this.getFraudRecommendation(analysis.riskLevel)
                });
            } else {
                return this.createErrorResponse(500, 'Fraud detection system not available');
            }
            
        } catch (error) {
            return this.createErrorResponse(500, 'Fraud detection failed');
        }
    }

    // Analytics handlers
    async handleGetDashboardData(method, path, body, headers) {
        try {
            const dashboardData = {
                fraudStats: applicationData.fraudStats,
                modelPerformance: applicationData.modelPerformance,
                transactionTypes: applicationData.transactionTypes,
                hourlyFraud: applicationData.hourlyFraud,
                riskFactors: applicationData.riskFactors,
                countries: applicationData.countries,
                deviceTypes: applicationData.deviceTypes
            };
            
            return this.createSuccessResponse(dashboardData);
            
        } catch (error) {
            return this.createErrorResponse(500, 'Failed to fetch dashboard data');
        }
    }

    // User management handlers
    async handleGetUsers(method, path, body, headers) {
        try {
            if (!window.UserManagementSystem) {
                return this.createErrorResponse(500, 'User management system not available');
            }
            
            const users = Array.from(window.UserManagementSystem.users.values());
            const sanitizedUsers = users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                role: user.role,
                department: user.department,
                status: user.status,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt
            }));
            
            return this.createSuccessResponse({
                users: sanitizedUsers,
                total: sanitizedUsers.length
            });
            
        } catch (error) {
            return this.createErrorResponse(500, 'Failed to fetch users');
        }
    }

    // System handlers
    async handleSystemHealth(method, path, body, headers) {
        try {
            const health = {
                status: 'healthy',
                timestamp: new Date().toISOString(),
                services: {
                    database: 'connected',
                    fraudDetection: 'operational',
                    userManagement: 'operational',
                    realTimeUpdates: 'operational'
                },
                metrics: {
                    uptime: this.getUptime(),
                    memoryUsage: this.getMemoryUsage(),
                    cpuUsage: this.getCPUUsage()
                }
            };
            
            return this.createSuccessResponse(health);
            
        } catch (error) {
            return this.createErrorResponse(500, 'Health check failed');
        }
    }

    // Utility methods
    generateJWT(user) {
        // Simplified JWT generation (in production, use proper JWT library)
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            },
            exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour
        }));
        const signature = btoa('fraud-detection-secret');
        
        return `${header}.${payload}.${signature}`;
    }

    verifyJWT(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            
            const payload = JSON.parse(atob(parts[1]));
            
            // Check expiration
            if (payload.exp < Math.floor(Date.now() / 1000)) {
                return null;
            }
            
            return payload;
        } catch (error) {
            return null;
        }
    }

    extractToken(headers) {
        const authHeader = headers.Authorization || headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }
        return null;
    }

    createSuccessResponse(data, statusCode = 200) {
        return {
            success: true,
            statusCode: statusCode,
            data: data,
            timestamp: new Date().toISOString()
        };
    }

    createErrorResponse(statusCode, message) {
        return {
            success: false,
            statusCode: statusCode,
            error: {
                message: message,
                timestamp: new Date().toISOString()
            }
        };
    }

    // Middleware implementations
    async authenticateRequest(method, path, body, headers) {
        // Skip authentication for login endpoint
        if (path.includes('/auth/login')) {
            return { success: true };
        }
        
        const token = this.extractToken(headers);
        if (!token) {
            return this.createErrorResponse(401, 'Authentication required');
        }
        
        const decoded = this.verifyJWT(token);
        if (!decoded) {
            return this.createErrorResponse(401, 'Invalid token');
        }
        
        return { success: true, user: decoded.user };
    }

    async checkRateLimit(method, path, body, headers) {
        const clientIP = headers['x-forwarded-for'] || '127.0.0.1';
        const now = Date.now();
        const windowStart = now - 60000; // 1 minute window
        
        if (!this.rateLimiter.has(clientIP)) {
            this.rateLimiter.set(clientIP, []);
        }
        
        const requests = this.rateLimiter.get(clientIP);
        const recentRequests = requests.filter(time => time > windowStart);
        
        if (recentRequests.length >= 100) { // 100 requests per minute
            return this.createErrorResponse(429, 'Rate limit exceeded');
        }
        
        recentRequests.push(now);
        this.rateLimiter.set(clientIP, recentRequests);
        
        return { success: true };
    }

    async logRequest(method, path, body, headers, response = null) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            method: method,
            path: path,
            statusCode: response?.statusCode || 200,
            userAgent: headers['user-agent'] || 'Unknown',
            ip: headers['x-forwarded-for'] || '127.0.0.1'
        };
        
        this.requestLog.push(logEntry);
        
        // Keep only last 1000 entries
        if (this.requestLog.length > 1000) {
            this.requestLog = this.requestLog.slice(-1000);
        }
    }

    async handleCORS(method, path, body, headers) {
        // CORS headers would be set here in a real implementation
        return { success: true };
    }

    // Additional utility methods
    parseQueryParams(path) {
        const url = new URL(path, 'http://localhost');
        const params = {};
        url.searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

    getFraudRecommendation(riskLevel) {
        const recommendations = {
            'critical': 'Immediate transaction blocking required',
            'high': 'Enhanced verification recommended',
            'medium': 'Standard verification process',
            'low': 'Routine processing'
        };
        return recommendations[riskLevel] || 'Review transaction';
    }

    getUptime() {
        return process.uptime ? process.uptime() : 0;
    }

    getMemoryUsage() {
        return process.memoryUsage ? process.memoryUsage() : { used: 0, total: 0 };
    }

    getCPUUsage() {
        return 0; // Simplified
    }

    invalidateToken(token) {
        // In production, add token to blacklist
        console.log('Token invalidated:', token);
    }
}

// Initialize API system
const fraudDetectionAPI = new FraudDetectionAPI();

// Export for use in other modules
window.FraudDetectionAPI = fraudDetectionAPI;

// Mock server for development
class MockAPIServer {
    constructor() {
        this.server = null;
        this.port = 3001;
        this.setupMockServer();
    }

    setupMockServer() {
        // In a real implementation, this would be a proper HTTP server
        console.log('Mock API Server initialized on port', this.port);
        
        // Simulate API endpoints
        this.simulateEndpoints();
    }

    simulateEndpoints() {
        // Simulate API responses for development
        window.mockAPI = {
            get: async (path) => {
                return await fraudDetectionAPI.handleRequest('GET', path);
            },
            post: async (path, body) => {
                return await fraudDetectionAPI.handleRequest('POST', path, body);
            },
            put: async (path, body) => {
                return await fraudDetectionAPI.handleRequest('PUT', path, body);
            },
            delete: async (path) => {
                return await fraudDetectionAPI.handleRequest('DELETE', path);
            }
        };
    }
}

// Initialize mock server
const mockAPIServer = new MockAPIServer();
