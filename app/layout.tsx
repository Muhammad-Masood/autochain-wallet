import Moralis from "moralis";
import Header from "./components/Header";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
// import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Auto Chain</title>
      </head>
      <body className="flex flex-col items-center justify-start w-[350px] h-[580px] px-4 text-center">
        <Toaster position="top-left"/>
        <Header/>
        <div className="pt-4">
        {children}
        </div>
        </body>
    </html>
  );
}
