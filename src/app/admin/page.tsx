"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiTruck,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiBarChart2,
  FiGlobe,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiSettings,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({ users: 0, services: 0, inquiries: 0 });

  const websiteData = {
    countriesServed: "50+",
    shipmentsDelivered: "10K+",
    onTimeDelivery: "99.8%",
    yearsExperience: "22+",
    supportAvailable: "24/7",
    serviceCategories: [
      { name: "Freight Forwarding", services: ["Air Freight", "Sea Freight (FCL & LCL)", "Road Transportation", "Multimodal Transport"] },
      { name: "Customs Clearance", services: ["Import Clearance", "Export Clearance", "Documentation Handling", "Regulatory Compliance"] },
      { name: "Warehousing & Distribution", services: ["Storage Solutions", "Inventory Management", "Order Fulfillment", "Last-Mile Delivery"] },
      { name: "Specialized Logistics", services: ["DG Shipment Handling", "Project Cargo", "E-commerce Logistics", "Supply Chain Management"] },
    ],
  };
  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [siteSettings, setSiteSettings] = useState({
    hero: true,
    about: true,
    services: true,
    whyChooseUs: true,
    contact: true,
  });
  const [savingSettings, setSavingSettings] = useState(false);

  const { user, logout, token } = useAuth();
  const router = useRouter();

  const analytics = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const todayCount = inquiries.filter((i) => new Date(i.createdAt) >= today).length;
    const thisWeekCount = inquiries.filter((i) => new Date(i.createdAt) >= thisWeekStart).length;
    const thisMonthCount = inquiries.filter((i) => new Date(i.createdAt) >= thisMonthStart).length;
    const lastMonthCount = inquiries.filter((i) => {
      const d = new Date(i.createdAt);
      return d >= lastMonthStart && d <= lastMonthEnd;
    }).length;
    const monthGrowth =
      lastMonthCount > 0
        ? Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)
        : thisMonthCount > 0
          ? 100
          : 0;

    const statusCounts: Record<string, number> = { pending: 0, contacted: 0, closed: 0 };
    inquiries.forEach((i) => {
      statusCounts[i.status] = (statusCounts[i.status] || 0) + 1;
    });
    const responseRate =
      inquiries.length > 0
        ? Math.round(((statusCounts.contacted + statusCounts.closed) / inquiries.length) * 100)
        : 0;
    const closedRate =
      inquiries.length > 0 ? Math.round((statusCounts.closed / inquiries.length) * 100) : 0;

    const categoryMap: Record<string, number> = {};
    inquiries.forEach((i) => {
      const cat = i.service || i.product || "Other";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    const serviceDistribution = Object.entries(categoryMap)
      .map(([name, count]) => ({
        name,
        count,
        pct: inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    const countryMap: Record<string, number> = {};
    inquiries.forEach((i) => {
      const c = i.country || "Unknown";
      countryMap[c] = (countryMap[c] || 0) + 1;
    });
    const topCountries = Object.entries(countryMap)
      .map(([name, count]) => ({
        name,
        count,
        pct: inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const monthMap: Record<string, number> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthNames[d.getMonth()] + " " + d.getFullYear();
      monthMap[key] = 0;
    }
    inquiries.forEach((i) => {
      const d = new Date(i.createdAt);
      const key = monthNames[d.getMonth()] + " " + d.getFullYear();
      if (key in monthMap) monthMap[key]++;
    });
    const monthlyTrends = Object.entries(monthMap).map(([month, count]) => ({ month, count }));
    const maxMonthly = Math.max(...monthlyTrends.map((m) => m.count), 1);

    const hourMap = Array(24).fill(0);
    inquiries.forEach((i) => {
      hourMap[new Date(i.createdAt).getHours()]++;
    });
    const peakHour = hourMap.indexOf(Math.max(...hourMap));

    const uniqueEmails = new Set(inquiries.map((i) => i.email)).size;

    return {
      todayCount,
      thisWeekCount,
      thisMonthCount,
      monthGrowth,
      statusCounts,
      responseRate,
      closedRate,
      serviceDistribution,
      topCountries,
      monthlyTrends,
      maxMonthly,
      peakHour,
      uniqueEmails,
    };
  }, [inquiries]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetchData();
    fetchSiteSettings();
  }, [token, router]);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, servicesRes, inquiriesRes] = await Promise.all([
        fetch(`${API_URL}/users`, { headers }).then((r) => r.json()),
        fetch(`${API_URL}/products/admin`, { headers }).then((r) => r.json()),
        fetch(`${API_URL}/inquiries`, { headers }).then((r) => r.json()),
      ]);

      setUsers(usersRes.data || []);
      setServices(servicesRes.data || []);
      setInquiries(inquiriesRes.data || []);

      setStats({
        users: usersRes.data?.length || 0,
        services: servicesRes.data?.length || 0,
        inquiries: inquiriesRes.data?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchSiteSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/site-settings`);
      const data = await res.json();
      if (data.data) {
        setSiteSettings({
          hero: data.data.hero ?? true,
          about: data.data.about ?? true,
          services: data.data.services ?? true,
          whyChooseUs: data.data.whyChooseUs ?? true,
          contact: data.data.contact ?? true,
        });
      }
    } catch (err) {
      console.error("Error fetching site settings:", err);
    }
  };

  const updateSiteSettings = async (key: string, value: boolean) => {
    setSavingSettings(true);
    try {
      const newSettings = { ...siteSettings, [key]: value };
      setSiteSettings(newSettings);
      await fetch(`${API_URL}/site-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSettings),
      });
    } catch (err) {
      console.error("Error updating site settings:", err);
      setSiteSettings(siteSettings);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (err) {
      console.error("Error updating inquiry:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <FiHome /> },
    { id: "analytics", name: "Analytics", icon: <FiBarChart2 /> },
    { id: "users", name: "Users", icon: <FiUsers /> },
    { id: "services", name: "Services", icon: <FiTruck /> },
    { id: "inquiries", name: "Inquiries", icon: <FiMessageSquare /> },
    { id: "site-settings", name: "Site Settings", icon: <FiSettings /> },
  ];

  if (!token) return null;

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
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
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
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

      <main className="main-content">
        <header className="content-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <h1>{menuItems.find((m) => m.id === activeTab)?.name}</h1>
          <Link href="/" className="back-to-site">
            Back to Site
          </Link>
        </header>

        <div className="content-body">
          {activeTab === "dashboard" && (
            <div className="dashboard-content">
              <div className="website-stats-grid">
                <div className="website-stat-card">
                  <div className="website-stat-icon globe"><FiGlobe /></div>
                  <div className="website-stat-info">
                    <span className="website-stat-number">{websiteData.countriesServed}</span>
                    <span className="website-stat-label">Countries Served</span>
                  </div>
                </div>
                <div className="website-stat-card">
                  <div className="website-stat-icon shipments"><FiTruck /></div>
                  <div className="website-stat-info">
                    <span className="website-stat-number">{websiteData.shipmentsDelivered}</span>
                    <span className="website-stat-label">Shipments Delivered</span>
                  </div>
                </div>
                <div className="website-stat-card">
                  <div className="website-stat-icon ontime"><FiCheckCircle /></div>
                  <div className="website-stat-info">
                    <span className="website-stat-number">{websiteData.onTimeDelivery}</span>
                    <span className="website-stat-label">On-Time Delivery</span>
                  </div>
                </div>
                <div className="website-stat-card">
                  <div className="website-stat-icon years"><FiCalendar /></div>
                  <div className="website-stat-info">
                    <span className="website-stat-number">{websiteData.yearsExperience}</span>
                    <span className="website-stat-label">Years of Excellence</span>
                  </div>
                </div>
                <div className="website-stat-card">
                  <div className="website-stat-icon support"><FiClock /></div>
                  <div className="website-stat-info">
                    <span className="website-stat-number">{websiteData.supportAvailable}</span>
                    <span className="website-stat-label">Support Available</span>
                  </div>
                </div>
                <div className="website-stat-card">
                  <div className="website-stat-icon categories"><FiTruck /></div>
                  <div className="website-stat-info">
                    <span className="website-stat-number">{websiteData.serviceCategories.length}</span>
                    <span className="website-stat-label">Service Categories</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="recent-section">
                  <h3>Recent Inquiries</h3>
                  <div className="recent-list">
                    {inquiries.slice(0, 5).map((inquiry) => (
                      <div key={inquiry._id} className="recent-item">
                        <div className="item-info">
                          <span className="item-name">{inquiry.name}</span>
                          <span className="item-email">{inquiry.email}</span>
                        </div>
                        <span className={`status-badge ${inquiry.status}`}>{inquiry.status}</span>
                      </div>
                    ))}
                    {inquiries.length === 0 && <p className="no-data">No inquiries yet</p>}
                  </div>
                </div>

                <div className="recent-section">
                  <h3>Quick Stats</h3>
                  <div className="quick-stats">
                    <div className="quick-stat-item">
                      <FiUsers className="quick-stat-icon" />
                      <div>
                        <span className="quick-stat-value">{stats.users}</span>
                        <span className="quick-stat-label">Total Users</span>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <FiTruck className="quick-stat-icon" />
                      <div>
                        <span className="quick-stat-value">{stats.services}</span>
                        <span className="quick-stat-label">Total Services</span>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <FiMessageSquare className="quick-stat-icon" />
                      <div>
                        <span className="quick-stat-value">{stats.inquiries}</span>
                        <span className="quick-stat-label">Total Inquiries</span>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <FiClock className="quick-stat-icon" />
                      <div>
                        <span className="quick-stat-value">{inquiries.filter((i) => i.status === "pending").length}</span>
                        <span className="quick-stat-label">Pending Inquiries</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="analytics-content">
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
                    {analytics.monthGrowth > 0 && (
                      <>
                        <FiArrowUp className="trend-up" /> +{analytics.monthGrowth}%
                      </>
                    )}
                    {analytics.monthGrowth < 0 && (
                      <>
                        <FiArrowDown className="trend-down" /> {analytics.monthGrowth}%
                      </>
                    )}
                    {analytics.monthGrowth === 0 && (
                      <>
                        <FiMinus className="trend-neutral" /> 0%
                      </>
                    )}{" "}
                    vs last month
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
                <div className="analytics-card wide">
                  <h3>
                    <FiTrendingUp /> Monthly Inquiry Trends
                  </h3>
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

                <div className="analytics-card">
                  <h3>
                    <FiMessageSquare /> Inquiry Status
                  </h3>
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
                          return (
                            <>
                              <circle
                                cx="18"
                                cy="18"
                                r={r}
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="3"
                                strokeDasharray={`${pendingDash} ${100 - pendingDash}`}
                                strokeDashoffset={0}
                              />
                              <circle
                                cx="18"
                                cy="18"
                                r={r}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeDasharray={`${contactedDash} ${100 - contactedDash}`}
                                strokeDashoffset={-pendingDash}
                              />
                              <circle
                                cx="18"
                                cy="18"
                                r={r}
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                                strokeDasharray={`${closedDash} ${100 - closedDash}`}
                                strokeDashoffset={-(pendingDash + contactedDash)}
                              />
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

                <div className="analytics-card">
                  <h3>
                    <FiTruck /> Service Distribution
                  </h3>
                  <div className="horizontal-bars">
                    {analytics.serviceDistribution.slice(0, 6).map((item, idx) => (
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
                    {analytics.serviceDistribution.length === 0 && (
                      <p className="no-data">No data available</p>
                    )}
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>
                    <FiGlobe /> Top Countries
                  </h3>
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
                    {analytics.topCountries.length === 0 && <p className="no-data">No data available</p>}
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>
                    <FiClock /> Peak Activity Hour
                  </h3>
                  <div className="peak-hour-display">
                    <span className="peak-hour-value">{analytics.peakHour}:00</span>
                    <span className="peak-hour-label">Most inquiries received at this hour</span>
                  </div>
                </div>

                <div className="analytics-card wide">
                  <h3>
                    <FiBarChart2 /> Quick Summary
                  </h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <FiUsers className="summary-icon" />
                      <div>
                        <span className="summary-value">{stats.users}</span>
                        <span className="summary-label">Registered Users</span>
                      </div>
                    </div>
                    <div className="summary-item">
                      <FiTruck className="summary-icon" />
                      <div>
                        <span className="summary-value">{stats.services}</span>
                        <span className="summary-label">Total Services</span>
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

          {activeTab === "users" && (
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
                        <td>{u.company || "-"}</td>
                        <td>
                          <span className={`role-badge ${u.role}`}>{u.role}</span>
                        </td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={5} className="no-data">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="table-content">
              <div className="table-header">
                <h3>Service Categories ({websiteData.serviceCategories.length})</h3>
                <Link href="/services" className="btn-add">
                  View Site
                </Link>
              </div>
              <div className="services-categories-grid">
                {websiteData.serviceCategories.map((category, idx) => (
                  <div key={idx} className="service-category-card">
                    <div className="category-header">
                      <h4>{category.name}</h4>
                      <span className="category-count">{category.services.length} services</span>
                    </div>
                    <div className="category-services-list">
                      {category.services.map((service, sIdx) => (
                        <div key={sIdx} className="category-service-item">
                          <FiCheckCircle className="service-check" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {services.length > 0 && (
                <>
                  <div className="table-header" style={{ marginTop: "2rem" }}>
                    <h3>Backend Services ({services.length})</h3>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((s) => (
                          <tr key={s._id}>
                            <td>{s.name}</td>
                            <td>
                              <span className="category-badge">{s.category}</span>
                            </td>
                            <td>
                              <span className={`status-badge ${s.isActive ? "active" : "inactive"}`}>
                                {s.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                            <td>
                              <button className="btn-action delete" onClick={() => deleteProduct(s._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "inquiries" && (
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
                        <p>
                          {inquiry.email} | {inquiry.company || "N/A"}
                        </p>
                      </div>
                      <span className={`status-badge ${inquiry.status}`}>{inquiry.status}</span>
                    </div>
                    <div className="inquiry-body">
                      <p>
                        <strong>Service:</strong> {inquiry.service || inquiry.product || "Not specified"}
                      </p>
                      <p>
                        <strong>Cargo Type:</strong> {inquiry.cargoType || "Not specified"}
                      </p>
                      <p>
                        <strong>Country:</strong> {inquiry.country || "Not specified"}
                      </p>
                      <p>
                        <strong>Message:</strong> {inquiry.message}
                      </p>
                    </div>
                    <div className="inquiry-footer">
                      <span className="inquiry-date">{new Date(inquiry.createdAt).toLocaleString()}</span>
                      <div className="inquiry-actions">
                        {inquiry.status === "pending" && (
                          <button
                            className="btn-action contact"
                            onClick={() => updateInquiryStatus(inquiry._id, "contacted")}
                          >
                            <FiCheckCircle /> Mark Contacted
                          </button>
                        )}
                        {inquiry.status === "contacted" && (
                          <button
                            className="btn-action close"
                            onClick={() => updateInquiryStatus(inquiry._id, "closed")}
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {inquiries.length === 0 && <p className="no-data">No inquiries found</p>}
              </div>
            </div>
          )}

          {activeTab === "site-settings" && (
            <div className="site-settings-content">
              <div className="settings-header">
                <h3>Front Page Section Visibility</h3>
                <p className="settings-subtitle">
                  Toggle sections on/off to control what appears on the home page.
                </p>
              </div>

              <div className="settings-grid">
                {[
                  { key: "hero", label: "Hero Section", description: "Main banner with company tagline and call-to-action buttons" },
                  { key: "about", label: "About Section", description: "Company overview and key highlights" },
                  { key: "services", label: "Services Section", description: "Logistics service categories and offerings" },
                  { key: "whyChooseUs", label: "Why Choose Us", description: "Reliability commitments and advantages" },
                  { key: "contact", label: "Contact Section", description: "Contact form and inquiry options" },
                ].map((section) => (
                  <div key={section.key} className="settings-card">
                    <div className="settings-card-info">
                      <h4>{section.label}</h4>
                      <p>{section.description}</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={(siteSettings as any)[section.key]}
                        onChange={(e) => updateSiteSettings(section.key, e.target.checked)}
                        disabled={savingSettings}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                ))}
              </div>

              {savingSettings && (
                <div className="settings-saving">
                  <span className="saving-indicator">Saving...</span>
                </div>
              )}

              <div className="settings-preview">
                <Link href="/" target="_blank" className="btn-preview">
                  Preview Home Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
