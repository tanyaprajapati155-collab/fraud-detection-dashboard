
// Application data
const applicationData = {
  "fraudStats": {
    "totalTransactions": 20000,
    "fraudDetected": 3502,
    "fraudRate": 17.51,
    "accuracyRate": 94.2,
    "falsePositives": 156,
    "falseNegatives": 89
  },
  "modelPerformance": [
    {
      "name": "XGBoost",
      "accuracy": 0.952,
      "precision": 0.847,
      "recall": 0.734,
      "f1Score": 0.786,
      "aucRoc": 0.923
    },
    {
      "name": "Random Forest",
      "accuracy": 0.945,
      "precision": 0.821,
      "recall": 0.689,
      "f1Score": 0.749,
      "aucRoc": 0.891
    },
    {
      "name": "Logistic Regression",
      "accuracy": 0.887,
      "precision": 0.645,
      "recall": 0.723,
      "f1Score": 0.682,
      "aucRoc": 0.834
    },
    {
      "name": "SVM",
      "accuracy": 0.923,
      "precision": 0.756,
      "recall": 0.678,
      "f1Score": 0.715,
      "aucRoc": 0.868
    }
  ],
  "transactionTypes": [
    { "type": "CASH_OUT", "count": 6000, "fraudRate": 0.35 },
    { "type": "PAYMENT", "count": 5000, "fraudRate": 0.12 },
    { "type": "CASH_IN", "count": 3000, "fraudRate": 0.08 },
    { "type": "TRANSFER", "count": 4000, "fraudRate": 0.28 },
    { "type": "DEBIT", "count": 2000, "fraudRate": 0.15 }
  ],
  "hourlyFraud": [
    { "hour": 0, "fraudCount": 45 },
    { "hour": 1, "fraudCount": 52 },
    { "hour": 2, "fraudCount": 67 },
    { "hour": 3, "fraudCount": 78 },
    { "hour": 4, "fraudCount": 56 },
    { "hour": 5, "fraudCount": 34 },
    { "hour": 6, "fraudCount": 23 },
    { "hour": 7, "fraudCount": 31 },
    { "hour": 8, "fraudCount": 28 },
    { "hour": 9, "fraudCount": 25 },
    { "hour": 10, "fraudCount": 22 },
    { "hour": 11, "fraudCount": 19 },
    { "hour": 12, "fraudCount": 26 },
    { "hour": 13, "fraudCount": 33 },
    { "hour": 14, "fraudCount": 38 },
    { "hour": 15, "fraudCount": 42 },
    { "hour": 16, "fraudCount": 48 },
    { "hour": 17, "fraudCount": 54 },
    { "hour": 18, "fraudCount": 61 },
    { "hour": 19, "fraudCount": 58 },
    { "hour": 20, "fraudCount": 69 },
    { "hour": 21, "fraudCount": 74 },
    { "hour": 22, "fraudCount": 82 },
    { "hour": 23, "fraudCount": 71 }
  ],
  "riskFactors": [
    "High Transaction Amount",
    "Unusual Hours (Night)",
    "New Account (< 30 days)",
    "Rapid Transactions",
    "International Transaction",
    "Balance Inconsistency",
    "API Device Type",
    "Risky Transaction Type"
  ],
  "countries": [
    { "code": "US", "name": "United States", "fraudRate": 0.14 },
    { "code": "UK", "name": "United Kingdom", "fraudRate": 0.18 },
    { "code": "CA", "name": "Canada", "fraudRate": 0.16 },
    { "code": "AU", "name": "Australia", "fraudRate": 0.19 },
    { "code": "DE", "name": "Germany", "fraudRate": 0.22 }
  ],
  "deviceTypes": [
    { "type": "mobile", "fraudRate": 0.15 },
    { "type": "web", "fraudRate": 0.17 },
    { "type": "api", "fraudRate": 0.24 }
  ],
  "alerts": [
    {
      "id": 1,
      "type": "critical",
      "title": "High-Risk Transaction Detected",
      "description": "Transaction amount $50,000 from new account flagged as suspicious",
      "timestamp": "2024-01-15T10:30:00Z",
      "status": "new",
      "priority": "critical",
      "source": "fraud-detection",
      "assignedTo": null,
      "responseTime": null
    },
    {
      "id": 2,
      "type": "security",
      "title": "Multiple Failed Login Attempts",
      "description": "User account showing 5 failed login attempts in 10 minutes",
      "timestamp": "2024-01-15T09:45:00Z",
      "status": "acknowledged",
      "priority": "high",
      "source": "security-monitor",
      "assignedTo": "Security Team",
      "responseTime": "5m"
    },
    {
      "id": 3,
      "type": "system",
      "title": "Database Connection Pool Exhausted",
      "description": "Database connection pool at 95% capacity",
      "timestamp": "2024-01-15T08:20:00Z",
      "status": "in-progress",
      "priority": "medium",
      "source": "system-monitor",
      "assignedTo": "DevOps Team",
      "responseTime": "15m"
    },
    {
      "id": 4,
      "type": "performance",
      "title": "API Response Time Degradation",
      "description": "Average API response time increased by 200%",
      "timestamp": "2024-01-15T07:15:00Z",
      "status": "resolved",
      "priority": "medium",
      "source": "performance-monitor",
      "assignedTo": "Backend Team",
      "responseTime": "30m"
    },
    {
      "id": 5,
      "type": "fraud",
      "title": "Suspicious Transaction Pattern",
      "description": "Unusual spending pattern detected for account #12345",
      "timestamp": "2024-01-15T06:30:00Z",
      "status": "new",
      "priority": "high",
      "source": "fraud-detection",
      "assignedTo": null,
      "responseTime": null
    }
  ]
};

// Chart instances
let transactionChart, hourlyChart, modelChart, geographicChart;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Check authentication first
        checkAuthentication();
        
    initializeDashboard();
    setupEventListeners();
    createCharts();
    populateModelTable();
        initializeTabs();
        setupFormValidation();
        initializeAlerts();
        initializeSecurityFeatures();
        initializeRealTimeFeatures();
        initializeAdvancedAnalytics();
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showNotification('Failed to initialize dashboard', 'error');
    }
});

// Check authentication status
function checkAuthentication() {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId || !window.SecurityManager.validateSession(sessionId)) {
        showAuthenticationModal();
    } else {
        // Update user info based on session
        updateUserInfo();
    }
}

// Show authentication modal
function showAuthenticationModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.classList.remove('hidden');
        setupAuthenticationHandlers();
    }
}

// Setup authentication handlers
function setupAuthenticationHandlers() {
    const authForm = document.getElementById('authForm');
    const passwordInput = document.getElementById('password');
    const mfaGroup = document.getElementById('mfaGroup');
    
    if (authForm) {
        authForm.addEventListener('submit', handleAuthentication);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', handlePasswordStrength);
    }
}

// Handle authentication
async function handleAuthentication(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const mfaCode = document.getElementById('mfaCode').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
        const result = await window.SecurityManager.authenticateUser(username, password, mfaCode);
        
        if (result.success) {
            // Close auth modal
            document.getElementById('authModal').classList.add('hidden');
            
            // Update UI
            updateUserInfo(username);
            
            // Show success notification
            showNotification('Authentication successful', 'success');
            
            // Log successful login
            window.SecurityManager.logSecurityEvent('LOGIN_SUCCESS', {
                username: username,
                rememberMe: rememberMe
            });
        }
    } catch (error) {
        showNotification(error.message, 'error');
        
        // Check if MFA is required
        if (error.message.includes('MFA')) {
            document.getElementById('mfaGroup').classList.remove('hidden');
        }
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

// Handle password strength
function handlePasswordStrength(event) {
    const password = event.target.value;
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    const strengthContainer = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthContainer.classList.add('hidden');
        return;
    }
    
    strengthContainer.classList.remove('hidden');
    
    let strength = 0;
    let strengthClass = 'weak';
    let strengthLabel = 'Weak';
    
    // Check password strength
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength >= 4) {
        strengthClass = 'strong';
        strengthLabel = 'Strong';
    } else if (strength >= 3) {
        strengthClass = 'good';
        strengthLabel = 'Good';
    } else if (strength >= 2) {
        strengthClass = 'fair';
        strengthLabel = 'Fair';
    }
    
    strengthBar.className = `strength-fill ${strengthClass}`;
    strengthText.textContent = strengthLabel;
}

// Update user info
function updateUserInfo(username = 'Admin') {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = username;
    }
}

// Initialize security features
function initializeSecurityFeatures() {
    // Setup security button
    const securityBtn = document.getElementById('securityBtn');
    if (securityBtn) {
        securityBtn.addEventListener('click', showSecurityDashboard);
    }
    
    // Setup security modal handlers
    const closeSecurityModal = document.getElementById('closeSecurityModal');
    if (closeSecurityModal) {
        closeSecurityModal.addEventListener('click', () => {
            document.getElementById('securityModal').classList.add('hidden');
        });
    }
    
    const refreshSecurityData = document.getElementById('refreshSecurityData');
    if (refreshSecurityData) {
        refreshSecurityData.addEventListener('click', refreshSecurityDashboard);
    }
    
    const exportSecurityData = document.getElementById('exportSecurityData');
    if (exportSecurityData) {
        exportSecurityData.addEventListener('click', exportSecurityDataHandler);
    }
    
    // Setup session monitoring
    setupSessionMonitoring();
    
    // Setup security alerts
    setupSecurityAlerts();
}

// Show security dashboard
function showSecurityDashboard() {
    const securityModal = document.getElementById('securityModal');
    if (securityModal) {
        refreshSecurityDashboard();
        securityModal.classList.remove('hidden');
    }
}

// Refresh security dashboard
function refreshSecurityDashboard() {
    const securityData = window.SecurityManager.getSecurityDashboardData();
    
    // Update security score
    const securityScore = document.getElementById('securityScore');
    if (securityScore) {
        securityScore.textContent = securityData.securityScore;
    }
    
    // Update stats
    const activeSessions = document.getElementById('activeSessions');
    if (activeSessions) {
        activeSessions.textContent = securityData.activeSessions;
    }
    
    const failedAttempts = document.getElementById('failedAttempts');
    if (failedAttempts) {
        failedAttempts.textContent = securityData.failedAttempts;
    }
    
    const securityEvents = document.getElementById('securityEvents');
    if (securityEvents) {
        securityEvents.textContent = securityData.recentSecurityEvents.length;
    }
    
    // Update recommendations
    const recommendationsList = document.getElementById('securityRecommendations');
    if (recommendationsList) {
        recommendationsList.innerHTML = '';
        securityData.recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.textContent = recommendation;
            recommendationsList.appendChild(li);
        });
    }
    
    // Update recent events
    const recentEvents = document.getElementById('recentSecurityEvents');
    if (recentEvents) {
        recentEvents.innerHTML = '';
        securityData.recentSecurityEvents.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-item';
            eventDiv.innerHTML = `
                <div class="event-info">
                    <div class="event-type">${event.eventType}</div>
                    <div class="event-details">${JSON.stringify(event.details)}</div>
                </div>
                <div class="event-time">${new Date(event.timestamp).toLocaleTimeString()}</div>
                <div class="event-severity severity-${event.severity.toLowerCase()}">${event.severity}</div>
            `;
            recentEvents.appendChild(eventDiv);
        });
    }
}

// Export security data
function exportSecurityDataHandler() {
    const securityData = window.SecurityManager.exportSecurityData();
    const blob = new Blob([JSON.stringify(securityData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Security data exported successfully', 'success');
}

// Setup session monitoring
function setupSessionMonitoring() {
    // Update session timer every minute
    setInterval(() => {
        updateSessionTimer();
    }, 60000);
    
    // Initial update
    updateSessionTimer();
}

// Update session timer
function updateSessionTimer() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        const session = window.SecurityManager.activeSessions.get(sessionId);
        if (session) {
            const timeRemaining = window.SecurityManager.sessionTimeout - (Date.now() - session.lastActivity);
            const minutes = Math.floor(timeRemaining / 60000);
            
            // Add session timer to header if not exists
            let sessionTimer = document.getElementById('sessionTimer');
            if (!sessionTimer) {
                sessionTimer = document.createElement('div');
                sessionTimer.id = 'sessionTimer';
                sessionTimer.className = 'session-status';
                document.querySelector('.nav__status').appendChild(sessionTimer);
            }
            
            if (minutes > 5) {
                sessionTimer.innerHTML = `
                    <span class="session-timer">Session: ${minutes}m</span>
                `;
            } else if (minutes > 0) {
                sessionTimer.innerHTML = `
                    <span class="session-warning">Session expires in ${minutes}m</span>
                `;
            } else {
                sessionTimer.innerHTML = `
                    <span class="session-expired">Session expired</span>
                `;
                // Auto-logout
                setTimeout(() => {
                    window.SecurityManager.invalidateSession(sessionId);
                    showAuthenticationModal();
                }, 1000);
            }
        }
    }
}

// Setup security alerts
function setupSecurityAlerts() {
    // Monitor for security events
    setInterval(() => {
        checkSecurityAlerts();
    }, 30000); // Check every 30 seconds
}

// Check security alerts
function checkSecurityAlerts() {
    const recentEvents = window.SecurityManager.auditLog.filter(log => 
        Date.now() - new Date(log.timestamp).getTime() < 5 * 60 * 1000 && // Last 5 minutes
        log.severity === 'CRITICAL'
    );
    
    if (recentEvents.length > 0) {
        showSecurityAlert('Critical security event detected', 'critical');
    }
}

// Show security alert
function showSecurityAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.security-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `security-alert ${type}`;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span>🚨</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px;">×</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 10000);
}

// Initialize real-time features
function initializeRealTimeFeatures() {
    // Setup real-time indicator
    updateRealTimeIndicator();
    
    // Setup feed controls
    setupFeedControls();
    
    // Subscribe to real-time updates
    subscribeToRealTimeUpdates();
    
    // Setup connection monitoring
    setupConnectionMonitoring();
}

// Update real-time indicator
function updateRealTimeIndicator() {
    const realtimeDot = document.getElementById('realtimeDot');
    const realtimeText = document.getElementById('realtimeText');
    
    if (realtimeDot && realtimeText && window.RealTimeManager) {
        const status = window.RealTimeManager.getConnectionStatus();
        
        realtimeDot.className = `realtime-dot ${status.status}`;
        
        switch (status.status) {
            case 'connected':
                realtimeText.textContent = 'Live';
                break;
            case 'disconnected':
                realtimeText.textContent = 'Offline';
                break;
            case 'error':
                realtimeText.textContent = 'Error';
                break;
            case 'mock':
                realtimeText.textContent = 'Demo';
                break;
        }
    }
}

// Setup feed controls
function setupFeedControls() {
    // Transaction feed controls
    const pauseTransactions = document.getElementById('pauseTransactions');
    const clearTransactions = document.getElementById('clearTransactions');
    
    if (pauseTransactions) {
        pauseTransactions.addEventListener('click', toggleTransactionFeed);
    }
    
    if (clearTransactions) {
        clearTransactions.addEventListener('click', clearTransactionFeed);
    }
    
    // Alert feed controls
    const pauseAlerts = document.getElementById('pauseAlerts');
    const clearAlerts = document.getElementById('clearAlerts');
    
    if (pauseAlerts) {
        pauseAlerts.addEventListener('click', toggleAlertFeed);
    }
    
    if (clearAlerts) {
        clearAlerts.addEventListener('click', clearAlertFeed);
    }
}

// Toggle transaction feed
function toggleTransactionFeed() {
    const button = document.getElementById('pauseTransactions');
    const feed = document.getElementById('liveTransactions');
    
    if (button && feed) {
        if (button.textContent === 'Pause') {
            button.textContent = 'Resume';
            feed.style.opacity = '0.5';
            feed.style.pointerEvents = 'none';
            // Pause real-time updates for transactions
            if (window.RealTimeManager) {
                window.RealTimeManager.unsubscribe('transaction', handleTransactionUpdate);
            }
        } else {
            button.textContent = 'Pause';
            feed.style.opacity = '1';
            feed.style.pointerEvents = 'auto';
            // Resume real-time updates for transactions
            if (window.RealTimeManager) {
                window.RealTimeManager.subscribe('transaction', handleTransactionUpdate);
            }
        }
    }
}

// Clear transaction feed
function clearTransactionFeed() {
    const feed = document.getElementById('liveTransactions');
    if (feed) {
        feed.innerHTML = `
            <div class="feed-placeholder">
                <div class="placeholder-icon">💳</div>
                <div class="placeholder-text">Waiting for transactions...</div>
            </div>
        `;
    }
}

// Toggle alert feed
function toggleAlertFeed() {
    const button = document.getElementById('pauseAlerts');
    const feed = document.getElementById('systemAlerts');
    
    if (button && feed) {
        if (button.textContent === 'Pause') {
            button.textContent = 'Resume';
            feed.style.opacity = '0.5';
            feed.style.pointerEvents = 'none';
            // Pause real-time updates for alerts
            if (window.RealTimeManager) {
                window.RealTimeManager.unsubscribe('alert', handleAlertUpdate);
            }
        } else {
            button.textContent = 'Pause';
            feed.style.opacity = '1';
            feed.style.pointerEvents = 'auto';
            // Resume real-time updates for alerts
            if (window.RealTimeManager) {
                window.RealTimeManager.subscribe('alert', handleAlertUpdate);
            }
        }
    }
}

// Clear alert feed
function clearAlertFeed() {
    const feed = document.getElementById('systemAlerts');
    if (feed) {
        feed.innerHTML = `
            <div class="feed-placeholder">
                <div class="placeholder-icon">🚨</div>
                <div class="placeholder-text">No alerts at this time</div>
            </div>
        `;
    }
}

// Subscribe to real-time updates
function subscribeToRealTimeUpdates() {
    if (window.RealTimeManager) {
        // Subscribe to transaction updates
        window.RealTimeManager.subscribe('transaction', handleTransactionUpdate);
        
        // Subscribe to alert updates
        window.RealTimeManager.subscribe('alert', handleAlertUpdate);
        
        // Subscribe to metrics updates
        window.RealTimeManager.subscribe('metrics', handleMetricsUpdate);
        
        // Subscribe to connection updates
        window.RealTimeManager.subscribe('connection', handleConnectionUpdate);
    }
}

