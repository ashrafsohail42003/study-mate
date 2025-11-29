import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/components/ui/fonts";


export const metadata: Metadata = {
  title: "StudyMate - Your Personal Student Assistant",
  description: "Organize your university courses, track your learning progress, and achieve academic excellence with your AI-powered study companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
