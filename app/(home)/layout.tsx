import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
