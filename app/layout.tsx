import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mathis Chhour | Portfolio",
  description: "Portfolio de Mathis Chhour - Communication & Design Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="...">
        <LanguageProvider>
          {" "}
          <Nav />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
