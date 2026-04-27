import type { Metadata } from "next";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal Lab",
  description: "Scenario runner for observability demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
