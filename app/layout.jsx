import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Lintask",
  description:
    "Sistem rekap penjualan lintas platform yang menggabungkan semua order ke satu layar tanpa proses manual.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
