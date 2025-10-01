// Advanced Security Module for Fraud Detection Dashboard
// Implements authentication, encryption, audit logging, and session management

class SecurityManager {
    constructor() {
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.maxLoginAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
        this.auditLog = [];
        this.activeSessions = new Map();
        this.failedAttempts = new Map();
        this.encryptionKey = this.generateEncryptionKey();
        
        this.initializeSecurity();
    }

    // Initialize security measures
    initializeSecurity() {
        this.setupSessionManagement();
        this.setupAuditLogging();
        this.setupCSRFProtection();
        this.setupContentSecurityPolicy();
        this.setupRateLimiting();
        this.monitorSecurityEvents();
    }

    // Generate encryption key for sensitive data
    generateEncryptionKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Encrypt sensitive data
    async encryptData(data) {
        try {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            const key = await crypto.subtle.importKey(
                'raw',
                new Uint8Array(this.encryptionKey.split('').map(c => c.charCodeAt(0))),
                { name: 'AES-GCM' },
                false,
                ['encrypt']
            );
            
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                dataBuffer
            );
            
            return {
                encrypted: Array.from(new Uint8Array(encrypted)),
                iv: Array.from(iv)
            };
        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error('Data encryption failed');
        }
    }

    // Decrypt sensitive data
    async decryptData(encryptedData) {
        try {
            const key = await crypto.subtle.importKey(
                'raw',
                new Uint8Array(this.encryptionKey.split('').map(c => c.charCodeAt(0))),
                { name: 'AES-GCM' },
                false,
                ['decrypt']
            );
            
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
                key,
                new Uint8Array(encryptedData.encrypted)
            );
            
            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decrypted));
        } catch (error) {
            console.error('Decryption error:', error);
            throw new Error('Data decryption failed');
        }
    }

    // Session Management
    setupSessionManagement() {
        // Check for existing session
        const sessionId = localStorage.getItem('sessionId');
        if (sessionId && this.validateSession(sessionId)) {
            this.refreshSession(sessionId);
        } else {
            this.createNewSession();
        }

        // Auto-refresh session
        setInterval(() => {
            this.refreshActiveSessions();
        }, 5 * 60 * 1000); // Every 5 minutes

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseSession();
            } else {
                this.resumeSession();
            }
        });
    }

    // Create new session
    createNewSession() {
        const sessionId = this.generateSessionId();
        const sessionData = {
            id: sessionId,
            created: Date.now(),
            lastActivity: Date.now(),
            ip: this.getClientIP(),
            userAgent: navigator.userAgent,
            permissions: this.getDefaultPermissions(),
            isActive: true
        };

        this.activeSessions.set(sessionId, sessionData);
        localStorage.setItem('sessionId', sessionId);
        
        this.logSecurityEvent('SESSION_CREATED', {
            sessionId: sessionId,
            ip: sessionData.ip,
            userAgent: sessionData.userAgent
        });

        return sessionId;
    }

    // Validate session
    validateSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) return false;

        const now = Date.now();
        const timeSinceLastActivity = now - session.lastActivity;

        if (timeSinceLastActivity > this.sessionTimeout) {
            this.invalidateSession(sessionId);
            return false;
        }

        return true;
    }

    // Refresh session
    refreshSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (session) {
            session.lastActivity = Date.now();
            this.activeSessions.set(sessionId, session);
        }
    }

    // Generate session ID
    generateSessionId() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Get client IP (simplified - in real app, get from server)
    getClientIP() {
        return '127.0.0.1'; // Placeholder
    }

    // Get default permissions
    getDefaultPermissions() {
        return {
            viewDashboard: true,
            viewReports: true,
            manageAlerts: true,
            systemSettings: false,
            userManagement: false,
            dataExport: false
        };
    }

    // Audit Logging
    setupAuditLogging() {
        // Log all user actions
        this.originalConsoleLog = console.log;
        console.log = (...args) => {
            this.logSecurityEvent('CONSOLE_LOG', { message: args.join(' ') });
            this.originalConsoleLog.apply(console, args);
        };

        // Log form submissions
        document.addEventListener('submit', (event) => {
            this.logSecurityEvent('FORM_SUBMISSION', {
                formId: event.target.id,
                formAction: event.target.action,
                timestamp: new Date().toISOString()
            });
        });

        // Log navigation
        window.addEventListener('beforeunload', () => {
            this.logSecurityEvent('PAGE_UNLOAD', {
                url: window.location.href,
                timestamp: new Date().toISOString()
            });
        });
    }

    // Log security events
    logSecurityEvent(eventType, details) {
        const logEntry = {
            id: this.generateLogId(),
            timestamp: new Date().toISOString(),
            eventType: eventType,
            details: details,
            sessionId: localStorage.getItem('sessionId'),
            severity: this.getEventSeverity(eventType)
        };

        this.auditLog.push(logEntry);
        
        // Keep only last 1000 entries
        if (this.auditLog.length > 1000) {
            this.auditLog = this.auditLog.slice(-1000);
        }

        // Store in localStorage for persistence
        localStorage.setItem('auditLog', JSON.stringify(this.auditLog));

        // Send to server in production
        this.sendAuditLogToServer(logEntry);
    }

    // Get event severity
    getEventSeverity(eventType) {
        const severityMap = {
            'LOGIN_SUCCESS': 'INFO',
            'LOGIN_FAILED': 'WARNING',
            'SESSION_CREATED': 'INFO',
            'SESSION_EXPIRED': 'WARNING',
            'UNAUTHORIZED_ACCESS': 'CRITICAL',
            'DATA_EXPORT': 'INFO',
            'SETTINGS_CHANGE': 'WARNING',
            'USER_CREATION': 'INFO',
            'PERMISSION_CHANGE': 'CRITICAL'
        };
        return severityMap[eventType] || 'INFO';
    }

    // Generate log ID
    generateLogId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // CSRF Protection
    setupCSRFProtection() {
        const csrfToken = this.generateCSRFToken();
        localStorage.setItem('csrfToken', csrfToken);
        
        // Add token to all forms
        document.addEventListener('DOMContentLoaded', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'csrfToken';
                tokenInput.value = csrfToken;
                form.appendChild(tokenInput);
            });
        });
    }

    // Generate CSRF token
    generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Content Security Policy
    setupContentSecurityPolicy() {
        const csp = `
            default-src 'self';
            script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https:;
            connect-src 'self' wss: ws:;
            font-src 'self' https:;
        `;
        
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = csp.trim();
        document.head.appendChild(meta);
    }

    // Rate Limiting
    setupRateLimiting() {
        this.requestCounts = new Map();
        this.rateLimitWindow = 60 * 1000; // 1 minute
        this.maxRequests = 100; // Max requests per minute

        // Intercept fetch requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            if (!this.checkRateLimit()) {
                throw new Error('Rate limit exceeded');
            }
            return originalFetch.apply(this, args);
        };
    }

    // Check rate limit
    checkRateLimit() {
        const now = Date.now();
        const windowStart = now - this.rateLimitWindow;
        
        // Clean old entries
        for (const [timestamp, count] of this.requestCounts) {
            if (timestamp < windowStart) {
                this.requestCounts.delete(timestamp);
            }
        }

        // Count current requests
        const currentRequests = Array.from(this.requestCounts.values())
            .reduce((sum, count) => sum + count, 0);

        if (currentRequests >= this.maxRequests) {
            this.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
                currentRequests: currentRequests,
                maxRequests: this.maxRequests
            });
            return false;
        }

        // Increment counter
        const currentMinute = Math.floor(now / 60000);
        this.requestCounts.set(currentMinute, (this.requestCounts.get(currentMinute) || 0) + 1);

        return true;
    }

    // Monitor Security Events
    monitorSecurityEvents() {
        // Monitor for suspicious patterns
        setInterval(() => {
            this.detectSuspiciousActivity();
        }, 30 * 1000); // Every 30 seconds

        // Monitor for XSS attempts
        this.monitorXSSAttempts();
        
        // Monitor for clickjacking
        this.monitorClickjacking();
    }

    // Detect suspicious activity
    detectSuspiciousActivity() {
        const recentEvents = this.auditLog.filter(log => 
            Date.now() - new Date(log.timestamp).getTime() < 5 * 60 * 1000
        );

        // Check for multiple failed logins
        const failedLogins = recentEvents.filter(log => 
            log.eventType === 'LOGIN_FAILED'
        );

        if (failedLogins.length > 3) {
            this.logSecurityEvent('SUSPICIOUS_ACTIVITY', {
                type: 'MULTIPLE_FAILED_LOGINS',
                count: failedLogins.length,
                recommendation: 'Consider implementing account lockout'
            });
        }

        // Check for rapid requests
        const rapidRequests = recentEvents.filter(log => 
            log.eventType === 'FORM_SUBMISSION'
        );

        if (rapidRequests.length > 10) {
            this.logSecurityEvent('SUSPICIOUS_ACTIVITY', {
                type: 'RAPID_REQUESTS',
                count: rapidRequests.length,
                recommendation: 'Consider implementing additional rate limiting'
            });
        }
    }

    // Monitor XSS attempts
    monitorXSSAttempts() {
        const originalInnerHTML = Element.prototype.innerHTML;
        Element.prototype.innerHTML = function(value) {
            if (value && typeof value === 'string') {
                if (this.detectXSSPattern(value)) {
                    this.logSecurityEvent('XSS_ATTEMPT_DETECTED', {
                        element: this.tagName,
                        content: value.substring(0, 100),
                        timestamp: new Date().toISOString()
                    });
                    throw new Error('Potential XSS attack detected');
                }
            }
            return originalInnerHTML.call(this, value);
        };
    }

    // Detect XSS patterns
    detectXSSPattern(content) {
        const xssPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i,
            /<iframe/i,
            /<object/i,
            /<embed/i,
            /<link/i,
            /<meta/i
        ];

        return xssPatterns.some(pattern => pattern.test(content));
    }

    // Monitor clickjacking
    monitorClickjacking() {
        if (window.top !== window.self) {
            this.logSecurityEvent('CLICKJACKING_ATTEMPT', {
                url: window.location.href,
                timestamp: new Date().toISOString()
            });
            
            // Prevent clickjacking
            window.top.location = window.location;
        }
    }

    // Authentication Methods
    async authenticateUser(username, password, mfaCode = null) {
        const clientIP = this.getClientIP();
        const attemptKey = `${username}_${clientIP}`;
        
        // Check for account lockout
        if (this.isAccountLocked(attemptKey)) {
            this.logSecurityEvent('LOGIN_BLOCKED', {
                username: username,
                reason: 'Account locked due to multiple failed attempts'
            });
            throw new Error('Account temporarily locked. Please try again later.');
        }

        try {
            // Simulate authentication (replace with real authentication)
            const isValid = await this.validateCredentials(username, password);
            
            if (isValid) {
                // Check MFA if required
                if (mfaCode && !this.validateMFACode(username, mfaCode)) {
                    this.logSecurityEvent('MFA_FAILED', { username: username });
                    throw new Error('Invalid MFA code');
                }

                // Clear failed attempts
                this.failedAttempts.delete(attemptKey);
                
                // Create session
                const sessionId = this.createNewSession();
                
                this.logSecurityEvent('LOGIN_SUCCESS', {
                    username: username,
                    sessionId: sessionId,
                    ip: clientIP
                });

                return { success: true, sessionId: sessionId };
            } else {
                this.recordFailedAttempt(attemptKey);
                this.logSecurityEvent('LOGIN_FAILED', {
                    username: username,
                    ip: clientIP,
                    reason: 'Invalid credentials'
                });
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            this.recordFailedAttempt(attemptKey);
            throw error;
        }
    }

    // Validate credentials (simplified - replace with real validation)
    async validateCredentials(username, password) {
        // In production, this would make an API call to your authentication server
        const validUsers = {
            'admin': 'admin123',
            'analyst': 'analyst123',
            'viewer': 'viewer123'
        };
        
        return validUsers[username] === password;
    }

    // Validate MFA code
    validateMFACode(username, code) {
        // Simplified MFA validation
        // In production, integrate with TOTP or SMS service
        return code === '123456';
    }

    // Record failed attempt
    recordFailedAttempt(attemptKey) {
        const attempts = this.failedAttempts.get(attemptKey) || [];
        attempts.push(Date.now());
        this.failedAttempts.set(attemptKey, attempts);
    }

    // Check if account is locked
    isAccountLocked(attemptKey) {
        const attempts = this.failedAttempts.get(attemptKey) || [];
        const recentAttempts = attempts.filter(time => 
            Date.now() - time < this.lockoutDuration
        );
        
        return recentAttempts.length >= this.maxLoginAttempts;
    }

    // Send audit log to server
    async sendAuditLogToServer(logEntry) {
        try {
            // In production, send to your logging service
            console.log('Sending audit log to server:', logEntry);
            
            // Example: Send to server
            // await fetch('/api/audit-log', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(logEntry)
            // });
        } catch (error) {
            console.error('Failed to send audit log:', error);
        }
    }

    // Refresh active sessions
    refreshActiveSessions() {
        const now = Date.now();
        for (const [sessionId, session] of this.activeSessions) {
            if (now - session.lastActivity > this.sessionTimeout) {
                this.invalidateSession(sessionId);
            }
        }
    }

    // Invalidate session
    invalidateSession(sessionId) {
        this.activeSessions.delete(sessionId);
        localStorage.removeItem('sessionId');
        
        this.logSecurityEvent('SESSION_EXPIRED', {
            sessionId: sessionId,
            timestamp: new Date().toISOString()
        });
    }

    // Pause session
    pauseSession() {
        const sessionId = localStorage.getItem('sessionId');
        if (sessionId) {
            const session = this.activeSessions.get(sessionId);
            if (session) {
                session.isActive = false;
                this.activeSessions.set(sessionId, session);
            }
        }
    }

    // Resume session
    resumeSession() {
        const sessionId = localStorage.getItem('sessionId');
        if (sessionId) {
            const session = this.activeSessions.get(sessionId);
            if (session) {
                session.isActive = true;
                session.lastActivity = Date.now();
                this.activeSessions.set(sessionId, session);
            }
        }
    }

    // Get security dashboard data
    getSecurityDashboardData() {
        return {
            activeSessions: this.activeSessions.size,
            failedAttempts: this.failedAttempts.size,
            recentSecurityEvents: this.auditLog.slice(-10),
            securityScore: this.calculateSecurityScore(),
            recommendations: this.getSecurityRecommendations()
        };
    }

    // Calculate security score
    calculateSecurityScore() {
        let score = 100;
        
        // Deduct points for failed attempts
        score -= Math.min(this.failedAttempts.size * 5, 30);
        
        // Deduct points for recent security events
        const recentEvents = this.auditLog.filter(log => 
            Date.now() - new Date(log.timestamp).getTime() < 24 * 60 * 60 * 1000
        );
        score -= Math.min(recentEvents.length * 2, 20);
        
        return Math.max(score, 0);
    }

    // Get security recommendations
    getSecurityRecommendations() {
        const recommendations = [];
        
        if (this.failedAttempts.size > 0) {
            recommendations.push('Consider implementing stronger authentication measures');
        }
        
        if (this.activeSessions.size > 5) {
            recommendations.push('Monitor for unusual session activity');
        }
        
        const recentEvents = this.auditLog.filter(log => 
            Date.now() - new Date(log.timestamp).getTime() < 60 * 60 * 1000
        );
        
        if (recentEvents.length > 50) {
            recommendations.push('High activity detected - review audit logs');
        }
        
        return recommendations;
    }

    // Export security data
    exportSecurityData() {
        const data = {
            auditLog: this.auditLog,
            activeSessions: Array.from(this.activeSessions.entries()),
            failedAttempts: Array.from(this.failedAttempts.entries()),
            exportTimestamp: new Date().toISOString()
        };
        
        this.logSecurityEvent('DATA_EXPORT', {
            type: 'SECURITY_DATA',
            recordCount: this.auditLog.length
        });
        
        return data;
    }
}

// Initialize security manager
const securityManager = new SecurityManager();

// Export for use in other modules
window.SecurityManager = securityManager;
