import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutContainer from "@/Components/LayoutContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gettin't Done - Tasks Manager",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutContainer>{children}</LayoutContainer>
      </body>
    </html>
  );
}
