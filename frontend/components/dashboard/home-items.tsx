"use client";
import {
  DollarSign,
  ShoppingCart,
  Users,
  UserCheck,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function DashboardHomePage() {
  const stats = [
    {
      title: "Total Orders",
      value: "3,721",
      change: "+12%",
      trend: "up",
      icon: <ShoppingCart className="h-8 w-8 text-red-500" />,
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
    <div className="space-y-8">
      {/* Dashboard Title */}
      <div className="flex items-center gap-3">
        <TrendingUp className="h-7 w-7 text-red-600" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, here’s what’s happening with your store today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="transition-transform hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white via-gray-50 to-red-50 border-0"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">
                {stat.title}
              </CardTitle>
              <div className="rounded-full bg-white shadow p-2">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-gray-800">
                {/* {stat.title === "Total Orders" ? monthlyOrders : stat.value} */}
              </div>
              {/* Uncomment below if you want to display change in stats */}
              <div className="flex items-center text-sm mt-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </span>
                <span className="text-gray-400 ml-3">vs. last month</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border-t border-gray-200 my-8" />

      {/* Recent Activity Section */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center border-b pb-4 last:border-0 last:pb-0 hover:bg-gray-50 rounded-lg transition"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow ${
                    item % 2 === 0 ? "bg-red-100" : "bg-purple-100"
                  }`}
                >
                  {item % 2 === 0 ? (
                    <ShoppingCart className="h-5 w-5 text-red-600" />
                  ) : (
                    <UserCheck className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
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
                <div className="text-xs text-gray-400 font-mono">
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
