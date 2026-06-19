"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Jeu } from "@/types/jeux";

export default function JeuxSection() {
  const supabase = createClient();
  const [jeux, setJeux] = useState<Jeu[]>([]);

  useEffect(() => {
    async function fetchJeux() {
      const { data } = await supabase
        .from("jeux")
        .select("id, nom, slug, logo_url")
        .eq("actif", true);

      if (data) setJeux(data);
    }
    fetchJeux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="jeux" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Jeux disponibles</h2>
        <p className="text-slate-400">Recharge instantanément pour ces jeux</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {jeux.map((jeu) => (
          <a
            key={jeu.id}
            href="/catalogue"
            className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-200">
              <Image
                src={jeu.logo_url}
                alt={jeu.nom}
                width={56}
                height={56}
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-white font-medium text-sm">{jeu.nom}</p>
            <p className="text-purple-400 text-xs mt-1 flex items-center justify-center gap-1">
              Voir les offres <ArrowRight size={10} />
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
