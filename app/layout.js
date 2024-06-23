import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./dashboard/_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mock Inteview",
  description: "This Next app is develope by AB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="mx-3 md:mx-9 lg:mx-24">
          {children}
        </div>
      </body>
    </html>
  );
}
