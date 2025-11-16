'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Equipe, Academie, Pays } from '@/types';
import { ArrowLeft, Users } from 'lucide-react';

export default function EquipesPage() {
  const params = useParams();
  const router = useRouter();
  const paysId = params.paysId as string;
  const academieId = params.academieId as string;

  const [pays, setPays] = useState<Pays | null>(null);
  const [academie, setAcademie] = useState<Academie | null>(null);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Récupérer les données depuis Firebase
    // Données de démonstration
    const paysDemo: Pays = {
      id: paysId,
      nom: 'France',
      code: 'FR',
      drapeau: '🇫🇷',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const academieDemo: Academie = {
      id: academieId,
      paysId,
      nom: 'Académie PSG',
      ville: 'Paris',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const equipesDemo: Equipe[] = [
      {
        id: '1',
        academieId,
        nom: 'U17 Elite',
        categorie: 'U17',
        saison: '2024-2025',
        entraineurPrincipal: 'Jean Dupont',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        academieId,
        nom: 'U19 Elite',
        categorie: 'U19',
        saison: '2024-2025',
        entraineurPrincipal: 'Marie Martin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        academieId,
        nom: 'Seniors A',
        categorie: 'Senior',
        saison: '2024-2025',
        entraineurPrincipal: 'Pierre Durand',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        academieId,
        nom: 'U15 Elite',
        categorie: 'U15',
        saison: '2024-2025',
        entraineurPrincipal: 'Sophie Bernard',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setPays(paysDemo);
    setAcademie(academieDemo);
    setEquipes(equipesDemo);
    setLoading(false);
  }, [paysId, academieId]);

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
          Retour aux académies
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{pays?.drapeau}</span>
          <div>
            <h1 className="text-4xl font-bold">{academie?.nom}</h1>
            <p className="text-muted-foreground">
              Équipes - {academie?.ville}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipes.map((equipe) => (
          <Link
            key={equipe.id}
            href={`/pays/${paysId}/academies/${academieId}/equipes/${equipe.id}`}
            className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                  {equipe.categorie}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {equipe.nom}
              </h2>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>⚽ Saison: {equipe.saison}</p>
                {equipe.entraineurPrincipal && (
                  <p>👨‍🏫 {equipe.entraineurPrincipal}</p>
                )}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {equipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune équipe trouvée pour cette académie
          </p>
        </div>
      )}
    </div>
  );
}

