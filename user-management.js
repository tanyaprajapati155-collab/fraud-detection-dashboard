// User Management System for Fraud Detection Dashboard
// Implements comprehensive user management with roles, permissions, and multi-user support

class UserManagementSystem {
    constructor() {
        this.users = new Map();
        this.roles = new Map();
        this.permissions = new Map();
        this.userActivity = [];
        this.currentUser = null;
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        
        this.initializeUserManagement();
    }

    // Initialize user management system
    initializeUserManagement() {
        this.setupDefaultRoles();
        this.setupDefaultPermissions();
        this.setupDefaultUsers();
        this.setupEventListeners();
        this.loadUserData();
        this.setupSessionManagement();
    }

    // Setup default roles
    setupDefaultRoles() {
        const defaultRoles = [
            {
                id: 'admin',
                name: 'Administrator',
                description: 'Full system access and user management',
                permissions: ['all'],
                color: '#dc3545',
                icon: '👑'
            },
            {
                id: 'analyst',
                name: 'Fraud Analyst',
                description: 'Fraud detection and analysis capabilities',
                permissions: ['view_dashboard', 'view_reports', 'manage_alerts', 'export_data'],
                color: '#007bff',
                icon: '🔍'
            },
            {
                id: 'manager',
                name: 'Manager',
                description: 'Team management and reporting access',
                permissions: ['view_dashboard', 'view_reports', 'manage_team', 'export_data'],
                color: '#28a745',
                icon: '👔'
            },
            {
                id: 'viewer',
                name: 'Viewer',
                description: 'Read-only access to dashboard and reports',
                permissions: ['view_dashboard', 'view_reports'],
                color: '#6c757d',
                icon: '👁️'
            }
        ];

        defaultRoles.forEach(role => {
            this.roles.set(role.id, role);
        });
    }

    // Setup default permissions
    setupDefaultPermissions() {
        const defaultPermissions = [
            { id: 'view_dashboard', name: 'View Dashboard', category: 'dashboard' },
            { id: 'view_reports', name: 'View Reports', category: 'reports' },
            { id: 'manage_alerts', name: 'Manage Alerts', category: 'alerts' },
            { id: 'manage_users', name: 'Manage Users', category: 'administration' },
            { id: 'manage_roles', name: 'Manage Roles', category: 'administration' },
            { id: 'export_data', name: 'Export Data', category: 'data' },
            { id: 'system_settings', name: 'System Settings', category: 'administration' },
            { id: 'manage_team', name: 'Manage Team', category: 'team' },
            { id: 'view_analytics', name: 'View Analytics', category: 'analytics' },
            { id: 'manage_models', name: 'Manage ML Models', category: 'analytics' }
        ];

        defaultPermissions.forEach(permission => {
            this.permissions.set(permission.id, permission);
        });
    }