// Handle transaction update
function handleTransactionUpdate(transactionData) {
    try {
        // Update transaction feed
        const liveTransactions = document.getElementById('liveTransactions');
        if (liveTransactions && transactionData) {
            // Remove placeholder if exists
            const placeholder = liveTransactions.querySelector('.feed-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Create transaction item
            const transactionItem = document.createElement('div');
            transactionItem.className = `transaction-item ${transactionData.fraudDetected ? 'fraud-detected' : 'legitimate'}`;
            transactionItem.innerHTML = `
                <div class="transaction-header">
                    <span class="transaction-id">${transactionData.id}</span>
                    <span class="transaction-time">${transactionData.time}</span>
                </div>
                <div class="transaction-details">
                    <div class="transaction-info">
                        <span class="transaction-type">${transactionData.type}</span>
                        <span class="transaction-amount">$${transactionData.amount.toLocaleString()}</span>
                    </div>
                    <div class="transaction-meta">
                        <span class="transaction-country">${transactionData.country}</span>
                        <span class="transaction-device">${transactionData.device}</span>
                    </div>
                    <div class="transaction-risk">
                        <span class="risk-score">Risk: ${transactionData.risk}</span>
                        <span class="fraud-probability ${transactionData.fraudDetected ? 'fraud-detected' : 'legitimate'}">
                            ${transactionData.fraudProbability}% fraud
                        </span>
                    </div>
                </div>
            `;
            
            // Add to top of feed
            liveTransactions.insertBefore(transactionItem, liveTransactions.firstChild);
            
            // Limit to 10 items
            const items = liveTransactions.querySelectorAll('.transaction-item');
            if (items.length > 10) {
                items[items.length - 1].remove();
            }
        }
    } catch (error) {
        console.error('Error handling transaction update:', error);
    }
}

// Handle alert update
function handleAlertUpdate(alertData) {
    try {
        // Update alert feed
        const systemAlerts = document.getElementById('systemAlerts');
        if (systemAlerts && alertData) {
            // Remove placeholder if exists
            const placeholder = systemAlerts.querySelector('.feed-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Create alert item
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item alert--${alertData.priority}`;
            alertItem.innerHTML = `
                <div class="alert-header">
                    <span class="alert-priority priority--${alertData.priority}">${alertData.priority.toUpperCase()}</span>
                    <span class="alert-time">${alertData.time}</span>
                </div>
                <div class="alert-content">
                    <h4 class="alert-title">${alertData.title}</h4>
                    <p class="alert-description">${alertData.description}</p>
                    <div class="alert-meta">
                        <span class="alert-source">${alertData.source}</span>
                        <span class="alert-status status--${alertData.status.replace('-', '')}">${alertData.status}</span>
                    </div>
                </div>
            `;
            
            // Add to top of feed
            systemAlerts.insertBefore(alertItem, systemAlerts.firstChild);
            
            // Limit to 5 items
            const items = systemAlerts.querySelectorAll('.alert-item');
            if (items.length > 5) {
                items[items.length - 1].remove();
            }
        }
    } catch (error) {
        console.error('Error handling alert update:', error);
    }
}

// Handle metrics update
function handleMetricsUpdate(metricsData) {
    try {
        // Update dashboard metrics
        if (metricsData) {
            // Update fraud detection rate
            const fraudRate = document.getElementById('fraudRate');
            if (fraudRate && metricsData.fraudRate !== undefined) {
                fraudRate.textContent = `${(metricsData.fraudRate * 100).toFixed(1)}%`;
            }
            
            // Update blocked transactions
            const blockedTransactions = document.getElementById('blockedTransactions');
            if (blockedTransactions && metricsData.blockedTransactions !== undefined) {
                blockedTransactions.textContent = metricsData.blockedTransactions.toLocaleString();
            }
            
            // Update false positives
            const falsePositives = document.getElementById('falsePositives');
            if (falsePositives && metricsData.falsePositives !== undefined) {
                falsePositives.textContent = `${(metricsData.falsePositives * 100).toFixed(1)}%`;
            }
            
            // Update response time
            const avgResponseTime = document.getElementById('avgResponseTime');
            if (avgResponseTime && metricsData.responseTime !== undefined) {
                avgResponseTime.textContent = `${metricsData.responseTime}ms`;
            }
            
            // Add visual update animation
            const metricCards = document.querySelectorAll('.metric-card');
            metricCards.forEach(card => {
                card.classList.add('updating');
                setTimeout(() => {
                    card.classList.remove('updating');
                }, 500);
            });
        }
    } catch (error) {
        console.error('Error handling metrics update:', error);
    }
}

// Handle connection update
function handleConnectionUpdate(connectionData) {
    try {
        updateRealTimeIndicator();
        
        // Show connection status notification
        if (connectionData.status === 'disconnected') {
            showNotification('Real-time connection lost', 'warning');
        } else if (connectionData.status === 'connected') {
            showNotification('Real-time connection restored', 'success');
        } else if (connectionData.status === 'error') {
            showNotification('Real-time connection error', 'error');
        }
        
        // Update connection status in UI
        const realtimeDot = document.getElementById('realtimeDot');
        const realtimeText = document.getElementById('realtimeText');
        
        if (realtimeDot && realtimeText) {
            realtimeDot.className = `realtime-dot ${connectionData.status}`;
            
            switch (connectionData.status) {
                case 'connected':
                    realtimeText.textContent = 'Live';
                    break;
                case 'disconnected':
                    realtimeText.textContent = 'Offline';
                    break;
                case 'error':
                    realtimeText.textContent = 'Error';
                    break;
                case 'mock':
                    realtimeText.textContent = 'Demo';
                    break;
                default:
                    realtimeText.textContent = 'Unknown';
            }
        }
    } catch (error) {
        console.error('Error handling connection update:', error);
    }
}

// Setup connection monitoring
function setupConnectionMonitoring() {
    // Update real-time indicator every 5 seconds
    setInterval(() => {
        updateRealTimeIndicator();
    }, 5000);
}

// Initialize advanced analytics features
function initializeAdvancedAnalytics() {
    try {
        // Setup enhanced analysis results
        setupAdvancedAnalysisResults();
        
        // Setup analytics insights
        setupAnalyticsInsights();
        
        // Setup anomaly detection
        setupAnomalyDetection();
        
        // Setup enhanced recommendations
        setupEnhancedRecommendations();
        
        console.log('Advanced analytics initialized successfully');
    } catch (error) {
        console.error('Error initializing advanced analytics:', error);
        showNotification('Failed to initialize advanced analytics', 'error');
    }
}

// Setup advanced analysis results
function setupAdvancedAnalysisResults() {
    // Enhanced results panel with real-time updates
    const resultsPanel = document.getElementById('resultsPanel');
    if (resultsPanel) {
        // Add analysis timestamp
        const analysisTime = document.getElementById('analysisTime');
        if (analysisTime) {
            analysisTime.textContent = new Date().toLocaleTimeString();
        }
        
        // Add model confidence
        const modelConfidence = document.getElementById('modelConfidence');
        if (modelConfidence) {
            modelConfidence.textContent = 'Confidence: 94%';
        }
    }
}

// Setup analytics insights
function setupAnalyticsInsights() {
    const insightsGrid = document.getElementById('insightsGrid');
    if (insightsGrid) {
        const insights = [
            {
                type: 'risk',
                level: 'HIGH',
                title: 'Unusual Transaction Pattern',
                description: 'Transaction amount is 3x higher than user\'s average',
                confidence: 89
            },
            {
                type: 'anomaly',
                level: 'MEDIUM',
                title: 'Geographic Anomaly',
                description: 'Transaction from new country not seen in user history',
                confidence: 76
            },
            {
                type: 'pattern',
                level: 'LOW',
                title: 'Time-based Pattern',
                description: 'Transaction time matches known fraud patterns',
                confidence: 65
            }
        ];
        
        insightsGrid.innerHTML = '';
        insights.forEach(insight => {
            const insightCard = document.createElement('div');
            insightCard.className = 'insight-card';
            insightCard.innerHTML = `
                <div class="insight-header">
                    <span class="insight-type ${insight.type}">${insight.type}</span>
                    <span class="insight-level">${insight.level}</span>
                </div>
                <h4 class="insight-title">${insight.title}</h4>
                <p class="insight-description">${insight.description}</p>
                <div class="insight-confidence">
                    <span>Confidence: ${insight.confidence}%</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${insight.confidence}%"></div>
                    </div>
                </div>
            `;
            insightsGrid.appendChild(insightCard);
        });
    }
}

// Setup anomaly detection
function setupAnomalyDetection() {
    const anomaliesList = document.getElementById('anomaliesList');
    if (anomaliesList) {
        const anomalies = [
            {
                type: 'Amount Anomaly',
                severity: 'high',
                description: 'Transaction amount significantly exceeds user\'s typical spending pattern',
                confidence: 92
            },
            {
                type: 'Location Anomaly',
                severity: 'medium',
                description: 'Transaction originated from a new geographic location',
                confidence: 78
            },
            {
                type: 'Device Anomaly',
                severity: 'low',
                description: 'Transaction from a new device not previously associated with this account',
                confidence: 65
            }
        ];
        
        anomaliesList.innerHTML = '';
        anomalies.forEach(anomaly => {
            const anomalyItem = document.createElement('div');
            anomalyItem.className = `anomaly-item ${anomaly.severity}-severity`;
            anomalyItem.innerHTML = `
                <div class="anomaly-header">
                    <span class="anomaly-type">${anomaly.type}</span>
                    <span class="anomaly-severity severity-${anomaly.severity}">${anomaly.severity}</span>
                </div>
                <p class="anomaly-description">${anomaly.description}</p>
                <div class="anomaly-confidence">Confidence: ${anomaly.confidence}%</div>
            `;
            anomaliesList.appendChild(anomalyItem);
        });
    }
}

// Setup enhanced recommendations
function setupEnhancedRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    if (recommendationsList) {
        const recommendations = [
            {
                icon: '🚫',
                text: 'Block transaction and flag account for manual review'
            },
            {
                icon: '📞',
                text: 'Contact customer to verify transaction legitimacy'
            },
            {
                icon: '🔍',
                text: 'Perform additional identity verification'
            },
            {
                icon: '📊',
                text: 'Update fraud detection model with new patterns'
            }
        ];
        
        recommendationsList.innerHTML = '';
        recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.className = 'recommendation-item';
            recItem.innerHTML = `
                <span class="recommendation-icon">${rec.icon}</span>
                <span class="recommendation-text">${rec.text}</span>
            `;
            recommendationsList.appendChild(recItem);
        });
    }
}

// Initialize dashboard with stats
function initializeDashboard() {
    const { fraudStats } = applicationData;
    
    document.getElementById('totalTransactions').textContent = fraudStats.totalTransactions.toLocaleString();
    document.getElementById('fraudDetected').textContent = fraudStats.fraudDetected.toLocaleString();
    document.getElementById('accuracyRate').textContent = fraudStats.accuracyRate + '%';
    document.getElementById('fraudRate').textContent = fraudStats.fraudRate + '%';
}

// Setup event listeners
function setupEventListeners() {
    try {
        // Transaction form
    const form = document.getElementById('transactionForm');
        if (form) {
    form.addEventListener('submit', handleTransactionSubmit);
        }

        // Tab buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabSwitch);
        });

        // Alert filters
        const alertFilters = ['alertTypeFilter', 'timeRangeFilter', 'statusFilter'];
        alertFilters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', handleAlertFilter);
            }
        });

        // Alert action buttons
        const refreshAlertsBtn = document.getElementById('refreshAlerts');
        if (refreshAlertsBtn) {
            refreshAlertsBtn.addEventListener('click', handleRefreshAlerts);
        }

        const markAllReadBtn = document.getElementById('markAllRead');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', handleMarkAllRead);
        }

        const exportAlertsBtn = document.getElementById('exportAlerts');
        if (exportAlertsBtn) {
            exportAlertsBtn.addEventListener('click', handleExportAlerts);
        }

        // Alert view buttons
        const listViewBtn = document.getElementById('listView');
        if (listViewBtn) {
            listViewBtn.addEventListener('click', handleViewChange);
        }

        const gridViewBtn = document.getElementById('gridView');
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', handleViewChange);
        }

        // Modal functionality
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeAlertModal);
        }

        const acknowledgeAlertBtn = document.getElementById('acknowledgeAlert');
        if (acknowledgeAlertBtn) {
            acknowledgeAlertBtn.addEventListener('click', handleAcknowledgeAlert);
        }

        const resolveAlertBtn = document.getElementById('resolveAlert');
        if (resolveAlertBtn) {
            resolveAlertBtn.addEventListener('click', handleResolveAlert);
        }

        const escalateAlertBtn = document.getElementById('escalateAlert');
        if (escalateAlertBtn) {
            escalateAlertBtn.addEventListener('click', handleEscalateAlert);
        }

        // Report buttons
        const generateReportBtn = document.getElementById('generateReport');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', handleGenerateReport);
        }

        const exportReportBtn = document.getElementById('exportReport');
        if (exportReportBtn) {
            exportReportBtn.addEventListener('click', handleExportReport);
        }

        // ML Model buttons
        const trainModelBtn = document.getElementById('trainModel');
        if (trainModelBtn) {
            trainModelBtn.addEventListener('click', handleTrainModel);
        }

        const retrainModelBtn = document.getElementById('retrainModel');
        if (retrainModelBtn) {
            retrainModelBtn.addEventListener('click', handleRetrainModel);
        }

        const validateModelBtn = document.getElementById('validateModel');
        if (validateModelBtn) {
            validateModelBtn.addEventListener('click', handleValidateModel);
        }

        // Settings buttons
        const saveSettingsBtn = document.getElementById('saveSettings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', handleSaveSettings);
        }

        const resetSettingsBtn = document.getElementById('resetSettings');
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', handleResetSettings);
        }

        // Action buttons in results panel
        const blockTransactionBtn = document.getElementById('blockTransaction');
        if (blockTransactionBtn) {
            blockTransactionBtn.addEventListener('click', handleBlockTransaction);
        }

        const requestReviewBtn = document.getElementById('requestReview');
        if (requestReviewBtn) {
            requestReviewBtn.addEventListener('click', handleRequestReview);
        }

        const approveTransactionBtn = document.getElementById('approveTransaction');
        if (approveTransactionBtn) {
            approveTransactionBtn.addEventListener('click', handleApproveTransaction);
        }

        // Header buttons
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => switchToTab('settings'));
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

    } catch (error) {
        console.error('Error setting up event listeners:', error);
        showNotification('Failed to setup event listeners', 'error');
    }
}

// Handle transaction form submission
function handleTransactionSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(event.target);
    const transactionData = {
        amount: parseFloat(formData.get('amount') || document.getElementById('amount').value),
        transactionType: formData.get('transactionType') || document.getElementById('transactionType').value,
        originBalance: parseFloat(formData.get('originBalance') || document.getElementById('originBalance').value),
        destBalance: parseFloat(formData.get('destBalance') || document.getElementById('destBalance').value),
        hourOfDay: parseInt(formData.get('hourOfDay') || document.getElementById('hourOfDay').value),
        deviceType: formData.get('deviceType') || document.getElementById('deviceType').value,
        country: formData.get('country') || document.getElementById('country').value,
        accountAge: parseInt(formData.get('accountAge') || document.getElementById('accountAge').value)
    };
    
    // Simulate analysis delay
    setTimeout(() => {
        const analysis = analyzeFraudRisk(transactionData);
        displayResults(analysis);
        
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
    }, 2000);
}

// Enhanced fraud risk analysis with advanced algorithms
function analyzeFraudRisk(data) {
    let riskScore = 0;
    let riskFactors = [];
    let detailedAnalysis = {};
    let behavioralInsights = [];
    
    // Initialize detailed analysis object
    detailedAnalysis = {
        amountAnalysis: {},
        temporalAnalysis: {},
        behavioralAnalysis: {},
        geographicAnalysis: {},
        deviceAnalysis: {},
        accountAnalysis: {},
        patternAnalysis: {}
    };
    
    // 1. ADVANCED AMOUNT ANALYSIS
    const amountAnalysis = analyzeTransactionAmount(data.amount, data.originBalance, data.destBalance);
    riskScore += amountAnalysis.score;
    riskFactors.push(...amountAnalysis.factors);
    detailedAnalysis.amountAnalysis = amountAnalysis;
    
    // 2. TEMPORAL PATTERN ANALYSIS
    const temporalAnalysis = analyzeTemporalPatterns(data.hourOfDay, data.accountAge);
    riskScore += temporalAnalysis.score;
    riskFactors.push(...temporalAnalysis.factors);
    detailedAnalysis.temporalAnalysis = temporalAnalysis;
    
    // 3. BEHAVIORAL ANALYSIS
    const behavioralAnalysis = analyzeBehavioralPatterns(data);
    riskScore += behavioralAnalysis.score;
    riskFactors.push(...behavioralAnalysis.factors);
    behavioralInsights.push(...behavioralAnalysis.insights);
    detailedAnalysis.behavioralAnalysis = behavioralAnalysis;
    
    // 4. GEOGRAPHIC RISK ANALYSIS
    const geographicAnalysis = analyzeGeographicRisk(data.country, data.geolocation);
    riskScore += geographicAnalysis.score;
    riskFactors.push(...geographicAnalysis.factors);
    detailedAnalysis.geographicAnalysis = geographicAnalysis;
    
    // 5. DEVICE & TECHNOLOGY ANALYSIS
    const deviceAnalysis = analyzeDeviceRisk(data.deviceType, data.userAgent, data.ipAddress);
    riskScore += deviceAnalysis.score;
    riskFactors.push(...deviceAnalysis.factors);
    detailedAnalysis.deviceAnalysis = deviceAnalysis;
    
    // 6. ACCOUNT PROFILE ANALYSIS
    const accountAnalysis = analyzeAccountProfile(data.accountAge, data.recentTransactions);
    riskScore += accountAnalysis.score;
    riskFactors.push(...accountAnalysis.factors);
    detailedAnalysis.accountAnalysis = accountAnalysis;
    
    // 7. TRANSACTION TYPE & MERCHANT ANALYSIS
    const typeAnalysis = analyzeTransactionType(data.transactionType, data.merchantCategory);
    riskScore += typeAnalysis.score;
    riskFactors.push(...typeAnalysis.factors);
    detailedAnalysis.typeAnalysis = typeAnalysis;
    
    // 8. PATTERN MATCHING & ANOMALY DETECTION
    const patternAnalysis = detectAnomalies(data);
    riskScore += patternAnalysis.score;
    riskFactors.push(...patternAnalysis.factors);
    detailedAnalysis.patternAnalysis = patternAnalysis;
    
    // 9. ENSEMBLE SCORING WITH WEIGHTS
    const ensembleScore = calculateEnsembleScore(detailedAnalysis);
    riskScore = Math.max(riskScore, ensembleScore.score);
    
    // 10. CONFIDENCE CALCULATION
    const confidence = calculateConfidence(detailedAnalysis, riskFactors.length);
    
    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100);
    
    // Determine risk level with enhanced thresholds
    let riskLevel = determineRiskLevel(riskScore, confidence);
    
    // Generate comprehensive recommendation
    let recommendation = generateAdvancedRecommendation(riskLevel, riskScore, riskFactors, detailedAnalysis, confidence);
    
    return {
        probability: Math.round(riskScore),
        riskLevel,
        riskFactors: [...new Set(riskFactors)], // Remove duplicates
        recommendation,
        detailedAnalysis,
        behavioralInsights,
        confidence,
        ensembleScore: ensembleScore,
        mlExplanation: generateMLExplanation(detailedAnalysis)
    };
}

// Advanced Amount Analysis
function analyzeTransactionAmount(amount, originBalance, destBalance) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Statistical amount analysis
    const avgTransactionAmount = 2500; // Historical average
    const stdDeviation = 1500;
    const zScore = Math.abs(amount - avgTransactionAmount) / stdDeviation;
    
    if (zScore > 3) {
        score += 25;
        factors.push("Statistical Anomaly (Amount)");
        analysis.statisticalAnomaly = true;
    } else if (zScore > 2) {
        score += 15;
        factors.push("Unusual Amount");
        analysis.statisticalAnomaly = false;
    }
    
    // Balance ratio analysis
    if (originBalance > 0) {
        const balanceRatio = amount / originBalance;
        if (balanceRatio > 0.8) {
            score += 20;
            factors.push("High Balance Utilization");
            analysis.balanceUtilization = "high";
        } else if (balanceRatio > 0.5) {
            score += 10;
            factors.push("Moderate Balance Utilization");
            analysis.balanceUtilization = "moderate";
        } else {
            analysis.balanceUtilization = "low";
        }
    }
    
    // Round number analysis (fraudsters often use round numbers)
    if (amount % 1000 === 0 && amount > 1000) {
        score += 5;
        factors.push("Round Number Amount");
        analysis.roundNumber = true;
    }
    
    // Micro-transaction analysis
    if (amount < 10) {
        score += 8;
        factors.push("Micro-transaction Pattern");
        analysis.microTransaction = true;
    }
    
    return { score, factors, analysis };
}

// Temporal Pattern Analysis
function analyzeTemporalPatterns(hourOfDay, accountAge) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Hour-based risk scoring
    const hourRiskScores = {
        0: 25, 1: 30, 2: 35, 3: 30, 4: 25, 5: 20,
        6: 10, 7: 5, 8: 5, 9: 5, 10: 5, 11: 5,
        12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5,
        18: 8, 19: 10, 20: 12, 21: 15, 22: 18, 23: 22
    };
    
    score += hourRiskScores[hourOfDay] || 5;
    if (hourRiskScores[hourOfDay] > 20) {
        factors.push("High-Risk Time Window");
        analysis.timeRisk = "high";
    } else if (hourRiskScores[hourOfDay] > 10) {
        factors.push("Moderate-Risk Time");
        analysis.timeRisk = "moderate";
    } else {
        analysis.timeRisk = "low";
    }
    
    // Weekend analysis
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    if (isWeekend && hourOfDay < 8) {
        score += 10;
        factors.push("Weekend Early Morning");
        analysis.weekendRisk = true;
    }
    
    // Account age vs time correlation
    if (accountAge < 7 && hourRiskScores[hourOfDay] > 15) {
        score += 15;
        factors.push("New Account + High-Risk Time");
        analysis.newAccountHighRiskTime = true;
    }
    
    return { score, factors, analysis };
}

// Behavioral Pattern Analysis
function analyzeBehavioralPatterns(data) {
    let score = 0;
    let factors = [];
    let insights = [];
    let analysis = {};
    
    // Transaction velocity analysis
    if (data.recentTransactions > 10) {
        score += 20;
        factors.push("High Transaction Velocity");
        insights.push("User has made " + data.recentTransactions + " transactions in the last 24 hours");
        analysis.highVelocity = true;
    } else if (data.recentTransactions > 5) {
        score += 10;
        factors.push("Elevated Transaction Frequency");
        analysis.highVelocity = false;
    }
    
    // Device consistency analysis
    if (data.deviceType === 'api' && data.recentTransactions > 3) {
        score += 15;
        factors.push("API Device Pattern");
        insights.push("Multiple API transactions suggest automated behavior");
        analysis.apiPattern = true;
    }
    
    // Card present analysis
    if (data.cardPresent === 'false' && data.amount > 1000) {
        score += 12;
        factors.push("Card Not Present + High Amount");
        insights.push("High-value transaction without physical card presence");
        analysis.cardNotPresentHighValue = true;
    }
    
    // Behavioral scoring based on transaction type
    const behavioralScores = {
        'CASH_OUT': 15,
        'TRANSFER': 12,
        'PAYMENT': 5,
        'CASH_IN': 3,
        'DEBIT': 8,
        'CREDIT': 2
    };
    
    score += behavioralScores[data.transactionType] || 5;
    
    return { score, factors, insights, analysis };
}

// Geographic Risk Analysis
function analyzeGeographicRisk(country, geolocation) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Country risk scoring
    const countryRiskScores = {
        'US': 5, 'CA': 8, 'UK': 12, 'AU': 15, 'DE': 10,
        'FR': 12, 'IT': 18, 'ES': 20, 'JP': 8, 'CN': 25
    };
    
    score += countryRiskScores[country] || 15;
    if (countryRiskScores[country] > 15) {
        factors.push("High-Risk Country");
        analysis.countryRisk = "high";
    } else if (countryRiskScores[country] > 10) {
        factors.push("Moderate-Risk Country");
        analysis.countryRisk = "moderate";
    } else {
        analysis.countryRisk = "low";
    }
    
    // Geolocation analysis
    if (geolocation) {
        const [lat, lng] = geolocation.split(',').map(Number);
        if (isNaN(lat) || isNaN(lng)) {
            score += 10;
            factors.push("Invalid Geolocation");
            analysis.geolocationValid = false;
        } else {
            analysis.geolocationValid = true;
        }
    }
    
    return { score, factors, analysis };
}

// Device & Technology Analysis
function analyzeDeviceRisk(deviceType, userAgent, ipAddress) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Device type risk
    const deviceRiskScores = {
        'mobile': 5,
        'web': 8,
        'api': 20,
        'atm': 3,
        'pos': 2
    };
    
    score += deviceRiskScores[deviceType] || 10;
    if (deviceRiskScores[deviceType] > 15) {
        factors.push("High-Risk Device Type");
        analysis.deviceRisk = "high";
    } else {
        analysis.deviceRisk = "low";
    }
    
    // User agent analysis
    if (userAgent) {
        if (userAgent.includes('bot') || userAgent.includes('crawler')) {
            score += 25;
            factors.push("Bot/Crawler Detected");
            analysis.botDetected = true;
        } else if (userAgent.length < 20) {
            score += 10;
            factors.push("Suspicious User Agent");
            analysis.suspiciousUA = true;
        }
    }
    
    // IP address analysis
    if (ipAddress) {
        if (ipAddress.startsWith('192.168.') || ipAddress.startsWith('10.') || ipAddress.startsWith('172.')) {
            score += 5;
            factors.push("Private IP Address");
            analysis.privateIP = true;
        }
    }
    
    return { score, factors, analysis };
}

// Account Profile Analysis
function analyzeAccountProfile(accountAge, recentTransactions) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Account age scoring
    if (accountAge < 1) {
        score += 30;
        factors.push("Brand New Account");
        analysis.accountAgeRisk = "critical";
    } else if (accountAge < 7) {
        score += 25;
        factors.push("Very New Account");
        analysis.accountAgeRisk = "high";
    } else if (accountAge < 30) {
        score += 15;
        factors.push("New Account");
        analysis.accountAgeRisk = "moderate";
    } else if (accountAge < 90) {
        score += 5;
        factors.push("Recently Created Account");
        analysis.accountAgeRisk = "low";
    } else {
        analysis.accountAgeRisk = "established";
    }
    
    // Transaction history analysis
    if (recentTransactions === 0 && accountAge > 1) {
        score += 10;
        factors.push("Dormant Account Activation");
        analysis.dormantActivation = true;
    }
    
    return { score, factors, analysis };
}

// Transaction Type & Merchant Analysis
function analyzeTransactionType(transactionType, merchantCategory) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Transaction type risk
    const typeRiskScores = {
        'CASH_OUT': 25,
        'TRANSFER': 20,
        'PAYMENT': 8,
        'CASH_IN': 3,
        'DEBIT': 12,
        'CREDIT': 2,
        'REFUND': 5
    };
    
    score += typeRiskScores[transactionType] || 10;
    if (typeRiskScores[transactionType] > 15) {
        factors.push("High-Risk Transaction Type");
        analysis.typeRisk = "high";
    } else {
        analysis.typeRisk = "low";
    }
    
    // Merchant category risk
    const merchantRiskScores = {
        'gambling': 30,
        'adult_services': 25,
        'online_shopping': 8,
        'retail': 5,
        'gas_station': 3,
        'restaurant': 2,
        'healthcare': 1,
        'education': 1
    };
    
    if (merchantCategory) {
        score += merchantRiskScores[merchantCategory] || 5;
        if (merchantRiskScores[merchantCategory] > 20) {
            factors.push("High-Risk Merchant Category");
            analysis.merchantRisk = "high";
    } else {
            analysis.merchantRisk = "low";
        }
    }
    
    return { score, factors, analysis };
}

// Anomaly Detection
function detectAnomalies(data) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Velocity anomaly
    if (data.recentTransactions > 15) {
        score += 20;
        factors.push("Velocity Anomaly");
        analysis.velocityAnomaly = true;
    }
    
    // Amount anomaly (Benford's Law inspired)
    const firstDigit = parseInt(data.amount.toString()[0]);
    const benfordProbabilities = [0, 0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046];
    if (firstDigit === 1 && Math.random() > benfordProbabilities[1]) {
        score += 5;
        factors.push("Amount Distribution Anomaly");
        analysis.benfordAnomaly = true;
    }
    
    // Time-based anomaly
    const hour = data.hourOfDay;
    if ((hour >= 2 && hour <= 4) && data.amount > 5000) {
        score += 15;
        factors.push("Night-time High-Value Anomaly");
        analysis.nightHighValueAnomaly = true;
    }
    
    return { score, factors, analysis };
}

// Ensemble Scoring
function calculateEnsembleScore(analysis) {
    const weights = {
        amount: 0.25,
        temporal: 0.20,
        behavioral: 0.20,
        geographic: 0.15,
        device: 0.10,
        account: 0.10
    };
    
    let weightedScore = 0;
    let explanations = [];
    
    // Calculate weighted score
    Object.keys(weights).forEach(key => {
        if (analysis[key + 'Analysis']) {
            const score = analysis[key + 'Analysis'].score || 0;
            weightedScore += score * weights[key];
            explanations.push(`${key}: ${score.toFixed(1)} (weight: ${(weights[key] * 100).toFixed(0)}%)`);
        }
    });
    
    return {
        score: Math.round(weightedScore),
        explanations: explanations,
        weights: weights
    };
}

// Confidence Calculation
function calculateConfidence(analysis, factorCount) {
    let confidence = 100;
    
    // Reduce confidence based on missing data
    const requiredFields = ['amount', 'transactionType', 'hourOfDay', 'accountAge', 'deviceType', 'country'];
    const missingFields = requiredFields.filter(field => !analysis[field + 'Analysis'] || !analysis[field + 'Analysis'].score);
    confidence -= missingFields.length * 10;
    
    // Reduce confidence for low factor count
    if (factorCount < 3) {
        confidence -= 20;
    }
    
    return Math.max(confidence, 30);
}

// Enhanced Risk Level Determination
function determineRiskLevel(score, confidence) {
    if (score >= 80) return 'critical';
    if (score >= 65) return 'high';
    if (score >= 45) return 'medium';
    if (score >= 25) return 'low';
    return 'minimal';
}

// Advanced Recommendation Generation
function generateAdvancedRecommendation(riskLevel, score, factors, analysis, confidence) {
    const recommendations = {
        critical: `🚨 CRITICAL RISK (${score}%, Confidence: ${confidence}%): IMMEDIATE BLOCK REQUIRED. Multiple high-risk indicators detected. Contact fraud team immediately.`,
        high: `⚠️ HIGH RISK (${score}%, Confidence: ${confidence}%): Strong fraud indicators present. Recommend blocking transaction and requesting additional verification.`,
        medium: `⚡ MEDIUM RISK (${score}%, Confidence: ${confidence}%): Some risk factors detected. Consider step-up authentication or manual review.`,
        low: `✅ LOW RISK (${score}%, Confidence: ${confidence}%): Minimal risk factors. Transaction can proceed with standard monitoring.`,
        minimal: `✅ MINIMAL RISK (${score}%, Confidence: ${confidence}%): No significant risk factors detected. Safe to proceed.`
    };
    
    return recommendations[riskLevel] || recommendations.medium;
}

// ML Explanation Generator
function generateMLExplanation(analysis) {
    const explanations = [];
    
    Object.keys(analysis).forEach(key => {
        if (analysis[key] && analysis[key].score > 0) {
            const category = key.replace('Analysis', '').toUpperCase();
            explanations.push(`${category}: ${analysis[key].score} risk points`);
        }
    });
    
    return explanations.join(' | ');
}

// Display analysis results
function displayResults(analysis) {
    const resultsPanel = document.getElementById('resultsPanel');
    const probabilityCircle = document.getElementById('probabilityCircle');
    const probabilityValue = document.getElementById('probabilityValue');
    const riskLevel = document.getElementById('riskLevel');
    const factorsList = document.getElementById('factorsList');
    const recommendationText = document.getElementById('recommendationText');
    
    // Show results panel
    resultsPanel.classList.remove('hidden');
    
    // Update probability display
    probabilityValue.textContent = analysis.probability + '%';
    
    // Update risk level styling
    probabilityCircle.className = 'probability-circle';
    riskLevel.className = 'risk-level';
    
    if (analysis.riskLevel === 'high') {
        probabilityCircle.classList.add('high-risk');
        riskLevel.classList.add('high');
        riskLevel.textContent = 'HIGH RISK';
    } else if (analysis.riskLevel === 'medium') {
        probabilityCircle.classList.add('medium-risk');
        riskLevel.classList.add('medium');
        riskLevel.textContent = 'MEDIUM RISK';
    } else {
        probabilityCircle.classList.add('low-risk');
        riskLevel.classList.add('low');
        riskLevel.textContent = 'LOW RISK';
    }
    
    // Update risk factors
    factorsList.innerHTML = '';
    analysis.riskFactors.forEach(factor => {
        const tag = document.createElement('span');
        tag.className = 'factor-tag';
        tag.textContent = factor;
        factorsList.appendChild(tag);
    });
    
    // Update recommendation
    recommendationText.textContent = analysis.recommendation;
}

// Chart functions removed (duplicates)

// Create model performance comparison chart
function createModelChart() {
    const ctx = document.getElementById('modelChart').getContext('2d');
    const { modelPerformance } = applicationData;
    
    modelChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'AUC-ROC'],
            datasets: modelPerformance.map((model, index) => ({
                label: model.name,
                data: [
                    model.accuracy * 100,
                    model.precision * 100,
                    model.recall * 100,
                    model.f1Score * 100,
                    model.aucRoc * 100
                ],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index] + '20',
                borderWidth: 2,
                pointBackgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index]
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#a0a0a0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#e0e0e0'
                    }
                }
            }
        }
    });
}

// Populate model performance table
function populateModelTable() {
    const tableBody = document.getElementById('modelTableBody');
    const { modelPerformance } = applicationData;
    
    tableBody.innerHTML = '';
    
    modelPerformance.forEach(model => {
        const row = document.createElement('tr');
        
        const getScoreClass = (score) => {
            if (score >= 0.9) return 'excellent';
            if (score >= 0.8) return 'good';
            return 'average';
        };
        
        row.innerHTML = `
            <td><span class="model-name">${model.name}</span></td>
            <td><span class="metric-score ${getScoreClass(model.accuracy)}">${(model.accuracy * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.precision)}">${(model.precision * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.recall)}">${(model.recall * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.f1Score)}">${(model.f1Score * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.aucRoc)}">${(model.aucRoc * 100).toFixed(1)}%</span></td>
        `;
        
        tableBody.appendChild(row);
    });
}


// Enhanced Alerts System (variables declared earlier)

// Initialize enhanced alerts system
function initializeAlertsSystem() {
    console.log('Initializing enhanced alerts system...');
    generateSampleAlerts();
    console.log('Generated alerts:', alertsData.length);
    setupAlertEventListeners();
    updateAlertStatistics();
    renderAlerts();
    startAlertSimulation();
    console.log('Alerts system initialized successfully');
    
    // Test modal functionality
    setTimeout(() => {
        console.log('Testing modal functionality...');
        const modal = document.getElementById('alertModal');
        console.log('Modal element:', modal);
        if (modal) {
            console.log('Modal classes:', modal.className);
            console.log('Modal style:', modal.style.display);
        }
    }, 1000);
}

// Global test function for debugging
window.testModal = function() {
    console.log('Testing modal manually...');
    if (alertsData.length > 0) {
        viewAlertDetails(alertsData[0].id);
    } else {
        console.error('No alerts data available');
    }
};

// Generate comprehensive sample alerts
function generateSampleAlerts() {
    const alertTypes = [
        { type: 'critical', priority: 'p1', category: 'fraud', icon: '🚨' },
        { type: 'high', priority: 'p2', category: 'security', icon: '⚠️' },
        { type: 'medium', priority: 'p3', category: 'performance', icon: '⚡' },
        { type: 'low', priority: 'p4', category: 'system', icon: 'ℹ️' }
    ];

    const alertMessages = {
        fraud: [
            'High-risk transaction pattern detected',
            'Suspicious account activity identified',
            'Multiple failed authentication attempts',
            'Unusual spending pattern detected',
            'Cross-border transaction anomaly'
        ],
        security: [
            'Potential data breach attempt',
            'Unauthorized access attempt',
            'Suspicious IP address detected',
            'Malware signature detected',
            'Phishing attempt blocked'
        ],
        performance: [
            'System response time exceeded threshold',
            'Database connection pool exhausted',
            'Memory usage critical',
            'CPU utilization high',
            'Network latency increased'
        ],
        system: [
            'Service health check failed',
            'Backup process incomplete',
            'Certificate expiration warning',
            'Disk space low',
            'Log file size exceeded'
        ]
    };

    const statuses = ['new', 'acknowledged', 'in-progress', 'resolved', 'escalated'];
    const sources = ['ML Model', 'Rule Engine', 'Manual Review', 'System Monitor', 'Security Scanner'];

    alertsData = [];
    for (let i = 0; i < 50; i++) {
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const categoryMessages = alertMessages[alertType.category];
        const message = categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
        
        
        const now = new Date();
        const randomTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        alertsData.push({
            id: `ALT${String(i + 1).padStart(4, '0')}`,
            type: alertType.type,
            priority: alertType.priority,
            category: alertType.category,
            icon: alertType.icon,
            title: message,
            description: generateAlertDescription(alertType.category, message),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            source: sources[Math.floor(Math.random() * sources.length)],
            timestamp: randomTime,
            severity: Math.floor(Math.random() * 100) + 1,
            affectedUsers: Math.floor(Math.random() * 1000),
            responseTime: Math.floor(Math.random() * 120) + 5,
            tags: generateAlertTags(alertType.category),
            actions: generateAlertActions(alertType.type)
        });
    }
    
    alertsData.sort((a, b) => b.timestamp - a.timestamp);
}

// Generate alert description
function generateAlertDescription(category, message) {
    const descriptions = {
        fraud: `This alert was triggered by our advanced ML fraud detection system. The transaction pattern shows multiple risk indicators including unusual timing, amount, and geographic location. Immediate investigation recommended.`,
        security: `Security monitoring system detected potential threat activity. This may indicate an attempted breach or unauthorized access. Security team has been automatically notified.`,
        performance: `System performance metrics have exceeded normal thresholds. This may impact user experience and system reliability. Monitoring team is investigating.`,
        system: `Automated system health check has identified an issue that requires attention. This alert helps maintain optimal system performance and reliability.`
    };
    return descriptions[category] || 'System alert requiring attention.';
}

// Generate alert tags
function generateAlertTags(category) {
    const tagSets = {
        fraud: ['transaction', 'risk', 'ml-detected', 'urgent'],
        security: ['security', 'threat', 'monitoring', 'investigation'],
        performance: ['performance', 'monitoring', 'optimization', 'system'],
        system: ['system', 'health', 'maintenance', 'automated']
    };
    return tagSets[category] || ['general'];
}

// Generate alert actions
function generateAlertActions(type) {
    const actionSets = {
        critical: ['block', 'investigate', 'notify', 'escalate'],
        high: ['review', 'monitor', 'notify'],
        medium: ['review', 'monitor'],
        low: ['monitor']
    };
    return actionSets[type] || ['monitor'];
}

// Setup alert event listeners
function setupAlertEventListeners() {
    // Filter event listeners
    const filters = ['alertTypeFilter', 'timeRangeFilter', 'statusFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', handleAlertFilter);
        }
    });

    // Action button listeners
    document.getElementById('refreshAlerts')?.addEventListener('click', refreshAlerts);
    document.getElementById('markAllRead')?.addEventListener('click', markAllAlertsRead);
    document.getElementById('exportAlerts')?.addEventListener('click', exportAlerts);

    // View option listeners
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchView(e.target.dataset.view);
        });
    });

    // Modal listeners
    document.getElementById('closeModal')?.addEventListener('click', closeAlertModal);
    document.getElementById('acknowledgeAlert')?.addEventListener('click', acknowledgeAlert);
    document.getElementById('resolveAlert')?.addEventListener('click', resolveAlert);
    document.getElementById('escalateAlert')?.addEventListener('click', escalateAlert);
}

// Enhanced alert filtering
function handleAlertFilter(event) {
    try {
        applyFilters();
        updateAlertStatistics();
        renderAlerts();
        showNotification('Filters applied successfully', 'success');
    } catch (error) {
        console.error('Error applying filters:', error);
        showNotification('Failed to apply filters', 'error');
    }
}

// Apply all filters
function applyFilters() {
    const typeFilter = document.getElementById('alertTypeFilter').value;
    const timeFilter = document.getElementById('timeRangeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    filteredAlerts = alertsData.filter(alert => {
        // Type filter
        if (typeFilter !== 'all' && alert.type !== typeFilter) return false;
        
        // Status filter
        if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
        
        // Time filter
        const now = new Date();
        const alertTime = alert.timestamp;
        const timeDiff = now - alertTime;
        
        switch (timeFilter) {
            case '1h':
                if (timeDiff > 60 * 60 * 1000) return false;
                break;
            case '24h':
                if (timeDiff > 24 * 60 * 60 * 1000) return false;
                break;
            case '7d':
                if (timeDiff > 7 * 24 * 60 * 60 * 1000) return false;
                break;
            case '30d':
                if (timeDiff > 30 * 24 * 60 * 60 * 1000) return false;
                break;
        }
        
        return true;
    });
}

// Update alert statistics
function updateAlertStatistics() {
    const totalAlerts = alertsData.length;
    const criticalAlerts = alertsData.filter(a => a.type === 'critical').length;
    const newAlerts = alertsData.filter(a => a.status === 'new').length;
    const avgResponseTime = Math.round(
        alertsData.filter(a => a.status === 'resolved')
            .reduce((sum, a) => sum + a.responseTime, 0) / 
        alertsData.filter(a => a.status === 'resolved').length || 0
    );

    // Update statistics with proper element IDs
    const totalAlertsEl = document.getElementById('totalAlerts');
    const criticalAlertsEl = document.getElementById('criticalAlerts');
    const newAlertsEl = document.getElementById('newAlerts');
    const avgResponseTimeEl = document.getElementById('alertAvgResponseTime');

    if (totalAlertsEl) totalAlertsEl.textContent = totalAlerts;
    if (criticalAlertsEl) criticalAlertsEl.textContent = criticalAlerts;
    if (newAlertsEl) newAlertsEl.textContent = newAlerts;
    if (avgResponseTimeEl) avgResponseTimeEl.textContent = avgResponseTime + 'm';
}

// Render alerts based on current view
function renderAlerts() {
    const alertsList = document.getElementById('alertsList');
    const filteredCount = document.getElementById('filteredAlertsCount');
    
    console.log('Rendering alerts...', { alertsList, filteredCount });
    
    if (!alertsList) {
        console.error('alertsList element not found');
        return;
    }
    
    // Apply filters first
    applyFilters();
    console.log('Filtered alerts:', filteredAlerts.length);
    
    // Update count
    if (filteredCount) {
        filteredCount.textContent = `${filteredAlerts.length} alerts`;
    }
    
    // Clear existing alerts
    alertsList.innerHTML = '';
    
    // Render based on view
    switch (currentView) {
        case 'list':
            renderListView(filteredAlerts, alertsList);
            break;
        case 'grid':
            renderGridView(filteredAlerts, alertsList);
            break;
    }
    
    console.log('Alerts rendered successfully');
}

// Render list view
function renderListView(alerts, container) {
    console.log('Rendering list view with', alerts.length, 'alerts');
    alerts.forEach(alert => {
        const alertElement = createAlertElement(alert);
        container.appendChild(alertElement);
    });
    console.log('List view rendered');
}

// Render grid view
function renderGridView(alerts, container) {
    container.className = 'alerts-list grid-view';
    alerts.forEach(alert => {
        const alertElement = createAlertCard(alert);
        container.appendChild(alertElement);
    });
}

// Create alert element
function createAlertElement(alert) {
    const element = document.createElement('div');
    element.className = `alert-item ${alert.type} ${alert.status}`;
    element.dataset.alertId = alert.id;
    
    const timeAgo = getTimeAgo(alert.timestamp);
    const statusClass = alert.status.replace('-', '');
    
    element.innerHTML = `
        <div class="alert-header">
            <div class="alert-icon">${alert.icon}</div>
            <div class="alert-info">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-meta">
                    <span class="alert-id">${alert.id}</span>
                    <span class="alert-source">${alert.source}</span>
                    <span class="alert-time">${timeAgo}</span>
                </div>
            </div>
            <div class="alert-actions">
                <span class="alert-severity">${alert.severity}%</span>
                <span class="alert-status status--${statusClass}">${alert.status}</span>
                <button class="btn btn--sm btn--outline view-details-btn" data-alert-id="${alert.id}">
                    View Details
                </button>
                <button class="btn btn--sm btn--primary acknowledge-btn" data-alert-id="${alert.id}">
                    Acknowledge
                </button>
            </div>
        </div>
        <div class="alert-content">
            <div class="alert-description">${alert.description}</div>
            <div class="alert-tags">
                ${alert.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add event listeners
    const viewBtn = element.querySelector('.view-details-btn');
    const ackBtn = element.querySelector('.acknowledge-btn');
    
    console.log('Alert element created for:', alert.id);
    console.log('Buttons found:', { viewBtn, ackBtn });
    
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('View Details button clicked for alert:', alert.id);
            viewAlertDetails(alert.id);
        });
    } else {
        console.error('View Details button not found for alert:', alert.id);
    }
    
    if (ackBtn) {
        ackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Acknowledge button clicked for alert:', alert.id);
            acknowledgeAlertDirect(alert.id);
        });
    } else {
        console.error('Acknowledge button not found for alert:', alert.id);
    }
    
    return element;
}

// Create alert card for grid view
function createAlertCard(alert) {
    const element = document.createElement('div');
    element.className = `alert-card ${alert.type} ${alert.status}`;
    element.dataset.alertId = alert.id;
    
    const timeAgo = getTimeAgo(alert.timestamp);
    const statusClass = alert.status.replace('-', '');
    
    element.innerHTML = `
        <div class="card-header">
            <div class="alert-icon">${alert.icon}</div>
            <div class="alert-severity">${alert.severity}%</div>
        </div>
        <div class="card-body">
            <div class="alert-title">${alert.title}</div>
            <div class="alert-description">${alert.description.substring(0, 100)}...</div>
            <div class="alert-meta">
                <span class="alert-id">${alert.id}</span>
                <span class="alert-time">${timeAgo}</span>
            </div>
        </div>
        <div class="card-footer">
            <span class="alert-status status--${statusClass}">${alert.status}</span>
            <button class="btn btn--sm btn--primary view-details-btn" data-alert-id="${alert.id}">
                Details
            </button>
        </div>
    `;
    
    // Add event listener
    const viewBtn = element.querySelector('.view-details-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewAlertDetails(alert.id);
        });
    }
    
    return element;
}

// View alert details
function viewAlertDetails(alertId) {
    console.log('viewAlertDetails called with ID:', alertId);
    console.log('alertsData:', alertsData);
    
    const alert = alertsData.find(a => a.id === alertId);
    console.log('Found alert:', alert);
    
    if (!alert) {
        console.error('Alert not found for ID:', alertId);
        showNotification('Alert not found', 'error');
        return;
    }
    
    const modal = document.getElementById('alertModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    console.log('Modal elements:', { modal, modalTitle, modalBody });
    
    if (!modal || !modalTitle || !modalBody) {
        console.error('Modal elements not found:', { modal, modalTitle, modalBody });
        showNotification('Modal elements not found', 'error');
        return;
    }
    
    modalTitle.textContent = `${alert.id} - ${alert.title}`;
    
    modalBody.innerHTML = `
        <div class="alert-details">
            <div class="detail-section">
                <h4>Alert Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Type:</label>
                        <span class="alert-type ${alert.type}">${alert.type.toUpperCase()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Priority:</label>
                        <span class="alert-priority ${alert.priority}">${alert.priority.toUpperCase()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="alert-status ${alert.status}">${alert.status.toUpperCase()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Severity:</label>
                        <span class="alert-severity">${alert.severity}%</span>
                    </div>
                    <div class="detail-item">
                        <label>Source:</label>
                        <span>${alert.source}</span>
                    </div>
                    <div class="detail-item">
                        <label>Timestamp:</label>
                        <span>${alert.timestamp.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Description</h4>
                <p>${alert.description}</p>
            </div>
            
            <div class="detail-section">
                <h4>Impact</h4>
                <div class="impact-metrics">
                    <div class="metric">
                        <span class="metric-label">Affected Users:</span>
                        <span class="metric-value">${alert.affectedUsers}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Response Time:</span>
                        <span class="metric-value">${alert.responseTime} minutes</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Tags</h4>
                <div class="alert-tags">
                    ${alert.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Recommended Actions</h4>
                <div class="recommended-actions">
                    ${alert.actions.map(action => `<span class="action-tag">${action}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Show modal with animation
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    // Add click outside to close (remove existing listeners first)
    const existingListener = modal._clickListener;
    if (existingListener) {
        modal.removeEventListener('click', existingListener);
    }
    
    const clickListener = (e) => {
        if (e.target === modal) {
            closeAlertModal();
        }
    };
    
    modal._clickListener = clickListener;
    modal.addEventListener('click', clickListener);
    
    console.log('Modal should now be visible');
    showNotification('Alert details loaded', 'success');
}

// Close alert modal
function closeAlertModal() {
    const modal = document.getElementById('alertModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        
        // Remove click listener
        if (modal._clickListener) {
            modal.removeEventListener('click', modal._clickListener);
            delete modal._clickListener;
        }
        
        console.log('Modal closed');
    }
}

// Alert actions
function acknowledgeAlert() {
    const alertId = getCurrentAlertId();
    if (alertId) {
        updateAlertStatus(alertId, 'acknowledged');
        showNotification('Alert acknowledged', 'success');
        closeAlertModal();
    }
}

// Direct acknowledge function for inline buttons
function acknowledgeAlertDirect(alertId) {
    if (alertId) {
        updateAlertStatus(alertId, 'acknowledged');
        showNotification('Alert acknowledged', 'success');
    }
}

function resolveAlert() {
    const alertId = getCurrentAlertId();
    if (alertId) {
        updateAlertStatus(alertId, 'resolved');
        showNotification('Alert resolved', 'success');
        closeAlertModal();
    }
}

function escalateAlert() {
    const alertId = getCurrentAlertId();
    if (alertId) {
        updateAlertStatus(alertId, 'escalated');
        showNotification('Alert escalated', 'warning');
        closeAlertModal();
    }
}

function getCurrentAlertId() {
    const modal = document.getElementById('alertModal');
    const title = document.getElementById('modalTitle').textContent;
    return title.split(' - ')[0];
}

function updateAlertStatus(alertId, newStatus) {
    const alert = alertsData.find(a => a.id === alertId);
    if (alert) {
        alert.status = newStatus;
        applyFilters();
        updateAlertStatistics();
        renderAlerts();
    }
}

// View switching
function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Update container class
    const alertsList = document.getElementById('alertsList');
    alertsList.className = `alerts-list ${view}-view`;
    
    renderAlerts();
}

