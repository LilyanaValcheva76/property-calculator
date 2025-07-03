"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 space-y-6 max-w-6xl mx-auto"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <img src="/logo.png" alt="Лого" className="h-64" />
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-200 mt-2 mb-8">
            Помощ
          </h1>

<Card className="bg-white/10 rounded-2xl overflow-hidden border border-white/10">
  <CardContent className="p-2 text-xl text-gray-300">
    УКАЗАНИЯ за използване на Калкулатор “Оценки на имоти”
  </CardContent>

  <div className="bg-white/10 p-4 text-2xl text-gray-100 font-bold flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
    <div className="flex justify-end w-full"> {/* добавяме този div, за да подравним бутона вдясно */}
      <Button
        onClick={() => window.open("https://docs.google.com/document/d/1iWLNX5WwlFwjV01o_GkwfupHkf2rP0Z3wEcR6wUitmk", "_blank")}
        className="bg-white/20 text-gray-200 border border-white/20 hover:bg-white/30 text-base rounded-lg"
      >
        📄 Виж документа
      </Button>
    </div>
  </div>
</Card>

        </div>
      </div>
    </div>
  );
}

