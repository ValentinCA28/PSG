'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12.5%",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      trend: "up"
    },
    {
      title: "Revenue",
      value: "$89,240",
      change: "+8.2%",
      icon: <DollarSign className="h-4 w-4 text-green-600" />,
      trend: "up"
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "+2.1%",
      icon: <TrendingUp className="h-4 w-4 text-purple-600" />,
      trend: "up"
    },
    {
      title: "Analytics",
      value: "94.2%",
      change: "-0.3%",
      icon: <BarChart3 className="h-4 w-4 text-orange-600" />,
      trend: "down"
    }
  ];

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-full">
        <Header />
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Liga Soccer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your comprehensive soccer management platform. Navigate through the sidebar to access different features.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}