// Pagination
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="btn btn--sm btn--outline" onclick="changePage(${currentPage - 1})">Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="btn btn--sm btn--primary">${i}</button>`;
        } else {
            paginationHTML += `<button class="btn btn--sm btn--outline" onclick="changePage(${i})">${i}</button>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="btn btn--sm btn--outline" onclick="changePage(${currentPage + 1})">Next</button>`;
    }
    
    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    renderAlerts();
}

// Action functions
function refreshAlerts() {
    generateSampleAlerts();
    applyFilters();
    updateAlertStatistics();
    renderAlerts();
    showNotification('Alerts refreshed', 'success');
}

function markAllAlertsRead() {
    alertsData.forEach(alert => {
        if (alert.status === 'new') {
            alert.status = 'acknowledged';
        }
    });
    applyFilters();
    updateAlertStatistics();
    renderAlerts();
    showNotification('All alerts marked as read', 'success');
}

function exportAlerts() {
    const exportData = filteredAlerts.map(alert => ({
        id: alert.id,
        type: alert.type,
        title: alert.title,
        status: alert.status,
        timestamp: alert.timestamp.toISOString(),
        severity: alert.severity
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `alerts_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Alerts exported successfully', 'success');
}

function openAlertSettings() {
    showNotification('Alert settings panel coming soon', 'info');
}

// Utility functions
function getTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

// Start alert simulation
function startAlertSimulation() {
    setInterval(() => {
        // Occasionally add new alerts
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
            addRandomAlert();
        }
        
        // Update statistics
        updateAlertStatistics();
    }, 5000);
}

function addRandomAlert() {
    const alertTypes = [
        { type: 'critical', priority: 'p1', category: 'fraud', icon: '🚨' },
        { type: 'high', priority: 'p2', category: 'security', icon: '⚠️' },
        { type: 'medium', priority: 'p3', category: 'performance', icon: '⚡' },
        { type: 'low', priority: 'p4', category: 'system', icon: 'ℹ️' }
    ];
    
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const messages = [
        'New suspicious activity detected',
        'System performance threshold exceeded',
        'Security anomaly identified',
        'Automated health check failed'
    ];
    
    const newAlert = {
        id: `ALT${String(alertsData.length + 1).padStart(4, '0')}`,
        type: alertType.type,
        priority: alertType.priority,
        category: alertType.category,
        icon: alertType.icon,
        title: messages[Math.floor(Math.random() * messages.length)],
        description: generateAlertDescription(alertType.category, ''),
        status: 'new',
        source: 'ML Model',
        timestamp: new Date(),
        severity: Math.floor(Math.random() * 100) + 1,
        affectedUsers: Math.floor(Math.random() * 1000),
        responseTime: 0,
        tags: generateAlertTags(alertType.category),
        actions: generateAlertActions(alertType.type)
    };
    
    alertsData.unshift(newAlert);
    applyFilters();
    updateAlertStatistics();
    renderAlerts();
    
    // Show notification for new critical alerts
    if (alertType.type === 'critical') {
        showNotification(`New critical alert: ${newAlert.title}`, 'error');
    }
}

// Initialize alerts system when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
    // Add this to the existing initialization
    setTimeout(() => {
        initializeAlertsSystem();
    }, 1000);
});

// Tab functionality
function initializeTabs() {
    try {
        // Set initial active tab
        switchToTab('overview');
    } catch (error) {
        console.error('Error initializing tabs:', error);
    }
}

function handleTabSwitch(event) {
    try {
        const tabName = event.target.closest('.tab-btn').dataset.tab;
        switchToTab(tabName);
    } catch (error) {
        console.error('Error switching tabs:', error);
        showNotification('Failed to switch tab', 'error');
    }
}

function switchToTab(tabName) {
    try {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);
        
        if (activeTab && activeContent) {
            activeTab.classList.add('active');
            activeContent.classList.add('active');
        }
    } catch (error) {
        console.error('Error switching to tab:', tabName, error);
    }
}

// Form validation
function setupFormValidation() {
    try {
        const form = document.getElementById('transactionForm');
        if (form) {
            // Add real-time validation
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                field.addEventListener('blur', validateField);
                field.addEventListener('input', clearFieldError);
            });
        }
    } catch (error) {
        console.error('Error setting up form validation:', error);
    }
}

function validateField(event) {
    try {
        const field = event.target;
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'number' && value) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                showFieldError(field, 'Please enter a valid number');
                return false;
            }
            if (field.hasAttribute('min') && numValue < parseFloat(field.min)) {
                showFieldError(field, `Value must be at least ${field.min}`);
                return false;
            }
        }
        
        clearFieldError(event);
        return true;
    } catch (error) {
        console.error('Error validating field:', error);
        return false;
    }
}

function showFieldError(field, message) {
    try {
        field.classList.add('error');
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    } catch (error) {
        console.error('Error showing field error:', error);
    }
}

function clearFieldError(event) {
    try {
        const field = event.target;
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    } catch (error) {
        console.error('Error clearing field error:', error);
    }
}

// Event handlers for various buttons
function handleAlertFilter(event) {
    try {
        showNotification('Alert filter applied', 'info');
        // Apply filters to alerts
        const alertType = document.getElementById('alertTypeFilter').value;
        const timeRange = document.getElementById('timeRangeFilter').value;
        const status = document.getElementById('statusFilter').value;
        
        filteredAlerts = alertsData.filter(alert => {
            const typeMatch = alertType === 'all' || alert.type === alertType;
            const statusMatch = status === 'all' || alert.status === status;
            
            // Time range filtering
            const alertTime = new Date(alert.timestamp);
            const now = new Date();
            let timeMatch = true;
            
            switch (timeRange) {
                case '1h':
                    timeMatch = (now - alertTime) <= 60 * 60 * 1000;
                    break;
                case '24h':
                    timeMatch = (now - alertTime) <= 24 * 60 * 60 * 1000;
                    break;
                case '7d':
                    timeMatch = (now - alertTime) <= 7 * 24 * 60 * 60 * 1000;
                    break;
                case '30d':
                    timeMatch = (now - alertTime) <= 30 * 24 * 60 * 60 * 1000;
                    break;
            }
            
            return typeMatch && statusMatch && timeMatch;
        });
    } catch (error) {
        console.error('Error handling alert filter:', error);
    }
}

function handleGenerateReport(event) {
    try {
        showNotification('Generating comprehensive report...', 'info');
        
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;
        const reportType = document.getElementById('reportType').value;
        
        // Show loading animation
        const reportContent = document.getElementById('reportContent');
        reportContent.innerHTML = `
            <div class="report-loading">
                <div class="loading-spinner"></div>
                <div class="loading-text">Generating ${reportType.replace('_', ' ')} report...</div>
            </div>
        `;
        
        // Simulate report generation delay
        setTimeout(() => {
            const report = generateComprehensiveReport(reportType, startDate, endDate);
            displayReport(report);
            showNotification('Report generated successfully', 'success');
        }, 3000);
        
    } catch (error) {
        console.error('Error generating report:', error);
        showNotification('Failed to generate report', 'error');
    }
}

// Generate comprehensive report based on type and date range
function generateComprehensiveReport(reportType, startDate, endDate) {
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
    const end = endDate ? new Date(endDate) : new Date();
    
    // Filter data based on date range
    const filteredTransactions = fraudDatabase.historicalTransactions.filter(t => 
        t.date >= start && t.date <= end
    );
    
    switch (reportType) {
        case 'fraud_summary':
            return generateFraudSummaryReport(filteredTransactions, start, end);
        case 'model_performance':
            return generateModelPerformanceReport(start, end);
        case 'geographic_analysis':
            return generateGeographicAnalysisReport(filteredTransactions);
        case 'behavioral_patterns':
            return generateBehavioralPatternsReport(filteredTransactions);
        case 'custom':
            return generateCustomReport(filteredTransactions, start, end);
        default:
            return generateFraudSummaryReport(filteredTransactions, start, end);
    }
}

// Generate fraud summary report
function generateFraudSummaryReport(transactions, startDate, endDate) {
    const totalTransactions = transactions.length;
    const fraudulentTransactions = transactions.filter(t => t.isFraudulent);
    const fraudRate = (fraudulentTransactions.length / totalTransactions) * 100;
    
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const fraudulentAmount = fraudulentTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    const blockedTransactions = fraudulentTransactions.filter(t => t.fraudProbability > 70);
    const falsePositives = transactions.filter(t => !t.isFraudulent && t.fraudProbability > 70);
    const falseNegatives = transactions.filter(t => t.isFraudulent && t.fraudProbability < 30);
    
    // Calculate metrics
    const precision = blockedTransactions.length / (blockedTransactions.length + falsePositives.length) * 100;
    const recall = blockedTransactions.length / fraudulentTransactions.length * 100;
    const f1Score = 2 * (precision * recall) / (precision + recall);
    
    return {
        type: 'fraud_summary',
        title: 'Fraud Summary Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            totalTransactions,
            fraudulentTransactions: fraudulentTransactions.length,
            fraudRate: fraudRate.toFixed(2),
            totalAmount: totalAmount.toLocaleString(),
            fraudulentAmount: fraudulentAmount.toLocaleString(),
            blockedTransactions: blockedTransactions.length,
            falsePositives: falsePositives.length,
            falseNegatives: falseNegatives.length,
            precision: precision.toFixed(2),
            recall: recall.toFixed(2),
            f1Score: f1Score.toFixed(2)
        },
        charts: [
            {
                type: 'doughnut',
                title: 'Transaction Distribution',
                data: {
                    labels: ['Legitimate', 'Fraudulent'],
                    datasets: [{
                        data: [totalTransactions - fraudulentTransactions.length, fraudulentTransactions.length],
                        backgroundColor: ['#4CAF50', '#F44336']
                    }]
                }
            },
            {
                type: 'bar',
                title: 'Fraud Rate by Transaction Type',
                data: generateTransactionTypeFraudData(transactions)
            },
            {
        type: 'line',
                title: 'Daily Fraud Trends',
                data: generateDailyFraudTrends(transactions, startDate, endDate)
            }
        ],
        tables: [
            {
                title: 'Top Risk Factors',
                data: generateTopRiskFactors(transactions)
            },
            {
                title: 'Geographic Fraud Distribution',
                data: generateGeographicFraudTable(transactions)
            }
        ]
    };
}

// Generate model performance report
function generateModelPerformanceReport(startDate, endDate) {
    const recentPerformance = fraudDatabase.modelPerformanceHistory.slice(-7); // Last 7 days
    
    return {
        type: 'model_performance',
        title: 'Model Performance Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            bestModel: 'XGBoost',
            avgAccuracy: 94.2,
            avgPrecision: 87.5,
            avgRecall: 82.3,
            avgF1Score: 84.8,
            totalModels: 5,
            activeModels: 5
        },
        charts: [
            {
                type: 'radar',
                title: 'Model Performance Comparison',
                data: generateModelComparisonData()
            },
            {
                type: 'line',
                title: 'Performance Trends (Last 7 Days)',
                data: generatePerformanceTrendsData(recentPerformance)
            }
        ],
        tables: [
            {
                title: 'Detailed Model Metrics',
                data: generateDetailedModelMetrics()
            }
        ]
    };
}

