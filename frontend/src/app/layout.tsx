import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../styles.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { FloatingActions } from "../components/site/FloatingActions";
import { Providers } from "../components/providers/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Vidyasetu Classes — Premier Coaching for IIT-JEE, NEET & Foundation (Est. 2005)",
  description:
    "Official website of Vidyasetu Classes. Top-ranked coaching institute for IIT-JEE (Main/Advanced), NEET UG, Class 6-10 Foundation, CUET, NDA, SSC and Banking. 20+ Years of Academic Excellence.",
  authors: [{ name: "Vidyasetu Classes Educational Society" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} min-h-screen bg-background text-foreground antialiased flex flex-col`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingActions />
          </div>
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
