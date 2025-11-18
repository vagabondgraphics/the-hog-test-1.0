import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