// Generate geographic analysis report
function generateGeographicAnalysisReport(transactions) {
    const geoData = fraudDatabase.geographicFraudData;
    
    return {
        type: 'geographic_analysis',
        title: 'Geographic Fraud Analysis',
        period: 'Historical Analysis',
        summary: {
            totalCountries: geoData.length,
            highestRiskCountry: 'China',
            lowestRiskCountry: 'Japan',
            avgFraudRate: (geoData.reduce((sum, c) => sum + c.fraudRate, 0) / geoData.length).toFixed(2),
            totalBlockedAmount: geoData.reduce((sum, c) => sum + c.blockedAmount, 0).toLocaleString()
        },
        charts: [
            {
                type: 'bar',
                title: 'Fraud Rate by Country',
        data: {
                    labels: geoData.map(c => c.country),
                    datasets: [{
                        label: 'Fraud Rate (%)',
                        data: geoData.map(c => c.fraudRate),
                        backgroundColor: geoData.map(c => 
                            c.fraudRate > 25 ? '#F44336' : 
                            c.fraudRate > 20 ? '#FF9800' : 
                            c.fraudRate > 15 ? '#FFC107' : '#4CAF50'
                        )
                    }]
                }
            },
            {
                type: 'pie',
                title: 'Blocked Amount Distribution',
                data: {
                    labels: geoData.map(c => c.country),
                    datasets: [{
                        data: geoData.map(c => c.blockedAmount),
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
                        ]
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Country Risk Analysis',
                data: geoData.map(c => ({
                    country: c.country,
                    transactions: c.totalTransactions.toLocaleString(),
                    fraudCount: c.fraudCount.toLocaleString(),
                    fraudRate: c.fraudRate + '%',
                    blockedAmount: '$' + c.blockedAmount.toLocaleString()
                }))
            }
        ]
    };
}

// Generate behavioral patterns report
function generateBehavioralPatternsReport(transactions) {
    const patterns = fraudDatabase.behavioralPatterns;
    
    return {
        type: 'behavioral_patterns',
        title: 'Behavioral Patterns Analysis',
        period: 'Historical Analysis',
        summary: {
            totalPatterns: 12,
            highestRiskPattern: 'Extreme Transaction Velocity',
            avgFraudRate: 18.7,
            patternsAnalyzed: 4
        },
        charts: [
            {
                type: 'bar',
                title: 'Transaction Velocity Patterns',
                data: {
                    labels: Object.keys(patterns.transactionVelocity),
                    datasets: [{
                        label: 'Fraud Rate (%)',
                        data: Object.values(patterns.transactionVelocity).map(p => p.fraudRate),
                        backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336']
                    }]
                }
            },
            {
                type: 'bar',
                title: 'Amount Range Patterns',
                data: {
                    labels: Object.values(patterns.amountPatterns).map(p => p.range),
                    datasets: [{
                        label: 'Fraud Rate (%)',
                        data: Object.values(patterns.amountPatterns).map(p => p.fraudRate),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Risk Factor Analysis',
                data: fraudDatabase.riskFactorAnalysis.map(rf => ({
                    factor: rf.factor,
                    frequency: rf.frequency.toLocaleString(),
                    impact: rf.impact + '%',
                    prevention: rf.prevention + '%'
                }))
            }
        ]
    };
}

// Generate custom report
function generateCustomReport(transactions, startDate, endDate) {
    return {
        type: 'custom',
        title: 'Custom Analytics Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            totalTransactions: transactions.length,
            analysisDepth: 'Comprehensive',
            dataPoints: 15,
            insights: 8
        },
        charts: [
            {
                type: 'line',
                title: 'Hourly Fraud Distribution',
                data: generateHourlyFraudData(transactions)
            },
            {
                type: 'bar',
                title: 'Device Type Analysis',
                data: generateDeviceTypeData(transactions)
            }
        ],
        tables: [
            {
                title: 'Merchant Category Analysis',
                data: fraudDatabase.merchantAnalysis.map(m => ({
                    category: m.category,
                    transactions: m.totalTransactions.toLocaleString(),
                    fraudCount: m.fraudCount.toLocaleString(),
                    fraudRate: m.fraudRate + '%',
                    avgAmount: '$' + m.avgAmount.toLocaleString()
                }))
            }
        ]
    };
}

// Helper functions for report generation
function generateTransactionTypeFraudData(transactions) {
    const typeData = {};
    transactions.forEach(t => {
        if (!typeData[t.type]) {
            typeData[t.type] = { total: 0, fraud: 0 };
        }
        typeData[t.type].total++;
        if (t.isFraudulent) typeData[t.type].fraud++;
    });
    
    return {
        labels: Object.keys(typeData),
        datasets: [{
            label: 'Fraud Rate (%)',
            data: Object.values(typeData).map(d => (d.fraud / d.total) * 100),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        }]
    };
}

function generateDailyFraudTrends(transactions, startDate, endDate) {
    const dailyData = {};
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        dailyData[dateStr] = { total: 0, fraud: 0 };
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    transactions.forEach(t => {
        const dateStr = t.date.toISOString().split('T')[0];
        if (dailyData[dateStr]) {
            dailyData[dateStr].total++;
            if (t.isFraudulent) dailyData[dateStr].fraud++;
        }
    });
    
    return {
        labels: Object.keys(dailyData),
            datasets: [{
                label: 'Fraud Count',
            data: Object.values(dailyData).map(d => d.fraud),
            borderColor: '#F44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                tension: 0.4
            }]
    };
}

function generateTopRiskFactors(transactions) {
    const riskFactors = fraudDatabase.riskFactorAnalysis.slice(0, 5);
    return riskFactors.map(rf => ({
        factor: rf.factor,
        frequency: rf.frequency.toLocaleString(),
        impact: rf.impact + '%',
        prevention: rf.prevention + '%'
    }));
}

function generateGeographicFraudTable(transactions) {
    const geoData = fraudDatabase.geographicFraudData.slice(0, 5);
    return geoData.map(c => ({
        country: c.country,
        transactions: c.totalTransactions.toLocaleString(),
        fraudCount: c.fraudCount.toLocaleString(),
        fraudRate: c.fraudRate + '%'
    }));
}

function generateModelComparisonData() {
    const models = ['XGBoost', 'Random Forest', 'Neural Network', 'Isolation Forest', 'Logistic Regression'];
    return {
        labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'AUC-ROC'],
        datasets: models.map((model, index) => ({
            label: model,
            data: [95.2, 87.5, 82.3, 84.8, 92.1],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index] + '20'
        }))
    };
}

function generatePerformanceTrendsData(recentPerformance) {
    return {
        labels: recentPerformance.map(p => p.date.toLocaleDateString()),
        datasets: [{
            label: 'XGBoost Accuracy',
            data: recentPerformance.map(p => p.models.XGBoost.accuracy * 100),
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)'
        }]
    };
}

function generateDetailedModelMetrics() {
    return [
        { model: 'XGBoost', accuracy: '95.2%', precision: '87.5%', recall: '82.3%', f1Score: '84.8%', aucRoc: '92.1%' },
        { model: 'Random Forest', accuracy: '94.5%', precision: '85.2%', recall: '80.1%', f1Score: '82.6%', aucRoc: '91.3%' },
        { model: 'Neural Network', accuracy: '93.8%', precision: '83.9%', recall: '78.7%', f1Score: '81.2%', aucRoc: '90.5%' },
        { model: 'Isolation Forest', accuracy: '92.1%', precision: '81.4%', recall: '75.3%', f1Score: '78.2%', aucRoc: '89.7%' },
        { model: 'Logistic Regression', accuracy: '88.7%', precision: '76.2%', recall: '72.1%', f1Score: '74.1%', aucRoc: '86.9%' }
    ];
}

function generateHourlyFraudData(transactions) {
    const hourlyData = fraudDatabase.timePatterns;
    return {
        labels: hourlyData.map(h => h.hour + ':00'),
        datasets: [{
            label: 'Fraud Rate (%)',
            data: hourlyData.map(h => h.fraudRate),
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.4
        }]
    };
}

function generateDeviceTypeData(transactions) {
    const deviceData = fraudDatabase.deviceAnalysis;
    return {
        labels: deviceData.map(d => d.type),
        datasets: [{
            label: 'Fraud Rate (%)',
            data: deviceData.map(d => d.fraudRate),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    };
}

function handleExportReport(event) {
    try {
        showNotification('Exporting report...', 'info');
        // Generate and download report
        const reportData = {
            timestamp: new Date().toISOString(),
            filters: {
                alertType: document.getElementById('alertTypeFilter').value,
                timeRange: document.getElementById('timeRangeFilter').value,
                status: document.getElementById('statusFilter').value
            },
            alerts: filteredAlerts,
            statistics: {
                total: filteredAlerts.length,
                critical: filteredAlerts.filter(a => a.priority === 'critical').length,
                high: filteredAlerts.filter(a => a.priority === 'high').length,
                medium: filteredAlerts.filter(a => a.priority === 'medium').length,
                low: filteredAlerts.filter(a => a.priority === 'low').length
            }
        };
        
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fraud-alerts-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(() => {
            showNotification('Report exported successfully', 'success');
        }, 1500);
    } catch (error) {
        console.error('Error exporting report:', error);
        showNotification('Failed to export report', 'error');
    }
}

// Display comprehensive report
function displayReport(report) {
    const reportContent = document.getElementById('reportContent');
    
    reportContent.innerHTML = `
        <div class="report-container">
            <div class="report-header">
                <h2 class="report-title">${report.title}</h2>
                <div class="report-meta">
                    <span class="report-period">📅 ${report.period}</span>
                    <span class="report-type">📊 ${report.type.replace('_', ' ').toUpperCase()}</span>
                    <span class="report-timestamp">🕒 Generated: ${new Date().toLocaleString()}</span>
                </div>
            </div>
            
            <div class="report-summary">
                <h3>📈 Executive Summary</h3>
                <div class="summary-grid">
                    ${Object.entries(report.summary).map(([key, value]) => `
                        <div class="summary-item">
                            <span class="summary-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                            <span class="summary-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="report-charts">
                <h3>📊 Visual Analytics</h3>
                <div class="charts-grid">
                    ${report.charts.map((chart, index) => `
                        <div class="chart-container">
                            <h4 class="chart-title">${chart.title}</h4>
                            <div class="chart-wrapper">
                                <canvas id="reportChart${index}"></canvas>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="report-tables">
                <h3>📋 Detailed Data</h3>
                ${report.tables.map((table, index) => `
                    <div class="table-container">
                        <h4 class="table-title">${table.title}</h4>
                        <div class="table-wrapper">
                            <table class="report-table">
                                <thead>
                                    <tr>
                                        ${Object.keys(table.data[0] || {}).map(key => 
                                            `<th>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>`
                                        ).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${table.data.map(row => `
                                        <tr>
                                            ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="report-insights">
                <h3>💡 Key Insights</h3>
                <div class="insights-list">
                    ${generateReportInsights(report).map(insight => `
                        <div class="insight-item">
                            <span class="insight-icon">${insight.icon}</span>
                            <span class="insight-text">${insight.text}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="report-actions">
                <button class="btn btn--primary" onclick="exportReportData()">
                    <span class="btn-icon">📥</span>
                    Export Data
                </button>
                <button class="btn btn--secondary" onclick="printReport()">
                    <span class="btn-icon">🖨️</span>
                    Print Report
                </button>
                <button class="btn btn--outline" onclick="shareReport()">
                    <span class="btn-icon">📤</span>
                    Share Report
                </button>
            </div>
        </div>
    `;
    
    // Create charts after DOM is updated
    setTimeout(() => {
        report.charts.forEach((chart, index) => {
            createReportChart(`reportChart${index}`, chart);
        });
    }, 100);
}

// Create chart for report
function createReportChart(canvasId, chartConfig) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                    color: '#e0e0e0',
                    font: { size: 12 }
                }
            }
        },
        scales: chartConfig.type !== 'doughnut' && chartConfig.type !== 'pie' ? {
            x: {
                ticks: { color: '#a0a0a0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: { color: '#a0a0a0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        } : undefined
    };
    
    if (chartConfig.type === 'radar') {
        chartOptions.scales = {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: { color: '#a0a0a0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: '#e0e0e0' }
            }
        };
    }
    
    new Chart(ctx, {
        type: chartConfig.type,
        data: chartConfig.data,
        options: chartOptions
    });
}

// Generate insights based on report data
function generateReportInsights(report) {
    const insights = [];
    
    switch (report.type) {
        case 'fraud_summary':
            insights.push(
                { icon: '🎯', text: `Fraud detection accuracy is ${report.summary.precision}% with ${report.summary.recall}% recall rate` },
                { icon: '💰', text: `Total fraudulent amount prevented: $${report.summary.fraudulentAmount}` },
                { icon: '📊', text: `Overall fraud rate of ${report.summary.fraudRate}% across ${report.summary.totalTransactions} transactions` },
                { icon: '⚡', text: `${report.summary.blockedTransactions} transactions successfully blocked` }
            );
            break;
        case 'model_performance':
            insights.push(
                { icon: '🏆', text: `${report.summary.bestModel} is the top-performing model with ${report.summary.avgAccuracy}% accuracy` },
                { icon: '📈', text: `Average F1-Score of ${report.summary.avgF1Score}% across all models` },
                { icon: '🔄', text: `${report.summary.activeModels} models are currently active and monitoring` },
                { icon: '🎯', text: `Model precision averaging ${report.summary.avgPrecision}%` }
            );
            break;
        case 'geographic_analysis':
            insights.push(
                { icon: '🌍', text: `${report.summary.totalCountries} countries analyzed with ${report.summary.avgFraudRate}% average fraud rate` },
                { icon: '🚨', text: `${report.summary.highestRiskCountry} shows the highest fraud risk` },
                { icon: '✅', text: `${report.summary.lowestRiskCountry} demonstrates the lowest fraud risk` },
                { icon: '💵', text: `Total blocked amount: $${report.summary.totalBlockedAmount}` }
            );
            break;
        case 'behavioral_patterns':
            insights.push(
                { icon: '🔍', text: `${report.summary.patternsAnalyzed} behavioral patterns analyzed` },
                { icon: '📊', text: `Average fraud rate across patterns: ${report.summary.avgFraudRate}%` },
                { icon: '⚠️', text: `${report.summary.highestRiskPattern} poses the highest risk` },
                { icon: '📈', text: `${report.summary.totalPatterns} total patterns identified` }
            );
            break;
        default:
            insights.push(
                { icon: '📊', text: 'Comprehensive analysis completed successfully' },
                { icon: '💡', text: 'Multiple data points analyzed for insights' },
                { icon: '🎯', text: 'Report generated with high accuracy' }
            );
    }
    
    return insights;
}

// Export report data
function exportReportData() {
    try {
        const reportData = {
            timestamp: new Date().toISOString(),
            type: 'fraud_detection_report',
            data: fraudDatabase
        };
        
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `fraud_report_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showNotification('Report data exported successfully', 'success');
    } catch (error) {
        console.error('Error exporting report:', error);
        showNotification('Failed to export report', 'error');
    }
}

// Print report
function printReport() {
    try {
        const reportContent = document.getElementById('reportContent');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Fraud Detection Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .report-container { max-width: 1200px; margin: 0 auto; }
                        .report-header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                        .report-title { color: #333; margin: 0; }
                        .report-meta { margin-top: 10px; color: #666; }
                        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
                        .summary-item { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
                        .summary-label { display: block; font-weight: bold; color: #333; }
                        .summary-value { display: block; font-size: 1.2em; color: #007bff; margin-top: 5px; }
                        .chart-container, .table-container { margin: 30px 0; }
                        .chart-title, .table-title { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                        .report-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        .report-table th, .report-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        .report-table th { background-color: #f5f5f5; font-weight: bold; }
                        .insights-list { margin: 20px 0; }
                        .insight-item { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #007bff; }
                        @media print { .report-actions { display: none; } }
                    </style>
                </head>
                <body>
                    ${reportContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        
        showNotification('Report sent to printer', 'success');
    } catch (error) {
        console.error('Error printing report:', error);
        showNotification('Failed to print report', 'error');
    }
}

// Share report
function shareReport() {
    try {
        if (navigator.share) {
            navigator.share({
                title: 'Fraud Detection Report',
                text: 'Comprehensive fraud detection analysis report',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            const reportText = `Fraud Detection Report - ${new Date().toLocaleDateString()}\n\nGenerated comprehensive analysis report with detailed insights and visualizations.`;
            navigator.clipboard.writeText(reportText);
            showNotification('Report link copied to clipboard', 'success');
        }
    } catch (error) {
        console.error('Error sharing report:', error);
        showNotification('Failed to share report', 'error');
    }
}

function handleTrainModel(event) {
    try {
        showNotification('Training new model...', 'info');
        const progressElement = document.getElementById('trainingProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressElement && progressFill && progressText) {
            progressElement.classList.remove('hidden');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    progressText.textContent = 'Training completed!';
                    setTimeout(() => {
                        progressElement.classList.add('hidden');
                        showNotification('Model training completed', 'success');
                    }, 1000);
                } else {
                    progressFill.style.width = progress + '%';
                    progressText.textContent = `Training in progress... ${Math.round(progress)}%`;
                }
            }, 200);
        }
    } catch (error) {
        console.error('Error training model:', error);
        showNotification('Failed to train model', 'error');
    }
}

function handleRetrainModel(event) {
    try {
        showNotification('Retraining existing model...', 'info');
        // Simulate model retraining
        const progressBar = document.querySelector('.training-progress');
        const progressText = document.querySelector('.training-status');
        
        if (progressBar && progressText) {
            progressText.textContent = 'Retraining model...';
            progressBar.style.width = '0%';
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    progressText.textContent = 'Model retrained successfully';
                    showNotification('Model retrained successfully', 'success');
                } else {
                    progressText.textContent = `Retraining... ${Math.round(progress)}%`;
                }
                progressBar.style.width = `${progress}%`;
            }, 200);
        }
        setTimeout(() => {
            showNotification('Model retrained successfully', 'success');
        }, 3000);
    } catch (error) {
        console.error('Error retraining model:', error);
        showNotification('Failed to retrain model', 'error');
    }
}

function handleValidateModel(event) {
    try {
        showNotification('Validating model...', 'info');
        // Simulate model validation
        const validationResults = {
            accuracy: 94.2,
            precision: 91.8,
            recall: 89.5,
            f1Score: 90.6,
            auc: 0.95
        };
        
        showNotification('Model validation completed', 'success');
        
        // Update validation metrics in UI if elements exist
        const accuracyEl = document.querySelector('[data-metric="accuracy"]');
        const precisionEl = document.querySelector('[data-metric="precision"]');
        const recallEl = document.querySelector('[data-metric="recall"]');
        const f1El = document.querySelector('[data-metric="f1"]');
        const aucEl = document.querySelector('[data-metric="auc"]');
        
        if (accuracyEl) accuracyEl.textContent = `${validationResults.accuracy}%`;
        if (precisionEl) precisionEl.textContent = `${validationResults.precision}%`;
        if (recallEl) recallEl.textContent = `${validationResults.recall}%`;
        if (f1El) f1El.textContent = `${validationResults.f1Score}%`;
        if (aucEl) aucEl.textContent = validationResults.auc;
        setTimeout(() => {
            showNotification('Model validation completed', 'success');
        }, 2000);
    } catch (error) {
        console.error('Error validating model:', error);
        showNotification('Failed to validate model', 'error');
    }
}

function handleSaveSettings(event) {
    try {
        const settings = {
            lowRiskThreshold: document.getElementById('lowRiskThreshold').value,
            mediumRiskThreshold: document.getElementById('mediumRiskThreshold').value,
            highRiskThreshold: document.getElementById('highRiskThreshold').value,
            emailAlerts: document.getElementById('emailAlerts').checked,
            smsAlerts: document.getElementById('smsAlerts').checked,
            pushNotifications: document.getElementById('pushNotifications').checked,
            enableEncryption: document.getElementById('enableEncryption').checked,
            enableAuditTrail: document.getElementById('enableAuditTrail').checked,
            enableBiometricAuth: document.getElementById('enableBiometricAuth').checked
        };
        
        // Save to localStorage
        localStorage.setItem('fraudDetectionSettings', JSON.stringify(settings));
        showNotification('Settings saved successfully', 'success');
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('Failed to save settings', 'error');
    }
}

function handleResetSettings(event) {
    try {
        // Reset to default values
        document.getElementById('lowRiskThreshold').value = 30;
        document.getElementById('mediumRiskThreshold').value = 60;
        document.getElementById('highRiskThreshold').value = 80;
        document.getElementById('emailAlerts').checked = true;
        document.getElementById('smsAlerts').checked = false;
        document.getElementById('pushNotifications').checked = true;
        document.getElementById('enableEncryption').checked = true;
        document.getElementById('enableAuditTrail').checked = true;
        document.getElementById('enableBiometricAuth').checked = false;
        
        showNotification('Settings reset to defaults', 'info');
    } catch (error) {
        console.error('Error resetting settings:', error);
        showNotification('Failed to reset settings', 'error');
    }
}

function handleBlockTransaction(event) {
    try {
        showNotification('Transaction blocked successfully', 'success');
        // Block transaction and log action
        const transactionId = document.querySelector('#transactionId')?.value || 'TXN-' + Date.now();
        const blockReason = 'Manual block by administrator';
        
        // Log the blocking action
        console.log(`Blocking transaction ${transactionId}: ${blockReason}`);
        
        // Update UI to show blocked status
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            const riskLevel = document.getElementById('riskLevel');
            if (riskLevel) {
                riskLevel.textContent = 'BLOCKED';
                riskLevel.className = 'risk-level blocked';
            }
        }
        
        // Add to blocked transactions counter
        const blockedCount = document.getElementById('blockedTransactions');
        if (blockedCount) {
            const currentCount = parseInt(blockedCount.textContent.replace(/,/g, '')) || 0;
            blockedCount.textContent = (currentCount + 1).toLocaleString();
        }
    } catch (error) {
        console.error('Error blocking transaction:', error);
        showNotification('Failed to block transaction', 'error');
    }
}

function handleRequestReview(event) {
    try {
        showNotification('Manual review requested', 'info');
        // Request manual review and log action
        const transactionId = document.querySelector('#transactionId')?.value || 'TXN-' + Date.now();
        const reviewReason = 'Manual review requested by administrator';
        
        // Log the review request
        console.log(`Requesting review for transaction ${transactionId}: ${reviewReason}`);
        
        // Update UI to show review status
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            const riskLevel = document.getElementById('riskLevel');
            if (riskLevel) {
                riskLevel.textContent = 'UNDER REVIEW';
                riskLevel.className = 'risk-level review';
            }
        }
        
        // Create review ticket
        const reviewTicket = {
            id: 'REVIEW-' + Date.now(),
            transactionId: transactionId,
            reason: reviewReason,
            timestamp: new Date().toISOString(),
            status: 'pending',
            assignedTo: 'Manual Review Team'
        };
        
        console.log('Review ticket created:', reviewTicket);
    } catch (error) {
        console.error('Error requesting review:', error);
        showNotification('Failed to request review', 'error');
    }
}

function handleApproveTransaction(event) {
    try {
        showNotification('Transaction approved', 'success');
        // Approve transaction and log action
        const transactionId = document.querySelector('#transactionId')?.value || 'TXN-' + Date.now();
        const approvalReason = 'Transaction approved by administrator';
        
        // Log the approval action
        console.log(`Approving transaction ${transactionId}: ${approvalReason}`);
        
        // Update UI to show approved status
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            const riskLevel = document.getElementById('riskLevel');
            if (riskLevel) {
                riskLevel.textContent = 'APPROVED';
                riskLevel.className = 'risk-level approved';
            }
        }
        
        // Update approved transactions counter
        const approvedCount = document.querySelector('[data-metric="approved"]');
        if (approvedCount) {
            const currentCount = parseInt(approvedCount.textContent.replace(/,/g, '')) || 0;
            approvedCount.textContent = (currentCount + 1).toLocaleString();
        }
        
        // Log approval event
        const approvalEvent = {
            transactionId: transactionId,
            action: 'APPROVED',
            timestamp: new Date().toISOString(),
            approvedBy: 'Administrator',
            reason: approvalReason
        };
        
        console.log('Transaction approved:', approvalEvent);
    } catch (error) {
        console.error('Error approving transaction:', error);
        showNotification('Failed to approve transaction', 'error');
    }
}

function handleLogout(event) {
    try {
        if (confirm('Are you sure you want to logout?')) {
            showNotification('Logged out successfully', 'info');
            // Clear session and redirect to login
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userSession');
            localStorage.removeItem('rememberMe');
            
            // Clear any cached data
            sessionStorage.clear();
            
            // Log logout event
            if (window.SecurityManager) {
                window.SecurityManager.logSecurityEvent('LOGOUT', {
                    timestamp: new Date().toISOString(),
                    reason: 'User initiated logout'
                });
            }
            
            // Show authentication modal
            showAuthenticationModal();
        }
    } catch (error) {
        console.error('Error during logout:', error);
        showNotification('Failed to logout', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    try {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Alert system functionality
function initializeAlerts() {
    try {
        // Initialize enhanced alerts system
        initializeAlertsSystem();
    } catch (error) {
        console.error('Error initializing alerts:', error);
        // Fallback to basic alerts
        populateAlerts();
        updateAlertStats();
    }
}

function populateAlerts() {
    try {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;
        
        const { alerts } = applicationData;
        alertsList.innerHTML = '';
        
        alerts.forEach(alert => {
            const alertElement = createAlertElement(alert);
            alertsList.appendChild(alertElement);
        });
        
        updateFilteredAlertsCount();
    } catch (error) {
        console.error('Error populating alerts:', error);
    }
}

function createAlertElement(alert) {
    try {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-item alert--${alert.priority}`;
        alertDiv.dataset.alertId = alert.id;
        
        const timeAgo = getTimeAgo(new Date(alert.timestamp));
        const statusClass = alert.status.replace('-', '');
        
        alertDiv.innerHTML = `
            <div class="alert-header">
                <div class="alert-priority priority--${alert.priority}">${alert.priority.toUpperCase()}</div>
                <div class="alert-time">${timeAgo}</div>
            </div>
            <div class="alert-content">
                <h4 class="alert-title">${alert.title}</h4>
                <p class="alert-description">${alert.description}</p>
                <div class="alert-meta">
                    <span class="alert-source">${alert.source}</span>
                    <span class="alert-status status--${statusClass}">${alert.status}</span>
                    ${alert.assignedTo ? `<span class="alert-assigned">Assigned to: ${alert.assignedTo}</span>` : ''}
                </div>
            </div>
            <div class="alert-actions">
                <button class="btn btn--sm btn--outline" onclick="viewAlertDetails(${alert.id})">View Details</button>
                ${alert.status === 'new' ? '<button class="btn btn--sm btn--primary" onclick="acknowledgeAlert(' + alert.id + ')">Acknowledge</button>' : ''}
            </div>
        `;
        
        return alertDiv;
    } catch (error) {
        console.error('Error creating alert element:', error);
        return document.createElement('div');
    }
}

function updateAlertStats() {
    try {
        const { alerts } = applicationData;
        
        const totalAlerts = alerts.length;
        const criticalAlerts = alerts.filter(a => a.priority === 'critical').length;
        const newAlerts = alerts.filter(a => a.status === 'new').length;
        const avgResponseTime = calculateAvgResponseTime(alerts);
        
        const totalAlertsEl = document.getElementById('totalAlerts');
        const criticalAlertsEl = document.getElementById('criticalAlerts');
        const newAlertsEl = document.getElementById('newAlerts');
        const avgResponseTimeEl = document.getElementById('alertAvgResponseTime');
        
        if (totalAlertsEl) totalAlertsEl.textContent = totalAlerts;
        if (criticalAlertsEl) criticalAlertsEl.textContent = criticalAlerts;
        if (newAlertsEl) newAlertsEl.textContent = newAlerts;
        if (avgResponseTimeEl) avgResponseTimeEl.textContent = avgResponseTime;
    } catch (error) {
        console.error('Error updating alert stats:', error);
    }
}

function calculateAvgResponseTime(alerts) {
    try {
        const alertsWithResponseTime = alerts.filter(a => a.responseTime);
        if (alertsWithResponseTime.length === 0) return '0m';
        
        const totalMinutes = alertsWithResponseTime.reduce((sum, alert) => {
            const minutes = parseInt(alert.responseTime.replace('m', ''));
            return sum + minutes;
        }, 0);
        
        const avgMinutes = Math.round(totalMinutes / alertsWithResponseTime.length);
        return `${avgMinutes}m`;
    } catch (error) {
        console.error('Error calculating avg response time:', error);
        return '0m';
    }
}

function getTimeAgo(date) {
    try {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch (error) {
        console.error('Error calculating time ago:', error);
        return 'Unknown';
    }
}

function updateFilteredAlertsCount() {
    try {
        const alertsList = document.getElementById('alertsList');
        const countElement = document.getElementById('filteredAlertsCount');
        
        if (alertsList && countElement) {
            const visibleAlerts = alertsList.querySelectorAll('.alert-item').length;
            countElement.textContent = `${visibleAlerts} alert${visibleAlerts !== 1 ? 's' : ''}`;
        }
    } catch (error) {
        console.error('Error updating filtered alerts count:', error);
    }
}

// Alert event handlers
function handleRefreshAlerts(event) {
    try {
        showNotification('Refreshing alerts...', 'info');
        populateAlerts();
        updateAlertStats();
        setTimeout(() => {
            showNotification('Alerts refreshed', 'success');
        }, 1000);
    } catch (error) {
        console.error('Error refreshing alerts:', error);
        showNotification('Failed to refresh alerts', 'error');
    }
}

function handleMarkAllRead(event) {
    try {
        const { alerts } = applicationData;
        alerts.forEach(alert => {
            if (alert.status === 'new') {
                alert.status = 'acknowledged';
            }
        });
        
        populateAlerts();
        updateAlertStats();
        showNotification('All alerts marked as read', 'success');
    } catch (error) {
        console.error('Error marking all alerts as read:', error);
        showNotification('Failed to mark all alerts as read', 'error');
    }
}

function handleExportAlerts(event) {
    try {
        showNotification('Exporting alerts...', 'info');
        // Export alerts data
        const exportData = {
            timestamp: new Date().toISOString(),
            totalAlerts: alertsData.length,
            alerts: alertsData.map(alert => ({
                id: alert.id,
                type: alert.type,
                title: alert.title,
                priority: alert.priority,
                status: alert.status,
                timestamp: alert.timestamp,
                source: alert.source
            }))
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `alerts-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(() => {
            showNotification('Alerts exported successfully', 'success');
        }, 1500);
    } catch (error) {
        console.error('Error exporting alerts:', error);
        showNotification('Failed to export alerts', 'error');
    }
}

function handleViewChange(event) {
    try {
        const viewType = event.target.dataset.view;
        const listViewBtn = document.getElementById('listView');
        const gridViewBtn = document.getElementById('gridView');
        const alertsList = document.getElementById('alertsList');
        
        if (listViewBtn && gridViewBtn && alertsList) {
            // Remove active class from all view buttons
            listViewBtn.classList.remove('active');
            gridViewBtn.classList.remove('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            // Update alerts list class
            alertsList.className = `alerts-list view--${viewType}`;
        }
    } catch (error) {
        console.error('Error changing view:', error);
    }
}

function viewAlertDetails(alertId) {
    try {
        const { alerts } = applicationData;
        const alert = alerts.find(a => a.id === alertId);
        
        if (!alert) {
            showNotification('Alert not found', 'error');
            return;
        }
        
        const modal = document.getElementById('alertModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = alert.title;
            modalBody.innerHTML = `
                <div class="alert-detail">
                    <div class="detail-row">
                        <strong>Description:</strong>
                        <p>${alert.description}</p>
                    </div>
                    <div class="detail-row">
                        <strong>Priority:</strong>
                        <span class="priority-badge priority--${alert.priority}">${alert.priority.toUpperCase()}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Status:</strong>
                        <span class="status-badge status--${alert.status.replace('-', '')}">${alert.status}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Source:</strong>
                        <span>${alert.source}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Timestamp:</strong>
                        <span>${new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    ${alert.assignedTo ? `
                    <div class="detail-row">
                        <strong>Assigned To:</strong>
                        <span>${alert.assignedTo}</span>
                    </div>
                    ` : ''}
                    ${alert.responseTime ? `
                    <div class="detail-row">
                        <strong>Response Time:</strong>
                        <span>${alert.responseTime}</span>
                    </div>
                    ` : ''}
                </div>
            `;
            
            modal.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error viewing alert details:', error);
        showNotification('Failed to load alert details', 'error');
    }
}

function closeAlertModal() {
    try {
        const modal = document.getElementById('alertModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

function handleAcknowledgeAlert(event) {
    try {
        const modal = document.getElementById('alertModal');
        const alertId = modal ? modal.dataset.currentAlertId : null;
        
        if (alertId) {
            const { alerts } = applicationData;
            const alert = alerts.find(a => a.id == alertId);
            if (alert) {
                alert.status = 'acknowledged';
                alert.assignedTo = 'Current User';
                alert.responseTime = '0m';
            }
        }
        
        populateAlerts();
        updateAlertStats();
        closeAlertModal();
        showNotification('Alert acknowledged', 'success');
    } catch (error) {
        console.error('Error acknowledging alert:', error);
        showNotification('Failed to acknowledge alert', 'error');
    }
}

function handleResolveAlert(event) {
    try {
        const modal = document.getElementById('alertModal');
        const alertId = modal ? modal.dataset.currentAlertId : null;
        
        if (alertId) {
            const { alerts } = applicationData;
            const alert = alerts.find(a => a.id == alertId);
            if (alert) {
                alert.status = 'resolved';
                alert.assignedTo = 'Current User';
                alert.responseTime = '5m';
            }
        }
        
        populateAlerts();
        updateAlertStats();
        closeAlertModal();
        showNotification('Alert resolved', 'success');
    } catch (error) {
        console.error('Error resolving alert:', error);
        showNotification('Failed to resolve alert', 'error');
    }
}

function handleEscalateAlert(event) {
    try {
        const modal = document.getElementById('alertModal');
        const alertId = modal ? modal.dataset.currentAlertId : null;
        
        if (alertId) {
            const { alerts } = applicationData;
            const alert = alerts.find(a => a.id == alertId);
            if (alert) {
                alert.status = 'escalated';
                alert.assignedTo = 'Management Team';
                alert.responseTime = '2m';
            }
        }
        
        populateAlerts();
        updateAlertStats();
        closeAlertModal();
        showNotification('Alert escalated', 'info');
    } catch (error) {
        console.error('Error escalating alert:', error);
        showNotification('Failed to escalate alert', 'error');
    }
}

// Global functions for inline onclick handlers
window.viewAlertDetails = viewAlertDetails;
window.acknowledgeAlert = function(alertId) {
    try {
        const { alerts } = applicationData;
        const alert = alerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = 'acknowledged';
            alert.assignedTo = 'Current User';
            alert.responseTime = '0m';
        }
        
        populateAlerts();
        updateAlertStats();
        showNotification('Alert acknowledged', 'success');
    } catch (error) {
        console.error('Error acknowledging alert:', error);
        showNotification('Failed to acknowledge alert', 'error');
    }
};

// Real-time Activity Functions (variables declared earlier)

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Initialize the feeds
    updateLiveTransactions();
    updateSystemAlerts();
    
    setInterval(() => {
        // Update fraud stats with small random variations
        const fraudStats = applicationData.fraudStats;
        const variation = Math.random() * 0.02 - 0.01; // ±1% variation
        
        const newFraudRate = Math.max(0, fraudStats.fraudRate + variation);
        document.getElementById('fraudRate').textContent = newFraudRate.toFixed(1) + '%';
        
        const newAccuracy = Math.min(100, Math.max(90, fraudStats.accuracyRate + variation));
        document.getElementById('accuracyRate').textContent = newAccuracy.toFixed(1) + '%';
        
        // Update live transactions
        updateLiveTransactions();
        
        // Update system alerts
        updateSystemAlerts();
    }, 5000); // Update every 5 seconds
}

// Update live transactions feed
function updateLiveTransactions() {
    const feed = document.getElementById('liveTransactions');
    if (!feed) return;
    
    // Add new transaction occasionally
    if (Math.random() < 0.3) { // 30% chance to add new transaction
        const newTransaction = generateRandomTransaction();
        liveTransactions.unshift(newTransaction);
        if (liveTransactions.length > 10) {
            liveTransactions.pop(); // Keep only last 10
        }
    }
    
    // Update the display
    feed.innerHTML = '';
    liveTransactions.forEach(txn => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const riskClass = txn.risk.toLowerCase();
        const statusClass = txn.status.toLowerCase();
        
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-weight: bold; color: var(--color-primary);">${txn.id}</span>
                <span style="font-size: 11px; color: var(--color-text-secondary);">${txn.time}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>$${txn.amount.toLocaleString()} - ${txn.type}</span>
                <div style="display: flex; gap: 8px;">
                    <span class="status status--${riskClass === 'high' ? 'error' : riskClass === 'medium' ? 'warning' : 'success'}" style="font-size: 10px; padding: 2px 6px;">
                        ${txn.risk}
                    </span>
                    <span class="status status--${statusClass === 'blocked' ? 'error' : statusClass === 'pending' ? 'warning' : 'success'}" style="font-size: 10px; padding: 2px 6px;">
                        ${txn.status}
                    </span>
                </div>
            </div>
        `;
        feed.appendChild(item);
    });
}

// Update system alerts feed
function updateSystemAlerts() {
    const feed = document.getElementById('systemAlerts');
    if (!feed) return;
    
    // Add new alert occasionally
    if (Math.random() < 0.2) { // 20% chance to add new alert
        const newAlert = generateRandomAlert();
        systemAlerts.unshift(newAlert);
        if (systemAlerts.length > 8) {
            systemAlerts.pop(); // Keep only last 8
        }
    }
    
    // Update the display
    feed.innerHTML = '';
    systemAlerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = 'alert-item';
        
        const alertTypeClass = alert.type.toLowerCase().replace('_', '-');
        const statusClass = alert.status.toLowerCase();
        
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-weight: bold; color: var(--color-primary);">${alert.id}</span>
                <span style="font-size: 11px; color: var(--color-text-secondary);">${alert.time}</span>
            </div>
            <div style="margin-bottom: 4px; font-size: 12px;">
                ${alert.message}
            </div>
            <div style="display: flex; gap: 8px;">
                <span class="status status--${alertTypeClass === 'high-risk' ? 'error' : alertTypeClass === 'security' ? 'warning' : 'info'}" style="font-size: 10px; padding: 2px 6px;">
                    ${alert.type.replace('_', ' ')}
                </span>
                <span class="status status--${statusClass === 'new' ? 'warning' : statusClass === 'acknowledged' ? 'info' : 'success'}" style="font-size: 10px; padding: 2px 6px;">
                    ${alert.status}
                </span>
            </div>
        `;
        feed.appendChild(item);
    });
}

// Generate random transaction
function generateRandomTransaction() {
    const types = ['PAYMENT', 'TRANSFER', 'CASH_OUT', 'CASH_IN', 'DEBIT'];
    const statuses = ['APPROVED', 'PENDING', 'BLOCKED'];
    const risks = ['LOW', 'MEDIUM', 'HIGH'];
    
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    
    return {
        id: 'TXN' + String(Math.floor(Math.random() * 10000)).padStart(3, '0'),
        amount: Math.floor(Math.random() * 20000) + 50,
        type: types[Math.floor(Math.random() * types.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        time: time,
        risk: risks[Math.floor(Math.random() * risks.length)]
    };
}

// Generate random alert
function generateRandomAlert() {
    const alertTypes = [
        { type: 'HIGH_RISK', message: 'High-risk transaction pattern detected' },
        { type: 'SYSTEM', message: 'System performance threshold exceeded' },
        { type: 'SECURITY', message: 'Suspicious activity detected' },
        { type: 'PERFORMANCE', message: 'Response time degradation detected' },
        { type: 'MODEL', message: 'ML model accuracy below threshold' }
    ];
    const statuses = ['NEW', 'ACKNOWLEDGED', 'RESOLVED'];
    
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    return {
        id: 'ALT' + String(Math.floor(Math.random() * 10000)).padStart(3, '0'),
        type: alertType.type,
        message: alertType.message,
        time: time,
        status: statuses[Math.floor(Math.random() * statuses.length)]
    };
}

// Start real-time updates
setTimeout(simulateRealTimeUpdates, 3000);

// ==================== ENHANCED REPORTS & ANALYTICS SYSTEM ====================

// Comprehensive Database Simulation
// fraudDatabase object removed (duplicate)

// Generate comprehensive historical transaction data
function generateHistoricalTransactions(days) {
    const transactions = [];
    const transactionTypes = ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT', 'CREDIT', 'REFUND'];
    const countries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN'];
    const deviceTypes = ['mobile', 'web', 'api', 'atm', 'pos'];
    const merchantCategories = ['retail', 'gas_station', 'restaurant', 'online_shopping', 'gambling', 'adult_services', 'healthcare', 'education'];
    
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate 50-200 transactions per day
        const dailyTransactions = Math.floor(Math.random() * 150) + 50;
        
        for (let j = 0; j < dailyTransactions; j++) {
            const hour = Math.floor(Math.random() * 24);
            const transactionDate = new Date(date);
            transactionDate.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
            
            const amount = Math.floor(Math.random() * 50000) + 10;
            const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
            const country = countries[Math.floor(Math.random() * countries.length)];
            const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
            const merchantCategory = merchantCategories[Math.floor(Math.random() * merchantCategories.length)];
            const accountAge = Math.floor(Math.random() * 3650) + 1; // 1 day to 10 years
            
            // Calculate fraud probability based on various factors
            let fraudProbability = 0;
            
            // Base fraud rates by transaction type
            const typeFraudRates = {
                'CASH_OUT': 0.35, 'TRANSFER': 0.28, 'PAYMENT': 0.12,
                'CASH_IN': 0.08, 'DEBIT': 0.15, 'CREDIT': 0.02, 'REFUND': 0.05
            };
            fraudProbability += typeFraudRates[transactionType] || 0.1;
            
            // Country risk adjustment
            const countryRiskRates = {
                'US': 0.14, 'UK': 0.18, 'CA': 0.16, 'AU': 0.19, 'DE': 0.22,
                'FR': 0.25, 'IT': 0.28, 'ES': 0.30, 'JP': 0.12, 'CN': 0.35
            };
            fraudProbability += (countryRiskRates[country] || 0.2) * 0.3;
    
    // Device type risk
            const deviceRiskRates = {
                'mobile': 0.15, 'web': 0.17, 'api': 0.24, 'atm': 0.03, 'pos': 0.02
            };
            fraudProbability += (deviceRiskRates[deviceType] || 0.1) * 0.2;
            
            // Account age risk
            if (accountAge < 7) fraudProbability += 0.25;
            else if (accountAge < 30) fraudProbability += 0.15;
            else if (accountAge < 90) fraudProbability += 0.05;
            
            // Amount risk
            if (amount > 10000) fraudProbability += 0.15;
            else if (amount > 5000) fraudProbability += 0.10;
            else if (amount < 50) fraudProbability += 0.08;
            
            // Time-based risk
            if (hour >= 22 || hour <= 4) fraudProbability += 0.10;
            
            // Merchant category risk
            const merchantRiskRates = {
                'gambling': 0.30, 'adult_services': 0.25, 'online_shopping': 0.08,
                'retail': 0.05, 'gas_station': 0.03, 'restaurant': 0.02,
                'healthcare': 0.01, 'education': 0.01
            };
            fraudProbability += (merchantRiskRates[merchantCategory] || 0.05) * 0.2;
            
            // Determine if transaction is fraudulent
            const isFraudulent = Math.random() < Math.min(fraudProbability, 0.8);
            
            transactions.push({
                id: `TXN${String(transactions.length + 1).padStart(8, '0')}`,
                date: transactionDate,
                amount: amount,
                type: transactionType,
                country: country,
                deviceType: deviceType,
                merchantCategory: merchantCategory,
                accountAge: accountAge,
                hour: hour,
                isFraudulent: isFraudulent,
                fraudProbability: Math.round(fraudProbability * 100),
                originBalance: Math.floor(Math.random() * 100000) + amount,
                destBalance: Math.floor(Math.random() * 50000)
            });
        }
    }
    
    return transactions.sort((a, b) => b.date - a.date);
}

// Generate monthly fraud patterns
function generateMonthlyFraudPatterns() {
    const months = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 12; i++) {
        const monthData = {
            month: monthNames[i],
            totalTransactions: Math.floor(Math.random() * 5000) + 15000,
            fraudulentTransactions: Math.floor(Math.random() * 800) + 200,
            fraudRate: 0,
            blockedTransactions: 0,
            falsePositives: Math.floor(Math.random() * 50) + 10,
            falseNegatives: Math.floor(Math.random() * 30) + 5,
            avgResponseTime: Math.floor(Math.random() * 20) + 30,
            modelAccuracy: Math.random() * 0.1 + 0.9 // 90-100%
        };
        
        monthData.fraudRate = (monthData.fraudulentTransactions / monthData.totalTransactions) * 100;
        monthData.blockedTransactions = Math.floor(monthData.fraudulentTransactions * 0.85);
        months.push(monthData);
    }
    
    return months;
}

// Generate geographic fraud data
function generateGeographicFraudData() {
    return [
        { country: 'United States', code: 'US', totalTransactions: 45000, fraudCount: 6300, fraudRate: 14.0, blockedAmount: 12500000 },
        { country: 'United Kingdom', code: 'UK', totalTransactions: 32000, fraudCount: 5760, fraudRate: 18.0, blockedAmount: 8900000 },
        { country: 'Canada', code: 'CA', totalTransactions: 28000, fraudCount: 4480, fraudRate: 16.0, blockedAmount: 7200000 },
        { country: 'Australia', code: 'AU', totalTransactions: 25000, fraudCount: 4750, fraudRate: 19.0, blockedAmount: 6800000 },
        { country: 'Germany', code: 'DE', totalTransactions: 22000, fraudCount: 4840, fraudRate: 22.0, blockedAmount: 5900000 },
        { country: 'France', code: 'FR', totalTransactions: 20000, fraudCount: 5000, fraudRate: 25.0, blockedAmount: 5200000 },
        { country: 'Italy', code: 'IT', totalTransactions: 18000, fraudCount: 5040, fraudRate: 28.0, blockedAmount: 4800000 },
        { country: 'Spain', code: 'ES', totalTransactions: 16000, fraudCount: 4800, fraudRate: 30.0, blockedAmount: 4200000 },
        { country: 'Japan', code: 'JP', totalTransactions: 30000, fraudCount: 3600, fraudRate: 12.0, blockedAmount: 8500000 },
        { country: 'China', code: 'CN', totalTransactions: 15000, fraudCount: 5250, fraudRate: 35.0, blockedAmount: 3800000 }
    ];
}

// Generate model performance history
function generateModelPerformanceHistory() {
    const models = ['XGBoost', 'Random Forest', 'Neural Network', 'Isolation Forest', 'Logistic Regression'];
    const history = [];
    
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const dayData = {
            date: date,
            models: {}
        };
        
        models.forEach(model => {
            dayData.models[model] = {
                accuracy: Math.random() * 0.05 + 0.90, // 90-95%
                precision: Math.random() * 0.08 + 0.80, // 80-88%
                recall: Math.random() * 0.10 + 0.75, // 75-85%
                f1Score: Math.random() * 0.06 + 0.82, // 82-88%
                aucRoc: Math.random() * 0.04 + 0.90 // 90-94%
            };
        });
        
        history.push(dayData);
    }
    
    return history.reverse();
}

// Generate behavioral patterns
function generateBehavioralPatterns() {
    return {
        transactionVelocity: {
            low: { count: 45000, fraudRate: 8.5 },
            medium: { count: 32000, fraudRate: 15.2 },
            high: { count: 18000, fraudRate: 28.7 },
            extreme: { count: 5000, fraudRate: 45.3 }
        },
        amountPatterns: {
            micro: { range: '0-50', count: 25000, fraudRate: 12.5 },
            small: { range: '50-500', count: 35000, fraudRate: 10.8 },
            medium: { range: '500-2000', count: 28000, fraudRate: 15.2 },
            large: { range: '2000-10000', count: 15000, fraudRate: 22.8 },
            massive: { range: '10000+', count: 5000, fraudRate: 35.6 }
        },
        timePatterns: {
            businessHours: { count: 45000, fraudRate: 12.3 },
            evening: { count: 25000, fraudRate: 18.7 },
            night: { count: 15000, fraudRate: 28.9 },
            earlyMorning: { count: 10000, fraudRate: 32.1 }
        }
    };
}

// Generate risk factor analysis
function generateRiskFactorAnalysis() {
    return [
        { factor: 'High Transaction Amount', frequency: 12500, impact: 85.2, prevention: 78.3 },
        { factor: 'Unusual Hours (Night)', frequency: 8900, impact: 72.8, prevention: 65.4 },
        { factor: 'New Account (< 30 days)', frequency: 15600, impact: 91.5, prevention: 82.7 },
        { factor: 'Rapid Transactions', frequency: 11200, impact: 88.3, prevention: 75.9 },
        { factor: 'International Transaction', frequency: 9800, impact: 67.2, prevention: 71.8 },
        { factor: 'Balance Inconsistency', frequency: 7600, impact: 79.6, prevention: 69.2 },
        { factor: 'API Device Type', frequency: 5400, impact: 82.4, prevention: 73.1 },
        { factor: 'Risky Transaction Type', frequency: 13800, impact: 76.9, prevention: 68.5 }
    ];
}

// Generate time patterns
function generateTimePatterns() {
    const hourlyData = [];
    for (let hour = 0; hour < 24; hour++) {
        hourlyData.push({
            hour: hour,
            totalTransactions: Math.floor(Math.random() * 2000) + 500,
            fraudCount: Math.floor(Math.random() * 200) + 20,
            fraudRate: 0
        });
        hourlyData[hour].fraudRate = (hourlyData[hour].fraudCount / hourlyData[hour].totalTransactions) * 100;
    }
    return hourlyData;
}

// Generate merchant analysis
function generateMerchantAnalysis() {
    return [
        { category: 'Gambling', totalTransactions: 5000, fraudCount: 1500, fraudRate: 30.0, avgAmount: 2500 },
        { category: 'Adult Services', totalTransactions: 3000, fraudCount: 750, fraudRate: 25.0, avgAmount: 1800 },
        { category: 'Online Shopping', totalTransactions: 25000, fraudCount: 2000, fraudRate: 8.0, avgAmount: 450 },
        { category: 'Retail', totalTransactions: 35000, fraudCount: 1750, fraudRate: 5.0, avgAmount: 320 },
        { category: 'Gas Station', totalTransactions: 20000, fraudCount: 600, fraudRate: 3.0, avgAmount: 85 },
        { category: 'Restaurant', totalTransactions: 18000, fraudCount: 360, fraudRate: 2.0, avgAmount: 65 },
        { category: 'Healthcare', totalTransactions: 12000, fraudCount: 120, fraudRate: 1.0, avgAmount: 280 },
        { category: 'Education', totalTransactions: 8000, fraudCount: 80, fraudRate: 1.0, avgAmount: 1200 }
    ];
}

// Generate device analysis
function generateDeviceAnalysis() {
    return [
        { type: 'Mobile', totalTransactions: 45000, fraudCount: 6750, fraudRate: 15.0, avgAmount: 850 },
        { type: 'Web', totalTransactions: 35000, fraudCount: 5950, fraudRate: 17.0, avgAmount: 1200 },
        { type: 'API', totalTransactions: 15000, fraudCount: 3600, fraudRate: 24.0, avgAmount: 2500 },
        { type: 'ATM', totalTransactions: 20000, fraudCount: 600, fraudRate: 3.0, avgAmount: 450 },
        { type: 'POS Terminal', totalTransactions: 25000, fraudCount: 500, fraudRate: 2.0, avgAmount: 180 }
    ];
}

// Generate account age analysis
function generateAccountAgeAnalysis() {
    return [
        { ageRange: '0-7 days', totalAccounts: 5000, fraudCount: 2250, fraudRate: 45.0 },
        { ageRange: '8-30 days', totalAccounts: 8000, fraudCount: 2400, fraudRate: 30.0 },
        { ageRange: '31-90 days', totalAccounts: 12000, fraudCount: 1800, fraudRate: 15.0 },
        { ageRange: '91-365 days', totalAccounts: 25000, fraudCount: 2500, fraudRate: 10.0 },
        { ageRange: '1-2 years', totalAccounts: 30000, fraudCount: 1800, fraudRate: 6.0 },
        { ageRange: '2+ years', totalAccounts: 50000, fraudCount: 1500, fraudRate: 3.0 }
    ];
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Check authentication first
        checkAuthentication();
        
        initializeDashboard();
        setupEventListeners();
        createCharts();
        populateModelTable();
        initializeTabs();
        setupFormValidation();
        initializeAlerts();
        initializeSecurityFeatures();
        initializeRealTimeFeatures();
        initializeAdvancedAnalytics();
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showNotification('Failed to initialize dashboard', 'error');
    }
});

// Check authentication status
function checkAuthentication() {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId || !window.SecurityManager.validateSession(sessionId)) {
        showAuthenticationModal();
    } else {
        // Update user info based on session
        updateUserInfo();
    }
}

// Show authentication modal
function showAuthenticationModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.classList.remove('hidden');
        setupAuthenticationHandlers();
    }
}

// Setup authentication handlers
function setupAuthenticationHandlers() {
    const authForm = document.getElementById('authForm');
    const passwordInput = document.getElementById('password');
    const mfaGroup = document.getElementById('mfaGroup');
    
    if (authForm) {
        authForm.addEventListener('submit', handleAuthentication);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', handlePasswordStrength);
    }
}

// Handle authentication
async function handleAuthentication(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const mfaCode = document.getElementById('mfaCode').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
        const result = await window.SecurityManager.authenticateUser(username, password, mfaCode);
        
        if (result.success) {
            // Close auth modal
            document.getElementById('authModal').classList.add('hidden');
            
            // Update UI
            updateUserInfo(username);
            
            // Show success notification
            showNotification('Authentication successful', 'success');
            
            // Log successful login
            window.SecurityManager.logSecurityEvent('LOGIN_SUCCESS', {
                username: username,
                rememberMe: rememberMe
            });
        }
    } catch (error) {
        showNotification(error.message, 'error');
        
        // Check if MFA is required
        if (error.message.includes('MFA')) {
            document.getElementById('mfaGroup').classList.remove('hidden');
        }
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

// Handle password strength
function handlePasswordStrength(event) {
    const password = event.target.value;
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    const strengthContainer = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthContainer.classList.add('hidden');
        return;
    }
    
    strengthContainer.classList.remove('hidden');
    
    let strength = 0;
    let strengthClass = 'weak';
    let strengthLabel = 'Weak';
    
    // Check password strength
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength >= 4) {
        strengthClass = 'strong';
        strengthLabel = 'Strong';
    } else if (strength >= 3) {
        strengthClass = 'good';
        strengthLabel = 'Good';
    } else if (strength >= 2) {
        strengthClass = 'fair';
        strengthLabel = 'Fair';
    }
    
    strengthBar.className = `strength-fill ${strengthClass}`;
    strengthText.textContent = strengthLabel;
}

// Update user info
function updateUserInfo(username = 'Admin') {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = username;
    }
}

// Initialize security features
function initializeSecurityFeatures() {
    // Setup security button
    const securityBtn = document.getElementById('securityBtn');
    if (securityBtn) {
        securityBtn.addEventListener('click', showSecurityDashboard);
    }
    
    // Setup security modal handlers
    const closeSecurityModal = document.getElementById('closeSecurityModal');
    if (closeSecurityModal) {
        closeSecurityModal.addEventListener('click', () => {
            document.getElementById('securityModal').classList.add('hidden');
        });
    }
    
    const refreshSecurityData = document.getElementById('refreshSecurityData');
    if (refreshSecurityData) {
        refreshSecurityData.addEventListener('click', refreshSecurityDashboard);
    }
    
    const exportSecurityData = document.getElementById('exportSecurityData');
    if (exportSecurityData) {
        exportSecurityData.addEventListener('click', exportSecurityDataHandler);
    }
    
    // Setup session monitoring
    setupSessionMonitoring();
    
    // Setup security alerts
    setupSecurityAlerts();
}

// Show security dashboard
function showSecurityDashboard() {
    const securityModal = document.getElementById('securityModal');
    if (securityModal) {
        refreshSecurityDashboard();
        securityModal.classList.remove('hidden');
    }
}

// Refresh security dashboard
function refreshSecurityDashboard() {
    const securityData = window.SecurityManager.getSecurityDashboardData();
    
    // Update security score
    const securityScore = document.getElementById('securityScore');
    if (securityScore) {
        securityScore.textContent = securityData.securityScore;
    }
    
    // Update stats
    const activeSessions = document.getElementById('activeSessions');
    if (activeSessions) {
        activeSessions.textContent = securityData.activeSessions;
    }
    
    const failedAttempts = document.getElementById('failedAttempts');
    if (failedAttempts) {
        failedAttempts.textContent = securityData.failedAttempts;
    }
    
    const securityEvents = document.getElementById('securityEvents');
    if (securityEvents) {
        securityEvents.textContent = securityData.recentSecurityEvents.length;
    }
    
    // Update recommendations
    const recommendationsList = document.getElementById('securityRecommendations');
    if (recommendationsList) {
        recommendationsList.innerHTML = '';
        securityData.recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.textContent = recommendation;
            recommendationsList.appendChild(li);
        });
    }
    
    // Update recent events
    const recentEvents = document.getElementById('recentSecurityEvents');
    if (recentEvents) {
        recentEvents.innerHTML = '';
        securityData.recentSecurityEvents.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-item';
            eventDiv.innerHTML = `
                <div class="event-info">
                    <div class="event-type">${event.eventType}</div>
                    <div class="event-details">${JSON.stringify(event.details)}</div>
                </div>
                <div class="event-time">${new Date(event.timestamp).toLocaleTimeString()}</div>
                <div class="event-severity severity-${event.severity.toLowerCase()}">${event.severity}</div>
            `;
            recentEvents.appendChild(eventDiv);
        });
    }
}

// Export security data
function exportSecurityDataHandler() {
    const securityData = window.SecurityManager.exportSecurityData();
    const blob = new Blob([JSON.stringify(securityData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Security data exported successfully', 'success');
}

// Setup session monitoring
function setupSessionMonitoring() {
    // Update session timer every minute
    setInterval(() => {
        updateSessionTimer();
    }, 60000);
    
    // Initial update
    updateSessionTimer();
}

// Update session timer
function updateSessionTimer() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        const session = window.SecurityManager.activeSessions.get(sessionId);
        if (session) {
            const timeRemaining = window.SecurityManager.sessionTimeout - (Date.now() - session.lastActivity);
            const minutes = Math.floor(timeRemaining / 60000);
            
            // Add session timer to header if not exists
            let sessionTimer = document.getElementById('sessionTimer');
            if (!sessionTimer) {
                sessionTimer = document.createElement('div');
                sessionTimer.id = 'sessionTimer';
                sessionTimer.className = 'session-status';
                document.querySelector('.nav__status').appendChild(sessionTimer);
            }
            
            if (minutes > 5) {
                sessionTimer.innerHTML = `
                    <span class="session-timer">Session: ${minutes}m</span>
                `;
            } else if (minutes > 0) {
                sessionTimer.innerHTML = `
                    <span class="session-warning">Session expires in ${minutes}m</span>
                `;
            } else {
                sessionTimer.innerHTML = `
                    <span class="session-expired">Session expired</span>
                `;
                // Auto-logout
                setTimeout(() => {
                    window.SecurityManager.invalidateSession(sessionId);
                    showAuthenticationModal();
                }, 1000);
            }
        }
    }
}

// Setup security alerts
function setupSecurityAlerts() {
    // Monitor for security events
    setInterval(() => {
        checkSecurityAlerts();
    }, 30000); // Check every 30 seconds
}

// Check security alerts
function checkSecurityAlerts() {
    const recentEvents = window.SecurityManager.auditLog.filter(log => 
        Date.now() - new Date(log.timestamp).getTime() < 5 * 60 * 1000 && // Last 5 minutes
        log.severity === 'CRITICAL'
    );
    
    if (recentEvents.length > 0) {
        showSecurityAlert('Critical security event detected', 'critical');
    }
}

// Show security alert
function showSecurityAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.security-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `security-alert ${type}`;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span>🚨</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px;">×</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 10000);
}

// Initialize real-time features
function initializeRealTimeFeatures() {
    // Setup real-time indicator
    updateRealTimeIndicator();
    
    // Setup feed controls
    setupFeedControls();
    
    // Subscribe to real-time updates
    subscribeToRealTimeUpdates();
    
    // Setup connection monitoring
    setupConnectionMonitoring();
}

// Update real-time indicator
function updateRealTimeIndicator() {
    const realtimeDot = document.getElementById('realtimeDot');
    const realtimeText = document.getElementById('realtimeText');
    
    if (realtimeDot && realtimeText && window.RealTimeManager) {
        const status = window.RealTimeManager.getConnectionStatus();
        
        realtimeDot.className = `realtime-dot ${status.status}`;
        
        switch (status.status) {
            case 'connected':
                realtimeText.textContent = 'Live';
                break;
            case 'disconnected':
                realtimeText.textContent = 'Offline';
                break;
            case 'error':
                realtimeText.textContent = 'Error';
                break;
            case 'mock':
                realtimeText.textContent = 'Demo';
                break;
        }
    }
}

// Setup feed controls
function setupFeedControls() {
    // Transaction feed controls
    const pauseTransactions = document.getElementById('pauseTransactions');
    const clearTransactions = document.getElementById('clearTransactions');
    
    if (pauseTransactions) {
        pauseTransactions.addEventListener('click', toggleTransactionFeed);
    }
    
    if (clearTransactions) {
        clearTransactions.addEventListener('click', clearTransactionFeed);
    }
    
    // Alert feed controls
    const pauseAlerts = document.getElementById('pauseAlerts');
    const clearAlerts = document.getElementById('clearAlerts');
    
    if (pauseAlerts) {
        pauseAlerts.addEventListener('click', toggleAlertFeed);
    }
    
    if (clearAlerts) {
        clearAlerts.addEventListener('click', clearAlertFeed);
    }
}

// Toggle transaction feed
function toggleTransactionFeed() {
    const button = document.getElementById('pauseTransactions');
    const feed = document.getElementById('liveTransactions');
    
    if (button && feed) {
        if (button.textContent === 'Pause') {
            button.textContent = 'Resume';
            feed.style.opacity = '0.5';
            feed.style.pointerEvents = 'none';
            // Pause real-time updates for transactions
            if (window.RealTimeManager) {
                window.RealTimeManager.unsubscribe('transaction', handleTransactionUpdate);
            }
        } else {
            button.textContent = 'Pause';
            feed.style.opacity = '1';
            feed.style.pointerEvents = 'auto';
            // Resume real-time updates for transactions
            if (window.RealTimeManager) {
                window.RealTimeManager.subscribe('transaction', handleTransactionUpdate);
            }
        }
    }
}

// Clear transaction feed
function clearTransactionFeed() {
    const feed = document.getElementById('liveTransactions');
    if (feed) {
        feed.innerHTML = `
            <div class="feed-placeholder">
                <div class="placeholder-icon">💳</div>
                <div class="placeholder-text">Waiting for transactions...</div>
            </div>
        `;
    }
}

// Toggle alert feed
function toggleAlertFeed() {
    const button = document.getElementById('pauseAlerts');
    const feed = document.getElementById('systemAlerts');
    
    if (button && feed) {
        if (button.textContent === 'Pause') {
            button.textContent = 'Resume';
            feed.style.opacity = '0.5';
            feed.style.pointerEvents = 'none';
            // Pause real-time updates for alerts
            if (window.RealTimeManager) {
                window.RealTimeManager.unsubscribe('alert', handleAlertUpdate);
            }
        } else {
            button.textContent = 'Pause';
            feed.style.opacity = '1';
            feed.style.pointerEvents = 'auto';
            // Resume real-time updates for alerts
            if (window.RealTimeManager) {
                window.RealTimeManager.subscribe('alert', handleAlertUpdate);
            }
        }
    }
}

// Clear alert feed
function clearAlertFeed() {
    const feed = document.getElementById('systemAlerts');
    if (feed) {
        feed.innerHTML = `
            <div class="feed-placeholder">
                <div class="placeholder-icon">🚨</div>
                <div class="placeholder-text">No alerts at this time</div>
            </div>
        `;
    }
}

// Subscribe to real-time updates
function subscribeToRealTimeUpdates() {
    if (window.RealTimeManager) {
        // Subscribe to transaction updates
        window.RealTimeManager.subscribe('transaction', handleTransactionUpdate);
        
        // Subscribe to alert updates
        window.RealTimeManager.subscribe('alert', handleAlertUpdate);
        
        // Subscribe to metrics updates
        window.RealTimeManager.subscribe('metrics', handleMetricsUpdate);
        
        // Subscribe to connection updates
        window.RealTimeManager.subscribe('connection', handleConnectionUpdate);
    }
}

// Handle transaction update
function handleTransactionUpdate(transactionData) {
    try {
        // Update transaction feed
        const liveTransactions = document.getElementById('liveTransactions');
        if (liveTransactions && transactionData) {
            // Remove placeholder if exists
            const placeholder = liveTransactions.querySelector('.feed-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Create transaction item
            const transactionItem = document.createElement('div');
            transactionItem.className = `transaction-item ${transactionData.fraudDetected ? 'fraud-detected' : 'legitimate'}`;
            transactionItem.innerHTML = `
                <div class="transaction-header">
                    <span class="transaction-id">${transactionData.id}</span>
                    <span class="transaction-time">${transactionData.time}</span>
                </div>
                <div class="transaction-details">
                    <div class="transaction-info">
                        <span class="transaction-type">${transactionData.type}</span>
                        <span class="transaction-amount">$${transactionData.amount.toLocaleString()}</span>
                    </div>
                    <div class="transaction-meta">
                        <span class="transaction-country">${transactionData.country}</span>
                        <span class="transaction-device">${transactionData.device}</span>
                    </div>
                    <div class="transaction-risk">
                        <span class="risk-score">Risk: ${transactionData.risk}</span>
                        <span class="fraud-probability ${transactionData.fraudDetected ? 'fraud-detected' : 'legitimate'}">
                            ${transactionData.fraudProbability}% fraud
                        </span>
                    </div>
                </div>
            `;
            
            // Add to top of feed
            liveTransactions.insertBefore(transactionItem, liveTransactions.firstChild);
            
            // Limit to 10 items
            const items = liveTransactions.querySelectorAll('.transaction-item');
            if (items.length > 10) {
                items[items.length - 1].remove();
            }
        }
    } catch (error) {
        console.error('Error handling transaction update:', error);
    }
}

// Handle alert update
function handleAlertUpdate(alertData) {
    try {
        // Update alert feed
        const systemAlerts = document.getElementById('systemAlerts');
        if (systemAlerts && alertData) {
            // Remove placeholder if exists
            const placeholder = systemAlerts.querySelector('.feed-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Create alert item
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item alert--${alertData.priority}`;
            alertItem.innerHTML = `
                <div class="alert-header">
                    <span class="alert-priority priority--${alertData.priority}">${alertData.priority.toUpperCase()}</span>
                    <span class="alert-time">${alertData.time}</span>
                </div>
                <div class="alert-content">
                    <h4 class="alert-title">${alertData.title}</h4>
                    <p class="alert-description">${alertData.description}</p>
                    <div class="alert-meta">
                        <span class="alert-source">${alertData.source}</span>
                        <span class="alert-status status--${alertData.status.replace('-', '')}">${alertData.status}</span>
                    </div>
                </div>
            `;
            
            // Add to top of feed
            systemAlerts.insertBefore(alertItem, systemAlerts.firstChild);
            
            // Limit to 5 items
            const items = systemAlerts.querySelectorAll('.alert-item');
            if (items.length > 5) {
                items[items.length - 1].remove();
            }
        }
    } catch (error) {
        console.error('Error handling alert update:', error);
    }
}

// Handle metrics update
function handleMetricsUpdate(metricsData) {
    try {
        // Update dashboard metrics
        if (metricsData) {
            // Update fraud detection rate
            const fraudRate = document.getElementById('fraudRate');
            if (fraudRate && metricsData.fraudRate !== undefined) {
                fraudRate.textContent = `${(metricsData.fraudRate * 100).toFixed(1)}%`;
            }
            
            // Update blocked transactions
            const blockedTransactions = document.getElementById('blockedTransactions');
            if (blockedTransactions && metricsData.blockedTransactions !== undefined) {
                blockedTransactions.textContent = metricsData.blockedTransactions.toLocaleString();
            }
            
            // Update false positives
            const falsePositives = document.getElementById('falsePositives');
            if (falsePositives && metricsData.falsePositives !== undefined) {
                falsePositives.textContent = `${(metricsData.falsePositives * 100).toFixed(1)}%`;
            }
            
            // Update response time
            const avgResponseTime = document.getElementById('avgResponseTime');
            if (avgResponseTime && metricsData.responseTime !== undefined) {
                avgResponseTime.textContent = `${metricsData.responseTime}ms`;
            }
            
            // Add visual update animation
            const metricCards = document.querySelectorAll('.metric-card');
            metricCards.forEach(card => {
                card.classList.add('updating');
                setTimeout(() => {
                    card.classList.remove('updating');
                }, 500);
            });
        }
    } catch (error) {
        console.error('Error handling metrics update:', error);
    }
}

// Handle connection update
function handleConnectionUpdate(connectionData) {
    try {
        updateRealTimeIndicator();
        
        // Show connection status notification
        if (connectionData.status === 'disconnected') {
            showNotification('Real-time connection lost', 'warning');
        } else if (connectionData.status === 'connected') {
            showNotification('Real-time connection restored', 'success');
        } else if (connectionData.status === 'error') {
            showNotification('Real-time connection error', 'error');
        }
        
        // Update connection status in UI
        const realtimeDot = document.getElementById('realtimeDot');
        const realtimeText = document.getElementById('realtimeText');
        
        if (realtimeDot && realtimeText) {
            realtimeDot.className = `realtime-dot ${connectionData.status}`;
            
            switch (connectionData.status) {
                case 'connected':
                    realtimeText.textContent = 'Live';
                    break;
                case 'disconnected':
                    realtimeText.textContent = 'Offline';
                    break;
                case 'error':
                    realtimeText.textContent = 'Error';
                    break;
                case 'mock':
                    realtimeText.textContent = 'Demo';
                    break;
                default:
                    realtimeText.textContent = 'Unknown';
            }
        }
    } catch (error) {
        console.error('Error handling connection update:', error);
    }
}

// Setup connection monitoring
function setupConnectionMonitoring() {
    // Update real-time indicator every 5 seconds
    setInterval(() => {
        updateRealTimeIndicator();
    }, 5000);
}

// Initialize advanced analytics features
function initializeAdvancedAnalytics() {
    try {
        // Setup enhanced analysis results
        setupAdvancedAnalysisResults();
        
        // Setup analytics insights
        setupAnalyticsInsights();
        
        // Setup anomaly detection
        setupAnomalyDetection();
        
        // Setup enhanced recommendations
        setupEnhancedRecommendations();
        
        console.log('Advanced analytics initialized successfully');
    } catch (error) {
        console.error('Error initializing advanced analytics:', error);
        showNotification('Failed to initialize advanced analytics', 'error');
    }
}

// Setup advanced analysis results
function setupAdvancedAnalysisResults() {
    // Enhanced results panel with real-time updates
    const resultsPanel = document.getElementById('resultsPanel');
    if (resultsPanel) {
        // Add analysis timestamp
        const analysisTime = document.getElementById('analysisTime');
        if (analysisTime) {
            analysisTime.textContent = new Date().toLocaleTimeString();
        }
        
        // Add model confidence
        const modelConfidence = document.getElementById('modelConfidence');
        if (modelConfidence) {
            modelConfidence.textContent = 'Confidence: 94%';
        }
    }
}

// Setup analytics insights
function setupAnalyticsInsights() {
    const insightsGrid = document.getElementById('insightsGrid');
    if (insightsGrid) {
        const insights = [
            {
                type: 'risk',
                level: 'HIGH',
                title: 'Unusual Transaction Pattern',
                description: 'Transaction amount is 3x higher than user\'s average',
                confidence: 89
            },
            {
                type: 'anomaly',
                level: 'MEDIUM',
                title: 'Geographic Anomaly',
                description: 'Transaction from new country not seen in user history',
                confidence: 76
            },
            {
                type: 'pattern',
                level: 'LOW',
                title: 'Time-based Pattern',
                description: 'Transaction time matches known fraud patterns',
                confidence: 65
            }
        ];
        
        insightsGrid.innerHTML = '';
        insights.forEach(insight => {
            const insightCard = document.createElement('div');
            insightCard.className = 'insight-card';
            insightCard.innerHTML = `
                <div class="insight-header">
                    <span class="insight-type ${insight.type}">${insight.type}</span>
                    <span class="insight-level">${insight.level}</span>
                </div>
                <h4 class="insight-title">${insight.title}</h4>
                <p class="insight-description">${insight.description}</p>
                <div class="insight-confidence">
                    <span>Confidence: ${insight.confidence}%</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${insight.confidence}%"></div>
                    </div>
                </div>
            `;
            insightsGrid.appendChild(insightCard);
        });
    }
}

// Setup anomaly detection
function setupAnomalyDetection() {
    const anomaliesList = document.getElementById('anomaliesList');
    if (anomaliesList) {
        const anomalies = [
            {
                type: 'Amount Anomaly',
                severity: 'high',
                description: 'Transaction amount significantly exceeds user\'s typical spending pattern',
                confidence: 92
            },
            {
                type: 'Location Anomaly',
                severity: 'medium',
                description: 'Transaction originated from a new geographic location',
                confidence: 78
            },
            {
                type: 'Device Anomaly',
                severity: 'low',
                description: 'Transaction from a new device not previously associated with this account',
                confidence: 65
            }
        ];
        
        anomaliesList.innerHTML = '';
        anomalies.forEach(anomaly => {
            const anomalyItem = document.createElement('div');
            anomalyItem.className = `anomaly-item ${anomaly.severity}-severity`;
            anomalyItem.innerHTML = `
                <div class="anomaly-header">
                    <span class="anomaly-type">${anomaly.type}</span>
                    <span class="anomaly-severity severity-${anomaly.severity}">${anomaly.severity}</span>
                </div>
                <p class="anomaly-description">${anomaly.description}</p>
                <div class="anomaly-confidence">Confidence: ${anomaly.confidence}%</div>
            `;
            anomaliesList.appendChild(anomalyItem);
        });
    }
}

// Setup enhanced recommendations
function setupEnhancedRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    if (recommendationsList) {
        const recommendations = [
            {
                icon: '🚫',
                text: 'Block transaction and flag account for manual review'
            },
            {
                icon: '📞',
                text: 'Contact customer to verify transaction legitimacy'
            },
            {
                icon: '🔍',
                text: 'Perform additional identity verification'
            },
            {
                icon: '📊',
                text: 'Update fraud detection model with new patterns'
            }
        ];
        
        recommendationsList.innerHTML = '';
        recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.className = 'recommendation-item';
            recItem.innerHTML = `
                <span class="recommendation-icon">${rec.icon}</span>
                <span class="recommendation-text">${rec.text}</span>
            `;
            recommendationsList.appendChild(recItem);
        });
    }
}

// Initialize dashboard with stats
function initializeDashboard() {
    const { fraudStats } = applicationData;
    
    document.getElementById('totalTransactions').textContent = fraudStats.totalTransactions.toLocaleString();
    document.getElementById('fraudDetected').textContent = fraudStats.fraudDetected.toLocaleString();
    document.getElementById('accuracyRate').textContent = fraudStats.accuracyRate + '%';
    document.getElementById('fraudRate').textContent = fraudStats.fraudRate + '%';
}

// Setup event listeners
function setupEventListeners() {
    try {
        // Transaction form
    const form = document.getElementById('transactionForm');
        if (form) {
    form.addEventListener('submit', handleTransactionSubmit);
        }

        // Tab buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabSwitch);
        });

        // Alert filters
        const alertFilters = ['alertTypeFilter', 'timeRangeFilter', 'statusFilter'];
        alertFilters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', handleAlertFilter);
            }
        });

        // Alert action buttons
        const refreshAlertsBtn = document.getElementById('refreshAlerts');
        if (refreshAlertsBtn) {
            refreshAlertsBtn.addEventListener('click', handleRefreshAlerts);
        }

        const markAllReadBtn = document.getElementById('markAllRead');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', handleMarkAllRead);
        }

        const exportAlertsBtn = document.getElementById('exportAlerts');
        if (exportAlertsBtn) {
            exportAlertsBtn.addEventListener('click', handleExportAlerts);
        }

        // Alert view buttons
        const listViewBtn = document.getElementById('listView');
        if (listViewBtn) {
            listViewBtn.addEventListener('click', handleViewChange);
        }

        const gridViewBtn = document.getElementById('gridView');
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', handleViewChange);
        }

        // Modal functionality
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeAlertModal);
        }

        const acknowledgeAlertBtn = document.getElementById('acknowledgeAlert');
        if (acknowledgeAlertBtn) {
            acknowledgeAlertBtn.addEventListener('click', handleAcknowledgeAlert);
        }

        const resolveAlertBtn = document.getElementById('resolveAlert');
        if (resolveAlertBtn) {
            resolveAlertBtn.addEventListener('click', handleResolveAlert);
        }

        const escalateAlertBtn = document.getElementById('escalateAlert');
        if (escalateAlertBtn) {
            escalateAlertBtn.addEventListener('click', handleEscalateAlert);
        }

        // Report buttons
        const generateReportBtn = document.getElementById('generateReport');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', handleGenerateReport);
        }

        const exportReportBtn = document.getElementById('exportReport');
        if (exportReportBtn) {
            exportReportBtn.addEventListener('click', handleExportReport);
        }

        // ML Model buttons
        const trainModelBtn = document.getElementById('trainModel');
        if (trainModelBtn) {
            trainModelBtn.addEventListener('click', handleTrainModel);
        }

        const retrainModelBtn = document.getElementById('retrainModel');
        if (retrainModelBtn) {
            retrainModelBtn.addEventListener('click', handleRetrainModel);
        }

        const validateModelBtn = document.getElementById('validateModel');
        if (validateModelBtn) {
            validateModelBtn.addEventListener('click', handleValidateModel);
        }

        // Settings buttons
        const saveSettingsBtn = document.getElementById('saveSettings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', handleSaveSettings);
        }

        const resetSettingsBtn = document.getElementById('resetSettings');
        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', handleResetSettings);
        }

        // Action buttons in results panel
        const blockTransactionBtn = document.getElementById('blockTransaction');
        if (blockTransactionBtn) {
            blockTransactionBtn.addEventListener('click', handleBlockTransaction);
        }

        const requestReviewBtn = document.getElementById('requestReview');
        if (requestReviewBtn) {
            requestReviewBtn.addEventListener('click', handleRequestReview);
        }

        const approveTransactionBtn = document.getElementById('approveTransaction');
        if (approveTransactionBtn) {
            approveTransactionBtn.addEventListener('click', handleApproveTransaction);
        }

        // Header buttons
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => switchToTab('settings'));
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

    } catch (error) {
        console.error('Error setting up event listeners:', error);
        showNotification('Failed to setup event listeners', 'error');
    }
}

// Handle transaction form submission
function handleTransactionSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(event.target);
    const transactionData = {
        amount: parseFloat(formData.get('amount') || document.getElementById('amount').value),
        transactionType: formData.get('transactionType') || document.getElementById('transactionType').value,
        originBalance: parseFloat(formData.get('originBalance') || document.getElementById('originBalance').value),
        destBalance: parseFloat(formData.get('destBalance') || document.getElementById('destBalance').value),
        hourOfDay: parseInt(formData.get('hourOfDay') || document.getElementById('hourOfDay').value),
        deviceType: formData.get('deviceType') || document.getElementById('deviceType').value,
        country: formData.get('country') || document.getElementById('country').value,
        accountAge: parseInt(formData.get('accountAge') || document.getElementById('accountAge').value)
    };
    
    // Simulate analysis delay
    setTimeout(() => {
        const analysis = analyzeFraudRisk(transactionData);
        displayResults(analysis);
        
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
    }, 2000);
}

// Enhanced fraud risk analysis with advanced algorithms
function analyzeFraudRisk(data) {
    let riskScore = 0;
    let riskFactors = [];
    let detailedAnalysis = {};
    let behavioralInsights = [];
    
    // Initialize detailed analysis object
    detailedAnalysis = {
        amountAnalysis: {},
        temporalAnalysis: {},
        behavioralAnalysis: {},
        geographicAnalysis: {},
        deviceAnalysis: {},
        accountAnalysis: {},
        patternAnalysis: {}
    };
    
    // 1. ADVANCED AMOUNT ANALYSIS
    const amountAnalysis = analyzeTransactionAmount(data.amount, data.originBalance, data.destBalance);
    riskScore += amountAnalysis.score;
    riskFactors.push(...amountAnalysis.factors);
    detailedAnalysis.amountAnalysis = amountAnalysis;
    
    // 2. TEMPORAL PATTERN ANALYSIS
    const temporalAnalysis = analyzeTemporalPatterns(data.hourOfDay, data.accountAge);
    riskScore += temporalAnalysis.score;
    riskFactors.push(...temporalAnalysis.factors);
    detailedAnalysis.temporalAnalysis = temporalAnalysis;
    
    // 3. BEHAVIORAL ANALYSIS
    const behavioralAnalysis = analyzeBehavioralPatterns(data);
    riskScore += behavioralAnalysis.score;
    riskFactors.push(...behavioralAnalysis.factors);
    behavioralInsights.push(...behavioralAnalysis.insights);
    detailedAnalysis.behavioralAnalysis = behavioralAnalysis;
    
    // 4. GEOGRAPHIC RISK ANALYSIS
    const geographicAnalysis = analyzeGeographicRisk(data.country, data.geolocation);
    riskScore += geographicAnalysis.score;
    riskFactors.push(...geographicAnalysis.factors);
    detailedAnalysis.geographicAnalysis = geographicAnalysis;
    
    // 5. DEVICE & TECHNOLOGY ANALYSIS
    const deviceAnalysis = analyzeDeviceRisk(data.deviceType, data.userAgent, data.ipAddress);
    riskScore += deviceAnalysis.score;
    riskFactors.push(...deviceAnalysis.factors);
    detailedAnalysis.deviceAnalysis = deviceAnalysis;
    
    // 6. ACCOUNT PROFILE ANALYSIS
    const accountAnalysis = analyzeAccountProfile(data.accountAge, data.recentTransactions);
    riskScore += accountAnalysis.score;
    riskFactors.push(...accountAnalysis.factors);
    detailedAnalysis.accountAnalysis = accountAnalysis;
    
    // 7. TRANSACTION TYPE & MERCHANT ANALYSIS
    const typeAnalysis = analyzeTransactionType(data.transactionType, data.merchantCategory);
    riskScore += typeAnalysis.score;
    riskFactors.push(...typeAnalysis.factors);
    detailedAnalysis.typeAnalysis = typeAnalysis;
    
    // 8. PATTERN MATCHING & ANOMALY DETECTION
    const patternAnalysis = detectAnomalies(data);
    riskScore += patternAnalysis.score;
    riskFactors.push(...patternAnalysis.factors);
    detailedAnalysis.patternAnalysis = patternAnalysis;
    
    // 9. ENSEMBLE SCORING WITH WEIGHTS
    const ensembleScore = calculateEnsembleScore(detailedAnalysis);
    riskScore = Math.max(riskScore, ensembleScore.score);
    
    // 10. CONFIDENCE CALCULATION
    const confidence = calculateConfidence(detailedAnalysis, riskFactors.length);
    
    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100);
    
    // Determine risk level with enhanced thresholds
    let riskLevel = determineRiskLevel(riskScore, confidence);
    
    // Generate comprehensive recommendation
    let recommendation = generateAdvancedRecommendation(riskLevel, riskScore, riskFactors, detailedAnalysis, confidence);
    
    return {
        probability: Math.round(riskScore),
        riskLevel,
        riskFactors: [...new Set(riskFactors)], // Remove duplicates
        recommendation,
        detailedAnalysis,
        behavioralInsights,
        confidence,
        ensembleScore: ensembleScore,
        mlExplanation: generateMLExplanation(detailedAnalysis)
    };
}

// Advanced Amount Analysis
function analyzeTransactionAmount(amount, originBalance, destBalance) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Statistical amount analysis
    const avgTransactionAmount = 2500; // Historical average
    const stdDeviation = 1500;
    const zScore = Math.abs(amount - avgTransactionAmount) / stdDeviation;
    
    if (zScore > 3) {
        score += 25;
        factors.push("Statistical Anomaly (Amount)");
        analysis.statisticalAnomaly = true;
    } else if (zScore > 2) {
        score += 15;
        factors.push("Unusual Amount");
        analysis.statisticalAnomaly = false;
    }
    
    // Balance ratio analysis
    if (originBalance > 0) {
        const balanceRatio = amount / originBalance;
        if (balanceRatio > 0.8) {
            score += 20;
            factors.push("High Balance Utilization");
            analysis.balanceUtilization = "high";
        } else if (balanceRatio > 0.5) {
            score += 10;
            factors.push("Moderate Balance Utilization");
            analysis.balanceUtilization = "moderate";
    } else {
            analysis.balanceUtilization = "low";
        }
    }
    
    // Round number analysis (fraudsters often use round numbers)
    if (amount % 1000 === 0 && amount > 1000) {
        score += 5;
        factors.push("Round Number Amount");
        analysis.roundNumber = true;
    }
    
    // Micro-transaction analysis
    if (amount < 10) {
        score += 8;
        factors.push("Micro-transaction Pattern");
        analysis.microTransaction = true;
    }
    
    return { score, factors, analysis };
}

// Temporal Pattern Analysis
function analyzeTemporalPatterns(hourOfDay, accountAge) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Hour-based risk scoring
    const hourRiskScores = {
        0: 25, 1: 30, 2: 35, 3: 30, 4: 25, 5: 20,
        6: 10, 7: 5, 8: 5, 9: 5, 10: 5, 11: 5,
        12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5,
        18: 8, 19: 10, 20: 12, 21: 15, 22: 18, 23: 22
    };
    
    score += hourRiskScores[hourOfDay] || 5;
    if (hourRiskScores[hourOfDay] > 20) {
        factors.push("High-Risk Time Window");
        analysis.timeRisk = "high";
    } else if (hourRiskScores[hourOfDay] > 10) {
        factors.push("Moderate-Risk Time");
        analysis.timeRisk = "moderate";
    } else {
        analysis.timeRisk = "low";
    }
    
    // Weekend analysis
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    if (isWeekend && hourOfDay < 8) {
        score += 10;
        factors.push("Weekend Early Morning");
        analysis.weekendRisk = true;
    }
    
    // Account age vs time correlation
    if (accountAge < 7 && hourRiskScores[hourOfDay] > 15) {
        score += 15;
        factors.push("New Account + High-Risk Time");
        analysis.newAccountHighRiskTime = true;
    }
    
    return { score, factors, analysis };
}

// Behavioral Pattern Analysis
function analyzeBehavioralPatterns(data) {
    let score = 0;
    let factors = [];
    let insights = [];
    let analysis = {};
    
    // Transaction velocity analysis
    if (data.recentTransactions > 10) {
        score += 20;
        factors.push("High Transaction Velocity");
        insights.push("User has made " + data.recentTransactions + " transactions in the last 24 hours");
        analysis.highVelocity = true;
    } else if (data.recentTransactions > 5) {
        score += 10;
        factors.push("Elevated Transaction Frequency");
        analysis.highVelocity = false;
    }
    
    // Device consistency analysis
    if (data.deviceType === 'api' && data.recentTransactions > 3) {
        score += 15;
        factors.push("API Device Pattern");
        insights.push("Multiple API transactions suggest automated behavior");
        analysis.apiPattern = true;
    }
    
    // Card present analysis
    if (data.cardPresent === 'false' && data.amount > 1000) {
        score += 12;
        factors.push("Card Not Present + High Amount");
        insights.push("High-value transaction without physical card presence");
        analysis.cardNotPresentHighValue = true;
    }
    
    // Behavioral scoring based on transaction type
    const behavioralScores = {
        'CASH_OUT': 15,
        'TRANSFER': 12,
        'PAYMENT': 5,
        'CASH_IN': 3,
        'DEBIT': 8,
        'CREDIT': 2
    };
    
    score += behavioralScores[data.transactionType] || 5;
    
    return { score, factors, insights, analysis };
}

// Geographic Risk Analysis
function analyzeGeographicRisk(country, geolocation) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Country risk scoring
    const countryRiskScores = {
        'US': 5, 'CA': 8, 'UK': 12, 'AU': 15, 'DE': 10,
        'FR': 12, 'IT': 18, 'ES': 20, 'JP': 8, 'CN': 25
    };
    
    score += countryRiskScores[country] || 15;
    if (countryRiskScores[country] > 15) {
        factors.push("High-Risk Country");
        analysis.countryRisk = "high";
    } else if (countryRiskScores[country] > 10) {
        factors.push("Moderate-Risk Country");
        analysis.countryRisk = "moderate";
    } else {
        analysis.countryRisk = "low";
    }
    
    // Geolocation analysis
    if (geolocation) {
        const [lat, lng] = geolocation.split(',').map(Number);
        if (isNaN(lat) || isNaN(lng)) {
            score += 10;
            factors.push("Invalid Geolocation");
            analysis.geolocationValid = false;
        } else {
            analysis.geolocationValid = true;
        }
    }
    
    return { score, factors, analysis };
}

// Device & Technology Analysis
function analyzeDeviceRisk(deviceType, userAgent, ipAddress) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Device type risk
    const deviceRiskScores = {
        'mobile': 5,
        'web': 8,
        'api': 20,
        'atm': 3,
        'pos': 2
    };
    
    score += deviceRiskScores[deviceType] || 10;
    if (deviceRiskScores[deviceType] > 15) {
        factors.push("High-Risk Device Type");
        analysis.deviceRisk = "high";
    } else {
        analysis.deviceRisk = "low";
    }
    
    // User agent analysis
    if (userAgent) {
        if (userAgent.includes('bot') || userAgent.includes('crawler')) {
            score += 25;
            factors.push("Bot/Crawler Detected");
            analysis.botDetected = true;
        } else if (userAgent.length < 20) {
            score += 10;
            factors.push("Suspicious User Agent");
            analysis.suspiciousUA = true;
        }
    }
    
    // IP address analysis
    if (ipAddress) {
        if (ipAddress.startsWith('192.168.') || ipAddress.startsWith('10.') || ipAddress.startsWith('172.')) {
            score += 5;
            factors.push("Private IP Address");
            analysis.privateIP = true;
        }
    }
    
    return { score, factors, analysis };
}

// Account Profile Analysis
function analyzeAccountProfile(accountAge, recentTransactions) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Account age scoring
    if (accountAge < 1) {
        score += 30;
        factors.push("Brand New Account");
        analysis.accountAgeRisk = "critical";
    } else if (accountAge < 7) {
        score += 25;
        factors.push("Very New Account");
        analysis.accountAgeRisk = "high";
    } else if (accountAge < 30) {
        score += 15;
        factors.push("New Account");
        analysis.accountAgeRisk = "moderate";
    } else if (accountAge < 90) {
        score += 5;
        factors.push("Recently Created Account");
        analysis.accountAgeRisk = "low";
    } else {
        analysis.accountAgeRisk = "established";
    }
    
    // Transaction history analysis
    if (recentTransactions === 0 && accountAge > 1) {
        score += 10;
        factors.push("Dormant Account Activation");
        analysis.dormantActivation = true;
    }
    
    return { score, factors, analysis };
}

// Transaction Type & Merchant Analysis
function analyzeTransactionType(transactionType, merchantCategory) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Transaction type risk
    const typeRiskScores = {
        'CASH_OUT': 25,
        'TRANSFER': 20,
        'PAYMENT': 8,
        'CASH_IN': 3,
        'DEBIT': 12,
        'CREDIT': 2,
        'REFUND': 5
    };
    
    score += typeRiskScores[transactionType] || 10;
    if (typeRiskScores[transactionType] > 15) {
        factors.push("High-Risk Transaction Type");
        analysis.typeRisk = "high";
    } else {
        analysis.typeRisk = "low";
    }
    
    // Merchant category risk
    const merchantRiskScores = {
        'gambling': 30,
        'adult_services': 25,
        'online_shopping': 8,
        'retail': 5,
        'gas_station': 3,
        'restaurant': 2,
        'healthcare': 1,
        'education': 1
    };
    
    if (merchantCategory) {
        score += merchantRiskScores[merchantCategory] || 5;
        if (merchantRiskScores[merchantCategory] > 20) {
            factors.push("High-Risk Merchant Category");
            analysis.merchantRisk = "high";
    } else {
            analysis.merchantRisk = "low";
        }
    }
    
    return { score, factors, analysis };
}

// Anomaly Detection
function detectAnomalies(data) {
    let score = 0;
    let factors = [];
    let analysis = {};
    
    // Velocity anomaly
    if (data.recentTransactions > 15) {
        score += 20;
        factors.push("Velocity Anomaly");
        analysis.velocityAnomaly = true;
    }
    
    // Amount anomaly (Benford's Law inspired)
    const firstDigit = parseInt(data.amount.toString()[0]);
    const benfordProbabilities = [0, 0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046];
    if (firstDigit === 1 && Math.random() > benfordProbabilities[1]) {
        score += 5;
        factors.push("Amount Distribution Anomaly");
        analysis.benfordAnomaly = true;
    }
    
    // Time-based anomaly
    const hour = data.hourOfDay;
    if ((hour >= 2 && hour <= 4) && data.amount > 5000) {
        score += 15;
        factors.push("Night-time High-Value Anomaly");
        analysis.nightHighValueAnomaly = true;
    }
    
    return { score, factors, analysis };
}

// Ensemble Scoring
function calculateEnsembleScore(analysis) {
    const weights = {
        amount: 0.25,
        temporal: 0.20,
        behavioral: 0.20,
        geographic: 0.15,
        device: 0.10,
        account: 0.10
    };
    
    let weightedScore = 0;
    let explanations = [];
    
    // Calculate weighted score
    Object.keys(weights).forEach(key => {
        if (analysis[key + 'Analysis']) {
            const score = analysis[key + 'Analysis'].score || 0;
            weightedScore += score * weights[key];
            explanations.push(`${key}: ${score.toFixed(1)} (weight: ${(weights[key] * 100).toFixed(0)}%)`);
        }
    });
    
    return {
        score: Math.round(weightedScore),
        explanations: explanations,
        weights: weights
    };
}

// Confidence Calculation
function calculateConfidence(analysis, factorCount) {
    let confidence = 100;
    
    // Reduce confidence based on missing data
    const requiredFields = ['amount', 'transactionType', 'hourOfDay', 'accountAge', 'deviceType', 'country'];
    const missingFields = requiredFields.filter(field => !analysis[field + 'Analysis'] || !analysis[field + 'Analysis'].score);
    confidence -= missingFields.length * 10;
    
    // Reduce confidence for low factor count
    if (factorCount < 3) {
        confidence -= 20;
    }
    
    return Math.max(confidence, 30);
}

// Enhanced Risk Level Determination
function determineRiskLevel(score, confidence) {
    if (score >= 80) return 'critical';
    if (score >= 65) return 'high';
    if (score >= 45) return 'medium';
    if (score >= 25) return 'low';
    return 'minimal';
}

// Advanced Recommendation Generation
function generateAdvancedRecommendation(riskLevel, score, factors, analysis, confidence) {
    const recommendations = {
        critical: `🚨 CRITICAL RISK (${score}%, Confidence: ${confidence}%): IMMEDIATE BLOCK REQUIRED. Multiple high-risk indicators detected. Contact fraud team immediately.`,
        high: `⚠️ HIGH RISK (${score}%, Confidence: ${confidence}%): Strong fraud indicators present. Recommend blocking transaction and requesting additional verification.`,
        medium: `⚡ MEDIUM RISK (${score}%, Confidence: ${confidence}%): Some risk factors detected. Consider step-up authentication or manual review.`,
        low: `✅ LOW RISK (${score}%, Confidence: ${confidence}%): Minimal risk factors. Transaction can proceed with standard monitoring.`,
        minimal: `✅ MINIMAL RISK (${score}%, Confidence: ${confidence}%): No significant risk factors detected. Safe to proceed.`
    };
    
    return recommendations[riskLevel] || recommendations.medium;
}

// ML Explanation Generator
function generateMLExplanation(analysis) {
    const explanations = [];
    
    Object.keys(analysis).forEach(key => {
        if (analysis[key] && analysis[key].score > 0) {
            const category = key.replace('Analysis', '').toUpperCase();
            explanations.push(`${category}: ${analysis[key].score} risk points`);
        }
    });
    
    return explanations.join(' | ');
}

// Display analysis results
function displayResults(analysis) {
    const resultsPanel = document.getElementById('resultsPanel');
    const probabilityCircle = document.getElementById('probabilityCircle');
    const probabilityValue = document.getElementById('probabilityValue');
    const riskLevel = document.getElementById('riskLevel');
    const factorsList = document.getElementById('factorsList');
    const recommendationText = document.getElementById('recommendationText');
    
    // Show results panel
    resultsPanel.classList.remove('hidden');
    
    // Update probability display
    probabilityValue.textContent = analysis.probability + '%';
    
    // Update risk level styling
    probabilityCircle.className = 'probability-circle';
    riskLevel.className = 'risk-level';
    
    if (analysis.riskLevel === 'high') {
        probabilityCircle.classList.add('high-risk');
        riskLevel.classList.add('high');
        riskLevel.textContent = 'HIGH RISK';
    } else if (analysis.riskLevel === 'medium') {
        probabilityCircle.classList.add('medium-risk');
        riskLevel.classList.add('medium');
        riskLevel.textContent = 'MEDIUM RISK';
    } else {
        probabilityCircle.classList.add('low-risk');
        riskLevel.classList.add('low');
        riskLevel.textContent = 'LOW RISK';
    }
    
    // Update risk factors
    factorsList.innerHTML = '';
    analysis.riskFactors.forEach(factor => {
        const tag = document.createElement('span');
        tag.className = 'factor-tag';
        tag.textContent = factor;
        factorsList.appendChild(tag);
    });
    
    // Update recommendation
    recommendationText.textContent = analysis.recommendation;
}

// Chart functions removed (duplicates)

// Create model performance comparison chart
function createModelChart() {
    const ctx = document.getElementById('modelChart').getContext('2d');
    const { modelPerformance } = applicationData;
    
    modelChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'AUC-ROC'],
            datasets: modelPerformance.map((model, index) => ({
                label: model.name,
                data: [
                    model.accuracy * 100,
                    model.precision * 100,
                    model.recall * 100,
                    model.f1Score * 100,
                    model.aucRoc * 100
                ],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index] + '20',
                borderWidth: 2,
                pointBackgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index]
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#a0a0a0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#e0e0e0'
                    }
                }
            }
        }
    });
}

// Populate model performance table
function populateModelTable() {
    const tableBody = document.getElementById('modelTableBody');
    const { modelPerformance } = applicationData;
    
    tableBody.innerHTML = '';
    
    modelPerformance.forEach(model => {
        const row = document.createElement('tr');
        
        const getScoreClass = (score) => {
            if (score >= 0.9) return 'excellent';
            if (score >= 0.8) return 'good';
            return 'average';
        };
        
        row.innerHTML = `
            <td><span class="model-name">${model.name}</span></td>
            <td><span class="metric-score ${getScoreClass(model.accuracy)}">${(model.accuracy * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.precision)}">${(model.precision * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.recall)}">${(model.recall * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.f1Score)}">${(model.f1Score * 100).toFixed(1)}%</span></td>
            <td><span class="metric-score ${getScoreClass(model.aucRoc)}">${(model.aucRoc * 100).toFixed(1)}%</span></td>
        `;
        
        tableBody.appendChild(row);
    });
}


// Enhanced Alerts System (variables declared earlier)

// Initialize enhanced alerts system
function initializeAlertsSystem() {
    console.log('Initializing enhanced alerts system...');
    generateSampleAlerts();
    console.log('Generated alerts:', alertsData.length);
    setupAlertEventListeners();
    updateAlertStatistics();
    renderAlerts();
    startAlertSimulation();
    console.log('Alerts system initialized successfully');
    
    // Test modal functionality
    setTimeout(() => {
        console.log('Testing modal functionality...');
        const modal = document.getElementById('alertModal');
        console.log('Modal element:', modal);
        if (modal) {
            console.log('Modal classes:', modal.className);
            console.log('Modal style:', modal.style.display);
        }
    }, 1000);
}

// Global test function for debugging
window.testModal = function() {
    console.log('Testing modal manually...');
    if (alertsData.length > 0) {
        viewAlertDetails(alertsData[0].id);
    } else {
        console.error('No alerts data available');
    }
};

// Generate comprehensive sample alerts
function generateSampleAlerts() {
    const alertTypes = [
        { type: 'critical', priority: 'p1', category: 'fraud', icon: '🚨' },
        { type: 'high', priority: 'p2', category: 'security', icon: '⚠️' },
        { type: 'medium', priority: 'p3', category: 'performance', icon: '⚡' },
        { type: 'low', priority: 'p4', category: 'system', icon: 'ℹ️' }
    ];

    const alertMessages = {
        fraud: [
            'High-risk transaction pattern detected',
            'Suspicious account activity identified',
            'Multiple failed authentication attempts',
            'Unusual spending pattern detected',
            'Cross-border transaction anomaly'
        ],
        security: [
            'Potential data breach attempt',
            'Unauthorized access attempt',
            'Suspicious IP address detected',
            'Malware signature detected',
            'Phishing attempt blocked'
        ],
        performance: [
            'System response time exceeded threshold',
            'Database connection pool exhausted',
            'Memory usage critical',
            'CPU utilization high',
            'Network latency increased'
        ],
        system: [
            'Service health check failed',
            'Backup process incomplete',
            'Certificate expiration warning',
            'Disk space low',
            'Log file size exceeded'
        ]
    };

    const statuses = ['new', 'acknowledged', 'in-progress', 'resolved', 'escalated'];
    const sources = ['ML Model', 'Rule Engine', 'Manual Review', 'System Monitor', 'Security Scanner'];

    alertsData = [];
    for (let i = 0; i < 50; i++) {
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const categoryMessages = alertMessages[alertType.category];
        const message = categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
        
        
        const now = new Date();
        const randomTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        alertsData.push({
            id: `ALT${String(i + 1).padStart(4, '0')}`,
            type: alertType.type,
            priority: alertType.priority,
            category: alertType.category,
            icon: alertType.icon,
            title: message,
            description: generateAlertDescription(alertType.category, message),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            source: sources[Math.floor(Math.random() * sources.length)],
            timestamp: randomTime,
            severity: Math.floor(Math.random() * 100) + 1,
            affectedUsers: Math.floor(Math.random() * 1000),
            responseTime: Math.floor(Math.random() * 120) + 5,
            tags: generateAlertTags(alertType.category),
            actions: generateAlertActions(alertType.type)
        });
    }
    
    alertsData.sort((a, b) => b.timestamp - a.timestamp);
}

// Generate alert description
function generateAlertDescription(category, message) {
    const descriptions = {
        fraud: `This alert was triggered by our advanced ML fraud detection system. The transaction pattern shows multiple risk indicators including unusual timing, amount, and geographic location. Immediate investigation recommended.`,
        security: `Security monitoring system detected potential threat activity. This may indicate an attempted breach or unauthorized access. Security team has been automatically notified.`,
        performance: `System performance metrics have exceeded normal thresholds. This may impact user experience and system reliability. Monitoring team is investigating.`,
        system: `Automated system health check has identified an issue that requires attention. This alert helps maintain optimal system performance and reliability.`
    };
    return descriptions[category] || 'System alert requiring attention.';
}

// Generate alert tags
function generateAlertTags(category) {
    const tagSets = {
        fraud: ['transaction', 'risk', 'ml-detected', 'urgent'],
        security: ['security', 'threat', 'monitoring', 'investigation'],
        performance: ['performance', 'monitoring', 'optimization', 'system'],
        system: ['system', 'health', 'maintenance', 'automated']
    };
    return tagSets[category] || ['general'];
}

// Generate alert actions
function generateAlertActions(type) {
    const actionSets = {
        critical: ['block', 'investigate', 'notify', 'escalate'],
        high: ['review', 'monitor', 'notify'],
        medium: ['review', 'monitor'],
        low: ['monitor']
    };
    return actionSets[type] || ['monitor'];
}

// Setup alert event listeners
function setupAlertEventListeners() {
    // Filter event listeners
    const filters = ['alertTypeFilter', 'timeRangeFilter', 'statusFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', handleAlertFilter);
        }
    });

    // Action button listeners
    document.getElementById('refreshAlerts')?.addEventListener('click', refreshAlerts);
    document.getElementById('markAllRead')?.addEventListener('click', markAllAlertsRead);
    document.getElementById('exportAlerts')?.addEventListener('click', exportAlerts);

    // View option listeners
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchView(e.target.dataset.view);
        });
    });

    // Modal listeners
    document.getElementById('closeModal')?.addEventListener('click', closeAlertModal);
    document.getElementById('acknowledgeAlert')?.addEventListener('click', acknowledgeAlert);
    document.getElementById('resolveAlert')?.addEventListener('click', resolveAlert);
    document.getElementById('escalateAlert')?.addEventListener('click', escalateAlert);
}

// Enhanced alert filtering
function handleAlertFilter(event) {
    try {
        applyFilters();
        updateAlertStatistics();
        renderAlerts();
        showNotification('Filters applied successfully', 'success');
    } catch (error) {
        console.error('Error applying filters:', error);
        showNotification('Failed to apply filters', 'error');
    }
}

// Apply all filters
function applyFilters() {
    const typeFilter = document.getElementById('alertTypeFilter').value;
    const timeFilter = document.getElementById('timeRangeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    filteredAlerts = alertsData.filter(alert => {
        // Type filter
        if (typeFilter !== 'all' && alert.type !== typeFilter) return false;
        
        // Status filter
        if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
        
        // Time filter
        const now = new Date();
        const alertTime = alert.timestamp;
        const timeDiff = now - alertTime;
        
        switch (timeFilter) {
            case '1h':
                if (timeDiff > 60 * 60 * 1000) return false;
                break;
            case '24h':
                if (timeDiff > 24 * 60 * 60 * 1000) return false;
                break;
            case '7d':
                if (timeDiff > 7 * 24 * 60 * 60 * 1000) return false;
                break;
            case '30d':
                if (timeDiff > 30 * 24 * 60 * 60 * 1000) return false;
                break;
        }
        
        return true;
    });
}

// Update alert statistics
function updateAlertStatistics() {
    const totalAlerts = alertsData.length;
    const criticalAlerts = alertsData.filter(a => a.type === 'critical').length;
    const newAlerts = alertsData.filter(a => a.status === 'new').length;
    const avgResponseTime = Math.round(
        alertsData.filter(a => a.status === 'resolved')
            .reduce((sum, a) => sum + a.responseTime, 0) / 
        alertsData.filter(a => a.status === 'resolved').length || 0
    );

    // Update statistics with proper element IDs
    const totalAlertsEl = document.getElementById('totalAlerts');
    const criticalAlertsEl = document.getElementById('criticalAlerts');
    const newAlertsEl = document.getElementById('newAlerts');
    const avgResponseTimeEl = document.getElementById('alertAvgResponseTime');

    if (totalAlertsEl) totalAlertsEl.textContent = totalAlerts;
    if (criticalAlertsEl) criticalAlertsEl.textContent = criticalAlerts;
    if (newAlertsEl) newAlertsEl.textContent = newAlerts;
    if (avgResponseTimeEl) avgResponseTimeEl.textContent = avgResponseTime + 'm';
}

// Render alerts based on current view
function renderAlerts() {
    const alertsList = document.getElementById('alertsList');
    const filteredCount = document.getElementById('filteredAlertsCount');
    
    console.log('Rendering alerts...', { alertsList, filteredCount });
    
    if (!alertsList) {
        console.error('alertsList element not found');
        return;
    }
    
    // Apply filters first
    applyFilters();
    console.log('Filtered alerts:', filteredAlerts.length);
    
    // Update count
    if (filteredCount) {
        filteredCount.textContent = `${filteredAlerts.length} alerts`;
    }
    
    // Clear existing alerts
    alertsList.innerHTML = '';
    
    // Render based on view
    switch (currentView) {
        case 'list':
            renderListView(filteredAlerts, alertsList);
            break;
        case 'grid':
            renderGridView(filteredAlerts, alertsList);
            break;
    }
    
    console.log('Alerts rendered successfully');
}

// Render list view
function renderListView(alerts, container) {
    console.log('Rendering list view with', alerts.length, 'alerts');
    alerts.forEach(alert => {
        const alertElement = createAlertElement(alert);
        container.appendChild(alertElement);
    });
    console.log('List view rendered');
}

// Render grid view
function renderGridView(alerts, container) {
    container.className = 'alerts-list grid-view';
    alerts.forEach(alert => {
        const alertElement = createAlertCard(alert);
        container.appendChild(alertElement);
    });
}

// Create alert element
function createAlertElement(alert) {
    const element = document.createElement('div');
    element.className = `alert-item ${alert.type} ${alert.status}`;
    element.dataset.alertId = alert.id;
    
    const timeAgo = getTimeAgo(alert.timestamp);
    const statusClass = alert.status.replace('-', '');
    
    element.innerHTML = `
        <div class="alert-header">
            <div class="alert-icon">${alert.icon}</div>
            <div class="alert-info">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-meta">
                    <span class="alert-id">${alert.id}</span>
                    <span class="alert-source">${alert.source}</span>
                    <span class="alert-time">${timeAgo}</span>
                </div>
            </div>
            <div class="alert-actions">
                <span class="alert-severity">${alert.severity}%</span>
                <span class="alert-status status--${statusClass}">${alert.status}</span>
                <button class="btn btn--sm btn--outline view-details-btn" data-alert-id="${alert.id}">
                    View Details
                </button>
                <button class="btn btn--sm btn--primary acknowledge-btn" data-alert-id="${alert.id}">
                    Acknowledge
                </button>
            </div>
        </div>
        <div class="alert-content">
            <div class="alert-description">${alert.description}</div>
            <div class="alert-tags">
                ${alert.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add event listeners
    const viewBtn = element.querySelector('.view-details-btn');
    const ackBtn = element.querySelector('.acknowledge-btn');
    
    console.log('Alert element created for:', alert.id);
    console.log('Buttons found:', { viewBtn, ackBtn });
    
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('View Details button clicked for alert:', alert.id);
            viewAlertDetails(alert.id);
        });
    } else {
        console.error('View Details button not found for alert:', alert.id);
    }
    
    if (ackBtn) {
        ackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Acknowledge button clicked for alert:', alert.id);
            acknowledgeAlertDirect(alert.id);
        });
    } else {
        console.error('Acknowledge button not found for alert:', alert.id);
    }
    
    return element;
}

// Create alert card for grid view
function createAlertCard(alert) {
    const element = document.createElement('div');
    element.className = `alert-card ${alert.type} ${alert.status}`;
    element.dataset.alertId = alert.id;
    
    const timeAgo = getTimeAgo(alert.timestamp);
    const statusClass = alert.status.replace('-', '');
    
    element.innerHTML = `
        <div class="card-header">
            <div class="alert-icon">${alert.icon}</div>
            <div class="alert-severity">${alert.severity}%</div>
        </div>
        <div class="card-body">
            <div class="alert-title">${alert.title}</div>
            <div class="alert-description">${alert.description.substring(0, 100)}...</div>
            <div class="alert-meta">
                <span class="alert-id">${alert.id}</span>
                <span class="alert-time">${timeAgo}</span>
            </div>
        </div>
        <div class="card-footer">
            <span class="alert-status status--${statusClass}">${alert.status}</span>
            <button class="btn btn--sm btn--primary view-details-btn" data-alert-id="${alert.id}">
                Details
            </button>
        </div>
    `;
    
    // Add event listener
    const viewBtn = element.querySelector('.view-details-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewAlertDetails(alert.id);
        });
    }
    
    return element;
}

// View alert details
function viewAlertDetails(alertId) {
    console.log('viewAlertDetails called with ID:', alertId);
    console.log('alertsData:', alertsData);
    
    const alert = alertsData.find(a => a.id === alertId);
    console.log('Found alert:', alert);
    
    if (!alert) {
        console.error('Alert not found for ID:', alertId);
        showNotification('Alert not found', 'error');
        return;
    }
    
    const modal = document.getElementById('alertModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    console.log('Modal elements:', { modal, modalTitle, modalBody });
    
    if (!modal || !modalTitle || !modalBody) {
        console.error('Modal elements not found:', { modal, modalTitle, modalBody });
        showNotification('Modal elements not found', 'error');
        return;
    }
    
    modalTitle.textContent = `${alert.id} - ${alert.title}`;
    
    modalBody.innerHTML = `
        <div class="alert-details">
            <div class="detail-section">
                <h4>Alert Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Type:</label>
                        <span class="alert-type ${alert.type}">${alert.type.toUpperCase()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Priority:</label>
                        <span class="alert-priority ${alert.priority}">${alert.priority.toUpperCase()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="alert-status ${alert.status}">${alert.status.toUpperCase()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Severity:</label>
                        <span class="alert-severity">${alert.severity}%</span>
                    </div>
                    <div class="detail-item">
                        <label>Source:</label>
                        <span>${alert.source}</span>
                    </div>
                    <div class="detail-item">
                        <label>Timestamp:</label>
                        <span>${alert.timestamp.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Description</h4>
                <p>${alert.description}</p>
            </div>
            
            <div class="detail-section">
                <h4>Impact</h4>
                <div class="impact-metrics">
                    <div class="metric">
                        <span class="metric-label">Affected Users:</span>
                        <span class="metric-value">${alert.affectedUsers}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Response Time:</span>
                        <span class="metric-value">${alert.responseTime} minutes</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Tags</h4>
                <div class="alert-tags">
                    ${alert.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Recommended Actions</h4>
                <div class="recommended-actions">
                    ${alert.actions.map(action => `<span class="action-tag">${action}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Show modal with animation
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    // Add click outside to close (remove existing listeners first)
    const existingListener = modal._clickListener;
    if (existingListener) {
        modal.removeEventListener('click', existingListener);
    }
    
    const clickListener = (e) => {
        if (e.target === modal) {
            closeAlertModal();
        }
    };
    
    modal._clickListener = clickListener;
    modal.addEventListener('click', clickListener);
    
    console.log('Modal should now be visible');
    showNotification('Alert details loaded', 'success');
}

// Close alert modal
function closeAlertModal() {
    const modal = document.getElementById('alertModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        
        // Remove click listener
        if (modal._clickListener) {
            modal.removeEventListener('click', modal._clickListener);
            delete modal._clickListener;
        }
        
        console.log('Modal closed');
    }
}

// Alert actions
function acknowledgeAlert() {
    const alertId = getCurrentAlertId();
    if (alertId) {
        updateAlertStatus(alertId, 'acknowledged');
        showNotification('Alert acknowledged', 'success');
        closeAlertModal();
    }
}

// Direct acknowledge function for inline buttons
function acknowledgeAlertDirect(alertId) {
    if (alertId) {
        updateAlertStatus(alertId, 'acknowledged');
        showNotification('Alert acknowledged', 'success');
    }
}

function resolveAlert() {
    const alertId = getCurrentAlertId();
    if (alertId) {
        updateAlertStatus(alertId, 'resolved');
        showNotification('Alert resolved', 'success');
        closeAlertModal();
    }
}

function escalateAlert() {
    const alertId = getCurrentAlertId();
    if (alertId) {
        updateAlertStatus(alertId, 'escalated');
        showNotification('Alert escalated', 'warning');
        closeAlertModal();
    }
}

function getCurrentAlertId() {
    const modal = document.getElementById('alertModal');
    const title = document.getElementById('modalTitle').textContent;
    return title.split(' - ')[0];
}

function updateAlertStatus(alertId, newStatus) {
    const alert = alertsData.find(a => a.id === alertId);
    if (alert) {
        alert.status = newStatus;
        applyFilters();
        updateAlertStatistics();
        renderAlerts();
    }
}

// View switching
function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Update container class
    const alertsList = document.getElementById('alertsList');
    alertsList.className = `alerts-list ${view}-view`;
    
    renderAlerts();
}

// Pagination
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="btn btn--sm btn--outline" onclick="changePage(${currentPage - 1})">Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="btn btn--sm btn--primary">${i}</button>`;
        } else {
            paginationHTML += `<button class="btn btn--sm btn--outline" onclick="changePage(${i})">${i}</button>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="btn btn--sm btn--outline" onclick="changePage(${currentPage + 1})">Next</button>`;
    }
    
    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    renderAlerts();
}

// Action functions
function refreshAlerts() {
    generateSampleAlerts();
    applyFilters();
    updateAlertStatistics();
    renderAlerts();
    showNotification('Alerts refreshed', 'success');
}

function markAllAlertsRead() {
    alertsData.forEach(alert => {
        if (alert.status === 'new') {
            alert.status = 'acknowledged';
        }
    });
    applyFilters();
    updateAlertStatistics();
    renderAlerts();
    showNotification('All alerts marked as read', 'success');
}

function exportAlerts() {
    const exportData = filteredAlerts.map(alert => ({
        id: alert.id,
        type: alert.type,
        title: alert.title,
        status: alert.status,
        timestamp: alert.timestamp.toISOString(),
        severity: alert.severity
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `alerts_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Alerts exported successfully', 'success');
}

