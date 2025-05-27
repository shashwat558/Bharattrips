import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AuthProvider from '@/components/AuthProvider';

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400"
})
 

export const metadata: Metadata = {
  title: 'BharatTrips | Luxury Hotel Booking',
  description: 'Book your perfect luxury stay with BharatTrips. Find the best hotels, resorts, and vacation rentals worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} font-sans`}>
        <AuthProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}