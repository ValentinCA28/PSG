import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liga Soccer | Football Management",
  description: "Comprehensive soccer management platform with player profiles, match statistics, and team management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <AppProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Toaster />
            </ThemeProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