function openAlertSettings() {
    showNotification('Alert settings panel coming soon', 'info');
}

// Utility functions
function getTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

// Start alert simulation
function startAlertSimulation() {
    setInterval(() => {
        // Occasionally add new alerts
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
            addRandomAlert();
        }
        
        // Update statistics
        updateAlertStatistics();
    }, 5000);
}

function addRandomAlert() {
    const alertTypes = [
        { type: 'critical', priority: 'p1', category: 'fraud', icon: '🚨' },
        { type: 'high', priority: 'p2', category: 'security', icon: '⚠️' },
        { type: 'medium', priority: 'p3', category: 'performance', icon: '⚡' },
        { type: 'low', priority: 'p4', category: 'system', icon: 'ℹ️' }
    ];
    
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const messages = [
        'New suspicious activity detected',
        'System performance threshold exceeded',
        'Security anomaly identified',
        'Automated health check failed'
    ];
    
    const newAlert = {
        id: `ALT${String(alertsData.length + 1).padStart(4, '0')}`,
        type: alertType.type,
        priority: alertType.priority,
        category: alertType.category,
        icon: alertType.icon,
        title: messages[Math.floor(Math.random() * messages.length)],
        description: generateAlertDescription(alertType.category, ''),
        status: 'new',
        source: 'ML Model',
        timestamp: new Date(),
        severity: Math.floor(Math.random() * 100) + 1,
        affectedUsers: Math.floor(Math.random() * 1000),
        responseTime: 0,
        tags: generateAlertTags(alertType.category),
        actions: generateAlertActions(alertType.type)
    };
    
    alertsData.unshift(newAlert);
    applyFilters();
    updateAlertStatistics();
    renderAlerts();
    
    // Show notification for new critical alerts
    if (alertType.type === 'critical') {
        showNotification(`New critical alert: ${newAlert.title}`, 'error');
    }
}

