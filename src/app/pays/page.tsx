'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Pays } from '@/types';

export default function PaysPage() {
  const [pays, setPays] = useState<Pays[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Récupérer les pays depuis Firebase
    // Données de démonstration
    const paysDemo: Pays[] = [
      {
        id: '1',
        nom: 'France',
        code: 'FR',
        drapeau: '🇫🇷',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        nom: 'Espagne',
        code: 'ES',
        drapeau: '🇪🇸',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        nom: 'Allemagne',
        code: 'DE',
        drapeau: '🇩🇪',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    setPays(paysDemo);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Sélection du Pays</h1>
        <p className="text-muted-foreground">
          Choisissez un pays pour accéder aux académies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pays.map((p) => (
          <Link
            key={p.id}
            href={`/pays/${p.id}/academies`}
            className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{p.drapeau}</div>
                <div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {p.nom}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Code: {p.code}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-muted">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Navigation:</strong> Sélectionnez un pays pour voir ses académies,
          puis les équipes de chaque académie
        </p>
      </div>
    </div>
  );
}

