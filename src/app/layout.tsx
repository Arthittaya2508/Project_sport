import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets:["latin"],
  weight:["300", "400", "500","600", "700","800","900"],
  variable: '--font-kanit',
  });
  
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
