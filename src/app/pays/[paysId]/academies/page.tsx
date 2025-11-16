'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Academie, Pays } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function AcademiesPage() {
  const params = useParams();
  const router = useRouter();
  const paysId = params.paysId as string;

  const [pays, setPays] = useState<Pays | null>(null);
  const [academies, setAcademies] = useState<Academie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Récupérer le pays et ses académies depuis Firebase
    // Données de démonstration
    const paysDemo: Pays = {
      id: paysId,
      nom: 'France',
      code: 'FR',
      drapeau: '🇫🇷',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const academiesDemo: Academie[] = [
      {
        id: '1',
        paysId,
        nom: 'Académie PSG',
        ville: 'Paris',
        adresse: 'Paris, France',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        paysId,
        nom: 'Académie Lyon',
        ville: 'Lyon',
        adresse: 'Lyon, France',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        paysId,
        nom: 'Académie Marseille',
        ville: 'Marseille',
        adresse: 'Marseille, France',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setPays(paysDemo);
    setAcademies(academiesDemo);
    setLoading(false);
  }, [paysId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb / Navigation */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux pays
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl">{pays?.drapeau}</span>
          <h1 className="text-4xl font-bold">Académies - {pays?.nom}</h1>
        </div>
        <p className="text-muted-foreground">
          Sélectionnez une académie pour voir ses équipes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academies.map((academie) => (
          <Link
            key={academie.id}
            href={`/pays/${paysId}/academies/${academie.id}/equipes`}
            className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {academie.nom.charAt(0)}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {academie.nom}
              </h2>
              <p className="text-muted-foreground mb-1">
                📍 {academie.ville}
              </p>
              {academie.adresse && (
                <p className="text-sm text-muted-foreground">
                  {academie.adresse}
                </p>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {academies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune académie trouvée pour ce pays
          </p>
        </div>
      )}
    </div>
  );
}

