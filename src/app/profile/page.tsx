'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Calendar } from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { RadarChart } from "@/components/charts/RadarChart";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-full">
        <Header />
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">Player Profile</h1>
        </div>

        {/* Player Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src="/placeholder-player.jpg" alt="Player" />
                <AvatarFallback>MV</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-xl sm:text-2xl">Matías Veci...</CardTitle>
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Training Pace Chart */}
            <div>
              <h3 className="font-semibold mb-2">Training Pace</h3>
              <div className="h-32 bg-muted rounded-lg p-4">
                <LineChart 
                  data={[45, 52, 48, 61, 55, 58, 63, 59, 65, 62, 68, 70]}
                  color="text-blue-500"
                />
              </div>
            </div>

            {/* Shots Stats */}
            <div>
              <h3 className="font-semibold mb-2">Shots Stats</h3>
              <div className="h-32 bg-muted rounded-lg p-4">
                <BarChart
                  data={[
                    { label: "1H", value: 8 },
                    { label: "2H", value: 10 }
                  ]}
                  barColor="bg-blue-500"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">18 shots on target</p>
            </div>

            {/* Passes Stats */}
            <div>
              <h3 className="font-semibold mb-2">Passes Stats</h3>
              <div className="h-64 bg-muted rounded-lg p-4">
                <RadarChart
                  data={[
                    { label: "Accuracy", value: 85 },
                    { label: "Short", value: 90 },
                    { label: "Long", value: 70 },
                    { label: "Key", value: 80 },
                    { label: "Assists", value: 75 },
                    { label: "Total", value: 88 }
                  ]}
                />
              </div>
            </div>

            {/* Training Planner */}
            <div>
              <h3 className="font-semibold mb-2">Training Planner</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">May</Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">June</Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">July</Button>
                </div>
                <Button size="sm" className="w-full sm:w-auto">Scheduler</Button>
              </div>
            </div>

            {/* Medical */}
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Medical Conference</label>
                <select className="w-full mt-1 p-2 border rounded-md bg-background">
                  <option>Select date</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Medical Checkup</label>
                <select className="w-full mt-1 p-2 border rounded-md bg-background">
                  <option>Select date</option>
                </select>
              </div>
            </div>

            {/* Latest Messages */}
            <div>
              <h3 className="font-semibold mb-2">Latest Messages</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Greg Freeman</p>
                  <p className="text-xs text-muted-foreground">Great performance today!</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Curtis Smith</p>
                  <p className="text-xs text-muted-foreground">Training schedule updated</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Champions League Teams */}
        <Card>
          <CardHeader>
            <CardTitle>Champions League</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {['Borussia Dortmund', 'Manchester City', 'Bayern Munich', 'Real Madrid', 'Fiorentina', 'Chelsea', 'Manchester United'].map((team, i) => (
                <div key={i} className="text-center p-3 border rounded-lg">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-muted rounded-full mx-auto mb-2" />
                  <p className="text-xs font-medium break-words">{team}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}

