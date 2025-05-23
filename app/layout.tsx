import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGUYỄN DUY THÀNH",
  description: "Nghệ sĩ trình diễn và biên đạo",
  openGraph: {
    title: "NGUYỄN DUY THÀNH",
    description: "Nghệ sĩ trình diễn và biên đạo",
    url: "https://www.nguyenduythanh.vn/",
    images: [
      {
        url: "https://nguyenduythanh.s3.ap-southeast-1.amazonaws.com/hero.jpg",
        secureUrl:
          "https://nguyenduythanh.s3.ap-southeast-1.amazonaws.com/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Preview image for NGUYEN DUY THANH",
      },
    ],
    type: "website",
    siteName: "nguyenduythanh.vn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
