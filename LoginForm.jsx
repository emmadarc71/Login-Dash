import React, { useState } from 'react';


// LoginForm Component
const LoginForm = ({ onLogin, loginError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login to Dashboard</h1>
        
        {loginError && (
          <div className="error-message">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        
        <div className="login-hint">
          <p>Use the following credentials:</p>
          <p>Email: student@example.com</p>
          <p>Password: react123</p>
        </div>
      </div>
    </div>
  );
};

// DashboardControls Component
const DashboardControls = ({ viewMode, theme, status, onUpdate }) => {
  return (
    <div className="dashboard-controls">
      <h2>Dashboard Controls</h2>
      
      <div className="control-group">
        <label htmlFor="viewMode">View Mode</label>
        <select
          id="viewMode"
          value={viewMode}
          onChange={(e) => onUpdate('viewMode', e.target.value)}
        >
          <option value="Overview">Overview</option>
          <option value="Stats">Stats</option>
          <option value="Settings">Settings</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => onUpdate('theme', e.target.value)}
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => onUpdate('status', e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Away">Away</option>
          <option value="Offline">Offline</option>
        </select>
      </div>
    </div>
  );
};

// DashboardSummary Component
const DashboardSummary = ({ viewMode, theme, status }) => {
  const getSummaryContent = () => {
    switch (viewMode) {
      case 'Overview':
        return (
          <div className="summary-content">
            <h3>Overview Dashboard</h3>
            <p>This is your main dashboard showing key metrics and recent activity.</p>
            <ul>
              <li>Total Users: 1,234</li>
              <li>Active Sessions: 89</li>
              <li>System Uptime: 99.9%</li>
              <li>Storage Used: 65%</li>
            </ul>
          </div>
        );
      case 'Stats':
        return (
          <div className="summary-content">
            <h3>Detailed Statistics</h3>
            <p>Comprehensive analytics and performance metrics.</p>
            <ul>
              <li>Monthly Growth: +12.5%</li>
              <li>Response Time: 120ms avg</li>
              <li>Peak Load: 2,450 requests/min</li>
              <li>Error Rate: 0.2%</li>
            </ul>
          </div>
        );
      case 'Settings':
        return (
          <div className="summary-content">
            <h3>System Settings</h3>
            <p>Configure your dashboard preferences and system options.</p>
            <ul>
              <li>Notifications: Enabled</li>
              <li>Auto-refresh: Every 30 seconds</li>
              <li>Data Retention: 90 days</li>
              <li>Export Format: CSV/JSON</li>
            </ul>
          </div>
        );
      default:
        return <p>Select a view mode to see content</p>;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Away': return '#FF9800';
      case 'Offline': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className="dashboard-summary">
      <h2>Dashboard Summary</h2>
      
      <div className="summary-info">
        <div className="info-card">
          <h4>Current Configuration</h4>
          <p><strong>View Mode:</strong> {viewMode}</p>
          <p><strong>Theme:</strong> {theme}</p>
          <p>
            <strong>Status:</strong> 
            <span style={{ color: getStatusColor(), marginLeft: '8px' }}>
              ● {status}
            </span>
          </p>
        </div>
        
        <div className="info-card">
          <h4>Content Preview</h4>
          {getSummaryContent()}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ onLogout }) => {
  const [dashboardState, setDashboardState] = useState({
    viewMode: 'Overview',
    theme: 'Light',
    status: 'Active'
  });

  const handleUpdate = (key, value) => {
    setDashboardState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className={`dashboard-container ${dashboardState.theme.toLowerCase()}`}>
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      <div className="dashboard-content">
        <DashboardControls
          viewMode={dashboardState.viewMode}
          theme={dashboardState.theme}
          status={dashboardState.status}
          onUpdate={handleUpdate}
        />
        
        <DashboardSummary
          viewMode={dashboardState.viewMode}
          theme={dashboardState.theme}
          status={dashboardState.status}
        />
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (email, password) => {
    if (email === 'student@example.com' && password === 'react123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please use student@example.com / react123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginError('');
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} loginError={loginError} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;