// Initialize alerts system when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
    // Add this to the existing initialization
    setTimeout(() => {
        initializeAlertsSystem();
    }, 1000);
});

// Tab functionality
function initializeTabs() {
    try {
        // Set initial active tab
        switchToTab('overview');
    } catch (error) {
        console.error('Error initializing tabs:', error);
    }
}

function handleTabSwitch(event) {
    try {
        const tabName = event.target.closest('.tab-btn').dataset.tab;
        switchToTab(tabName);
    } catch (error) {
        console.error('Error switching tabs:', error);
        showNotification('Failed to switch tab', 'error');
    }
}

function switchToTab(tabName) {
    try {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);
        
        if (activeTab && activeContent) {
            activeTab.classList.add('active');
            activeContent.classList.add('active');
        }
    } catch (error) {
        console.error('Error switching to tab:', tabName, error);
    }
}

// Form validation
function setupFormValidation() {
    try {
        const form = document.getElementById('transactionForm');
        if (form) {
            // Add real-time validation
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                field.addEventListener('blur', validateField);
                field.addEventListener('input', clearFieldError);
            });
        }
    } catch (error) {
        console.error('Error setting up form validation:', error);
    }
}

function validateField(event) {
    try {
        const field = event.target;
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'number' && value) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                showFieldError(field, 'Please enter a valid number');
                return false;
            }
            if (field.hasAttribute('min') && numValue < parseFloat(field.min)) {
                showFieldError(field, `Value must be at least ${field.min}`);
                return false;
            }
        }
        
        clearFieldError(event);
        return true;
    } catch (error) {
        console.error('Error validating field:', error);
        return false;
    }
}

function showFieldError(field, message) {
    try {
        field.classList.add('error');
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    } catch (error) {
        console.error('Error showing field error:', error);
    }
}

function clearFieldError(event) {
    try {
        const field = event.target;
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    } catch (error) {
        console.error('Error clearing field error:', error);
    }
}

// Event handlers for various buttons
function handleAlertFilter(event) {
    try {
        showNotification('Alert filter applied', 'info');
        // Apply filters to alerts
        const alertType = document.getElementById('alertTypeFilter').value;
        const timeRange = document.getElementById('timeRangeFilter').value;
        const status = document.getElementById('statusFilter').value;
        
        filteredAlerts = alertsData.filter(alert => {
            const typeMatch = alertType === 'all' || alert.type === alertType;
            const statusMatch = status === 'all' || alert.status === status;
            
            // Time range filtering
            const alertTime = new Date(alert.timestamp);
            const now = new Date();
            let timeMatch = true;
            
            switch (timeRange) {
                case '1h':
                    timeMatch = (now - alertTime) <= 60 * 60 * 1000;
                    break;
                case '24h':
                    timeMatch = (now - alertTime) <= 24 * 60 * 60 * 1000;
                    break;
                case '7d':
                    timeMatch = (now - alertTime) <= 7 * 24 * 60 * 60 * 1000;
                    break;
                case '30d':
                    timeMatch = (now - alertTime) <= 30 * 24 * 60 * 60 * 1000;
                    break;
            }
            
            return typeMatch && statusMatch && timeMatch;
        });
    } catch (error) {
        console.error('Error handling alert filter:', error);
    }
}

function handleGenerateReport(event) {
    try {
        showNotification('Generating comprehensive report...', 'info');
        
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;
        const reportType = document.getElementById('reportType').value;
        
        // Show loading animation
        const reportContent = document.getElementById('reportContent');
        reportContent.innerHTML = `
            <div class="report-loading">
                <div class="loading-spinner"></div>
                <div class="loading-text">Generating ${reportType.replace('_', ' ')} report...</div>
            </div>
        `;
        
        // Simulate report generation delay
        setTimeout(() => {
            const report = generateComprehensiveReport(reportType, startDate, endDate);
            displayReport(report);
            showNotification('Report generated successfully', 'success');
        }, 3000);
        
    } catch (error) {
        console.error('Error generating report:', error);
        showNotification('Failed to generate report', 'error');
    }
}

// Generate comprehensive report based on type and date range
function generateComprehensiveReport(reportType, startDate, endDate) {
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
    const end = endDate ? new Date(endDate) : new Date();
    
    // Filter data based on date range
    const filteredTransactions = fraudDatabase.historicalTransactions.filter(t => 
        t.date >= start && t.date <= end
    );
    
    switch (reportType) {
        case 'fraud_summary':
            return generateFraudSummaryReport(filteredTransactions, start, end);
        case 'model_performance':
            return generateModelPerformanceReport(start, end);
        case 'geographic_analysis':
            return generateGeographicAnalysisReport(filteredTransactions);
        case 'behavioral_patterns':
            return generateBehavioralPatternsReport(filteredTransactions);
        case 'custom':
            return generateCustomReport(filteredTransactions, start, end);
        default:
            return generateFraudSummaryReport(filteredTransactions, start, end);
    }
}

// Generate fraud summary report
function generateFraudSummaryReport(transactions, startDate, endDate) {
    const totalTransactions = transactions.length;
    const fraudulentTransactions = transactions.filter(t => t.isFraudulent);
    const fraudRate = (fraudulentTransactions.length / totalTransactions) * 100;
    
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const fraudulentAmount = fraudulentTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    const blockedTransactions = fraudulentTransactions.filter(t => t.fraudProbability > 70);
    const falsePositives = transactions.filter(t => !t.isFraudulent && t.fraudProbability > 70);
    const falseNegatives = transactions.filter(t => t.isFraudulent && t.fraudProbability < 30);
    
    // Calculate metrics
    const precision = blockedTransactions.length / (blockedTransactions.length + falsePositives.length) * 100;
    const recall = blockedTransactions.length / fraudulentTransactions.length * 100;
    const f1Score = 2 * (precision * recall) / (precision + recall);
    
    return {
        type: 'fraud_summary',
        title: 'Fraud Summary Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            totalTransactions,
            fraudulentTransactions: fraudulentTransactions.length,
            fraudRate: fraudRate.toFixed(2),
            totalAmount: totalAmount.toLocaleString(),
            fraudulentAmount: fraudulentAmount.toLocaleString(),
            blockedTransactions: blockedTransactions.length,
            falsePositives: falsePositives.length,
            falseNegatives: falseNegatives.length,
            precision: precision.toFixed(2),
            recall: recall.toFixed(2),
            f1Score: f1Score.toFixed(2)
        },
        charts: [
            {
                type: 'doughnut',
                title: 'Transaction Distribution',
                data: {
                    labels: ['Legitimate', 'Fraudulent'],
                    datasets: [{
                        data: [totalTransactions - fraudulentTransactions.length, fraudulentTransactions.length],
                        backgroundColor: ['#4CAF50', '#F44336']
                    }]
                }
            },
            {
                type: 'bar',
                title: 'Fraud Rate by Transaction Type',
                data: generateTransactionTypeFraudData(transactions)
            },
            {
                type: 'line',
                title: 'Daily Fraud Trends',
                data: generateDailyFraudTrends(transactions, startDate, endDate)
            }
        ],
        tables: [
            {
                title: 'Top Risk Factors',
                data: generateTopRiskFactors(transactions)
            },
            {
                title: 'Geographic Fraud Distribution',
                data: generateGeographicFraudTable(transactions)
            }
        ]
    };
}

// Generate model performance report
function generateModelPerformanceReport(startDate, endDate) {
    const recentPerformance = fraudDatabase.modelPerformanceHistory.slice(-7); // Last 7 days
    
    return {
        type: 'model_performance',
        title: 'Model Performance Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            bestModel: 'XGBoost',
            avgAccuracy: 94.2,
            avgPrecision: 87.5,
            avgRecall: 82.3,
            avgF1Score: 84.8,
            totalModels: 5,
            activeModels: 5
        },
        charts: [
            {
                type: 'radar',
                title: 'Model Performance Comparison',
                data: generateModelComparisonData()
            },
            {
                type: 'line',
                title: 'Performance Trends (Last 7 Days)',
                data: generatePerformanceTrendsData(recentPerformance)
            }
        ],
        tables: [
            {
                title: 'Detailed Model Metrics',
                data: generateDetailedModelMetrics()
            }
        ]
    };
}

