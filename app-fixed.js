// Fraud Detection Dashboard - Fixed Version
// Simplified version without duplicates

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
    "countries": [
        { "code": "US", "name": "United States", "fraudRate": 0.14 },
        { "code": "UK", "name": "United Kingdom", "fraudRate": 0.18 },
        { "code": "CA", "name": "Canada", "fraudRate": 0.16 },
        { "code": "AU", "name": "Australia", "fraudRate": 0.19 },
        { "code": "DE", "name": "Germany", "fraudRate": 0.22 }
    ],
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
    ]
};

// Chart instances
let transactionChart, hourlyChart, geographicChart, modelChart;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initializing...');
    
    try {
        initializeDashboard();
        createCharts();
        setupEventListeners();
        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showNotification('Failed to initialize dashboard', 'error');
    }
});

// Initialize dashboard with stats
function initializeDashboard() {
    try {
        const { fraudStats } = applicationData;
        
        const totalTransactions = document.getElementById('totalTransactions');
        const fraudDetected = document.getElementById('fraudDetected');
        const accuracyRate = document.getElementById('accuracyRate');
        const fraudRate = document.getElementById('fraudRate');
        
        if (totalTransactions) totalTransactions.textContent = fraudStats.totalTransactions.toLocaleString();
        if (fraudDetected) fraudDetected.textContent = fraudStats.fraudDetected.toLocaleString();
        if (accuracyRate) accuracyRate.textContent = fraudStats.accuracyRate + '%';
        if (fraudRate) fraudRate.textContent = fraudStats.fraudRate + '%';
        
        console.log('Dashboard metrics initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard metrics:', error);
        showNotification('Failed to initialize dashboard metrics', 'error');
    }
}

// Create interactive charts
function createCharts() {
    try {
        console.log('Creating charts...');
        createTransactionChart();
        createHourlyChart();
        createGeographicChart();
        createModelChart();
        console.log('Charts created successfully');
    } catch (error) {
        console.error('Error creating charts:', error);
        showNotification('Failed to create charts', 'error');
    }
}

