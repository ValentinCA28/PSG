'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

export default function MatchesPage() {
  const matches = [
    { home: "Manchester City", homeScore: 2, away: "Manchester United", awayScore: 1, status: "LIVE" },
    { home: "Barcelona", homeScore: 4, away: "Real Madrid", awayScore: 2, status: "FT" },
    { home: "Liverpool", homeScore: 3, away: "Arsenal", awayScore: 0, status: "FT" },
    { home: "Bayern Munich", homeScore: 3, away: "Borussia Dortmund", awayScore: 1, status: "FT" },
    { home: "Juventus", homeScore: 2, away: "AC Milan", awayScore: 1, status: "FT" },
  ];

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-full">
        <Header />
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Matches</h1>
          <Badge variant="outline">English Premier League</Badge>
        </div>

        {/* Live Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Live Matches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {matches.map((match, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border rounded-lg">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <div className="flex-1 text-center sm:text-right w-full sm:w-auto">
                      <p className="font-semibold text-sm sm:text-base">{match.home}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold">{match.homeScore}</span>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-xl sm:text-2xl font-bold">{match.awayScore}</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                      <p className="font-semibold text-sm sm:text-base">{match.away}</p>
                    </div>
                  </div>
                </div>
                <Badge variant={match.status === "LIVE" ? "destructive" : "secondary"} className="self-center sm:self-auto">
                  {match.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stadium Info */}
        <Card>
          <CardHeader>
            <CardTitle>Santiago Bernabéu Stadium</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">82,754</p>
            <p className="text-sm text-muted-foreground">Total Attendance</p>
          </CardContent>
        </Card>

        {/* Ball Possession */}
        <Card>
          <CardHeader>
            <CardTitle>Ball Possession</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-muted rounded-lg p-4">
                <LineChart 
                  data={[45, 48, 52, 50, 55, 53, 58, 60, 62, 65, 63, 68]}
                  color="text-blue-500"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Manchester United</span>
                <span className="font-medium">Wolves</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}

