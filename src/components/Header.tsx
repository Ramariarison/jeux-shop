"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User | null
}

export default function Header({ user }: Props) {
  return (
    <header className="border-b border-white/5 backdrop-blur-md bg-[#0f0f1a]/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/signature.png"
            alt="Rabbit Shop"
            width={56}
            height={56}
            className="object-contain"
          />
          <span className="text-white font-bold text-lg">Rabbit Shop</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#jeux"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Jeux
          </a>
          <a
            href="#comment"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Comment ça marche
          </a>
          <a
            href="#faq"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <a
              href="/catalogue"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all"
            >
              Catalogue <ArrowRight size={14} />
            </a>
          ) : (
            <>
              <a
                href="/login"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Connexion
              </a>
              <a
                href="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all"
              >
                S&apos;inscrire
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
