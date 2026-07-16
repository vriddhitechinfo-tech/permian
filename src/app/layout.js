import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Cursor from "./components/Cursor/Cursor";
import StarryBackground from "./components/StarryBackground/StarryBackground";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Permian Concrete | Premier Concrete Contractor in Midland-Odessa, TX",
  description:
    "Permian Concrete delivers top-quality residential and commercial concrete services across the Permian Basin. Driveways, foundations, patios, warehouses — call 432-582-5433 for a free estimate.",
  keywords:
    "concrete contractor, Midland TX, Odessa TX, Permian Basin, driveways, foundations, patios, commercial concrete, warehouse floors",
  openGraph: {
    title: "Permian Concrete | Building the Foundation of West Texas",
    description:
      "Premier concrete solutions for residential and commercial projects in Midland, Odessa, and the Permian Basin.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <SmoothScroll>
          <Cursor />
          <StarryBackground />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
