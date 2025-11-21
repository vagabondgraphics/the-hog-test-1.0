import type { Metadata } from "next";
import "./globals.css";
import { NavigationHistoryProvider } from "@/contexts/NavigationHistoryContext";

export const metadata: Metadata = {
  title: "The Hog - GTM Command Center",
  description: "Competitive Intelligence Dashboard for GTM Teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavigationHistoryProvider>
          {children}
        </NavigationHistoryProvider>
      </body>
    </html>
  );
}
