'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Equipe, Academie, Pays } from '@/types';
import { ArrowLeft, Users, Calendar, TrendingUp } from 'lucide-react';

export default function HubEquipePage() {
  const params = useParams();
  const router = useRouter();
  const paysId = params.paysId as string;
  const academieId = params.academieId as string;
  const equipeId = params.equipeId as string;

  const [pays, setPays] = useState<Pays | null>(null);
  const [academie, setAcademie] = useState<Academie | null>(null);
  const [equipe, setEquipe] = useState<Equipe | null>(null);
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

    const equipeDemo: Equipe = {
      id: equipeId,
      academieId,
      nom: 'U17 Elite',
      categorie: 'U17',
      saison: '2024-2025',
      entraineurPrincipal: 'Jean Dupont',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setPays(paysDemo);
    setAcademie(academieDemo);
    setEquipe(equipeDemo);
    setLoading(false);
  }, [paysId, academieId, equipeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  const basePath = `/pays/${paysId}/academies/${academieId}/equipes/${equipeId}`;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb / Navigation */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux équipes
        </button>
      </div>

      {/* En-tête de l'équipe */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-5xl font-bold">{equipe?.nom}</h1>
              <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary/20 text-primary">
                {equipe?.categorie}
              </span>
            </div>
            <p className="text-lg text-muted-foreground">
              {academie?.nom} • {academie?.ville} • Saison {equipe?.saison}
            </p>
            {equipe?.entraineurPrincipal && (
              <p className="text-muted-foreground mt-1">
                👨‍🏫 Entraîneur: {equipe.entraineurPrincipal}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Hub - Sections principales */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Hub Équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section Effectif et Performances */}
          <Link
            href={`${basePath}/effectif`}
            className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                Effectif et Performances Collectives
              </h3>
              <p className="text-muted-foreground mb-6">
                Gérez les joueurs, consultez les statistiques d'équipe et les performances individuelles
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-500">
                  Joueurs
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-500">
                  Stats équipe
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-500">
                  Performances
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Section Calendrier */}
          <Link
            href={`${basePath}/calendrier`}
            className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold mb-3 group-hover:text-green-500 transition-colors">
                Calendrier Séances et Matchs
              </h3>
              <p className="text-muted-foreground mb-6">
                Planifiez les entraînements et matchs, exportez en PDF ou format ICS
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500">
                  Entraînements
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500">
                  Matchs
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500">
                  Export PDF/ICS
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* Statistiques rapides (optionnel) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Effectif</h3>
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">joueurs actifs</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Bilan</h3>
          </div>
          <p className="text-3xl font-bold">12V - 3N - 2D</p>
          <p className="text-sm text-muted-foreground">cette saison</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Prochain match</h3>
          </div>
          <p className="text-xl font-bold">23 Nov 2024</p>
          <p className="text-sm text-muted-foreground">vs Lyon U17</p>
        </div>
      </div>
    </div>
  );
}