// Create transaction type fraud patterns chart
function createTransactionChart() {
    const ctx = document.getElementById('transactionChart');
    if (!ctx) {
        console.error('transactionChart canvas not found');
        showNotification('Transaction chart canvas not found', 'error');
        return;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        showNotification('Chart library not available', 'error');
        return;
    }
    
    const { transactionTypes } = applicationData;
    
    transactionChart = new Chart(ctx.getContext('2d'), {
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
    const ctx = document.getElementById('hourlyChart');
    if (!ctx) {
        console.error('hourlyChart canvas not found');
        showNotification('Hourly chart canvas not found', 'error');
        return;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        showNotification('Chart library not available', 'error');
        return;
    }
    
    const { hourlyFraud } = applicationData;
    
    hourlyChart = new Chart(ctx.getContext('2d'), {
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
    const ctx = document.getElementById('geographicChart');
    if (!ctx) {
        console.error('geographicChart canvas not found');
        showNotification('Geographic chart canvas not found', 'error');
        return;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        showNotification('Chart library not available', 'error');
        return;
    }
    
    const { countries } = applicationData;
    
    geographicChart = new Chart(ctx.getContext('2d'), {
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

// Create model performance comparison chart
function createModelChart() {
    const ctx = document.getElementById('modelChart');
    if (!ctx) {
        console.error('modelChart canvas not found');
        showNotification('Model chart canvas not found', 'error');
        return;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        showNotification('Chart library not available', 'error');
        return;
    }
    
    const { modelPerformance } = applicationData;
    
    modelChart = new Chart(ctx.getContext('2d'), {
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

// Setup event listeners
function setupEventListeners() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabSwitch);
    });
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => switchToTab('settings'));
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Report generation button
    const generateReportBtn = document.getElementById('generateReport');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', handleGenerateReport);
    }
    
    // Export report button
    const exportReportBtn = document.getElementById('exportReport');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', handleExportReport);
    }
    
    // ML Models functionality
    setupMLModelsEventListeners();
    
    // Transaction form submission
    const transactionForm = document.getElementById('transactionForm');
    if (transactionForm) {
        transactionForm.addEventListener('submit', handleTransactionSubmit);
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

// Simplified fraud risk analysis
function analyzeFraudRisk(data) {
    let riskScore = 0;
    let riskFactors = [];
    
    // Amount analysis
    if (data.amount > 10000) {
        riskScore += 30;
        riskFactors.push('High transaction amount');
    }
    
    // Time analysis
    if (data.hourOfDay >= 22 || data.hourOfDay <= 6) {
        riskScore += 20;
        riskFactors.push('Unusual transaction time');
    }
    
    // Account age analysis
    if (data.accountAge < 30) {
        riskScore += 25;
        riskFactors.push('New account');
    }
    
    // Device type analysis
    if (data.deviceType === 'api') {
        riskScore += 15;
        riskFactors.push('API device type');
    }
    
    // Transaction type analysis
    if (data.transactionType === 'CASH_OUT' || data.transactionType === 'TRANSFER') {
        riskScore += 20;
        riskFactors.push('High-risk transaction type');
    }
    
    // Balance analysis
    if (data.amount > data.originBalance * 0.8) {
        riskScore += 25;
        riskFactors.push('High percentage of account balance');
    }
    
    const probability = Math.min(95, Math.max(5, riskScore));
    const riskLevel = probability >= 70 ? 'High' : probability >= 40 ? 'Medium' : 'Low';
    
    return {
        probability: probability,
        riskLevel: riskLevel,
        riskFactors: riskFactors,
        confidence: Math.min(95, 60 + Math.random() * 30),
        analysisTime: new Date().toLocaleTimeString()
    };
}

// Display analysis results
function displayResults(analysis) {
    const resultsPanel = document.getElementById('resultsPanel');
    if (!resultsPanel) return;
    
    resultsPanel.classList.remove('hidden');
    
    // Update probability circle
    const probabilityValue = document.getElementById('probabilityValue');
    const probabilityCircle = document.getElementById('probabilityCircle');
    const riskLevel = document.getElementById('riskLevel');
    const riskScore = document.getElementById('riskScore');
    
    if (probabilityValue) probabilityValue.textContent = analysis.probability.toFixed(1) + '%';
    if (riskLevel) riskLevel.textContent = analysis.riskLevel + ' Risk';
    if (riskScore) riskScore.textContent = `Risk Score: ${analysis.probability.toFixed(1)}`;
    
    // Update risk factors
    const factorsList = document.getElementById('factorsList');
    if (factorsList) {
        factorsList.innerHTML = analysis.riskFactors.map(factor => 
            `<div class="risk-factor">⚠️ ${factor}</div>`
        ).join('');
    }
    
    // Update analysis time
    const analysisTime = document.getElementById('analysisTime');
    if (analysisTime) analysisTime.textContent = analysis.analysisTime;
    
    // Update model confidence
    const modelConfidence = document.getElementById('modelConfidence');
    if (modelConfidence) modelConfidence.textContent = `Confidence: ${analysis.confidence.toFixed(1)}%`;
    
    // Show notification
    showNotification(`Transaction analysis completed - ${analysis.riskLevel} risk detected`, 
                   analysis.riskLevel === 'High' ? 'error' : analysis.riskLevel === 'Medium' ? 'warning' : 'success');
}

// Handle tab switching
function handleTabSwitch(event) {
    const tabName = event.target.closest('.tab-btn').dataset.tab;
    switchToTab(tabName);
}

function switchToTab(tabName) {
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
}

// Handle logout
function handleLogout(event) {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logged out successfully', 'info');
        // In a real app, you would clear session data here
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

// Simulate real-time updates
setInterval(() => {
    try {
        // Update fraud stats with small random variations
        const fraudRate = document.getElementById('fraudRate');
        if (fraudRate && fraudRate.textContent) {
            const currentRate = parseFloat(fraudRate.textContent.replace('%', ''));
            if (!isNaN(currentRate)) {
                const variation = (Math.random() - 0.5) * 0.5; // ±0.25% variation
                const newRate = Math.max(0, Math.min(100, currentRate + variation));
                fraudRate.textContent = newRate.toFixed(1) + '%';
            }
        }
    } catch (error) {
        console.error('Error in real-time update:', error);
    }
}, 5000);

// Report generation functions
function handleGenerateReport(event) {
    try {
        showNotification('Generating comprehensive report...', 'info');
        
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;
        const reportType = document.getElementById('reportType').value;
        
        // Show loading animation
        const reportContent = document.getElementById('reportContent');
        if (reportContent) {
            reportContent.innerHTML = `
                <div class="report-loading">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Generating ${reportType.replace('_', ' ')} report...</div>
                </div>
            `;
        }
        
        // Simulate report generation delay
        setTimeout(() => {
            const report = generateComprehensiveReport(reportType, startDate, endDate);
            displayReport(report);
            showNotification('Report generated successfully', 'success');
        }, 2000);
        
    } catch (error) {
        console.error('Error generating report:', error);
        showNotification('Failed to generate report', 'error');
    }
}

// Export report function
function handleExportReport(event) {
    try {
        showNotification('Exporting report...', 'info');
        
        const reportContent = document.getElementById('reportContent');
        if (!reportContent) {
            showNotification('No report content to export', 'error');
            return;
        }
        
        // Get current report data
        const reportData = {
            timestamp: new Date().toISOString(),
            title: 'Fraud Detection Report',
            type: document.getElementById('reportType')?.value || 'fraud_summary',
            period: `${document.getElementById('reportStartDate')?.value || 'N/A'} to ${document.getElementById('reportEndDate')?.value || 'N/A'}`,
            content: reportContent.innerHTML,
            statistics: {
                totalTransactions: applicationData.fraudStats.totalTransactions,
                fraudDetected: applicationData.fraudStats.fraudDetected,
                fraudRate: applicationData.fraudStats.fraudRate,
                accuracyRate: applicationData.fraudStats.accuracyRate
            }
        };
        
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fraud-report-${new Date().toISOString().split('T')[0]}.json`;
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

// Generate comprehensive report based on type and date range
function generateComprehensiveReport(reportType, startDate, endDate) {
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    // Create sample data for reports
    const sampleTransactions = generateSampleTransactionData(start, end);
    
    switch (reportType) {
        case 'fraud_summary':
            return generateFraudSummaryReport(sampleTransactions, start, end);
        case 'model_performance':
            return generateModelPerformanceReport(start, end);
        case 'geographic_analysis':
            return generateGeographicAnalysisReport(sampleTransactions);
        case 'behavioral_patterns':
            return generateBehavioralPatternsReport(sampleTransactions);
        case 'custom':
            return generateCustomReport(sampleTransactions, start, end);
        default:
            return generateFraudSummaryReport(sampleTransactions, start, end);
    }
}

// Generate sample transaction data for reports
function generateSampleTransactionData(startDate, endDate) {
    const transactions = [];
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const transactionsPerDay = Math.floor(Math.random() * 50) + 20;
    
    for (let i = 0; i < daysDiff * transactionsPerDay; i++) {
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate - startDate));
        transactions.push({
            id: `TXN-${i + 1}`,
            date: randomDate,
            amount: Math.floor(Math.random() * 5000) + 10,
            type: ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT'][Math.floor(Math.random() * 5)],
            isFraud: Math.random() < 0.15, // 15% fraud rate
            country: ['US', 'UK', 'CA', 'AU', 'DE'][Math.floor(Math.random() * 5)],
            deviceType: ['mobile', 'web', 'api'][Math.floor(Math.random() * 3)]
        });
    }
    
    return transactions;
}

// Generate fraud summary report
function generateFraudSummaryReport(transactions, startDate, endDate) {
    const totalTransactions = transactions.length;
    const fraudTransactions = transactions.filter(t => t.isFraud);
    const fraudRate = (fraudTransactions.length / totalTransactions * 100).toFixed(2);
    
    return {
        type: 'fraud_summary',
        title: 'Fraud Summary Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            totalTransactions: totalTransactions.toLocaleString(),
            fraudTransactions: fraudTransactions.length.toLocaleString(),
            fraudRate: fraudRate + '%',
            avgTransactionAmount: '$' + Math.floor(transactions.reduce((sum, t) => sum + t.amount, 0) / totalTransactions).toLocaleString(),
            totalFraudAmount: '$' + fraudTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()
        },
        charts: [
            {
                type: 'doughnut',
                title: 'Transaction Types Distribution',
                data: {
                    labels: ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT'],
                    datasets: [{
                        data: ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT'].map(type => 
                            transactions.filter(t => t.type === type).length
                        ),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Fraud Analysis by Transaction Type',
                data: ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT'].map(type => {
                    const typeTransactions = transactions.filter(t => t.type === type);
                    const typeFraud = typeTransactions.filter(t => t.isFraud);
                    return {
                        type: type,
                        total: typeTransactions.length.toLocaleString(),
                        fraud: typeFraud.length.toLocaleString(),
                        fraudRate: (typeFraud.length / typeTransactions.length * 100).toFixed(2) + '%',
                        avgAmount: '$' + Math.floor(typeTransactions.reduce((sum, t) => sum + t.amount, 0) / typeTransactions.length).toLocaleString()
                    };
                })
            }
        ]
    };
}

// Generate model performance report
function generateModelPerformanceReport(startDate, endDate) {
    return {
        type: 'model_performance',
        title: 'Model Performance Report',
        period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        summary: {
            bestModel: 'XGBoost',
            avgAccuracy: '94.2%',
            avgPrecision: '87.5%',
            avgRecall: '82.3%',
            avgF1Score: '84.8%',
            totalModels: 4,
            activeModels: 4
        },
        charts: [
            {
                type: 'radar',
                title: 'Model Performance Comparison',
                data: {
                    labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'AUC-ROC'],
                    datasets: applicationData.modelPerformance.map((model, index) => ({
                        label: model.name,
                        data: [
                            model.accuracy * 100,
                            model.precision * 100,
                            model.recall * 100,
                            model.f1Score * 100,
                            model.aucRoc * 100
                        ],
                        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'][index] + '20'
                    }))
                }
            }
        ],
        tables: [
            {
                title: 'Detailed Model Metrics',
                data: applicationData.modelPerformance.map(model => ({
                    model: model.name,
                    accuracy: (model.accuracy * 100).toFixed(1) + '%',
                    precision: (model.precision * 100).toFixed(1) + '%',
                    recall: (model.recall * 100).toFixed(1) + '%',
                    f1Score: (model.f1Score * 100).toFixed(1) + '%',
                    aucRoc: (model.aucRoc * 100).toFixed(1) + '%'
                }))
            }
        ]
    };
}

// Generate geographic analysis report
function generateGeographicAnalysisReport(transactions) {
    const countryData = {};
    transactions.forEach(t => {
        if (!countryData[t.country]) {
            countryData[t.country] = { total: 0, fraud: 0 };
        }
        countryData[t.country].total++;
        if (t.isFraud) countryData[t.country].fraud++;
    });
    
    return {
        type: 'geographic_analysis',
        title: 'Geographic Analysis Report',
        period: 'Current Period',
        summary: {
            countriesAnalyzed: Object.keys(countryData).length,
            highestFraudRate: Object.entries(countryData).reduce((max, [country, data]) => 
                data.fraud / data.total > max.rate ? { country, rate: data.fraud / data.total } : max, 
                { country: 'N/A', rate: 0 }
            ).country,
            totalCountries: Object.keys(countryData).length
        },
        charts: [
            {
                type: 'bar',
                title: 'Fraud Rate by Country',
                data: {
                    labels: Object.keys(countryData),
                    datasets: [{
                        label: 'Fraud Rate (%)',
                        data: Object.values(countryData).map(data => (data.fraud / data.total * 100).toFixed(1)),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Country-wise Fraud Analysis',
                data: Object.entries(countryData).map(([country, data]) => ({
                    country: country,
                    totalTransactions: data.total.toLocaleString(),
                    fraudCount: data.fraud.toLocaleString(),
                    fraudRate: (data.fraud / data.total * 100).toFixed(2) + '%'
                }))
            }
        ]
    };
}

// Generate behavioral patterns report
function generateBehavioralPatternsReport(transactions) {
    const deviceData = {};
    transactions.forEach(t => {
        if (!deviceData[t.deviceType]) {
            deviceData[t.deviceType] = { total: 0, fraud: 0 };
        }
        deviceData[t.deviceType].total++;
        if (t.isFraud) deviceData[t.deviceType].fraud++;
    });
    
    return {
        type: 'behavioral_patterns',
        title: 'Behavioral Patterns Report',
        period: 'Current Period',
        summary: {
            deviceTypesAnalyzed: Object.keys(deviceData).length,
            mostRiskyDevice: Object.entries(deviceData).reduce((max, [device, data]) => 
                data.fraud / data.total > max.rate ? { device, rate: data.fraud / data.total } : max, 
                { device: 'N/A', rate: 0 }
            ).device,
            totalPatterns: Object.keys(deviceData).length
        },
        charts: [
            {
                type: 'pie',
                title: 'Device Type Distribution',
                data: {
                    labels: Object.keys(deviceData),
                    datasets: [{
                        data: Object.values(deviceData).map(data => data.total),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Device Type Fraud Analysis',
                data: Object.entries(deviceData).map(([device, data]) => ({
                    deviceType: device,
                    totalTransactions: data.total.toLocaleString(),
                    fraudCount: data.fraud.toLocaleString(),
                    fraudRate: (data.fraud / data.total * 100).toFixed(2) + '%'
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
            totalTransactions: transactions.length.toLocaleString(),
            analysisDepth: 'Comprehensive',
            dataPoints: 15,
            insights: 8
        },
        charts: [
            {
                type: 'line',
                title: 'Daily Transaction Volume',
                data: {
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                    datasets: [{
                        label: 'Transactions',
                        data: [45, 52, 38, 61, 47, 55, 43],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)'
                    }]
                }
            }
        ],
        tables: [
            {
                title: 'Transaction Summary',
                data: [
                    { metric: 'Total Transactions', value: transactions.length.toLocaleString() },
                    { metric: 'Fraud Transactions', value: transactions.filter(t => t.isFraud).length.toLocaleString() },
                    { metric: 'Average Amount', value: '$' + Math.floor(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toLocaleString() },
                    { metric: 'Analysis Period', value: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` }
                ]
            }
        ]
    };
}

// Display report in the UI
function displayReport(report) {
    const reportContent = document.getElementById('reportContent');
    if (!reportContent) {
        console.error('Report content container not found');
        return;
    }
    
    let html = `
        <div class="report-container">
            <div class="report-header">
                <h2 class="report-title">${report.title}</h2>
                <div class="report-meta">
                    <span class="report-period">${report.period}</span>
                    <span class="report-type">${report.type.replace('_', ' ').toUpperCase()}</span>
                </div>
            </div>
            
            <div class="report-summary">
                <h3>Summary</h3>
                <div class="summary-grid">
    `;
    
    // Add summary data
    Object.entries(report.summary).forEach(([key, value]) => {
        html += `
            <div class="summary-item">
                <span class="summary-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                <span class="summary-value">${value}</span>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
    `;
    
    // Add charts section
    if (report.charts && report.charts.length > 0) {
        html += `
            <div class="report-charts">
                <h3>Charts & Visualizations</h3>
        `;
        
        report.charts.forEach((chart, index) => {
            html += `
                <div class="chart-section">
                    <h4>${chart.title}</h4>
                    <div class="chart-placeholder">
                        <canvas id="reportChart${index}" width="400" height="200"></canvas>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    // Add tables section
    if (report.tables && report.tables.length > 0) {
        html += `
            <div class="report-tables">
                <h3>Data Tables</h3>
        `;
        
        report.tables.forEach(table => {
            html += `
                <div class="table-section">
                    <h4>${table.title}</h4>
                    <div class="table-container">
                        <table class="report-table">
                            <thead>
                                <tr>
            `;
            
            // Add table headers
            if (table.data.length > 0) {
                Object.keys(table.data[0]).forEach(key => {
                    html += `<th>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>`;
                });
            }
            
            html += `
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            // Add table rows
            table.data.forEach(row => {
                html += `<tr>`;
                Object.values(row).forEach(value => {
                    html += `<td>${value}</td>`;
                });
                html += `</tr>`;
            });
            
            html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    html += `
            <div class="report-footer">
                <div class="report-actions">
                    <button class="btn btn--primary" onclick="exportReport()">Export Report</button>
                    <button class="btn btn--secondary" onclick="printReport()">Print Report</button>
                </div>
                <div class="report-timestamp">
                    Generated on: ${new Date().toLocaleString()}
                </div>
            </div>
        </div>
    `;
    
    reportContent.innerHTML = html;
    
    // Create charts after DOM is updated
    setTimeout(() => {
        createReportCharts(report.charts);
    }, 100);
}

// Create charts for the report
function createReportCharts(charts) {
    if (!charts || typeof Chart === 'undefined') return;
    
    charts.forEach((chart, index) => {
        const ctx = document.getElementById(`reportChart${index}`);
        if (ctx) {
            new Chart(ctx.getContext('2d'), {
                type: chart.type,
                data: chart.data,
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
                    scales: chart.type === 'radar' ? {
                        r: {
                            ticks: { color: '#a0a0a0' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            pointLabels: { color: '#e0e0e0' }
                        }
                    } : {
                        x: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                        y: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
                    }
                }
            });
        }
    });
}

// Export report function
function exportReport() {
    showNotification('Report export functionality would be implemented here', 'info');
}

// Print report function
function printReport() {
    window.print();
}

// Alert simulation system
let alertsData = [];
let alertInterval;

// Initialize alerts data with some sample alerts
function initializeAlerts() {
    alertsData = [
        {
            id: 'ALT0001',
            type: 'critical',
            priority: 'p1',
            category: 'fraud',
            icon: '🚨',
            title: 'High-risk transaction pattern detected',
            description: 'Multiple transactions from unusual locations detected within 5 minutes',
            status: 'new',
            source: 'ML Model',
            timestamp: new Date(Date.now() - 300000), // 5 minutes ago
            severity: 95,
            affectedUsers: 1,
            responseTime: 0,
            tags: ['fraud', 'location', 'pattern'],
            actions: ['investigate', 'block', 'notify']
        },
        {
            id: 'ALT0002',
            type: 'high',
            priority: 'p2',
            category: 'security',
            icon: '⚠️',
            title: 'Suspicious login activity',
            description: 'Multiple failed login attempts from unknown IP address',
            status: 'acknowledged',
            source: 'Security System',
            timestamp: new Date(Date.now() - 600000), // 10 minutes ago
            severity: 78,
            affectedUsers: 1,
            responseTime: 120,
            tags: ['security', 'login', 'ip'],
            actions: ['investigate', 'block_ip']
        },
        {
            id: 'ALT0003',
            type: 'medium',
            priority: 'p3',
            category: 'performance',
            icon: '⚡',
            title: 'System performance threshold exceeded',
            description: 'Response time exceeded 2 seconds for 5 consecutive requests',
            status: 'resolved',
            source: 'Monitoring System',
            timestamp: new Date(Date.now() - 900000), // 15 minutes ago
            severity: 45,
            affectedUsers: 150,
            responseTime: 300,
            tags: ['performance', 'response_time'],
            actions: ['monitor', 'optimize']
        }
    ];
    
    updateAlertStatistics();
    renderAlerts();
}

// Generate alert description
function generateAlertDescription(category, details) {
    const descriptions = {
        fraud: 'Suspicious transaction pattern detected that matches known fraud indicators',
        security: 'Security anomaly identified requiring immediate attention',
        performance: 'System performance metrics exceeded acceptable thresholds',
        system: 'Automated system health check failed or returned unexpected results'
    };
    return descriptions[category] || 'System alert requiring attention';
}

// Generate alert tags
function generateAlertTags(category) {
    const tagMap = {
        fraud: ['fraud', 'transaction', 'pattern'],
        security: ['security', 'authentication', 'access'],
        performance: ['performance', 'response_time', 'throughput'],
        system: ['system', 'health', 'monitoring']
    };
    return tagMap[category] || ['system'];
}

// Generate alert actions
function generateAlertActions(type) {
    const actionMap = {
        critical: ['investigate', 'block', 'notify', 'escalate'],
        high: ['investigate', 'monitor', 'notify'],
        medium: ['monitor', 'optimize'],
        low: ['monitor']
    };
    return actionMap[type] || ['monitor'];
}

// Update alert statistics
function updateAlertStatistics() {
    const totalAlerts = alertsData.length;
    const criticalAlerts = alertsData.filter(alert => alert.type === 'critical').length;
    const newAlerts = alertsData.filter(alert => alert.status === 'new').length;
    const avgResponseTime = alertsData.length > 0 
        ? Math.round(alertsData.reduce((sum, alert) => sum + alert.responseTime, 0) / alertsData.length)
        : 0;

    // Update the statistics display using the correct element IDs
    const totalElement = document.getElementById('totalAlerts');
    const criticalElement = document.getElementById('criticalAlerts');
    const newElement = document.getElementById('newAlerts');
    const responseElement = document.getElementById('avgResponseTime');

    if (totalElement) totalElement.textContent = totalAlerts;
    if (criticalElement) criticalElement.textContent = criticalAlerts;
    if (newElement) newElement.textContent = newAlerts;
    if (responseElement) responseElement.textContent = `${avgResponseTime}m`;
}

// Render alerts in the alerts container
function renderAlerts() {
    const alertsContainer = document.getElementById('alertsList');
    if (!alertsContainer) return;

    alertsContainer.innerHTML = '';
    
    if (alertsData.length === 0) {
        alertsContainer.innerHTML = '<div class="no-alerts">No alerts found</div>';
        return;
    }

    alertsData.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item alert--${alert.type}`;
        alertElement.innerHTML = `
            <div class="alert-header">
                <span class="alert-icon">${alert.icon}</span>
                <span class="alert-id">${alert.id}</span>
                <span class="alert-time">${formatTime(alert.timestamp)}</span>
            </div>
            <div class="alert-content">
                <h4 class="alert-title">${alert.title}</h4>
                <p class="alert-description">${alert.description}</p>
                <div class="alert-meta">
                    <span class="alert-source">Source: ${alert.source}</span>
                    <span class="alert-severity">Severity: ${alert.severity}%</span>
                </div>
                <div class="alert-tags">
                    ${alert.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="alert-actions">
                    ${alert.actions.map(action => `<button class="action-btn">${action}</button>`).join('')}
                </div>
            </div>
        `;
        alertsContainer.appendChild(alertElement);
    });
    
    // Update the filtered alerts count
    const filteredCountElement = document.getElementById('filteredAlertsCount');
    if (filteredCountElement) {
        filteredCountElement.textContent = `${alertsData.length} alerts`;
    }
}

// Format time for display
function formatTime(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

// Start alert simulation
function startAlertSimulation() {
    // Clear any existing interval
    if (alertInterval) {
        clearInterval(alertInterval);
    }
    
    // Add a new alert every 10-15 seconds
    alertInterval = setInterval(() => {
        addRandomAlert();
    }, Math.random() * 5000 + 10000); // 10-15 seconds
}

// Add random alert
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
        'Automated health check failed',
        'Unusual transaction pattern detected',
        'Multiple failed authentication attempts',
        'Response time degradation detected',
        'System resource usage spike'
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
    updateAlertStatistics();
    renderAlerts();
    
    // Show notification for new critical alerts
    if (alertType.type === 'critical') {
        showNotification(`New critical alert: ${newAlert.title}`, 'error');
    } else if (alertType.type === 'high') {
        showNotification(`High priority alert: ${newAlert.title}`, 'warning');
    } else {
        showNotification(`New alert: ${newAlert.title}`, 'info');
    }
}

// View mode management
let currentViewMode = 'list';

// Initialize view mode functionality
function initializeViewMode() {
    const listViewBtn = document.getElementById('listView');
    const gridViewBtn = document.getElementById('gridView');
    
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => switchViewMode('list'));
    }
    
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => switchViewMode('grid'));
    }
}

// Switch between list and grid view
function switchViewMode(mode) {
    currentViewMode = mode;
    
    // Update button states
    const listViewBtn = document.getElementById('listView');
    const gridViewBtn = document.getElementById('gridView');
    
    if (listViewBtn && gridViewBtn) {
        listViewBtn.classList.toggle('active', mode === 'list');
        gridViewBtn.classList.toggle('active', mode === 'grid');
    }
    
    // Re-render alerts with new view mode
    renderAlerts();
}

// Render alerts in the alerts container
function renderAlerts() {
    const alertsContainer = document.getElementById('alertsList');
    if (!alertsContainer) return;

    alertsContainer.innerHTML = '';
    
    // Add view mode class to container
    alertsContainer.className = `alerts-list ${currentViewMode}-view`;
    
    if (alertsData.length === 0) {
        alertsContainer.innerHTML = '<div class="no-alerts">No alerts found</div>';
        return;
    }

    alertsData.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item alert--${alert.type}`;
        
        if (currentViewMode === 'grid') {
            alertElement.innerHTML = `
                <div class="alert-card">
                    <div class="alert-card-header">
                        <span class="alert-icon">${alert.icon}</span>
                        <span class="alert-id">${alert.id}</span>
                    </div>
                    <div class="alert-card-content">
                        <h4 class="alert-title">${alert.title}</h4>
                        <p class="alert-description">${alert.description}</p>
                        <div class="alert-card-meta">
                            <div class="alert-time">${formatTime(alert.timestamp)}</div>
                            <div class="alert-severity">${alert.severity}%</div>
                        </div>
                        <div class="alert-card-tags">
                            ${alert.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="alert-card-actions">
                            ${alert.actions.slice(0, 2).map(action => `<button class="action-btn">${action}</button>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else {
            alertElement.innerHTML = `
                <div class="alert-header">
                    <span class="alert-icon">${alert.icon}</span>
                    <span class="alert-id">${alert.id}</span>
                    <span class="alert-time">${formatTime(alert.timestamp)}</span>
                </div>
                <div class="alert-content">
                    <h4 class="alert-title">${alert.title}</h4>
                    <p class="alert-description">${alert.description}</p>
                    <div class="alert-meta">
                        <span class="alert-source">Source: ${alert.source}</span>
                        <span class="alert-severity">Severity: ${alert.severity}%</span>
                    </div>
                    <div class="alert-tags">
                        ${alert.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="alert-actions">
                        ${alert.actions.map(action => `<button class="action-btn">${action}</button>`).join('')}
                    </div>
                </div>
            `;
        }
        
        alertsContainer.appendChild(alertElement);
    });
    
    // Update the filtered alerts count
    const filteredCountElement = document.getElementById('filteredAlertsCount');
    if (filteredCountElement) {
        filteredCountElement.textContent = `${alertsData.length} alerts`;
    }
}

// Initialize alerts system when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize alerts after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeAlerts();
        initializeViewMode();
        startAlertSimulation();
    }, 2000);
});

// ML Models functionality
function setupMLModelsEventListeners() {
    // Train new model button
    const trainModelBtn = document.getElementById('trainModel');
    if (trainModelBtn) {
        trainModelBtn.addEventListener('click', handleTrainNewModel);
    }
    
    // Retrain existing model button
    const retrainModelBtn = document.getElementById('retrainModel');
    if (retrainModelBtn) {
        retrainModelBtn.addEventListener('click', handleRetrainModel);
    }
    
    // Validate model button
    const validateModelBtn = document.getElementById('validateModel');
    if (validateModelBtn) {
        validateModelBtn.addEventListener('click', handleValidateModel);
    }
}

// Initialize ML Models data when tab is switched to
function initializeMLModels() {
    populateModelTable();
}

// Populate the model performance table
function populateModelTable() {
    const tableBody = document.getElementById('modelTableBody');
    if (!tableBody) return;
    
    const { modelPerformance } = applicationData;
    
    tableBody.innerHTML = '';
    
    modelPerformance.forEach((model, index) => {
        const row = document.createElement('tr');
        row.className = 'model-row';
        
        // Determine status based on performance
        let status = 'Active';
        let statusClass = 'status-active';
        if (model.accuracy < 0.9) {
            status = 'Needs Training';
            statusClass = 'status-warning';
        } else if (model.accuracy < 0.85) {
            status = 'Inactive';
            statusClass = 'status-inactive';
        }
        
        row.innerHTML = `
            <td class="model-name">
                <div class="model-info">
                    <span class="model-icon">🤖</span>
                    <span class="model-title">${model.name}</span>
                </div>
            </td>
            <td class="metric-value">${(model.accuracy * 100).toFixed(1)}%</td>
            <td class="metric-value">${(model.precision * 100).toFixed(1)}%</td>
            <td class="metric-value">${(model.recall * 100).toFixed(1)}%</td>
            <td class="metric-value">${(model.f1Score * 100).toFixed(1)}%</td>
            <td class="metric-value">${(model.aucRoc * 100).toFixed(1)}%</td>
            <td class="model-status">
                <span class="status-badge ${statusClass}">${status}</span>
            </td>
            <td class="model-actions">
                <button class="btn btn--sm btn--outline" onclick="viewModelDetails('${model.name}')" title="View Details">
                    <span class="btn-icon">👁️</span>
                </button>
                <button class="btn btn--sm btn--outline" onclick="retrainSpecificModel('${model.name}')" title="Retrain">
                    <span class="btn-icon">🔄</span>
                </button>
                <button class="btn btn--sm btn--outline" onclick="deleteModel('${model.name}')" title="Delete">
                    <span class="btn-icon">🗑️</span>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Handle train new model
function handleTrainNewModel() {
    showNotification('Starting new model training...', 'info');
    
    // Show training progress
    const progressContainer = document.getElementById('trainingProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressContainer) {
        progressContainer.classList.remove('hidden');
    }
    
    // Simulate training progress
    let progress = 0;
    const trainingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progressText) {
            if (progress < 30) {
                progressText.textContent = 'Preparing data...';
            } else if (progress < 60) {
                progressText.textContent = 'Training model...';
            } else if (progress < 90) {
                progressText.textContent = 'Validating model...';
            } else {
                progressText.textContent = 'Finalizing...';
            }
        }
        
        if (progress >= 100) {
            clearInterval(trainingInterval);
            setTimeout(() => {
                if (progressContainer) {
                    progressContainer.classList.add('hidden');
                }
                showNotification('New model trained successfully!', 'success');
                
                // Add new model to the data
                const newModel = {
                    name: `Model_${Date.now()}`,
                    accuracy: 0.89 + Math.random() * 0.1,
                    precision: 0.75 + Math.random() * 0.2,
                    recall: 0.70 + Math.random() * 0.25,
                    f1Score: 0.72 + Math.random() * 0.2,
                    aucRoc: 0.85 + Math.random() * 0.15
                };
                
                applicationData.modelPerformance.push(newModel);
                populateModelTable();
                createModelChart(); // Refresh the chart
            }, 1000);
        }
    }, 200);
}

// Handle retrain existing model
function handleRetrainModel() {
    showNotification('Select a model to retrain from the table above', 'info');
}

// Handle validate model
function handleValidateModel() {
    showNotification('Running model validation...', 'info');
    
    // Simulate validation process
    setTimeout(() => {
        const validationResults = {
            'XGBoost': { accuracy: 0.952, status: 'Excellent' },
            'Random Forest': { accuracy: 0.945, status: 'Good' },
            'Logistic Regression': { accuracy: 0.887, status: 'Needs Improvement' },
            'SVM': { accuracy: 0.923, status: 'Good' }
        };
        
        let validationReport = 'Model Validation Results:\n\n';
        Object.entries(validationResults).forEach(([model, result]) => {
            validationReport += `${model}: ${(result.accuracy * 100).toFixed(1)}% - ${result.status}\n`;
        });
        
        showNotification('Model validation completed', 'success');
        alert(validationReport);
    }, 2000);
}

// View model details
function viewModelDetails(modelName) {
    const model = applicationData.modelPerformance.find(m => m.name === modelName);
    if (!model) return;
    
    const details = `
Model: ${model.name}
Accuracy: ${(model.accuracy * 100).toFixed(1)}%
Precision: ${(model.precision * 100).toFixed(1)}%
Recall: ${(model.recall * 100).toFixed(1)}%
F1-Score: ${(model.f1Score * 100).toFixed(1)}%
AUC-ROC: ${(model.aucRoc * 100).toFixed(1)}%

Last Trained: ${new Date().toLocaleDateString()}
Training Data: 50,000 transactions
Features: 25
Algorithm: ${model.name}
    `;
    
    alert(details);
}

// Retrain specific model
function retrainSpecificModel(modelName) {
    showNotification(`Retraining ${modelName}...`, 'info');
    
    // Show training progress
    const progressContainer = document.getElementById('trainingProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressContainer) {
        progressContainer.classList.remove('hidden');
    }
    
    // Simulate retraining progress
    let progress = 0;
    const retrainingInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progressText) {
            progressText.textContent = `Retraining ${modelName}...`;
        }
        
        if (progress >= 100) {
            clearInterval(retrainingInterval);
            setTimeout(() => {
                if (progressContainer) {
                    progressContainer.classList.add('hidden');
                }
                showNotification(`${modelName} retrained successfully!`, 'success');
                
                // Update model performance with slight improvements
                const model = applicationData.modelPerformance.find(m => m.name === modelName);
                if (model) {
                    model.accuracy = Math.min(0.99, model.accuracy + Math.random() * 0.05);
                    model.precision = Math.min(0.99, model.precision + Math.random() * 0.05);
                    model.recall = Math.min(0.99, model.recall + Math.random() * 0.05);
                    model.f1Score = Math.min(0.99, model.f1Score + Math.random() * 0.05);
                    model.aucRoc = Math.min(0.99, model.aucRoc + Math.random() * 0.05);
                }
                
                populateModelTable();
                createModelChart(); // Refresh the chart
            }, 1000);
        }
    }, 150);
}

// Delete model
function deleteModel(modelName) {
    if (confirm(`Are you sure you want to delete ${modelName}? This action cannot be undone.`)) {
        const modelIndex = applicationData.modelPerformance.findIndex(m => m.name === modelName);
        if (modelIndex > -1) {
            applicationData.modelPerformance.splice(modelIndex, 1);
            populateModelTable();
            createModelChart(); // Refresh the chart
            showNotification(`${modelName} deleted successfully`, 'success');
        }
    }
}

// Override the switchToTab function to initialize ML Models when tab is switched
const originalSwitchToTab = switchToTab;
switchToTab = function(tabName) {
    originalSwitchToTab(tabName);
    
    // Initialize ML Models when the tab is switched to
    if (tabName === 'ml-models') {
        setTimeout(() => {
            initializeMLModels();
        }, 100);
    }
};

console.log('Fraud Detection Dashboard - Fixed Version Loaded');