// Generate geographic analysis report
function generateGeographicAnalysisReport(transactions) {
    const geoData = fraudDatabase.geographicFraudData;
    
    return {
        type: 'geographic_analysis',
        title: 'Geographic Fraud Analysis',
        period: 'Historical Analysis',
        summary: {
            totalCountries: geoData.length,
            highestRiskCountry: 'China',
            lowestRiskCountry: 'Japan',
            avgFraudRate: (geoData.reduce((sum, c) => sum + c.fraudRate, 0) / geoData.length).toFixed(2),
            totalBlockedAmount: geoData.reduce((sum, c) => sum + c.blockedAmount, 0).toLocaleString()
        },
        charts: [
            {
                type: 'bar',
                title: 'Fraud Rate by Country',
                data: {
                    labels: geoData.map(c => c.country),
                    datasets: [{
                        label: 'Fraud Rate (%)',
                        data: geoData.map(c => c.fraudRate),
                        backgroundColor: geoData.map(c => 
                            c.fraudRate > 25 ? '#F44336' : 
                            c.fraudRate > 20 ? '#FF9800' : 
                            c.fraudRate > 15 ? '#FFC107' : '#4CAF50'
                        )
                    }]
                }
            },
            {
                type: 'pie',
                title: 'Blocked Amount Distribution',
                data: {
                    labels: geoData.map(c => c.country),
                    datasets: [{
                        data: geoData.map(c => c.blockedAmount),
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
                        ]
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Country Risk Analysis',
                data: geoData.map(c => ({
                    country: c.country,
                    transactions: c.totalTransactions.toLocaleString(),
                    fraudCount: c.fraudCount.toLocaleString(),
                    fraudRate: c.fraudRate + '%',
                    blockedAmount: '$' + c.blockedAmount.toLocaleString()
                }))
            }
        ]
    };
}

// Generate behavioral patterns report
function generateBehavioralPatternsReport(transactions) {
    const patterns = fraudDatabase.behavioralPatterns;
    
    return {
        type: 'behavioral_patterns',
        title: 'Behavioral Patterns Analysis',
        period: 'Historical Analysis',
        summary: {
            totalPatterns: 12,
            highestRiskPattern: 'Extreme Transaction Velocity',
            avgFraudRate: 18.7,
            patternsAnalyzed: 4
        },
        charts: [
            {
                type: 'bar',
                title: 'Transaction Velocity Patterns',
                data: {
                    labels: Object.keys(patterns.transactionVelocity),
                    datasets: [{
                        label: 'Fraud Rate (%)',
                        data: Object.values(patterns.transactionVelocity).map(p => p.fraudRate),
                        backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336']
                    }]
                }
            },
            {
                type: 'bar',
                title: 'Amount Range Patterns',
                data: {
                    labels: Object.values(patterns.amountPatterns).map(p => p.range),
                    datasets: [{
                        label: 'Fraud Rate (%)',
                        data: Object.values(patterns.amountPatterns).map(p => p.fraudRate),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Risk Factor Analysis',
                data: fraudDatabase.riskFactorAnalysis.map(rf => ({
                    factor: rf.factor,
                    frequency: rf.frequency.toLocaleString(),
                    impact: rf.impact + '%',
                    prevention: rf.prevention + '%'
                }))
            }
        ]
    };
}

// Generate custom report
function generateCustomReport(transactions, startDate, endDate) {
    return {
        type: 'custom',
        title: 'Custom Analytics Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            totalTransactions: transactions.length,
            analysisDepth: 'Comprehensive',
            dataPoints: 15,
            insights: 8
        },
        charts: [
            {
                type: 'line',
                title: 'Hourly Fraud Distribution',
                data: generateHourlyFraudData(transactions)
            },
            {
                type: 'bar',
                title: 'Device Type Analysis',
                data: generateDeviceTypeData(transactions)
            }
        ],
        tables: [
            {
                title: 'Merchant Category Analysis',
                data: fraudDatabase.merchantAnalysis.map(m => ({
                    category: m.category,
                    transactions: m.totalTransactions.toLocaleString(),
                    fraudCount: m.fraudCount.toLocaleString(),
                    fraudRate: m.fraudRate + '%',
                    avgAmount: '$' + m.avgAmount.toLocaleString()
                }))
            }
        ]
    };
}

// Helper functions for report generation
function generateTransactionTypeFraudData(transactions) {
    const typeData = {};
    transactions.forEach(t => {
        if (!typeData[t.type]) {
            typeData[t.type] = { total: 0, fraud: 0 };
        }
        typeData[t.type].total++;
        if (t.isFraudulent) typeData[t.type].fraud++;
    });
    
    return {
        labels: Object.keys(typeData),
        datasets: [{
            label: 'Fraud Rate (%)',
            data: Object.values(typeData).map(d => (d.fraud / d.total) * 100),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        }]
    };
}

function generateDailyFraudTrends(transactions, startDate, endDate) {
    const dailyData = {};
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        dailyData[dateStr] = { total: 0, fraud: 0 };
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    transactions.forEach(t => {
        const dateStr = t.date.toISOString().split('T')[0];
        if (dailyData[dateStr]) {
            dailyData[dateStr].total++;
            if (t.isFraudulent) dailyData[dateStr].fraud++;
        }
    });
    
    return {
        labels: Object.keys(dailyData),
        datasets: [{
            label: 'Fraud Count',
            data: Object.values(dailyData).map(d => d.fraud),
            borderColor: '#F44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            tension: 0.4
        }]
    };
}

function generateTopRiskFactors(transactions) {
    const riskFactors = fraudDatabase.riskFactorAnalysis.slice(0, 5);
    return riskFactors.map(rf => ({
        factor: rf.factor,
        frequency: rf.frequency.toLocaleString(),
        impact: rf.impact + '%',
        prevention: rf.prevention + '%'
    }));
}

function generateGeographicFraudTable(transactions) {
    const geoData = fraudDatabase.geographicFraudData.slice(0, 5);
    return geoData.map(c => ({
        country: c.country,
        transactions: c.totalTransactions.toLocaleString(),
        fraudCount: c.fraudCount.toLocaleString(),
        fraudRate: c.fraudRate + '%'
    }));
}

function generateModelComparisonData() {
    const models = ['XGBoost', 'Random Forest', 'Neural Network', 'Isolation Forest', 'Logistic Regression'];
    return {
        labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'AUC-ROC'],
        datasets: models.map((model, index) => ({
            label: model,
            data: [95.2, 87.5, 82.3, 84.8, 92.1],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index] + '20'
        }))
    };
}

function generatePerformanceTrendsData(recentPerformance) {
    return {
        labels: recentPerformance.map(p => p.date.toLocaleDateString()),
        datasets: [{
            label: 'XGBoost Accuracy',
            data: recentPerformance.map(p => p.models.XGBoost.accuracy * 100),
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)'
        }]
    };
}

function generateDetailedModelMetrics() {
    return [
        { model: 'XGBoost', accuracy: '95.2%', precision: '87.5%', recall: '82.3%', f1Score: '84.8%', aucRoc: '92.1%' },
        { model: 'Random Forest', accuracy: '94.5%', precision: '85.2%', recall: '80.1%', f1Score: '82.6%', aucRoc: '91.3%' },
        { model: 'Neural Network', accuracy: '93.8%', precision: '83.9%', recall: '78.7%', f1Score: '81.2%', aucRoc: '90.5%' },
        { model: 'Isolation Forest', accuracy: '92.1%', precision: '81.4%', recall: '75.3%', f1Score: '78.2%', aucRoc: '89.7%' },
        { model: 'Logistic Regression', accuracy: '88.7%', precision: '76.2%', recall: '72.1%', f1Score: '74.1%', aucRoc: '86.9%' }
    ];
}

function generateHourlyFraudData(transactions) {
    const hourlyData = fraudDatabase.timePatterns;
    return {
        labels: hourlyData.map(h => h.hour + ':00'),
        datasets: [{
            label: 'Fraud Rate (%)',
            data: hourlyData.map(h => h.fraudRate),
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.4
        }]
    };
}

function generateDeviceTypeData(transactions) {
    const deviceData = fraudDatabase.deviceAnalysis;
    return {
        labels: deviceData.map(d => d.type),
        datasets: [{
            label: 'Fraud Rate (%)',
            data: deviceData.map(d => d.fraudRate),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    };
}

function handleExportReport(event) {
    try {
        showNotification('Exporting report...', 'info');
        // Generate and download report
        const reportData = {
            timestamp: new Date().toISOString(),
            filters: {
                alertType: document.getElementById('alertTypeFilter').value,
                timeRange: document.getElementById('timeRangeFilter').value,
                status: document.getElementById('statusFilter').value
            },
            alerts: filteredAlerts,
            statistics: {
                total: filteredAlerts.length,
                critical: filteredAlerts.filter(a => a.priority === 'critical').length,
                high: filteredAlerts.filter(a => a.priority === 'high').length,
                medium: filteredAlerts.filter(a => a.priority === 'medium').length,
                low: filteredAlerts.filter(a => a.priority === 'low').length
            }
        };
        
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fraud-alerts-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(() => {
            showNotification('Report exported successfully', 'success');
        }, 1500);
    } catch (error) {
        console.error('Error exporting report:', error);
        showNotification('Failed to export report', 'error');
    }
}

// Display comprehensive report
function displayReport(report) {
    const reportContent = document.getElementById('reportContent');
    
    reportContent.innerHTML = `
        <div class="report-container">
            <div class="report-header">
                <h2 class="report-title">${report.title}</h2>
                <div class="report-meta">
                    <span class="report-period">📅 ${report.period}</span>
                    <span class="report-type">📊 ${report.type.replace('_', ' ').toUpperCase()}</span>
                    <span class="report-timestamp">🕒 Generated: ${new Date().toLocaleString()}</span>
                </div>
            </div>
            
            <div class="report-summary">
                <h3>📈 Executive Summary</h3>
                <div class="summary-grid">
                    ${Object.entries(report.summary).map(([key, value]) => `
                        <div class="summary-item">
                            <span class="summary-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                            <span class="summary-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="report-charts">
                <h3>📊 Visual Analytics</h3>
                <div class="charts-grid">
                    ${report.charts.map((chart, index) => `
                        <div class="chart-container">
                            <h4 class="chart-title">${chart.title}</h4>
                            <div class="chart-wrapper">
                                <canvas id="reportChart${index}"></canvas>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="report-tables">
                <h3>📋 Detailed Data</h3>
                ${report.tables.map((table, index) => `
                    <div class="table-container">
                        <h4 class="table-title">${table.title}</h4>
                        <div class="table-wrapper">
                            <table class="report-table">
                                <thead>
                                    <tr>
                                        ${Object.keys(table.data[0] || {}).map(key => 
                                            `<th>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>`
                                        ).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${table.data.map(row => `
                                        <tr>
                                            ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="report-insights">
                <h3>💡 Key Insights</h3>
                <div class="insights-list">
                    ${generateReportInsights(report).map(insight => `
                        <div class="insight-item">
                            <span class="insight-icon">${insight.icon}</span>
                            <span class="insight-text">${insight.text}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="report-actions">
                <button class="btn btn--primary" onclick="exportReportData()">
                    <span class="btn-icon">📥</span>
                    Export Data
                </button>
                <button class="btn btn--secondary" onclick="printReport()">
                    <span class="btn-icon">🖨️</span>
                    Print Report
                </button>
                <button class="btn btn--outline" onclick="shareReport()">
                    <span class="btn-icon">📤</span>
                    Share Report
                </button>
            </div>
        </div>
    `;
    
    // Create charts after DOM is updated
    setTimeout(() => {
        report.charts.forEach((chart, index) => {
            createReportChart(`reportChart${index}`, chart);
        });
    }, 100);
}

// Create chart for report
function createReportChart(canvasId, chartConfig) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e0e0e0',
                    font: { size: 12 }
                }
            }
        },
        scales: chartConfig.type !== 'doughnut' && chartConfig.type !== 'pie' ? {
            x: {
                ticks: { color: '#a0a0a0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: { color: '#a0a0a0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        } : undefined
    };
    
    if (chartConfig.type === 'radar') {
        chartOptions.scales = {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: { color: '#a0a0a0' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: '#e0e0e0' }
            }
        };
    }
    
    new Chart(ctx, {
        type: chartConfig.type,
        data: chartConfig.data,
        options: chartOptions
    });
}

// Generate insights based on report data
function generateReportInsights(report) {
    const insights = [];
    
    switch (report.type) {
        case 'fraud_summary':
            insights.push(
                { icon: '🎯', text: `Fraud detection accuracy is ${report.summary.precision}% with ${report.summary.recall}% recall rate` },
                { icon: '💰', text: `Total fraudulent amount prevented: $${report.summary.fraudulentAmount}` },
                { icon: '📊', text: `Overall fraud rate of ${report.summary.fraudRate}% across ${report.summary.totalTransactions} transactions` },
                { icon: '⚡', text: `${report.summary.blockedTransactions} transactions successfully blocked` }
            );
            break;
        case 'model_performance':
            insights.push(
                { icon: '🏆', text: `${report.summary.bestModel} is the top-performing model with ${report.summary.avgAccuracy}% accuracy` },
                { icon: '📈', text: `Average F1-Score of ${report.summary.avgF1Score}% across all models` },
                { icon: '🔄', text: `${report.summary.activeModels} models are currently active and monitoring` },
                { icon: '🎯', text: `Model precision averaging ${report.summary.avgPrecision}%` }
            );
            break;
        case 'geographic_analysis':
            insights.push(
                { icon: '🌍', text: `${report.summary.totalCountries} countries analyzed with ${report.summary.avgFraudRate}% average fraud rate` },
                { icon: '🚨', text: `${report.summary.highestRiskCountry} shows the highest fraud risk` },
                { icon: '✅', text: `${report.summary.lowestRiskCountry} demonstrates the lowest fraud risk` },
                { icon: '💵', text: `Total blocked amount: $${report.summary.totalBlockedAmount}` }
            );
            break;
        case 'behavioral_patterns':
            insights.push(
                { icon: '🔍', text: `${report.summary.patternsAnalyzed} behavioral patterns analyzed` },
                { icon: '📊', text: `Average fraud rate across patterns: ${report.summary.avgFraudRate}%` },
                { icon: '⚠️', text: `${report.summary.highestRiskPattern} poses the highest risk` },
                { icon: '📈', text: `${report.summary.totalPatterns} total patterns identified` }
            );
            break;
        default:
            insights.push(
                { icon: '📊', text: 'Comprehensive analysis completed successfully' },
                { icon: '💡', text: 'Multiple data points analyzed for insights' },
                { icon: '🎯', text: 'Report generated with high accuracy' }
            );
    }
    
    return insights;
}

// Export report data
function exportReportData() {
    try {
        const reportData = {
            timestamp: new Date().toISOString(),
            type: 'fraud_detection_report',
            data: fraudDatabase
        };
        
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `fraud_report_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showNotification('Report data exported successfully', 'success');
    } catch (error) {
        console.error('Error exporting report:', error);
        showNotification('Failed to export report', 'error');
    }
}

// Print report
function printReport() {
    try {
        const reportContent = document.getElementById('reportContent');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Fraud Detection Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .report-container { max-width: 1200px; margin: 0 auto; }
                        .report-header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                        .report-title { color: #333; margin: 0; }
                        .report-meta { margin-top: 10px; color: #666; }
                        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
                        .summary-item { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
                        .summary-label { display: block; font-weight: bold; color: #333; }
                        .summary-value { display: block; font-size: 1.2em; color: #007bff; margin-top: 5px; }
                        .chart-container, .table-container { margin: 30px 0; }
                        .chart-title, .table-title { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                        .report-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        .report-table th, .report-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        .report-table th { background-color: #f5f5f5; font-weight: bold; }
                        .insights-list { margin: 20px 0; }
                        .insight-item { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #007bff; }
                        @media print { .report-actions { display: none; } }
                    </style>
                </head>
                <body>
                    ${reportContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        
        showNotification('Report sent to printer', 'success');
    } catch (error) {
        console.error('Error printing report:', error);
        showNotification('Failed to print report', 'error');
    }
}

// Share report
function shareReport() {
    try {
        if (navigator.share) {
            navigator.share({
                title: 'Fraud Detection Report',
                text: 'Comprehensive fraud detection analysis report',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            const reportText = `Fraud Detection Report - ${new Date().toLocaleDateString()}\n\nGenerated comprehensive analysis report with detailed insights and visualizations.`;
            navigator.clipboard.writeText(reportText);
            showNotification('Report link copied to clipboard', 'success');
        }
    } catch (error) {
        console.error('Error sharing report:', error);
        showNotification('Failed to share report', 'error');
    }
}

function handleTrainModel(event) {
    try {
        showNotification('Training new model...', 'info');
        const progressElement = document.getElementById('trainingProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressElement && progressFill && progressText) {
            progressElement.classList.remove('hidden');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    progressText.textContent = 'Training completed!';
                    setTimeout(() => {
                        progressElement.classList.add('hidden');
                        showNotification('Model training completed', 'success');
                    }, 1000);
                } else {
                    progressFill.style.width = progress + '%';
                    progressText.textContent = `Training in progress... ${Math.round(progress)}%`;
                }
            }, 200);
        }
    } catch (error) {
        console.error('Error training model:', error);
        showNotification('Failed to train model', 'error');
    }
}

function handleRetrainModel(event) {
    try {
        showNotification('Retraining existing model...', 'info');
        // Simulate model retraining
        const progressBar = document.querySelector('.training-progress');
        const progressText = document.querySelector('.training-status');
        
        if (progressBar && progressText) {
            progressText.textContent = 'Retraining model...';
            progressBar.style.width = '0%';
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    progressText.textContent = 'Model retrained successfully';
                    showNotification('Model retrained successfully', 'success');
                } else {
                    progressText.textContent = `Retraining... ${Math.round(progress)}%`;
                }
                progressBar.style.width = `${progress}%`;
            }, 200);
        }
        setTimeout(() => {
            showNotification('Model retrained successfully', 'success');
        }, 3000);
    } catch (error) {
        console.error('Error retraining model:', error);
        showNotification('Failed to retrain model', 'error');
    }
}

function handleValidateModel(event) {
    try {
        showNotification('Validating model...', 'info');
        // Simulate model validation
        const validationResults = {
            accuracy: 94.2,
            precision: 91.8,
            recall: 89.5,
            f1Score: 90.6,
            auc: 0.95
        };
        
        showNotification('Model validation completed', 'success');
        
        // Update validation metrics in UI if elements exist
        const accuracyEl = document.querySelector('[data-metric="accuracy"]');
        const precisionEl = document.querySelector('[data-metric="precision"]');
        const recallEl = document.querySelector('[data-metric="recall"]');
        const f1El = document.querySelector('[data-metric="f1"]');
        const aucEl = document.querySelector('[data-metric="auc"]');
        
        if (accuracyEl) accuracyEl.textContent = `${validationResults.accuracy}%`;
        if (precisionEl) precisionEl.textContent = `${validationResults.precision}%`;
        if (recallEl) recallEl.textContent = `${validationResults.recall}%`;
        if (f1El) f1El.textContent = `${validationResults.f1Score}%`;
        if (aucEl) aucEl.textContent = validationResults.auc;
        setTimeout(() => {
            showNotification('Model validation completed', 'success');
        }, 2000);
    } catch (error) {
        console.error('Error validating model:', error);
        showNotification('Failed to validate model', 'error');
    }
}

function handleSaveSettings(event) {
    try {
        const settings = {
            lowRiskThreshold: document.getElementById('lowRiskThreshold').value,
            mediumRiskThreshold: document.getElementById('mediumRiskThreshold').value,
            highRiskThreshold: document.getElementById('highRiskThreshold').value,
            emailAlerts: document.getElementById('emailAlerts').checked,
            smsAlerts: document.getElementById('smsAlerts').checked,
            pushNotifications: document.getElementById('pushNotifications').checked,
            enableEncryption: document.getElementById('enableEncryption').checked,
            enableAuditTrail: document.getElementById('enableAuditTrail').checked,
            enableBiometricAuth: document.getElementById('enableBiometricAuth').checked
        };
        
        // Save to localStorage
        localStorage.setItem('fraudDetectionSettings', JSON.stringify(settings));
        showNotification('Settings saved successfully', 'success');
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('Failed to save settings', 'error');
    }
}

function handleResetSettings(event) {
    try {
        // Reset to default values
        document.getElementById('lowRiskThreshold').value = 30;
        document.getElementById('mediumRiskThreshold').value = 60;
        document.getElementById('highRiskThreshold').value = 80;
        document.getElementById('emailAlerts').checked = true;
        document.getElementById('smsAlerts').checked = false;
        document.getElementById('pushNotifications').checked = true;
        document.getElementById('enableEncryption').checked = true;
        document.getElementById('enableAuditTrail').checked = true;
        document.getElementById('enableBiometricAuth').checked = false;
        
        showNotification('Settings reset to defaults', 'info');
    } catch (error) {
        console.error('Error resetting settings:', error);
        showNotification('Failed to reset settings', 'error');
    }
}

function handleBlockTransaction(event) {
    try {
        showNotification('Transaction blocked successfully', 'success');
        // Block transaction and log action
        const transactionId = document.querySelector('#transactionId')?.value || 'TXN-' + Date.now();
        const blockReason = 'Manual block by administrator';
        
        // Log the blocking action
        console.log(`Blocking transaction ${transactionId}: ${blockReason}`);
        
        // Update UI to show blocked status
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            const riskLevel = document.getElementById('riskLevel');
            if (riskLevel) {
                riskLevel.textContent = 'BLOCKED';
                riskLevel.className = 'risk-level blocked';
            }
        }
        
        // Add to blocked transactions counter
        const blockedCount = document.getElementById('blockedTransactions');
        if (blockedCount) {
            const currentCount = parseInt(blockedCount.textContent.replace(/,/g, '')) || 0;
            blockedCount.textContent = (currentCount + 1).toLocaleString();
        }
    } catch (error) {
        console.error('Error blocking transaction:', error);
        showNotification('Failed to block transaction', 'error');
    }
}

function handleRequestReview(event) {
    try {
        showNotification('Manual review requested', 'info');
        // Request manual review and log action
        const transactionId = document.querySelector('#transactionId')?.value || 'TXN-' + Date.now();
        const reviewReason = 'Manual review requested by administrator';
        
        // Log the review request
        console.log(`Requesting review for transaction ${transactionId}: ${reviewReason}`);
        
        // Update UI to show review status
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            const riskLevel = document.getElementById('riskLevel');
            if (riskLevel) {
                riskLevel.textContent = 'UNDER REVIEW';
                riskLevel.className = 'risk-level review';
            }
        }
        
        // Create review ticket
        const reviewTicket = {
            id: 'REVIEW-' + Date.now(),
            transactionId: transactionId,
            reason: reviewReason,
            timestamp: new Date().toISOString(),
            status: 'pending',
            assignedTo: 'Manual Review Team'
        };
        
        console.log('Review ticket created:', reviewTicket);
    } catch (error) {
        console.error('Error requesting review:', error);
        showNotification('Failed to request review', 'error');
    }
}

function handleApproveTransaction(event) {
    try {
        showNotification('Transaction approved', 'success');
        // Approve transaction and log action
        const transactionId = document.querySelector('#transactionId')?.value || 'TXN-' + Date.now();
        const approvalReason = 'Transaction approved by administrator';
        
        // Log the approval action
        console.log(`Approving transaction ${transactionId}: ${approvalReason}`);
        
        // Update UI to show approved status
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            const riskLevel = document.getElementById('riskLevel');
            if (riskLevel) {
                riskLevel.textContent = 'APPROVED';
                riskLevel.className = 'risk-level approved';
            }
        }
        
        // Update approved transactions counter
        const approvedCount = document.querySelector('[data-metric="approved"]');
        if (approvedCount) {
            const currentCount = parseInt(approvedCount.textContent.replace(/,/g, '')) || 0;
            approvedCount.textContent = (currentCount + 1).toLocaleString();
        }
        
        // Log approval event
        const approvalEvent = {
            transactionId: transactionId,
            action: 'APPROVED',
            timestamp: new Date().toISOString(),
            approvedBy: 'Administrator',
            reason: approvalReason
        };
        
        console.log('Transaction approved:', approvalEvent);
    } catch (error) {
        console.error('Error approving transaction:', error);
        showNotification('Failed to approve transaction', 'error');
    }
}

function handleLogout(event) {
    try {
        if (confirm('Are you sure you want to logout?')) {
            showNotification('Logged out successfully', 'info');
            // Clear session and redirect to login
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userSession');
            localStorage.removeItem('rememberMe');
            
            // Clear any cached data
            sessionStorage.clear();
            
            // Log logout event
            if (window.SecurityManager) {
                window.SecurityManager.logSecurityEvent('LOGOUT', {
                    timestamp: new Date().toISOString(),
                    reason: 'User initiated logout'
                });
            }
            
            // Show authentication modal
            showAuthenticationModal();
        }
    } catch (error) {
        console.error('Error during logout:', error);
        showNotification('Failed to logout', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    try {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Alert system functionality
function initializeAlerts() {
    try {
        // Initialize enhanced alerts system
        initializeAlertsSystem();
    } catch (error) {
        console.error('Error initializing alerts:', error);
        // Fallback to basic alerts
        populateAlerts();
        updateAlertStats();
    }
}

function populateAlerts() {
    try {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;
        
        const { alerts } = applicationData;
        alertsList.innerHTML = '';
        
        alerts.forEach(alert => {
            const alertElement = createAlertElement(alert);
            alertsList.appendChild(alertElement);
        });
        
        updateFilteredAlertsCount();
    } catch (error) {
        console.error('Error populating alerts:', error);
    }
}

function createAlertElement(alert) {
    try {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-item alert--${alert.priority}`;
        alertDiv.dataset.alertId = alert.id;
        
        const timeAgo = getTimeAgo(new Date(alert.timestamp));
        const statusClass = alert.status.replace('-', '');
        
        alertDiv.innerHTML = `
            <div class="alert-header">
                <div class="alert-priority priority--${alert.priority}">${alert.priority.toUpperCase()}</div>
                <div class="alert-time">${timeAgo}</div>
            </div>
            <div class="alert-content">
                <h4 class="alert-title">${alert.title}</h4>
                <p class="alert-description">${alert.description}</p>
                <div class="alert-meta">
                    <span class="alert-source">${alert.source}</span>
                    <span class="alert-status status--${statusClass}">${alert.status}</span>
                    ${alert.assignedTo ? `<span class="alert-assigned">Assigned to: ${alert.assignedTo}</span>` : ''}
                </div>
            </div>
            <div class="alert-actions">
                <button class="btn btn--sm btn--outline" onclick="viewAlertDetails(${alert.id})">View Details</button>
                ${alert.status === 'new' ? '<button class="btn btn--sm btn--primary" onclick="acknowledgeAlert(' + alert.id + ')">Acknowledge</button>' : ''}
            </div>
        `;
        
        return alertDiv;
    } catch (error) {
        console.error('Error creating alert element:', error);
        return document.createElement('div');
    }
}

function updateAlertStats() {
    try {
        const { alerts } = applicationData;
        
        const totalAlerts = alerts.length;
        const criticalAlerts = alerts.filter(a => a.priority === 'critical').length;
        const newAlerts = alerts.filter(a => a.status === 'new').length;
        const avgResponseTime = calculateAvgResponseTime(alerts);
        
        const totalAlertsEl = document.getElementById('totalAlerts');
        const criticalAlertsEl = document.getElementById('criticalAlerts');
        const newAlertsEl = document.getElementById('newAlerts');
        const avgResponseTimeEl = document.getElementById('alertAvgResponseTime');
        
        if (totalAlertsEl) totalAlertsEl.textContent = totalAlerts;
        if (criticalAlertsEl) criticalAlertsEl.textContent = criticalAlerts;
        if (newAlertsEl) newAlertsEl.textContent = newAlerts;
        if (avgResponseTimeEl) avgResponseTimeEl.textContent = avgResponseTime;
    } catch (error) {
        console.error('Error updating alert stats:', error);
    }
}

function calculateAvgResponseTime(alerts) {
    try {
        const alertsWithResponseTime = alerts.filter(a => a.responseTime);
        if (alertsWithResponseTime.length === 0) return '0m';
        
        const totalMinutes = alertsWithResponseTime.reduce((sum, alert) => {
            const minutes = parseInt(alert.responseTime.replace('m', ''));
            return sum + minutes;
        }, 0);
        
        const avgMinutes = Math.round(totalMinutes / alertsWithResponseTime.length);
        return `${avgMinutes}m`;
    } catch (error) {
        console.error('Error calculating avg response time:', error);
        return '0m';
    }
}

function getTimeAgo(date) {
    try {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch (error) {
        console.error('Error calculating time ago:', error);
        return 'Unknown';
    }
}

function updateFilteredAlertsCount() {
    try {
        const alertsList = document.getElementById('alertsList');
        const countElement = document.getElementById('filteredAlertsCount');
        
        if (alertsList && countElement) {
            const visibleAlerts = alertsList.querySelectorAll('.alert-item').length;
            countElement.textContent = `${visibleAlerts} alert${visibleAlerts !== 1 ? 's' : ''}`;
        }
    } catch (error) {
        console.error('Error updating filtered alerts count:', error);
    }
}

// Alert event handlers
function handleRefreshAlerts(event) {
    try {
        showNotification('Refreshing alerts...', 'info');
        populateAlerts();
        updateAlertStats();
        setTimeout(() => {
            showNotification('Alerts refreshed', 'success');
        }, 1000);
    } catch (error) {
        console.error('Error refreshing alerts:', error);
        showNotification('Failed to refresh alerts', 'error');
    }
}

function handleMarkAllRead(event) {
    try {
        const { alerts } = applicationData;
        alerts.forEach(alert => {
            if (alert.status === 'new') {
                alert.status = 'acknowledged';
            }
        });
        
        populateAlerts();
        updateAlertStats();
        showNotification('All alerts marked as read', 'success');
    } catch (error) {
        console.error('Error marking all alerts as read:', error);
        showNotification('Failed to mark all alerts as read', 'error');
    }
}

function handleExportAlerts(event) {
    try {
        showNotification('Exporting alerts...', 'info');
        // Export alerts data
        const exportData = {
            timestamp: new Date().toISOString(),
            totalAlerts: alertsData.length,
            alerts: alertsData.map(alert => ({
                id: alert.id,
                type: alert.type,
                title: alert.title,
                priority: alert.priority,
                status: alert.status,
                timestamp: alert.timestamp,
                source: alert.source
            }))
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `alerts-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(() => {
            showNotification('Alerts exported successfully', 'success');
        }, 1500);
    } catch (error) {
        console.error('Error exporting alerts:', error);
        showNotification('Failed to export alerts', 'error');
    }
}

function handleViewChange(event) {
    try {
        const viewType = event.target.dataset.view;
        const listViewBtn = document.getElementById('listView');
        const gridViewBtn = document.getElementById('gridView');
        const alertsList = document.getElementById('alertsList');
        
        if (listViewBtn && gridViewBtn && alertsList) {
            // Remove active class from all view buttons
            listViewBtn.classList.remove('active');
            gridViewBtn.classList.remove('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            // Update alerts list class
            alertsList.className = `alerts-list view--${viewType}`;
        }
    } catch (error) {
        console.error('Error changing view:', error);
    }
}

function viewAlertDetails(alertId) {
    try {
        const { alerts } = applicationData;
        const alert = alerts.find(a => a.id === alertId);
        
        if (!alert) {
            showNotification('Alert not found', 'error');
            return;
        }
        
        const modal = document.getElementById('alertModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = alert.title;
            modalBody.innerHTML = `
                <div class="alert-detail">
                    <div class="detail-row">
                        <strong>Description:</strong>
                        <p>${alert.description}</p>
                    </div>
                    <div class="detail-row">
                        <strong>Priority:</strong>
                        <span class="priority-badge priority--${alert.priority}">${alert.priority.toUpperCase()}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Status:</strong>
                        <span class="status-badge status--${alert.status.replace('-', '')}">${alert.status}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Source:</strong>
                        <span>${alert.source}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Timestamp:</strong>
                        <span>${new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    ${alert.assignedTo ? `
                    <div class="detail-row">
                        <strong>Assigned To:</strong>
                        <span>${alert.assignedTo}</span>
                    </div>
                    ` : ''}
                    ${alert.responseTime ? `
                    <div class="detail-row">
                        <strong>Response Time:</strong>
                        <span>${alert.responseTime}</span>
                    </div>
                    ` : ''}
                </div>
            `;
            
            modal.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error viewing alert details:', error);
        showNotification('Failed to load alert details', 'error');
    }
}

function closeAlertModal() {
    try {
        const modal = document.getElementById('alertModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

function handleAcknowledgeAlert(event) {
    try {
        const modal = document.getElementById('alertModal');
        const alertId = modal ? modal.dataset.currentAlertId : null;
        
        if (alertId) {
            const { alerts } = applicationData;
            const alert = alerts.find(a => a.id == alertId);
            if (alert) {
                alert.status = 'acknowledged';
                alert.assignedTo = 'Current User';
                alert.responseTime = '0m';
            }
        }
        
        populateAlerts();
        updateAlertStats();
        closeAlertModal();
        showNotification('Alert acknowledged', 'success');
    } catch (error) {
        console.error('Error acknowledging alert:', error);
        showNotification('Failed to acknowledge alert', 'error');
    }
}

function handleResolveAlert(event) {
    try {
        const modal = document.getElementById('alertModal');
        const alertId = modal ? modal.dataset.currentAlertId : null;
        
        if (alertId) {
            const { alerts } = applicationData;
            const alert = alerts.find(a => a.id == alertId);
            if (alert) {
                alert.status = 'resolved';
                alert.assignedTo = 'Current User';
                alert.responseTime = '5m';
            }
        }
        
        populateAlerts();
        updateAlertStats();
        closeAlertModal();
        showNotification('Alert resolved', 'success');
    } catch (error) {
        console.error('Error resolving alert:', error);
        showNotification('Failed to resolve alert', 'error');
    }
}

function handleEscalateAlert(event) {
    try {
        const modal = document.getElementById('alertModal');
        const alertId = modal ? modal.dataset.currentAlertId : null;
        
        if (alertId) {
            const { alerts } = applicationData;
            const alert = alerts.find(a => a.id == alertId);
            if (alert) {
                alert.status = 'escalated';
                alert.assignedTo = 'Management Team';
                alert.responseTime = '2m';
            }
        }
        
        populateAlerts();
        updateAlertStats();
        closeAlertModal();
        showNotification('Alert escalated', 'info');
    } catch (error) {
        console.error('Error escalating alert:', error);
        showNotification('Failed to escalate alert', 'error');
    }
}

// Global functions for inline onclick handlers
window.viewAlertDetails = viewAlertDetails;
window.acknowledgeAlert = function(alertId) {
    try {
        const { alerts } = applicationData;
        const alert = alerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = 'acknowledged';
            alert.assignedTo = 'Current User';
            alert.responseTime = '0m';
        }
        
        populateAlerts();
        updateAlertStats();
        showNotification('Alert acknowledged', 'success');
    } catch (error) {
        console.error('Error acknowledging alert:', error);
        showNotification('Failed to acknowledge alert', 'error');
    }
};

// Real-time Activity Functions (variables declared earlier)

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Initialize the feeds
    updateLiveTransactions();
    updateSystemAlerts();
    
    setInterval(() => {
        // Update fraud stats with small random variations
        const fraudStats = applicationData.fraudStats;
        const variation = Math.random() * 0.02 - 0.01; // ±1% variation
        
        const newFraudRate = Math.max(0, fraudStats.fraudRate + variation);
        document.getElementById('fraudRate').textContent = newFraudRate.toFixed(1) + '%';
        
        const newAccuracy = Math.min(100, Math.max(90, fraudStats.accuracyRate + variation));
        document.getElementById('accuracyRate').textContent = newAccuracy.toFixed(1) + '%';
        
        // Update live transactions
        updateLiveTransactions();
        
        // Update system alerts
        updateSystemAlerts();
    }, 5000); // Update every 5 seconds
}

// Update live transactions feed
function updateLiveTransactions() {
    const feed = document.getElementById('liveTransactions');
    if (!feed) return;
    
    // Add new transaction occasionally
    if (Math.random() < 0.3) { // 30% chance to add new transaction
        const newTransaction = generateRandomTransaction();
        liveTransactions.unshift(newTransaction);
        if (liveTransactions.length > 10) {
            liveTransactions.pop(); // Keep only last 10
        }
    }
    
    // Update the display
    feed.innerHTML = '';
    liveTransactions.forEach(txn => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const riskClass = txn.risk.toLowerCase();
        const statusClass = txn.status.toLowerCase();
        
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-weight: bold; color: var(--color-primary);">${txn.id}</span>
                <span style="font-size: 11px; color: var(--color-text-secondary);">${txn.time}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>$${txn.amount.toLocaleString()} - ${txn.type}</span>
                <div style="display: flex; gap: 8px;">
                    <span class="status status--${riskClass === 'high' ? 'error' : riskClass === 'medium' ? 'warning' : 'success'}" style="font-size: 10px; padding: 2px 6px;">
                        ${txn.risk}
                    </span>
                    <span class="status status--${statusClass === 'blocked' ? 'error' : statusClass === 'pending' ? 'warning' : 'success'}" style="font-size: 10px; padding: 2px 6px;">
                        ${txn.status}
                    </span>
                </div>
            </div>
        `;
        feed.appendChild(item);
    });
}

// Update system alerts feed
function updateSystemAlerts() {
    const feed = document.getElementById('systemAlerts');
    if (!feed) return;
    
    // Add new alert occasionally
    if (Math.random() < 0.2) { // 20% chance to add new alert
        const newAlert = generateRandomAlert();
        systemAlerts.unshift(newAlert);
        if (systemAlerts.length > 8) {
            systemAlerts.pop(); // Keep only last 8
        }
    }
    
    // Update the display
    feed.innerHTML = '';
    systemAlerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = 'alert-item';
        
        const alertTypeClass = alert.type.toLowerCase().replace('_', '-');
        const statusClass = alert.status.toLowerCase();
        
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-weight: bold; color: var(--color-primary);">${alert.id}</span>
                <span style="font-size: 11px; color: var(--color-text-secondary);">${alert.time}</span>
            </div>
            <div style="margin-bottom: 4px; font-size: 12px;">
                ${alert.message}
            </div>
            <div style="display: flex; gap: 8px;">
                <span class="status status--${alertTypeClass === 'high-risk' ? 'error' : alertTypeClass === 'security' ? 'warning' : 'info'}" style="font-size: 10px; padding: 2px 6px;">
                    ${alert.type.replace('_', ' ')}
                </span>
                <span class="status status--${statusClass === 'new' ? 'warning' : statusClass === 'acknowledged' ? 'info' : 'success'}" style="font-size: 10px; padding: 2px 6px;">
                    ${alert.status}
                </span>
            </div>
        `;
        feed.appendChild(item);
    });
}

// Generate random transaction
function generateRandomTransaction() {
    const types = ['PAYMENT', 'TRANSFER', 'CASH_OUT', 'CASH_IN', 'DEBIT'];
    const statuses = ['APPROVED', 'PENDING', 'BLOCKED'];
    const risks = ['LOW', 'MEDIUM', 'HIGH'];
    
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    
    return {
        id: 'TXN' + String(Math.floor(Math.random() * 10000)).padStart(3, '0'),
        amount: Math.floor(Math.random() * 20000) + 50,
        type: types[Math.floor(Math.random() * types.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        time: time,
        risk: risks[Math.floor(Math.random() * risks.length)]
    };
}

// Generate random alert
function generateRandomAlert() {
    const alertTypes = [
        { type: 'HIGH_RISK', message: 'High-risk transaction pattern detected' },
        { type: 'SYSTEM', message: 'System performance threshold exceeded' },
        { type: 'SECURITY', message: 'Suspicious activity detected' },
        { type: 'PERFORMANCE', message: 'Response time degradation detected' },
        { type: 'MODEL', message: 'ML model accuracy below threshold' }
    ];
    const statuses = ['NEW', 'ACKNOWLEDGED', 'RESOLVED'];
    
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    return {
        id: 'ALT' + String(Math.floor(Math.random() * 10000)).padStart(3, '0'),
        type: alertType.type,
        message: alertType.message,
        time: time,
        status: statuses[Math.floor(Math.random() * statuses.length)]
    };
}

// Start real-time updates
setTimeout(simulateRealTimeUpdates, 3000);

// ==================== ENHANCED REPORTS & ANALYTICS SYSTEM ====================

// Comprehensive Database Simulation
// fraudDatabase object removed (duplicate)

// Generate comprehensive historical transaction data
function generateHistoricalTransactions(days) {
    const transactions = [];
    const transactionTypes = ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT', 'CREDIT', 'REFUND'];
    const countries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN'];
    const deviceTypes = ['mobile', 'web', 'api', 'atm', 'pos'];
    const merchantCategories = ['retail', 'gas_station', 'restaurant', 'online_shopping', 'gambling', 'adult_services', 'healthcare', 'education'];
    
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate 50-200 transactions per day
        const dailyTransactions = Math.floor(Math.random() * 150) + 50;
        
        for (let j = 0; j < dailyTransactions; j++) {
            const hour = Math.floor(Math.random() * 24);
            const transactionDate = new Date(date);
            transactionDate.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
            
            const amount = Math.floor(Math.random() * 50000) + 10;
            const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
            const country = countries[Math.floor(Math.random() * countries.length)];
            const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
            const merchantCategory = merchantCategories[Math.floor(Math.random() * merchantCategories.length)];
            const accountAge = Math.floor(Math.random() * 3650) + 1; // 1 day to 10 years
            
            // Calculate fraud probability based on various factors
            let fraudProbability = 0;
            
            // Base fraud rates by transaction type
            const typeFraudRates = {
                'CASH_OUT': 0.35, 'TRANSFER': 0.28, 'PAYMENT': 0.12,
                'CASH_IN': 0.08, 'DEBIT': 0.15, 'CREDIT': 0.02, 'REFUND': 0.05
            };
            fraudProbability += typeFraudRates[transactionType] || 0.1;
            
            // Country risk adjustment
            const countryRiskRates = {
                'US': 0.14, 'UK': 0.18, 'CA': 0.16, 'AU': 0.19, 'DE': 0.22,
                'FR': 0.25, 'IT': 0.28, 'ES': 0.30, 'JP': 0.12, 'CN': 0.35
            };
            fraudProbability += (countryRiskRates[country] || 0.2) * 0.3;
            
            // Device type risk
            const deviceRiskRates = {
                'mobile': 0.15, 'web': 0.17, 'api': 0.24, 'atm': 0.03, 'pos': 0.02
            };
            fraudProbability += (deviceRiskRates[deviceType] || 0.1) * 0.2;
            
            // Account age risk
            if (accountAge < 7) fraudProbability += 0.25;
            else if (accountAge < 30) fraudProbability += 0.15;
            else if (accountAge < 90) fraudProbability += 0.05;
            
            // Amount risk
            if (amount > 10000) fraudProbability += 0.15;
            else if (amount > 5000) fraudProbability += 0.10;
            else if (amount < 50) fraudProbability += 0.08;
            
            // Time-based risk
            if (hour >= 22 || hour <= 4) fraudProbability += 0.10;
            
            // Merchant category risk
            const merchantRiskRates = {
                'gambling': 0.30, 'adult_services': 0.25, 'online_shopping': 0.08,
                'retail': 0.05, 'gas_station': 0.03, 'restaurant': 0.02,
                'healthcare': 0.01, 'education': 0.01
            };
            fraudProbability += (merchantRiskRates[merchantCategory] || 0.05) * 0.2;
            
            // Determine if transaction is fraudulent
            const isFraudulent = Math.random() < Math.min(fraudProbability, 0.8);
            
            transactions.push({
                id: `TXN${String(transactions.length + 1).padStart(8, '0')}`,
                date: transactionDate,
                amount: amount,
                type: transactionType,
                country: country,
                deviceType: deviceType,
                merchantCategory: merchantCategory,
                accountAge: accountAge,
                hour: hour,
                isFraudulent: isFraudulent,
                fraudProbability: Math.round(fraudProbability * 100),
                originBalance: Math.floor(Math.random() * 100000) + amount,
                destBalance: Math.floor(Math.random() * 50000)
            });
        }
    }
    
    return transactions.sort((a, b) => b.date - a.date);
}

// Generate monthly fraud patterns
function generateMonthlyFraudPatterns() {
    const months = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 12; i++) {
        const monthData = {
            month: monthNames[i],
            totalTransactions: Math.floor(Math.random() * 5000) + 15000,
            fraudulentTransactions: Math.floor(Math.random() * 800) + 200,
            fraudRate: 0,
            blockedTransactions: 0,
            falsePositives: Math.floor(Math.random() * 50) + 10,
            falseNegatives: Math.floor(Math.random() * 30) + 5,
            avgResponseTime: Math.floor(Math.random() * 20) + 30,
            modelAccuracy: Math.random() * 0.1 + 0.9 // 90-100%
        };
        
        monthData.fraudRate = (monthData.fraudulentTransactions / monthData.totalTransactions) * 100;
        monthData.blockedTransactions = Math.floor(monthData.fraudulentTransactions * 0.85);
        months.push(monthData);
    }
    
    return months;
}

// Generate geographic fraud data
function generateGeographicFraudData() {
    return [
        { country: 'United States', code: 'US', totalTransactions: 45000, fraudCount: 6300, fraudRate: 14.0, blockedAmount: 12500000 },
        { country: 'United Kingdom', code: 'UK', totalTransactions: 32000, fraudCount: 5760, fraudRate: 18.0, blockedAmount: 8900000 },
        { country: 'Canada', code: 'CA', totalTransactions: 28000, fraudCount: 4480, fraudRate: 16.0, blockedAmount: 7200000 },
        { country: 'Australia', code: 'AU', totalTransactions: 25000, fraudCount: 4750, fraudRate: 19.0, blockedAmount: 6800000 },
        { country: 'Germany', code: 'DE', totalTransactions: 22000, fraudCount: 4840, fraudRate: 22.0, blockedAmount: 5900000 },
        { country: 'France', code: 'FR', totalTransactions: 20000, fraudCount: 5000, fraudRate: 25.0, blockedAmount: 5200000 },
        { country: 'Italy', code: 'IT', totalTransactions: 18000, fraudCount: 5040, fraudRate: 28.0, blockedAmount: 4800000 },
        { country: 'Spain', code: 'ES', totalTransactions: 16000, fraudCount: 4800, fraudRate: 30.0, blockedAmount: 4200000 },
        { country: 'Japan', code: 'JP', totalTransactions: 30000, fraudCount: 3600, fraudRate: 12.0, blockedAmount: 8500000 },
        { country: 'China', code: 'CN', totalTransactions: 15000, fraudCount: 5250, fraudRate: 35.0, blockedAmount: 3800000 }
    ];
}

// Generate model performance history
function generateModelPerformanceHistory() {
    const models = ['XGBoost', 'Random Forest', 'Neural Network', 'Isolation Forest', 'Logistic Regression'];
    const history = [];
    
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const dayData = {
            date: date,
            models: {}
        };
        
        models.forEach(model => {
            dayData.models[model] = {
                accuracy: Math.random() * 0.05 + 0.90, // 90-95%
                precision: Math.random() * 0.08 + 0.80, // 80-88%
                recall: Math.random() * 0.10 + 0.75, // 75-85%
                f1Score: Math.random() * 0.06 + 0.82, // 82-88%
                aucRoc: Math.random() * 0.04 + 0.90 // 90-94%
            };
        });
        
        history.push(dayData);
    }
    
    return history.reverse();
}

// Generate behavioral patterns
function generateBehavioralPatterns() {
    return {
        transactionVelocity: {
            low: { count: 45000, fraudRate: 8.5 },
            medium: { count: 32000, fraudRate: 15.2 },
            high: { count: 18000, fraudRate: 28.7 },
            extreme: { count: 5000, fraudRate: 45.3 }
        },
        amountPatterns: {
            micro: { range: '0-50', count: 25000, fraudRate: 12.5 },
            small: { range: '50-500', count: 35000, fraudRate: 10.8 },
            medium: { range: '500-2000', count: 28000, fraudRate: 15.2 },
            large: { range: '2000-10000', count: 15000, fraudRate: 22.8 },
            massive: { range: '10000+', count: 5000, fraudRate: 35.6 }
        },
        timePatterns: {
            businessHours: { count: 45000, fraudRate: 12.3 },
            evening: { count: 25000, fraudRate: 18.7 },
            night: { count: 15000, fraudRate: 28.9 },
            earlyMorning: { count: 10000, fraudRate: 32.1 }
        }
    };
}

// Generate risk factor analysis
function generateRiskFactorAnalysis() {
    return [
        { factor: 'High Transaction Amount', frequency: 12500, impact: 85.2, prevention: 78.3 },
        { factor: 'Unusual Hours (Night)', frequency: 8900, impact: 72.8, prevention: 65.4 },
        { factor: 'New Account (< 30 days)', frequency: 15600, impact: 91.5, prevention: 82.7 },
        { factor: 'Rapid Transactions', frequency: 11200, impact: 88.3, prevention: 75.9 },
        { factor: 'International Transaction', frequency: 9800, impact: 67.2, prevention: 71.8 },
        { factor: 'Balance Inconsistency', frequency: 7600, impact: 79.6, prevention: 69.2 },
        { factor: 'API Device Type', frequency: 5400, impact: 82.4, prevention: 73.1 },
        { factor: 'Risky Transaction Type', frequency: 13800, impact: 76.9, prevention: 68.5 }
    ];
}

// Generate time patterns
function generateTimePatterns() {
    const hourlyData = [];
    for (let hour = 0; hour < 24; hour++) {
        hourlyData.push({
            hour: hour,
            totalTransactions: Math.floor(Math.random() * 2000) + 500,
            fraudCount: Math.floor(Math.random() * 200) + 20,
            fraudRate: 0
        });
        hourlyData[hour].fraudRate = (hourlyData[hour].fraudCount / hourlyData[hour].totalTransactions) * 100;
    }
    return hourlyData;
}

// Generate merchant analysis
function generateMerchantAnalysis() {
    return [
        { category: 'Gambling', totalTransactions: 5000, fraudCount: 1500, fraudRate: 30.0, avgAmount: 2500 },
        { category: 'Adult Services', totalTransactions: 3000, fraudCount: 750, fraudRate: 25.0, avgAmount: 1800 },
        { category: 'Online Shopping', totalTransactions: 25000, fraudCount: 2000, fraudRate: 8.0, avgAmount: 450 },
        { category: 'Retail', totalTransactions: 35000, fraudCount: 1750, fraudRate: 5.0, avgAmount: 320 },
        { category: 'Gas Station', totalTransactions: 20000, fraudCount: 600, fraudRate: 3.0, avgAmount: 85 },
        { category: 'Restaurant', totalTransactions: 18000, fraudCount: 360, fraudRate: 2.0, avgAmount: 65 },
        { category: 'Healthcare', totalTransactions: 12000, fraudCount: 120, fraudRate: 1.0, avgAmount: 280 },
        { category: 'Education', totalTransactions: 8000, fraudCount: 80, fraudRate: 1.0, avgAmount: 1200 }
    ];
}

// Generate device analysis
function generateDeviceAnalysis() {
    return [
        { type: 'Mobile', totalTransactions: 45000, fraudCount: 6750, fraudRate: 15.0, avgAmount: 850 },
        { type: 'Web', totalTransactions: 35000, fraudCount: 5950, fraudRate: 17.0, avgAmount: 1200 },
        { type: 'API', totalTransactions: 15000, fraudCount: 3600, fraudRate: 24.0, avgAmount: 2500 },
        { type: 'ATM', totalTransactions: 20000, fraudCount: 600, fraudRate: 3.0, avgAmount: 450 },
        { type: 'POS Terminal', totalTransactions: 25000, fraudCount: 500, fraudRate: 2.0, avgAmount: 180 }
    ];
}

// Generate account age analysis
function generateAccountAgeAnalysis() {
    return [
        { ageRange: '0-7 days', totalAccounts: 5000, fraudCount: 2250, fraudRate: 45.0 },
        { ageRange: '8-30 days', totalAccounts: 8000, fraudCount: 2400, fraudRate: 30.0 },
        { ageRange: '31-90 days', totalAccounts: 12000, fraudCount: 1800, fraudRate: 15.0 },
        { ageRange: '91-365 days', totalAccounts: 25000, fraudCount: 2500, fraudRate: 10.0 },
        { ageRange: '1-2 years', totalAccounts: 30000, fraudCount: 1800, fraudRate: 6.0 },
        { ageRange: '2+ years', totalAccounts: 50000, fraudCount: 1500, fraudRate: 3.0 }
    ];
}

// User Management System Integration
function initializeUserManagementIntegration() {
    // Wait for UserManagementSystem to be available
    if (typeof window.UserManagementSystem !== 'undefined') {
        const userManagement = window.UserManagementSystem;
        
        // Integrate with authentication system
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const mfaCode = document.getElementById('mfaCode').value;
                
                try {
                    // Use UserManagementSystem for authentication
                    const result = userManagement.authenticateUser(username, password);
                    
                    if (result.success) {
                        // Hide auth modal
                        const authModal = document.getElementById('authModal');
                        if (authModal) {
                            authModal.classList.add('hidden');
                        }
                        
                        // Update UI with user info
                        updateUserInterface(result.user);
                        
                        // Show success notification
                        showNotification('Login successful!', 'success');
                        
                        // Log security event
                        if (window.SecurityManager) {
                            window.SecurityManager.logSecurityEvent('LOGIN_SUCCESS', {
                                username: username,
                                userId: result.user.id
                            });
                        }
                    } else {
                        showNotification(result.message || 'Login failed', 'error');
                        
                        // Log failed attempt
                        if (window.SecurityManager) {
                            window.SecurityManager.logSecurityEvent('LOGIN_FAILED', {
                                username: username,
                                reason: 'Invalid credentials'
                            });
                        }
                    }
                } catch (error) {
                    console.error('Authentication error:', error);
                    showNotification('Authentication failed', 'error');
                }
            });
        }
        
        // Integrate logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                userManagement.logout();
                
                // Show auth modal
                const authModal = document.getElementById('authModal');
                if (authModal) {
                    authModal.classList.remove('hidden');
                }
                
                showNotification('Logged out successfully', 'info');
            });
        }
        
        // Check permissions for various actions
        setupPermissionChecks();
        
        console.log('User Management System integrated successfully');
    } else {
        console.warn('UserManagementSystem not available, retrying...');
        setTimeout(initializeUserManagementIntegration, 1000);
    }
}

// Setup permission checks
function setupPermissionChecks() {
    const userManagement = window.UserManagementSystem;
    
    // Check permissions for security button
    const securityBtn = document.getElementById('securityBtn');
    if (securityBtn && !userManagement.hasPermission('system_settings')) {
        securityBtn.style.display = 'none';
    }
    
    // Check permissions for user management button
    const userManagementBtn = document.getElementById('userManagementBtn');
    if (userManagementBtn && !userManagement.hasPermission('manage_users')) {
        userManagementBtn.style.display = 'none';
    }
    
    // Check permissions for export functionality
    const exportButtons = document.querySelectorAll('[data-action="export"]');
    exportButtons.forEach(btn => {
        if (!userManagement.hasPermission('export_data')) {
            btn.style.display = 'none';
        }
    });
    
    // Check permissions for analytics
    const analyticsElements = document.querySelectorAll('.analytics-section');
    analyticsElements.forEach(element => {
        if (!userManagement.hasPermission('view_analytics')) {
            element.style.display = 'none';
        }
    });
}

// Update user interface with current user info
function updateUserInterface(user) {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    // Update user role indicator
    const userRoleElement = document.getElementById('userRole');
    if (userRoleElement) {
        const role = window.UserManagementSystem.roles.get(user.role);
        if (role) {
            userRoleElement.textContent = role.name;
            userRoleElement.style.color = role.color;
        }
    }
}

// Setup permission checks
function setupPermissionChecks() {
    try {
        const userManagement = window.UserManagementSystem;
        
        // Check permissions for security button
        const securityBtn = document.getElementById('securityBtn');
        if (securityBtn && !userManagement.hasPermission('system_settings')) {
            securityBtn.style.display = 'none';
        }
        
        // Check permissions for user management button
        const userManagementBtn = document.getElementById('userManagementBtn');
        if (userManagementBtn && !userManagement.hasPermission('manage_users')) {
            userManagementBtn.style.display = 'none';
        }
        
        // Check permissions for export functionality
        const exportButtons = document.querySelectorAll('[data-action="export"]');
        exportButtons.forEach(btn => {
            if (!userManagement.hasPermission('export_data')) {
                btn.style.display = 'none';
            }
        });
        
        // Check permissions for analytics
        const analyticsElements = document.querySelectorAll('.analytics-section');
        analyticsElements.forEach(element => {
            if (!userManagement.hasPermission('view_analytics')) {
                element.style.display = 'none';
            }
        });
        
        console.log('Permission checks setup completed');
    } catch (error) {
        console.error('Error setting up permission checks:', error);
    }
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to notification container
    let container = document.getElementById('notificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('notification--show');
    }, 100);
}

// Notification system (duplicate removed)

// Create interactive charts
function createCharts() {
    try {
        createTransactionChart();
        createHourlyChart();
        createGeographicChart();
        createModelChart();
    } catch (error) {
        console.error('Error creating charts:', error);
        showNotification('Failed to create charts', 'error');
    }
}

// Create transaction type fraud patterns chart
function createTransactionChart() {
    const ctx = document.getElementById('transactionChart').getContext('2d');
    const { transactionTypes } = applicationData;
    
    transactionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: transactionTypes.map(t => t.type),
            datasets: [{
                data: transactionTypes.map(t => t.fraudRate * 100),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                borderColor: '#00d4ff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Create hourly fraud distribution chart
function createHourlyChart() {
    const ctx = document.getElementById('hourlyChart').getContext('2d');
    const { hourlyFraud } = applicationData;
    
    hourlyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hourlyFraud.map(h => h.hour + ':00'),
            datasets: [{
                label: 'Fraud Count',
                data: hourlyFraud.map(h => h.fraudCount),
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a0a0a0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#a0a0a0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Create geographic fraud distribution chart
function createGeographicChart() {
    const ctx = document.getElementById('geographicChart').getContext('2d');
    const { countries } = applicationData;
    
    geographicChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countries.map(c => c.name),
            datasets: [{
                label: 'Fraud Rate (%)',
                data: countries.map(c => c.fraudRate * 100),
                backgroundColor: [
                    'rgba(31, 184, 205, 0.8)',
                    'rgba(255, 193, 133, 0.8)',
                    'rgba(180, 65, 60, 0.8)',
                    'rgba(236, 235, 213, 0.8)',
                    'rgba(93, 135, 143, 0.8)'
                ],
                borderColor: [
                    '#1FB8CD',
                    '#FFC185',
                    '#B4413C',
                    '#ECEBD5',
                    '#5D878F'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a0a0a0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#a0a0a0'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Initialize dashboard
function initializeDashboard() {
    try {
        const { fraudStats } = applicationData;
        
        // Update dashboard metrics
        const totalTransactionsEl = document.getElementById('totalTransactions');
        const fraudDetectedEl = document.getElementById('fraudDetected');
        const accuracyRateEl = document.getElementById('accuracyRate');
        const fraudRateEl = document.getElementById('fraudRate');
        
        if (totalTransactionsEl) totalTransactionsEl.textContent = fraudStats.totalTransactions.toLocaleString();
        if (fraudDetectedEl) fraudDetectedEl.textContent = fraudStats.fraudDetected.toLocaleString();
        if (accuracyRateEl) accuracyRateEl.textContent = fraudStats.accuracyRate + '%';
        if (fraudRateEl) fraudRateEl.textContent = fraudStats.fraudRate + '%';
        
        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showNotification('Failed to initialize dashboard', 'error');
    }
}

// Initialize charts system
function initializeCharts() {
    try {
        createCharts();
        console.log('Charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
        showNotification('Failed to initialize charts', 'error');
    }
}

// Initialize analytics system
function initializeAnalytics() {
    try {
        initializeAdvancedAnalytics();
        console.log('Analytics initialized successfully');
    } catch (error) {
        console.error('Error initializing analytics:', error);
        showNotification('Failed to initialize analytics', 'error');
    }
}

// Initialize user management integration
function initializeUserManagementIntegration() {
    try {
        // Wait for UserManagementSystem to be available
        if (typeof window.UserManagementSystem !== 'undefined') {
            const userManagement = window.UserManagementSystem;
            
            // Integrate with authentication system
            const authForm = document.getElementById('authForm');
            if (authForm) {
                authForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    const mfaCode = document.getElementById('mfaCode').value;
                    
                    try {
                        // Use UserManagementSystem for authentication
                        const result = userManagement.authenticateUser(username, password);
                        
                        if (result.success) {
                            // Hide auth modal
                            const authModal = document.getElementById('authModal');
                            if (authModal) {
                                authModal.classList.add('hidden');
                            }
                            
                            // Update UI with user info
                            updateUserInterface(result.user);
                            
                            // Show success notification
                            showNotification('Login successful!', 'success');
                            
                            // Log security event
                            if (window.SecurityManager) {
                                window.SecurityManager.logSecurityEvent('LOGIN_SUCCESS', {
                                    username: username,
                                    userId: result.user.id
                                });
                            }
                        } else {
                            showNotification(result.message || 'Login failed', 'error');
                            
                            // Log failed attempt
                            if (window.SecurityManager) {
                                window.SecurityManager.logSecurityEvent('LOGIN_FAILED', {
                                    username: username,
                                    reason: 'Invalid credentials'
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Authentication error:', error);
                        showNotification('Authentication failed', 'error');
                    }
                });
            }
            
            // Integrate logout functionality
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    userManagement.logout();
                    
                    // Show auth modal
                    const authModal = document.getElementById('authModal');
                    if (authModal) {
                        authModal.classList.remove('hidden');
                    }
                    
                    showNotification('Logged out successfully', 'info');
                });
            }
            
            // Check permissions for various actions
            setupPermissionChecks();
            
            console.log('User Management System integrated successfully');
        } else {
            console.warn('UserManagementSystem not available, retrying...');
            setTimeout(initializeUserManagementIntegration, 1000);
        }
    } catch (error) {
        console.error('Error initializing user management integration:', error);
        showNotification('Failed to initialize user management', 'error');
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Fraud Detection Dashboard...');
    
    // Initialize core systems
    initializeDashboard();
    initializeCharts();
    initializeRealTimeFeatures();
    initializeAnalytics();
    initializeUserManagementIntegration();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('FraudGuard AI Dashboard loaded successfully!', 'success');
    }, 1000);
    
    console.log('Fraud Detection Dashboard initialized successfully!');
});

// ==================== ENHANCED ML MODELS FUNCTIONALITY ====================

// Train a specific model
function trainModel(modelName) {
    try {
        showNotification(`Training ${modelName} model...`, 'info');
        
        const progressElement = document.getElementById('trainingProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressElement && progressFill && progressText) {
            progressElement.classList.remove('hidden');
            progressText.textContent = `Training ${modelName} model...`;
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 8 + 2; // 2-10% increments
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    progressFill.style.width = '100%';
                    progressText.textContent = `${modelName} training completed!`;
                    
                    setTimeout(() => {
                        progressElement.classList.add('hidden');
                        showNotification(`${modelName} model training completed successfully!`, 'success');
                        
                        // Update model performance
                        updateModelPerformance(modelName);
                        populateModelTable();
                    }, 1500);
                } else {
                    progressFill.style.width = progress + '%';
                    progressText.textContent = `Training ${modelName}... ${Math.round(progress)}%`;
                }
            }, 300);
        } else {
            showNotification(`${modelName} model training started`, 'info');
            setTimeout(() => {
                showNotification(`${modelName} model training completed`, 'success');
                updateModelPerformance(modelName);
                populateModelTable();
            }, 3000);
        }
    } catch (error) {
        console.error('Error training model:', error);
        showNotification('Failed to train model', 'error');
    }
}

// Validate a specific model
function validateModel(modelName) {
    try {
        showNotification(`Validating ${modelName} model...`, 'info');
        
        // Simulate validation process
        setTimeout(() => {
            const validationResults = generateValidationResults(modelName);
            showValidationResults(modelName, validationResults);
            showNotification(`${modelName} validation completed`, 'success');
        }, 2000);
    } catch (error) {
        console.error('Error validating model:', error);
        showNotification('Failed to validate model', 'error');
    }
}

// View model details
function viewModelDetails(modelName) {
    try {
        const model = applicationData.modelPerformance.find(m => m.name === modelName);
        if (!model) {
            showNotification('Model not found', 'error');
            return;
        }
        
        showModelDetailsModal(model);
    } catch (error) {
        console.error('Error viewing model details:', error);
        showNotification('Failed to load model details', 'error');
    }
}

// Update model performance after training
function updateModelPerformance(modelName) {
    const model = applicationData.modelPerformance.find(m => m.name === modelName);
    if (model) {
        // Simulate slight improvement in performance
        model.accuracy = Math.min(0.99, model.accuracy + (Math.random() * 0.02));
        model.precision = Math.min(0.99, model.precision + (Math.random() * 0.02));
        model.recall = Math.min(0.99, model.recall + (Math.random() * 0.02));
        model.f1Score = Math.min(0.99, model.f1Score + (Math.random() * 0.02));
        model.aucRoc = Math.min(0.99, model.aucRoc + (Math.random() * 0.02));
    }
}

// Generate validation results
function generateValidationResults(modelName) {
    return {
        accuracy: (Math.random() * 0.05 + 0.90).toFixed(3),
        precision: (Math.random() * 0.05 + 0.85).toFixed(3),
        recall: (Math.random() * 0.05 + 0.80).toFixed(3),
        f1Score: (Math.random() * 0.05 + 0.82).toFixed(3),
        aucRoc: (Math.random() * 0.05 + 0.90).toFixed(3),
        confusionMatrix: {
            truePositives: Math.floor(Math.random() * 1000) + 800,
            trueNegatives: Math.floor(Math.random() * 8000) + 7000,
            falsePositives: Math.floor(Math.random() * 100) + 50,
            falseNegatives: Math.floor(Math.random() * 200) + 100
        },
        recommendations: [
            'Model performance is within acceptable range',
            'Consider retraining with more recent data',
            'Monitor for performance degradation over time',
            'Evaluate feature importance for optimization'
        ]
    };
}

// Show validation results
function showValidationResults(modelName, results) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>${modelName} Validation Results</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="validation-summary">
                    <h4>Performance Metrics</h4>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <span class="metric-label">Accuracy</span>
                            <span class="metric-value">${(results.accuracy * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Precision</span>
                            <span class="metric-value">${(results.precision * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Recall</span>
                            <span class="metric-value">${(results.recall * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">F1-Score</span>
                            <span class="metric-value">${(results.f1Score * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">AUC-ROC</span>
                            <span class="metric-value">${(results.aucRoc * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="confusion-matrix">
                    <h4>Confusion Matrix</h4>
                    <div class="matrix-grid">
                        <div class="matrix-cell">
                            <span class="matrix-label">True Positives</span>
                            <span class="matrix-value">${results.confusionMatrix.truePositives}</span>
                        </div>
                        <div class="matrix-cell">
                            <span class="matrix-label">True Negatives</span>
                            <span class="matrix-value">${results.confusionMatrix.trueNegatives}</span>
                        </div>
                        <div class="matrix-cell">
                            <span class="matrix-label">False Positives</span>
                            <span class="matrix-value">${results.confusionMatrix.falsePositives}</span>
                        </div>
                        <div class="matrix-cell">
                            <span class="matrix-label">False Negatives</span>
                            <span class="matrix-value">${results.confusionMatrix.falseNegatives}</span>
                        </div>
                    </div>
                </div>
                
                <div class="recommendations">
                    <h4>Recommendations</h4>
                    <ul>
                        ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn--primary" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Show model details modal
function showModelDetailsModal(model) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>${model.name} Model Details</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="model-info">
                    <h4>Model Information</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Model Type</span>
                            <span class="info-value">${model.name}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Algorithm</span>
                            <span class="info-value">${getAlgorithmName(model.name)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Training Date</span>
                            <span class="info-value">${new Date().toLocaleDateString()}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Last Updated</span>
                            <span class="info-value">${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="performance-metrics">
                    <h4>Performance Metrics</h4>
                    <div class="metrics-list">
                        <div class="metric-row">
                            <span class="metric-name">Accuracy</span>
                            <div class="metric-bar">
                                <div class="metric-fill" style="width: ${model.accuracy * 100}%"></div>
                            </div>
                            <span class="metric-percentage">${(model.accuracy * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-name">Precision</span>
                            <div class="metric-bar">
                                <div class="metric-fill" style="width: ${model.precision * 100}%"></div>
                            </div>
                            <span class="metric-percentage">${(model.precision * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-name">Recall</span>
                            <div class="metric-bar">
                                <div class="metric-fill" style="width: ${model.recall * 100}%"></div>
                            </div>
                            <span class="metric-percentage">${(model.recall * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-name">F1-Score</span>
                            <div class="metric-bar">
                                <div class="metric-fill" style="width: ${model.f1Score * 100}%"></div>
                            </div>
                            <span class="metric-percentage">${(model.f1Score * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-name">AUC-ROC</span>
                            <div class="metric-bar">
                                <div class="metric-fill" style="width: ${model.aucRoc * 100}%"></div>
                            </div>
                            <span class="metric-percentage">${(model.aucRoc * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn--primary" onclick="trainModel('${model.name}')">Train Model</button>
                <button class="btn btn--secondary" onclick="validateModel('${model.name}')">Validate</button>
                <button class="btn btn--outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Get algorithm name for model
function getAlgorithmName(modelName) {
    const algorithms = {
        'XGBoost': 'Extreme Gradient Boosting',
        'Random Forest': 'Random Forest Ensemble',
        'Logistic Regression': 'Logistic Regression',
        'SVM': 'Support Vector Machine',
        'Neural Network': 'Deep Neural Network',
        'Isolation Forest': 'Isolation Forest Anomaly Detection'
    };
    return algorithms[modelName] || modelName;
}