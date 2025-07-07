"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function SidebarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 focus:outline-none"
        aria-label="Меню"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white/10 border border-white/20 text-gray-100 rounded-lg shadow-lg backdrop-blur-md z-50">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-white">
                🏗️ Метод на обезщетението
              </Link>
            </li>
            <li>
  <a
    href="https://docs.google.com/document/d/1iWLNX5WwlFwjV01o_GkwfupHkf2rP0Z3wEcR6wUitmk"
    target="_blank"
    rel="noopener noreferrer" // това е за сигурността, препоръчва се да се добави
    className="block hover:text-white"
  >
    ℹ️ Помощ
  </a>
</li>
          </ul>
        </div>
      )}
    </div>
  );
}
