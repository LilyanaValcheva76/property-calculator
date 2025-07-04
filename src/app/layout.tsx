import "./globals.css";
import type { Metadata } from "next";
import SidebarMenu from "@/components/layout/SidebarMenu";

export const metadata: Metadata = {
  title: "Property Calculator",
  description: "Калкулатор на пазарна стойност на имот",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body className="text-gray-100">
        <div
          className="min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.png')" }}
        >
          <header className="w-full bg-transparent text-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-4xl font-semibold tracking-tight text-gray-200">
                Бедечко ~ Калкулатор на оценки
              </h1>
              <SidebarMenu />
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
