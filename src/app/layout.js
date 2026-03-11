import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Marketplace",
  description: "Escrow Based Marketplace Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white text-gray-900`}
      >
        <CartProvider>
          <Providers>
            <Navbar />

            <div className="pt-14">
              <main className="min-h-screen px-4 py-6">{children}</main>
            </div>

            <Footer />
          </Providers>
        </CartProvider>
=======
      <body>
        <Providers>
          <Navbar /> 
          <main className="min-h-screen container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
>>>>>>> shuvojit
      </body>
    </html>
  );
}
