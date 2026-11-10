import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { TopBar, Nav, CartDrawer, WhatsAppFloat, Footer } from "@/components/ui";

export const metadata = {
  title: "AURA — Pakistan's Earbuds Store | ANC Earbuds with COD & 1-Year Warranty",
  description: "Shop AURA earbuds in Pakistan: up to 55dB ANC, 50-hour battery, Cash on Delivery nationwide, JazzCash & Easypaisa, 1-year warranty and 7-day replacement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <TopBar />
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
