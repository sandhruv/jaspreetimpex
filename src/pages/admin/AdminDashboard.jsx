import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiPackage, FiMessageSquare, 
  FiLogOut, FiMenu, FiX, FiTrendingUp,
  FiClock, FiCheckCircle, FiBarChart2,
  FiGlobe, FiCalendar, FiArrowUp, FiArrowDown, FiMinus
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ users: 0, products: 0, inquiries: 0 });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const analytics = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const todayCount = inquiries.filter(i => new Date(i.createdAt) >= today).length;
    const thisWeekCount = inquiries.filter(i => new Date(i.createdAt) >= thisWeekStart).length;
    const thisMonthCount = inquiries.filter(i => new Date(i.createdAt) >= thisMonthStart).length;
    const lastMonthCount = inquiries.filter(i => {
      const d = new Date(i.createdAt);
      return d >= lastMonthStart && d <= lastMonthEnd;
    }).length;
    const monthGrowth = lastMonthCount > 0
      ? Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)
      : thisMonthCount > 0 ? 100 : 0;

    const statusCounts = { pending: 0, contacted: 0, closed: 0 };
    inquiries.forEach(i => { statusCounts[i.status] = (statusCounts[i.status] || 0) + 1; });
    const responseRate = inquiries.length > 0
      ? Math.round(((statusCounts.contacted + statusCounts.closed) / inquiries.length) * 100)
      : 0;
    const closedRate = inquiries.length > 0
      ? Math.round((statusCounts.closed / inquiries.length) * 100)
      : 0;

    const categoryMap = {};
    inquiries.forEach(i => {
      const cat = i.product || 'Other';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    const productDistribution = Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count, pct: inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0 }))
      .sort((a, b) => b.count - a.count);

    const countryMap = {};
    inquiries.forEach(i => {
      const c = i.country || 'Unknown';
      countryMap[c] = (countryMap[c] || 0) + 1;
    });
    const topCountries = Object.entries(countryMap)
      .map(([name, count]) => ({ name, count, pct: inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const monthMap = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthNames[d.getMonth()] + ' ' + d.getFullYear();
      monthMap[key] = 0;
    }
    inquiries.forEach(i => {
      const d = new Date(i.createdAt);
      const key = monthNames[d.getMonth()] + ' ' + d.getFullYear();
      if (key in monthMap) monthMap[key]++;
    });
    const monthlyTrends = Object.entries(monthMap).map(([month, count]) => ({ month, count }));
    const maxMonthly = Math.max(...monthlyTrends.map(m => m.count), 1);

    const hourMap = Array(24).fill(0);
    inquiries.forEach(i => { hourMap[new Date(i.createdAt).getHours()]++; });
    const peakHour = hourMap.indexOf(Math.max(...hourMap));

    const uniqueEmails = new Set(inquiries.map(i => i.email)).size;

    return {
      todayCount, thisWeekCount, thisMonthCount, monthGrowth,
      statusCounts, responseRate, closedRate,
      productDistribution, topCountries,
      monthlyTrends, maxMonthly, peakHour, uniqueEmails
    };
  }, [inquiries]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const [usersRes, productsRes, inquiriesRes] = await Promise.all([
        axios.get(`${API_URL}/users`, { headers }).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/products/admin`, { headers }).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/inquiries`, { headers }).catch(() => ({ data: { data: [] } }))
      ]);

      setUsers(usersRes.data.data || []);
      setProducts(productsRes.data.data || []);
      setInquiries(inquiriesRes.data.data || []);
      
      setStats({
        users: usersRes.data.data?.length || 0,
        products: productsRes.data.data?.length || 0,
        inquiries: inquiriesRes.data.data?.length || 0
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/inquiries/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Error updating inquiry:', err);
    }
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiHome /> },
    { id: 'analytics', name: 'Analytics', icon: <FiBarChart2 /> },
    { id: 'users', name: 'Users', icon: <FiUsers /> },
    { id: 'products', name: 'Products', icon: <FiPackage /> },
    { id: 'inquiries', name: 'Inquiries', icon: <FiMessageSquare /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <div className="logo-icon">JI</div>
            <span className="logo-text">Admin Panel</span>
          </Link>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <h1>{menuItems.find(m => m.id === activeTab)?.name}</h1>
          <Link to="/" className="back-to-site">
            Back to Site
          </Link>
        </header>

        <div className="content-body">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon users"><FiUsers /></div>
                  <div className="stat-info">
                    <span className="stat-number">{stats.users}</span>
                    <span className="stat-label">Total Users</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon products"><FiPackage /></div>
                  <div className="stat-info">
                    <span className="stat-number">{stats.products}</span>
                    <span className="stat-label">Products</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon inquiries"><FiMessageSquare /></div>
                  <div className="stat-info">
                    <span className="stat-number">{stats.inquiries}</span>
                    <span className="stat-label">Inquiries</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon pending"><FiClock /></div>
                  <div className="stat-info">
                    <span className="stat-number">
                      {inquiries.filter(i => i.status === 'pending').length}
                    </span>
                    <span className="stat-label">Pending</span>
                  </div>
                </div>
              </div>

              <div className="recent-section">
                <h3>Recent Inquiries</h3>
                <div className="recent-list">
                  {inquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry._id} className="recent-item">
                      <div className="item-info">
                        <span className="item-name">{inquiry.name}</span>
                        <span className="item-email">{inquiry.email}</span>
                      </div>
                      <span className={`status-badge ${inquiry.status}`}>
                        {inquiry.status}
                      </span>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="no-data">No inquiries yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="analytics-content">
              {/* KPI Cards */}
              <div className="analytics-kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-header">
                    <FiCalendar className="kpi-icon today" />
                    <span className="kpi-label">Today</span>
                  </div>
                  <span className="kpi-value">{analytics.todayCount}</span>
                  <span className="kpi-sub">inquiries received</span>
                </div>
                <div className="kpi-card">
                  <div className="kpi-header">
                    <FiTrendingUp className="kpi-icon week" />
                    <span className="kpi-label">This Week</span>
                  </div>
                  <span className="kpi-value">{analytics.thisWeekCount}</span>
                  <span className="kpi-sub">inquiries received</span>
                </div>
                <div className="kpi-card">
                  <div className="kpi-header">
                    <FiTrendingUp className="kpi-icon month" />
                    <span className="kpi-label">This Month</span>
                  </div>
                  <span className="kpi-value">{analytics.thisMonthCount}</span>
                  <span className="kpi-sub">
                    {analytics.monthGrowth > 0 && <><FiArrowUp className="trend-up" /> +{analytics.monthGrowth}%</>}
                    {analytics.monthGrowth < 0 && <><FiArrowDown className="trend-down" /> {analytics.monthGrowth}%</>}
                    {analytics.monthGrowth === 0 && <><FiMinus className="trend-neutral" /> 0%</>}
                    {' '} vs last month
                  </span>
                </div>
                <div className="kpi-card">
                  <div className="kpi-header">
                    <FiCheckCircle className="kpi-icon response" />
                    <span className="kpi-label">Response Rate</span>
                  </div>
                  <span className="kpi-value">{analytics.responseRate}%</span>
                  <span className="kpi-sub">contacted + closed</span>
                </div>
              </div>

              <div className="analytics-grid">
                {/* Monthly Trends */}
                <div className="analytics-card wide">
                  <h3><FiTrendingUp /> Monthly Inquiry Trends</h3>
                  <div className="bar-chart">
                    {analytics.monthlyTrends.map((item, idx) => (
                      <div key={idx} className="bar-group">
                        <div className="bar-wrapper">
                          <div
                            className="bar"
                            style={{ height: `${(item.count / analytics.maxMonthly) * 100}%` }}
                          >
                            <span className="bar-value">{item.count}</span>
                          </div>
                        </div>
                        <span className="bar-label">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry Status */}
                <div className="analytics-card">
                  <h3><FiMessageSquare /> Inquiry Status</h3>
                  <div className="donut-chart-wrapper">
                    <div className="donut-chart">
                      <svg viewBox="0 0 36 36" className="donut-svg">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                        {(() => {
                          const total = inquiries.length || 1;
                          const r = 15.915;
                          const pendingPct = analytics.statusCounts.pending / total;
                          const contactedPct = analytics.statusCounts.contacted / total;
                          const closedPct = analytics.statusCounts.closed / total;
                          const pendingDash = pendingPct * 100;
                          const contactedDash = contactedPct * 100;
                          const closedDash = closedPct * 100;
                          const offset1 = 0;
                          const offset2 = -pendingDash;
                          const offset3 = -(pendingDash + contactedDash);
                          return (
                            <>
                              <circle cx="18" cy="18" r={r} fill="none" stroke="#f59e0b" strokeWidth="3"
                                strokeDasharray={`${pendingDash} ${100 - pendingDash}`} strokeDashoffset={offset1} />
                              <circle cx="18" cy="18" r={r} fill="none" stroke="#3b82f6" strokeWidth="3"
                                strokeDasharray={`${contactedDash} ${100 - contactedDash}`} strokeDashoffset={offset2} />
                              <circle cx="18" cy="18" r={r} fill="none" stroke="#10b981" strokeWidth="3"
                                strokeDasharray={`${closedDash} ${100 - closedDash}`} strokeDashoffset={offset3} />
                            </>
                          );
                        })()}
                      </svg>
                      <div className="donut-center">
                        <span className="donut-total">{inquiries.length}</span>
                        <span className="donut-label">Total</span>
                      </div>
                    </div>
                    <div className="donut-legend">
                      <div className="legend-item">
                        <span className="legend-dot pending" />
                        <span className="legend-text">Pending ({analytics.statusCounts.pending})</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-dot contacted" />
                        <span className="legend-text">Contacted ({analytics.statusCounts.contacted})</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-dot closed" />
                        <span className="legend-text">Closed ({analytics.statusCounts.closed})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Distribution */}
                <div className="analytics-card">
                  <h3><FiPackage /> Product Distribution</h3>
                  <div className="horizontal-bars">
                    {analytics.productDistribution.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="h-bar-row">
                        <span className="h-bar-label">{item.name}</span>
                        <div className="h-bar-track">
                          <div className="h-bar-fill" style={{ width: `${item.pct}%` }}>
                            <span className="h-bar-value">{item.count}</span>
                          </div>
                        </div>
                        <span className="h-bar-pct">{item.pct}%</span>
                      </div>
                    ))}
                    {analytics.productDistribution.length === 0 && (
                      <p className="no-data">No data available</p>
                    )}
                  </div>
                </div>

                {/* Top Countries */}
                <div className="analytics-card">
                  <h3><FiGlobe /> Top Countries</h3>
                  <div className="country-list">
                    {analytics.topCountries.map((item, idx) => (
                      <div key={idx} className="country-row">
                        <span className="country-rank">#{idx + 1}</span>
                        <span className="country-name">{item.name}</span>
                        <div className="country-bar-track">
                          <div className="country-bar-fill" style={{ width: `${item.pct}%` }} />
                        </div>
                        <span className="country-count">{item.count}</span>
                      </div>
                    ))}
                    {analytics.topCountries.length === 0 && (
                      <p className="no-data">No data available</p>
                    )}
                  </div>
                </div>

                {/* Activity Heatmap */}
                <div className="analytics-card">
                  <h3><FiClock /> Peak Activity Hour</h3>
                  <div className="peak-hour-display">
                    <span className="peak-hour-value">{analytics.peakHour}:00</span>
                    <span className="peak-hour-label">Most inquiries received at this hour</span>
                  </div>
                  <div className="hour-bar-track">
                    {Array.from({ length: 24 }, (_, i) => {
                      const count = inquiries.filter(inq => new Date(inq.createdAt).getHours() === i).length;
                      const maxCount = Math.max(...Array.from({ length: 24 }, (_, j) =>
                        inquiries.filter(inq => new Date(inq.createdAt).getHours() === j).length
                      ), 1);
                      return (
                        <div key={i} className="hour-col" title={`${i}:00 — ${count} inquiries`}>
                          <div className="hour-fill" style={{ height: `${(count / maxCount) * 100}%` }} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="hour-labels">
                    <span>0</span><span>6</span><span>12</span><span>18</span><span>23</span>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="analytics-card wide">
                  <h3><FiBarChart2 /> Quick Summary</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <FiUsers className="summary-icon" />
                      <div>
                        <span className="summary-value">{stats.users}</span>
                        <span className="summary-label">Registered Users</span>
                      </div>
                    </div>
                    <div className="summary-item">
                      <FiPackage className="summary-icon" />
                      <div>
                        <span className="summary-value">{stats.products}</span>
                        <span className="summary-label">Total Products</span>
                      </div>
                    </div>
                    <div className="summary-item">
                      <FiMessageSquare className="summary-icon" />
                      <div>
                        <span className="summary-value">{analytics.uniqueEmails}</span>
                        <span className="summary-label">Unique Inquirers</span>
                      </div>
                    </div>
                    <div className="summary-item">
                      <FiCheckCircle className="summary-icon" />
                      <div>
                        <span className="summary-value">{analytics.closedRate}%</span>
                        <span className="summary-label">Closed Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="table-content">
              <div className="table-header">
                <h3>All Users ({users.length})</h3>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.company || '-'}</td>
                        <td>
                          <span className={`role-badge ${u.role}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="5" className="no-data">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="table-content">
              <div className="table-header">
                <h3>All Products ({products.length})</h3>
                <Link to="/products" className="btn-add">
                  View Site
                </Link>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>
                          <span className="category-badge">
                            {p.category}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${p.isActive ? 'active' : 'inactive'}`}>
                            {p.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="4" className="no-data">No products found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div className="table-content">
              <div className="table-header">
                <h3>All Inquiries ({inquiries.length})</h3>
              </div>
              <div className="inquiries-list">
                {inquiries.map((inquiry) => (
                  <div key={inquiry._id} className="inquiry-card">
                    <div className="inquiry-header">
                      <div className="inquiry-info">
                        <h4>{inquiry.name}</h4>
                        <p>{inquiry.email} | {inquiry.company || 'N/A'}</p>
                      </div>
                      <span className={`status-badge ${inquiry.status}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="inquiry-body">
                      <p><strong>Product:</strong> {inquiry.product}</p>
                      <p><strong>Quantity:</strong> {inquiry.quantity || 'Not specified'}</p>
                      <p><strong>Message:</strong> {inquiry.message}</p>
                    </div>
                    <div className="inquiry-footer">
                      <span className="inquiry-date">
                        {new Date(inquiry.createdAt).toLocaleString()}
                      </span>
                      <div className="inquiry-actions">
                        {inquiry.status === 'pending' && (
                          <button 
                            className="btn-action contact"
                            onClick={() => updateInquiryStatus(inquiry._id, 'contacted')}
                          >
                            <FiCheckCircle /> Mark Contacted
                          </button>
                        )}
                        {inquiry.status === 'contacted' && (
                          <button 
                            className="btn-action close"
                            onClick={() => updateInquiryStatus(inquiry._id, 'closed')}
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <p className="no-data">No inquiries found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