    // Setup default users
    setupDefaultUsers() {
        const defaultUsers = [
            {
                id: 'admin-001',
                firstName: 'John',
                lastName: 'Admin',
                email: 'admin@fraudguard.ai',
                username: 'admin',
                password: 'admin123', // In production, this would be hashed
                role: 'admin',
                department: 'security',
                status: 'active',
                lastLogin: new Date().toISOString(),
                createdAt: new Date().toISOString(),
                permissions: ['all']
            },
            {
                id: 'analyst-001',
                firstName: 'Sarah',
                lastName: 'Analyst',
                email: 'sarah@fraudguard.ai',
                username: 'sarah.analyst',
                password: 'analyst123',
                role: 'analyst',
                department: 'risk',
                status: 'active',
                lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                permissions: ['view_dashboard', 'view_reports', 'manage_alerts', 'export_data']
            },
            {
                id: 'manager-001',
                firstName: 'Mike',
                lastName: 'Manager',
                email: 'mike@fraudguard.ai',
                username: 'mike.manager',
                password: 'manager123',
                role: 'manager',
                department: 'operations',
                status: 'active',
                lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                permissions: ['view_dashboard', 'view_reports', 'manage_team', 'export_data']
            },
            {
                id: 'viewer-001',
                firstName: 'Lisa',
                lastName: 'Viewer',
                email: 'lisa@fraudguard.ai',
                username: 'lisa.viewer',
                password: 'viewer123',
                role: 'viewer',
                department: 'compliance',
                status: 'inactive',
                lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                permissions: ['view_dashboard', 'view_reports']
            }
        ];

        defaultUsers.forEach(user => {
            this.users.set(user.id, user);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // User Management Modal
        const userManagementBtn = document.getElementById('userManagementBtn');
        const userManagementModal = document.getElementById('userManagementModal');
        const closeUserManagementModal = document.getElementById('closeUserManagementModal');

        if (userManagementBtn) {
            userManagementBtn.addEventListener('click', () => {
                this.openUserManagementModal();
            });
        }

        if (closeUserManagementModal) {
            closeUserManagementModal.addEventListener('click', () => {
                this.closeUserManagementModal();
            });
        }

        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Add User Button
        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => {
                this.openUserFormModal();
            });
        }

        // User Form
        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveUser();
            });
        }

        // User Search
        const userSearch = document.getElementById('userSearch');
        if (userSearch) {
            userSearch.addEventListener('input', (e) => {
                this.searchUsers(e.target.value);
            });
        }

        // Activity Filter
        const activityFilter = document.getElementById('activityFilter');
        if (activityFilter) {
            activityFilter.addEventListener('change', (e) => {
                this.filterActivityLog(e.target.value);
            });
        }
    }

    // Open user management modal
    openUserManagementModal() {
        const modal = document.getElementById('userManagementModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.loadUsersTable();
            this.loadRolesGrid();
            this.loadPermissionsMatrix();
            this.loadActivityLog();
        }
    }

    // Close user management modal
    closeUserManagementModal() {
        const modal = document.getElementById('userManagementModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Switch tabs
    switchTab(tabName) {
        // Update tab buttons
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update tab content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabName + 'Tab') {
                content.classList.add('active');
            }
        });
    }

    // Load users table
    loadUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.users.forEach(user => {
            const row = this.createUserTableRow(user);
            tbody.appendChild(row);
        });
    }

    // Create user table row
    createUserTableRow(user) {
        const row = document.createElement('tr');
        const role = this.roles.get(user.role);
        const statusClass = user.status === 'active' ? 'status-active' : 'status-inactive';
        
        row.innerHTML = `
            <td>
                <div class="user-info">
                    <div class="user-avatar">${user.firstName[0]}${user.lastName[0]}</div>
                    <div class="user-details">
                        <div class="user-name">${user.firstName} ${user.lastName}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="role-badge" style="background-color: ${role.color}">
                    ${role.icon} ${role.name}
                </span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${user.status}</span>
            </td>
            <td>
                <span class="last-login">${this.formatDate(user.lastLogin)}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn--sm btn--outline edit-user" data-user-id="${user.id}">
                        Edit
                    </button>
                    <button class="btn btn--sm btn--outline toggle-user-status" data-user-id="${user.id}">
                        ${user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button class="btn btn--sm btn--danger delete-user" data-user-id="${user.id}">
                        Delete
                    </button>
                </div>
            </td>
        `;

        // Add event listeners for action buttons
        const editBtn = row.querySelector('.edit-user');
        const toggleBtn = row.querySelector('.toggle-user-status');
        const deleteBtn = row.querySelector('.delete-user');

        editBtn.addEventListener('click', () => this.editUser(user.id));
        toggleBtn.addEventListener('click', () => this.toggleUserStatus(user.id));
        deleteBtn.addEventListener('click', () => this.deleteUser(user.id));

        return row;
    }

    // Load roles grid
    loadRolesGrid() {
        const grid = document.getElementById('rolesGrid');
        if (!grid) return;

        grid.innerHTML = '';

        this.roles.forEach(role => {
            const roleCard = this.createRoleCard(role);
            grid.appendChild(roleCard);
        });
    }

    // Create role card
    createRoleCard(role) {
        const card = document.createElement('div');
        card.className = 'role-card';
        
        const permissionCount = role.permissions.includes('all') ? 
            this.permissions.size : role.permissions.length;

        card.innerHTML = `
            <div class="role-header">
                <span class="role-icon" style="color: ${role.color}">${role.icon}</span>
                <h4 class="role-name">${role.name}</h4>
            </div>
            <div class="role-description">${role.description}</div>
            <div class="role-stats">
                <div class="stat">
                    <span class="stat-value">${permissionCount}</span>
                    <span class="stat-label">Permissions</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${this.getUsersByRole(role.id).length}</span>
                    <span class="stat-label">Users</span>
                </div>
            </div>
            <div class="role-actions">
                <button class="btn btn--sm btn--outline edit-role" data-role-id="${role.id}">
                    Edit
                </button>
                <button class="btn btn--sm btn--outline view-permissions" data-role-id="${role.id}">
                    Permissions
                </button>
            </div>
        `;

        // Add event listeners
        const editBtn = card.querySelector('.edit-role');
        const permissionsBtn = card.querySelector('.view-permissions');

        editBtn.addEventListener('click', () => this.editRole(role.id));
        permissionsBtn.addEventListener('click', () => this.viewRolePermissions(role.id));

        return card;
    }

    // Load permissions matrix
    loadPermissionsMatrix() {
        const matrix = document.getElementById('permissionsMatrix');
        if (!matrix) return;

        matrix.innerHTML = '';

        // Group permissions by category
        const categories = new Map();
        this.permissions.forEach(permission => {
            if (!categories.has(permission.category)) {
                categories.set(permission.category, []);
            }
            categories.get(permission.category).push(permission);
        });

        categories.forEach((permissions, category) => {
            const categorySection = document.createElement('div');
            categorySection.className = 'permission-category';
            
            categorySection.innerHTML = `
                <h4 class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <div class="permissions-grid">
                    ${permissions.map(permission => `
                        <div class="permission-item">
                            <span class="permission-name">${permission.name}</span>
                            <div class="role-permissions">
                                ${Array.from(this.roles.values()).map(role => `
                                    <label class="permission-checkbox">
                                        <input type="checkbox" 
                                               data-role="${role.id}" 
                                               data-permission="${permission.id}"
                                               ${role.permissions.includes('all') || role.permissions.includes(permission.id) ? 'checked' : ''}>
                                        <span class="checkmark"></span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            matrix.appendChild(categorySection);
        });
    }

    // Load activity log
    loadActivityLog() {
        const log = document.getElementById('userActivityLog');
        if (!log) return;

        log.innerHTML = '';

        const recentActivity = this.userActivity.slice(-50).reverse();

        recentActivity.forEach(activity => {
            const activityItem = this.createActivityItem(activity);
            log.appendChild(activityItem);
        });
    }

    // Create activity item
    createActivityItem(activity) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const user = this.users.get(activity.userId);
        const userInfo = user ? `${user.firstName} ${user.lastName}` : 'Unknown User';

        item.innerHTML = `
            <div class="activity-icon">${this.getActivityIcon(activity.type)}</div>
            <div class="activity-content">
                <div class="activity-description">${activity.description}</div>
                <div class="activity-meta">
                    <span class="activity-user">${userInfo}</span>
                    <span class="activity-time">${this.formatDate(activity.timestamp)}</span>
                </div>
            </div>
        `;

        return item;
    }

    // Get activity icon
    getActivityIcon(type) {
        const icons = {
            'user_created': '👤',
            'user_updated': '✏️',
            'user_deleted': '🗑️',
            'role_assigned': '🎭',
            'permission_changed': '🔐',
            'login': '👋',
            'logout': '🚪'
        };
        return icons[type] || '📝';
    }

    // Search users
    searchUsers(query) {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        const filteredUsers = Array.from(this.users.values()).filter(user => 
            user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user.username.toLowerCase().includes(query.toLowerCase())
        );

        tbody.innerHTML = '';
        filteredUsers.forEach(user => {
            const row = this.createUserTableRow(user);
            tbody.appendChild(row);
        });
    }

    // Filter activity log
    filterActivityLog(filter) {
        const log = document.getElementById('userActivityLog');
        if (!log) return;

        let filteredActivity = this.userActivity;

        if (filter !== 'all') {
            filteredActivity = this.userActivity.filter(activity => 
                activity.type.includes(filter)
            );
        }

        log.innerHTML = '';
        filteredActivity.slice(-50).reverse().forEach(activity => {
            const activityItem = this.createActivityItem(activity);
            log.appendChild(activityItem);
        });
    }

    // Open user form modal
    openUserFormModal(userId = null) {
        const modal = document.getElementById('userFormModal');
        const title = document.getElementById('userFormTitle');
        
        if (modal) {
            modal.classList.remove('hidden');
            
            if (userId) {
                title.textContent = 'Edit User';
                this.populateUserForm(userId);
            } else {
                title.textContent = 'Add New User';
                this.clearUserForm();
            }
        }
    }

    // Close user form modal
    closeUserFormModal() {
        const modal = document.getElementById('userFormModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Populate user form
    populateUserForm(userId) {
        const user = this.users.get(userId);
        if (!user) return;

        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('username').value = user.username;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userDepartment').value = user.department;
    }

    // Clear user form
    clearUserForm() {
        document.getElementById('userForm').reset();
    }

    // Save user
    saveUser() {
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('userEmail').value,
            username: document.getElementById('username').value,
            role: document.getElementById('userRole').value,
            department: document.getElementById('userDepartment').value,
            sendWelcomeEmail: document.getElementById('sendWelcomeEmail').checked,
            requirePasswordChange: document.getElementById('requirePasswordChange').checked
        };

        // Validate form data
        if (!this.validateUserForm(formData)) {
            return;
        }

        // Generate user ID
        const userId = `user-${Date.now()}`;
        
        // Create user object
        const user = {
            id: userId,
            ...formData,
            password: this.generateTemporaryPassword(),
            status: 'active',
            lastLogin: null,
            createdAt: new Date().toISOString(),
            permissions: this.getRolePermissions(formData.role)
        };

        // Save user
        this.users.set(userId, user);
        
        // Log activity
        this.logUserActivity('user_created', {
            userId: userId,
            description: `User ${user.firstName} ${user.lastName} created`
        });

        // Refresh users table
        this.loadUsersTable();
        
        // Close modal
        this.closeUserFormModal();
        
        // Show success message
        this.showNotification('User created successfully!', 'success');
    }

    // Validate user form
    validateUserForm(formData) {
        // Check for required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.role) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }

        // Check for duplicate email
        const existingUser = Array.from(this.users.values()).find(user => user.email === formData.email);
        if (existingUser) {
            this.showNotification('Email already exists', 'error');
            return false;
        }

        // Check for duplicate username
        const existingUsername = Array.from(this.users.values()).find(user => user.username === formData.username);
        if (existingUsername) {
            this.showNotification('Username already exists', 'error');
            return false;
        }

        return true;
    }

    // Generate temporary password
    generateTemporaryPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Get role permissions
    getRolePermissions(roleId) {
        const role = this.roles.get(roleId);
        return role ? role.permissions : [];
    }

    // Edit user
    editUser(userId) {
        this.openUserFormModal(userId);
    }

    // Toggle user status
    toggleUserStatus(userId) {
        const user = this.users.get(userId);
        if (!user) return;

        user.status = user.status === 'active' ? 'inactive' : 'active';
        this.users.set(userId, user);

        this.logUserActivity('user_updated', {
            userId: userId,
            description: `User ${user.firstName} ${user.lastName} ${user.status === 'active' ? 'activated' : 'deactivated'}`
        });

        this.loadUsersTable();
        this.showNotification(`User ${user.status === 'active' ? 'activated' : 'deactivated'}`, 'success');
    }

    // Delete user
    deleteUser(userId) {
        const user = this.users.get(userId);
        if (!user) return;

        if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
            this.users.delete(userId);
            
            this.logUserActivity('user_deleted', {
                userId: userId,
                description: `User ${user.firstName} ${user.lastName} deleted`
            });

            this.loadUsersTable();
            this.showNotification('User deleted successfully', 'success');
        }
    }

    // Get users by role
    getUsersByRole(roleId) {
        return Array.from(this.users.values()).filter(user => user.role === roleId);
    }

    // Log user activity
    logUserActivity(type, details) {
        const activity = {
            id: `activity-${Date.now()}`,
            type: type,
            timestamp: new Date().toISOString(),
            userId: this.currentUser?.id || 'system',
            ...details
        };

        this.userActivity.push(activity);
        
        // Keep only last 1000 activities
        if (this.userActivity.length > 1000) {
            this.userActivity = this.userActivity.slice(-1000);
        }

        // Store in localStorage
        localStorage.setItem('userActivity', JSON.stringify(this.userActivity));
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Use existing notification system if available
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Load user data from localStorage
    loadUserData() {
        try {
            const storedActivity = localStorage.getItem('userActivity');
            if (storedActivity) {
                this.userActivity = JSON.parse(storedActivity);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    // Setup session management
    setupSessionManagement() {
        // Check for existing session
        const sessionData = localStorage.getItem('userSession');
        if (sessionData) {
            try {
                const session = JSON.parse(sessionData);
                if (Date.now() - session.timestamp < this.sessionTimeout) {
                    this.currentUser = session.user;
                    this.updateUserInterface();
                }
            } catch (error) {
                console.error('Error loading session:', error);
            }
        }
    }

    // Update user interface
    updateUserInterface() {
        const userNameElement = document.getElementById('userName');
        if (userNameElement && this.currentUser) {
            userNameElement.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        }
    }

    // Authenticate user
    authenticateUser(username, password) {
        const user = Array.from(this.users.values()).find(u => 
            u.username === username && u.password === password && u.status === 'active'
        );

        if (user) {
            this.currentUser = user;
            user.lastLogin = new Date().toISOString();
            this.users.set(user.id, user);

            // Create session
            const session = {
                user: user,
                timestamp: Date.now()
            };
            localStorage.setItem('userSession', JSON.stringify(session));

            this.logUserActivity('login', {
                userId: user.id,
                description: `User ${user.firstName} ${user.lastName} logged in`
            });

            this.updateUserInterface();
            return { success: true, user: user };
        }

        return { success: false, message: 'Invalid credentials' };
    }

    // Check user permission
    hasPermission(permission) {
        if (!this.currentUser) return false;
        
        const user = this.users.get(this.currentUser.id);
        if (!user) return false;

        return user.permissions.includes('all') || user.permissions.includes(permission);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Logout user
    logout() {
        if (this.currentUser) {
            this.logUserActivity('logout', {
                userId: this.currentUser.id,
                description: `User ${this.currentUser.firstName} ${this.currentUser.lastName} logged out`
            });
        }

        this.currentUser = null;
        localStorage.removeItem('userSession');
        this.updateUserInterface();
    }

    // Export user data
    exportUserData() {
        return {
            users: Array.from(this.users.values()),
            roles: Array.from(this.roles.values()),
            permissions: Array.from(this.permissions.values()),
            activity: this.userActivity,
            exportTimestamp: new Date().toISOString()
        };
    }
}

// Initialize user management system
const userManagementSystem = new UserManagementSystem();

// Export for use in other modules
window.UserManagementSystem = userManagementSystem;
