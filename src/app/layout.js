import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "SOBEI - Sociedade Beneficente Equilíbrio de Interlagos",
  description: "Trabalhando há mais de 40 anos por assistência social, educação e capacitação profissional em São Paulo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SmoothScroll />
        <Header />
        <main style={{ flex: '1' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
