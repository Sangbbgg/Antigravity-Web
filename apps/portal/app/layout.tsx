import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANTIGRAVITY | Portal Mothership",
  description: "Monorepo Portal Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background overflow-x-hidden`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 ml-64">
            <Navbar />
            <main className="flex-1 pt-16 px-8 pb-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
