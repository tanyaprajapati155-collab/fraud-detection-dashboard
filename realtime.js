// Real-time Features Module for Fraud Detection Dashboard
// Implements WebSocket connections, live transaction monitoring, and real-time data streaming

class RealTimeManager {
    constructor() {
        this.wsConnection = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.connectionStatus = 'disconnected';
        this.subscribers = new Map();
        this.dataBuffer = [];
        this.maxBufferSize = 1000;
        this.heartbeatInterval = null;
        this.lastHeartbeat = null;
        
        this.initializeRealTime();
    }

    // Initialize real-time features
    initializeRealTime() {
        this.setupWebSocketConnection();
        this.setupDataStreaming();
        this.setupLiveUpdates();
        this.setupConnectionMonitoring();
    }

    // Setup WebSocket connection
    setupWebSocketConnection() {
        try {
            // In production, replace with your WebSocket server URL
            const wsUrl = this.getWebSocketUrl();
            this.wsConnection = new WebSocket(wsUrl);
            
            this.wsConnection.onopen = (event) => {
                console.log('WebSocket connection established');
                this.connectionStatus = 'connected';
                this.reconnectAttempts = 0;
                this.startHeartbeat();
                this.notifySubscribers('connection', { status: 'connected', timestamp: new Date() });
                this.updateConnectionStatus();
            };

            this.wsConnection.onmessage = (event) => {
                this.handleWebSocketMessage(event);
            };

            this.wsConnection.onclose = (event) => {
                console.log('WebSocket connection closed');
                this.connectionStatus = 'disconnected';
                this.stopHeartbeat();
                this.notifySubscribers('connection', { status: 'disconnected', timestamp: new Date() });
                this.updateConnectionStatus();
                this.attemptReconnection();
            };

            this.wsConnection.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.connectionStatus = 'error';
                this.notifySubscribers('connection', { status: 'error', error: error, timestamp: new Date() });
                this.updateConnectionStatus();
            };

        } catch (error) {
            console.error('Failed to setup WebSocket connection:', error);
            this.setupMockConnection();
        }
    }

    // Get WebSocket URL
    getWebSocketUrl() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        return `${protocol}//${host}/ws/fraud-detection`;
    }

    // Setup mock connection for development
    setupMockConnection() {
        console.log('Setting up mock WebSocket connection for development');
        this.connectionStatus = 'mock';
        this.startMockDataStream();
        this.updateConnectionStatus();
    }

    // Start mock data stream
    startMockDataStream() {
        setInterval(() => {
            this.generateMockTransaction();
            this.generateMockAlert();
            this.generateMockMetrics();
        }, 2000); // Generate data every 2 seconds
    }

    // Generate mock transaction data
    generateMockTransaction() {
        const transactionTypes = ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT'];
        const countries = ['US', 'UK', 'CA', 'AU', 'DE'];
        const deviceTypes = ['mobile', 'web', 'api', 'atm', 'pos'];
        
        const transaction = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            type: 'transaction',
            data: {
                transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                amount: Math.floor(Math.random() * 10000) + 100,
                transactionType: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
                originBalance: Math.floor(Math.random() * 50000) + 1000,
                destBalance: Math.floor(Math.random() * 50000) + 1000,
                country: countries[Math.floor(Math.random() * countries.length)],
                deviceType: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
                hourOfDay: new Date().getHours(),
                accountAge: Math.floor(Math.random() * 365) + 1,
                fraudProbability: Math.random(),
                riskScore: Math.floor(Math.random() * 100),
                isFraud: Math.random() > 0.8 // 20% chance of fraud
            }
        };

        this.handleRealTimeData(transaction);
    }

    // Generate mock alert data
    generateMockAlert() {
        const alertTypes = ['critical', 'high', 'medium', 'low'];
        const alertCategories = ['fraud', 'security', 'system', 'performance'];
        
        if (Math.random() > 0.7) { // 30% chance of alert
            const alert = {
                id: this.generateId(),
                timestamp: new Date().toISOString(),
                type: 'alert',
                data: {
                    alertId: `ALERT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    alertType: alertTypes[Math.floor(Math.random() * alertTypes.length)],
                    category: alertCategories[Math.floor(Math.random() * alertCategories.length)],
                    title: this.generateAlertTitle(),
                    description: this.generateAlertDescription(),
                    severity: alertTypes[Math.floor(Math.random() * alertTypes.length)],
                    source: 'fraud-detection-system',
                    status: 'new',
                    assignedTo: null,
                    responseTime: null
                }
            };

            this.handleRealTimeData(alert);
        }
    }

    // Generate mock metrics data
    generateMockMetrics() {
        const metrics = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            type: 'metrics',
            data: {
                totalTransactions: Math.floor(Math.random() * 100) + 19500,
                fraudDetected: Math.floor(Math.random() * 50) + 3450,
                accuracyRate: (Math.random() * 5 + 92).toFixed(1),
                fraudRate: (Math.random() * 3 + 16).toFixed(1),
                avgResponseTime: Math.floor(Math.random() * 20) + 40,
                precisionRate: (Math.random() * 3 + 87).toFixed(1)
            }
        };

        this.handleRealTimeData(metrics);
    }

    // Generate alert title
    generateAlertTitle() {
        const titles = [
            'High-Risk Transaction Detected',
            'Suspicious Activity Pattern',
            'Multiple Failed Login Attempts',
            'Unusual Spending Behavior',
            'Geographic Anomaly Detected',
            'Device Fingerprint Mismatch',
            'Velocity Check Failed',
            'Account Takeover Attempt'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    // Generate alert description
    generateAlertDescription() {
        const descriptions = [
            'Transaction amount exceeds normal spending patterns',
            'Multiple transactions from different locations within short timeframe',
            'Account showing unusual activity compared to historical data',
            'Device characteristics inconsistent with user profile',
            'Transaction timing matches known fraud patterns',
            'Balance inconsistencies detected in transaction flow'
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    // Handle WebSocket messages
    handleWebSocketMessage(event) {
        try {
            const message = JSON.parse(event.data);
            this.handleRealTimeData(message);
        } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
        }
    }

    // Handle real-time data
    handleRealTimeData(data) {
        // Add to buffer
        this.dataBuffer.push(data);
        if (this.dataBuffer.length > this.maxBufferSize) {
            this.dataBuffer = this.dataBuffer.slice(-this.maxBufferSize);
        }

        // Notify subscribers
        this.notifySubscribers(data.type, data);

        // Update UI based on data type
        switch (data.type) {
            case 'transaction':
                this.updateTransactionFeed(data.data);
                break;
            case 'alert':
                this.updateAlertFeed(data.data);
                break;
            case 'metrics':
                this.updateMetrics(data.data);
                break;
            case 'connection':
                this.updateConnectionStatus();
                break;
        }
    }

    // Update transaction feed
    updateTransactionFeed(transactionData) {
        const feedContainer = document.getElementById('liveTransactions');
        if (!feedContainer) return;

        const transactionElement = this.createTransactionElement(transactionData);
        
        // Add to top of feed
        feedContainer.insertBefore(transactionElement, feedContainer.firstChild);
        
        // Keep only last 20 transactions
        const transactions = feedContainer.children;
        if (transactions.length > 20) {
            feedContainer.removeChild(transactions[transactions.length - 1]);
        }

        // Add animation
        transactionElement.style.animation = 'slideIn 0.3s ease-out';
    }

    // Create transaction element
    createTransactionElement(transactionData) {
        const element = document.createElement('div');
        element.className = 'activity-item transaction-item';
        
        const fraudClass = transactionData.isFraud ? 'fraud-detected' : 'legitimate';
        const riskColor = this.getRiskColor(transactionData.riskScore);
        
        element.innerHTML = `
            <div class="transaction-header">
                <span class="transaction-id">${transactionData.transactionId}</span>
                <span class="transaction-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="transaction-details">
                <div class="transaction-info">
                    <span class="transaction-type">${transactionData.transactionType}</span>
                    <span class="transaction-amount">$${transactionData.amount.toLocaleString()}</span>
                </div>
                <div class="transaction-meta">
                    <span class="transaction-country">${transactionData.country}</span>
                    <span class="transaction-device">${transactionData.deviceType}</span>
                </div>
                <div class="transaction-risk">
                    <span class="risk-score" style="color: ${riskColor}">
                        Risk: ${transactionData.riskScore}%
                    </span>
                    <span class="fraud-probability ${fraudClass}">
                        Fraud: ${(transactionData.fraudProbability * 100).toFixed(1)}%
                    </span>
                </div>
            </div>
        `;
        
        return element;
    }

    // Update alert feed
    updateAlertFeed(alertData) {
        const feedContainer = document.getElementById('systemAlerts');
        if (!feedContainer) return;

        const alertElement = this.createAlertElement(alertData);
        
        // Add to top of feed
        feedContainer.insertBefore(alertElement, feedContainer.firstChild);
        
        // Keep only last 15 alerts
        const alerts = feedContainer.children;
        if (alerts.length > 15) {
            feedContainer.removeChild(alerts[alerts.length - 1]);
        }

        // Add animation
        alertElement.style.animation = 'slideIn 0.3s ease-out';
        
        // Show notification for critical alerts
        if (alertData.severity === 'critical') {
            this.showRealTimeNotification(`Critical Alert: ${alertData.title}`, 'error');
        }
    }

    // Create alert element
    createAlertElement(alertData) {
        const element = document.createElement('div');
        element.className = `alert-item alert--${alertData.severity}`;
        
        element.innerHTML = `
            <div class="alert-header">
                <span class="alert-priority priority--${alertData.severity}">${alertData.severity.toUpperCase()}</span>
                <span class="alert-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="alert-content">
                <div class="alert-title">${alertData.title}</div>
                <div class="alert-description">${alertData.description}</div>
                <div class="alert-meta">
                    <span class="alert-source">${alertData.source}</span>
                    <span class="alert-status status--${alertData.status}">${alertData.status}</span>
                </div>
            </div>
        `;
        
        return element;
    }

    // Update metrics
    updateMetrics(metricsData) {
        // Update metric cards with animation
        const metrics = [
            { id: 'totalTransactions', value: metricsData.totalTransactions },
            { id: 'fraudDetected', value: metricsData.fraudDetected },
            { id: 'accuracyRate', value: metricsData.accuracyRate + '%' },
            { id: 'fraudRate', value: metricsData.fraudRate + '%' },
            { id: 'avgResponseTime', value: metricsData.avgResponseTime + 'ms' },
            { id: 'precisionRate', value: metricsData.precisionRate + '%' }
        ];

        metrics.forEach(metric => {
            const element = document.getElementById(metric.id);
            if (element) {
                // Add update animation
                element.style.transition = 'all 0.3s ease';
                element.style.transform = 'scale(1.05)';
                element.textContent = metric.value.toLocaleString();
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }

    // Get risk color based on score
    getRiskColor(riskScore) {
        if (riskScore >= 80) return 'var(--color-danger)';
        if (riskScore >= 60) return 'var(--color-warning)';
        if (riskScore >= 40) return 'var(--color-primary)';
        return 'var(--color-accent)';
    }

    // Update connection status
    updateConnectionStatus() {
        const statusElement = document.getElementById('systemStatus');
        const statusText = document.getElementById('statusText');
        
        if (statusElement && statusText) {
            switch (this.connectionStatus) {
                case 'connected':
                    statusElement.className = 'status-dot active';
                    statusText.textContent = 'System Online';
                    break;
                case 'disconnected':
                    statusElement.className = 'status-dot';
                    statusText.textContent = 'System Offline';
                    break;
                case 'error':
                    statusElement.className = 'status-dot error';
                    statusText.textContent = 'Connection Error';
                    break;
                case 'mock':
                    statusElement.className = 'status-dot mock';
                    statusText.textContent = 'Demo Mode';
                    break;
            }
        }
    }

    // Attempt reconnection
    attemptReconnection() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
            
            console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
            
            setTimeout(() => {
                this.setupWebSocketConnection();
            }, delay);
        } else {
            console.error('Max reconnection attempts reached');
            this.setupMockConnection();
        }
    }

    // Start heartbeat
    startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
                this.wsConnection.send(JSON.stringify({ type: 'ping' }));
                this.lastHeartbeat = Date.now();
            }
        }, 30000); // Send ping every 30 seconds
    }

    // Stop heartbeat
    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    // Setup data streaming
    setupDataStreaming() {
        // Stream transaction data
        this.subscribe('transaction', (data) => {
            this.updateTransactionCharts(data);
        });

        // Stream alert data
        this.subscribe('alert', (data) => {
            this.updateAlertCharts(data);
        });

        // Stream metrics data
        this.subscribe('metrics', (data) => {
            this.updateMetricsCharts(data);
        });
    }

    // Setup live updates
    setupLiveUpdates() {
        // Update charts every 5 seconds
        setInterval(() => {
            this.updateAllCharts();
        }, 5000);

        // Update activity feeds every 2 seconds
        setInterval(() => {
            this.updateActivityFeeds();
        }, 2000);
    }

    // Setup connection monitoring
    setupConnectionMonitoring() {
        // Monitor connection quality
        setInterval(() => {
            this.monitorConnectionQuality();
        }, 10000); // Check every 10 seconds
    }

    // Monitor connection quality
    monitorConnectionQuality() {
        if (this.lastHeartbeat) {
            const timeSinceLastHeartbeat = Date.now() - this.lastHeartbeat;
            if (timeSinceLastHeartbeat > 60000) { // More than 1 minute
                console.warn('Connection quality degraded');
                this.notifySubscribers('connection_quality', { 
                    status: 'degraded', 
                    latency: timeSinceLastHeartbeat 
                });
            }
        }
    }

    // Subscribe to data updates
    subscribe(type, callback) {
        if (!this.subscribers.has(type)) {
            this.subscribers.set(type, []);
        }
        this.subscribers.get(type).push(callback);
    }

    // Unsubscribe from data updates
    unsubscribe(type, callback) {
        if (this.subscribers.has(type)) {
            const callbacks = this.subscribers.get(type);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    // Notify subscribers
    notifySubscribers(type, data) {
        if (this.subscribers.has(type)) {
            this.subscribers.get(type).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Error in subscriber callback:', error);
                }
            });
        }
    }

    // Update transaction charts
    updateTransactionCharts(transactionData) {
        // Update transaction type chart
        if (window.transactionChart) {
            const chart = window.transactionChart;
            const data = chart.data;
            
            // Find the dataset for the transaction type
            const datasetIndex = data.labels.indexOf(transactionData.transactionType);
            if (datasetIndex !== -1) {
                data.datasets[0].data[datasetIndex]++;
                chart.update('none'); // Update without animation for performance
            }
        }
    }

    // Update alert charts
    updateAlertCharts(alertData) {
        // Update alert severity chart
        if (window.alertChart) {
            const chart = window.alertChart;
            const data = chart.data;
            
            // Find the dataset for the alert severity
            const datasetIndex = data.labels.indexOf(alertData.severity);
            if (datasetIndex !== -1) {
                data.datasets[0].data[datasetIndex]++;
                chart.update('none');
            }
        }
    }

    // Update metrics charts
    updateMetricsCharts(metricsData) {
        // Update performance metrics chart
        if (window.metricsChart) {
            const chart = window.metricsChart;
            const now = new Date();
            
            // Add new data point
            chart.data.labels.push(now.toLocaleTimeString());
            chart.data.datasets.forEach((dataset, index) => {
                const values = [
                    metricsData.totalTransactions,
                    metricsData.fraudDetected,
                    parseFloat(metricsData.accuracyRate),
                    parseFloat(metricsData.fraudRate),
                    metricsData.avgResponseTime,
                    parseFloat(metricsData.precisionRate)
                ];
                dataset.data.push(values[index]);
                
                // Keep only last 20 data points
                if (dataset.data.length > 20) {
                    dataset.data.shift();
                }
            });
            
            // Keep only last 20 labels
            if (chart.data.labels.length > 20) {
                chart.data.labels.shift();
            }
            
            chart.update('none');
        }
    }

    // Update all charts
    updateAllCharts() {
        // Update hourly fraud chart
        if (window.hourlyChart) {
            const hour = new Date().getHours();
            const chart = window.hourlyChart;
            chart.data.datasets[0].data[hour]++;
            chart.update('none');
        }

        // Update geographic chart
        if (window.geographicChart) {
            const chart = window.geographicChart;
            // Simulate geographic data updates
            chart.data.datasets[0].data = chart.data.datasets[0].data.map(value => 
                value + Math.floor(Math.random() * 3) - 1
            );
            chart.update('none');
        }
    }

    // Update activity feeds
    updateActivityFeeds() {
        // This is handled by the individual feed update methods
        // Called by the real-time data handlers
    }

    // Show real-time notification
    showRealTimeNotification(message, type = 'info') {
        // Use the existing notification system
        if (window.showNotification) {
            window.showNotification(message, type);
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Get connection status
    getConnectionStatus() {
        return {
            status: this.connectionStatus,
            reconnectAttempts: this.reconnectAttempts,
            lastHeartbeat: this.lastHeartbeat,
            bufferSize: this.dataBuffer.length
        };
    }

    // Get data buffer
    getDataBuffer(type = null) {
        if (type) {
            return this.dataBuffer.filter(item => item.type === type);
        }
        return this.dataBuffer;
    }

    // Clear data buffer
    clearDataBuffer() {
        this.dataBuffer = [];
    }

    // Export real-time data
    exportRealTimeData() {
        const data = {
            connectionStatus: this.getConnectionStatus(),
            dataBuffer: this.dataBuffer,
            exportTimestamp: new Date().toISOString()
        };
        
        return data;
    }

    // Disconnect
    disconnect() {
        if (this.wsConnection) {
            this.wsConnection.close();
        }
        this.stopHeartbeat();
        this.clearDataBuffer();
    }
}

// Initialize real-time manager
const realTimeManager = new RealTimeManager();

// Export for use in other modules
window.RealTimeManager = realTimeManager;
