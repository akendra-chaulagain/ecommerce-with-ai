"use client";
import {
  DollarSign,
  ShoppingCart,
  Users,
  UserCheck,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for charts
// const revenueData = [
//   { name: "Jan", revenue: 12400 },
//   { name: "Feb", revenue: 9800 },
//   { name: "Mar", revenue: 15600 },
//   { name: "Apr", revenue: 18200 },
//   { name: "May", revenue: 22000 },
//   { name: "Jun", revenue: 19800 },
// ];

// const userActivityData = [
//   { name: "Mon", active: 320, total: 650 },
//   { name: "Tue", active: 380, total: 700 },
//   { name: "Wed", active: 450, total: 750 },
//   { name: "Thu", active: 410, total: 720 },
//   { name: "Fri", active: 390, total: 680 },
//   { name: "Sat", active: 280, total: 500 },
//   { name: "Sun", active: 240, total: 400 },
// ];

export default function DashboardHomePage() {
  // Sample dashboard stats
  const stats = [
    {
      title: "Total Orders",
      value: "3,721",
      change: "+12%",
      trend: "up",
      icon: <ShoppingCart className="h-8 w-8 text-blue-500" />,
      description: "Total orders received",
    },
    {
      title: "Total Users",
      value: "8,492",
      change: "+5.2%",
      trend: "up",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      description: "Registered users",
    },
    {
      title: "Active Users",
      value: "5,127",
      change: "-2.3%",
      trend: "down",
      icon: <UserCheck className="h-8 w-8 text-green-500" />,
      description: "Users active in last 30 days",
    },
    {
      title: "Total Revenue",
      value: "$184,593",
      change: "+8.9%",
      trend: "up",
      icon: <DollarSign className="h-8 w-8 text-amber-500" />,
      description: "Total lifetime revenue",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Title */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome back, heres whats happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-sm mt-1">
                {stat.trend === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-2">vs. last month</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* User Activity Chart */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" name="Active Users" fill="#10b981" />
                <Bar dataKey="total" name="Total Users" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Recent Activity Items */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center border-b pb-4 last:border-0 last:pb-0"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 
                                ${
                                  item % 2 === 0
                                    ? "bg-blue-100"
                                    : "bg-purple-100"
                                }`}
                >
                  {item % 2 === 0 ? (
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                  ) : (
                    <UserCheck className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {item % 2 === 0
                      ? "New order #ORD-" + (2300 + item)
                      : "New user registered"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item % 2 === 0
                      ? `Order placed for $${130 + item * 25}`
                      : "User completed registration process"}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {item === 1
                    ? "Just now"
                    : item === 2
                    ? "3 hours ago"
                    : item === 3
                    ? "Yesterday"
                    : "2 days ago"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
