'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Joueur, PerformanceCollective } from '@/types';
import { ArrowLeft, User, TrendingUp, Award } from 'lucide-react';

export default function EffectifPage() {
  const params = useParams();
  const router = useRouter();
  const paysId = params.paysId as string;
  const academieId = params.academieId as string;
  const equipeId = params.equipeId as string;

  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [performance, setPerformance] = useState<PerformanceCollective | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Récupérer les données depuis Firebase
    // Données de démonstration
    const joueursDemo: Joueur[] = [
      {
        id: '1',
        equipeId,
        nom: 'Mbappé',
        prenom: 'Kylian',
        dateNaissance: new Date('2006-01-15'),
        age: 17,
        nationalite: 'France',
        taille: 178,
        poids: 73,
        piedFort: 'Droit',
        postePrincipal: 'Attaquant',
        postesSecondaires: ['Ailier gauche', 'Ailier droit'],
        athletique: {
          vma: 18.5,
          detente: 65,
          force: 85,
          endurance: 88,
          vitesse: 95,
          agilite: 92,
          derniereEvaluation: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        equipeId,
        nom: 'Neymar',
        prenom: 'Junior',
        dateNaissance: new Date('2006-03-20'),
        age: 17,
        nationalite: 'Brésil',
        taille: 175,
        poids: 68,
        piedFort: 'Droit',
        postePrincipal: 'Milieu offensif',
        postesSecondaires: ['Ailier gauche'],
        athletique: {
          vma: 17.8,
          detente: 58,
          force: 75,
          endurance: 85,
          vitesse: 88,
          agilite: 95,
          derniereEvaluation: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        equipeId,
        nom: 'Verratti',
        prenom: 'Marco',
        dateNaissance: new Date('2006-05-10'),
        age: 17,
        nationalite: 'Italie',
        taille: 165,
        poids: 60,
        piedFort: 'Droit',
        postePrincipal: 'Milieu défensif',
        postesSecondaires: ['Milieu relayeur'],
        athletique: {
          vma: 17.2,
          detente: 52,
          force: 70,
          endurance: 90,
          vitesse: 82,
          agilite: 88,
          derniereEvaluation: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const performanceDemo: PerformanceCollective = {
      id: '1',
      equipeId,
      matchsJoues: 17,
      victoires: 12,
      nuls: 3,
      defaites: 2,
      butsMarques: 45,
      butsEncaisses: 18,
      possession: 58,
      passes: 12450,
      tirs: 285,
      saison: '2024-2025'
    };

    setJoueurs(joueursDemo);
    setPerformance(performanceDemo);
    setLoading(false);
  }, [equipeId]);

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
      {/* Navigation */}
      <div className="mb-6">
        <button
          onClick={() => router.push(basePath)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au hub équipe
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8">Effectif et Performances Collectives</h1>

      {/* Performances collectives */}
      {performance && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Statistiques de l'équipe - Saison {performance.saison}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Matchs</p>
              <p className="text-3xl font-bold">{performance.matchsJoues}</p>
            </div>
            <div className="rounded-lg border bg-green-500/10 border-green-500/20 p-4">
              <p className="text-sm text-green-600 mb-1">Victoires</p>
              <p className="text-3xl font-bold text-green-600">{performance.victoires}</p>
            </div>
            <div className="rounded-lg border bg-yellow-500/10 border-yellow-500/20 p-4">
              <p className="text-sm text-yellow-600 mb-1">Nuls</p>
              <p className="text-3xl font-bold text-yellow-600">{performance.nuls}</p>
            </div>
            <div className="rounded-lg border bg-red-500/10 border-red-500/20 p-4">
              <p className="text-sm text-red-600 mb-1">Défaites</p>
              <p className="text-3xl font-bold text-red-600">{performance.defaites}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Buts marqués</p>
              <p className="text-3xl font-bold text-primary">{performance.butsMarques}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Buts encaissés</p>
              <p className="text-3xl font-bold">{performance.butsEncaisses}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Possession moyenne</p>
              <p className="text-2xl font-bold">{performance.possession}%</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Total passes</p>
              <p className="text-2xl font-bold">{performance.passes.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Total tirs</p>
              <p className="text-2xl font-bold">{performance.tirs}</p>
            </div>
          </div>
        </div>
      )}

      {/* Liste des joueurs */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Effectif ({joueurs.length} joueurs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joueurs.map((joueur) => (
            <Link
              key={joueur.id}
              href={`${basePath}/effectif/joueurs/${joueur.id}`}
              className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                {/* Photo / Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {joueur.photo ? (
                      <img src={joueur.photo} alt={`${joueur.prenom} ${joueur.nom}`} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors truncate">
                      {joueur.prenom} {joueur.nom}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {joueur.postePrincipal}
                    </p>
                  </div>
                </div>

                {/* Infos rapides */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Âge:</span>
                    <span className="font-medium">{joueur.age} ans</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nationalité:</span>
                    <span className="font-medium">{joueur.nationalite}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taille/Poids:</span>
                    <span className="font-medium">{joueur.taille}cm / {joueur.poids}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pied fort:</span>
                    <span className="font-medium">{joueur.piedFort}</span>
                  </div>
                </div>

                {/* Indicateurs athlétiques */}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Profil athlétique
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Vitesse</p>
                      <p className="font-bold text-primary">{joueur.athletique.vitesse}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Endurance</p>
                      <p className="font-bold text-primary">{joueur.athletique.endurance}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Agilité</p>
                      <p className="font-bold text-primary">{joueur.athletique.agilite}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {joueurs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun joueur dans l'effectif
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

