'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Joueur, PerformanceIndividuelle, Match } from '@/types';
import { ArrowLeft, User, MapPin, TrendingUp, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CarteJoueurPage() {
  const params = useParams();
  const router = useRouter();
  const paysId = params.paysId as string;
  const academieId = params.academieId as string;
  const equipeId = params.equipeId as string;
  const joueurId = params.joueurId as string;

  const [joueur, setJoueur] = useState<Joueur | null>(null);
  const [performances, setPerformances] = useState<PerformanceIndividuelle[]>([]);
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Récupérer les données depuis Firebase
    // Données de démonstration
    const joueurDemo: Joueur = {
      id: joueurId,
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
    };

    const performancesDemo: PerformanceIndividuelle[] = [
      {
        id: '1',
        joueurId,
        matchId: 'm1',
        minutesJouees: 90,
        buts: 2,
        passes: 1,
        tirs: 6,
        dribbles: 8,
        interceptions: 2,
        tacles: 1,
        note: 8.5,
        zonesIntervention: ['Attaque centrale', 'Aile gauche', 'Surface adverse']
      },
      {
        id: '2',
        joueurId,
        matchId: 'm2',
        minutesJouees: 85,
        buts: 1,
        passes: 2,
        tirs: 4,
        dribbles: 6,
        interceptions: 1,
        tacles: 0,
        note: 7.8,
        zonesIntervention: ['Attaque centrale', 'Aile droite']
      }
    ];

    const matchsDemo: Match[] = [
      {
        id: 'm1',
        equipeId,
        adversaire: 'Lyon U17',
        date: new Date('2024-11-10'),
        lieu: 'Domicile',
        competition: 'Championnat',
        resultat: {
          scoreEquipe: 3,
          scoreAdversaire: 1,
          vainqueur: 'Equipe'
        },
        effectif: [joueurId],
        performancesIndividuelles: [],
        performanceEquipe: {
          possession: 62,
          passes: 485,
          tirs: 15,
          corners: 6,
          fautesCommises: 12,
          cartonJaunes: 2,
          cartonRouges: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'm2',
        equipeId,
        adversaire: 'Marseille U17',
        date: new Date('2024-11-03'),
        lieu: 'Exterieur',
        competition: 'Championnat',
        resultat: {
          scoreEquipe: 2,
          scoreAdversaire: 2,
          vainqueur: 'Nul'
        },
        effectif: [joueurId],
        performancesIndividuelles: [],
        performanceEquipe: {
          possession: 55,
          passes: 420,
          tirs: 12,
          corners: 4,
          fautesCommises: 15,
          cartonJaunes: 3,
          cartonRouges: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setJoueur(joueurDemo);
    setPerformances(performancesDemo);
    setMatchs(matchsDemo);
    setLoading(false);
  }, [joueurId, equipeId]);

  if (loading || !joueur) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  const basePath = `/pays/${paysId}/academies/${academieId}/equipes/${equipeId}`;

  // Calcul des statistiques moyennes
  const statsMatch = performances.length > 0 ? {
    noteMoyenne: (performances.reduce((acc, p) => acc + p.note, 0) / performances.length).toFixed(1),
    butsTotal: performances.reduce((acc, p) => acc + p.buts, 0),
    passesTotal: performances.reduce((acc, p) => acc + p.passes, 0),
    minutesMoyennes: Math.round(performances.reduce((acc, p) => acc + p.minutesJouees, 0) / performances.length)
  } : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <button
          onClick={() => router.push(`${basePath}/effectif`)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'effectif
        </button>
      </div>

      {/* En-tête joueur */}
      <div className="mb-8 rounded-xl border bg-card p-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {joueur.photo ? (
              <img src={joueur.photo} alt={`${joueur.prenom} ${joueur.nom}`} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="h-12 w-12 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {joueur.prenom} {joueur.nom}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {joueur.postePrincipal}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/20 text-primary">
                #{joueur.id}
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-muted">
                {joueur.nationalite}
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-muted">
                {joueur.age} ans
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs pour les différentes sections */}
      <Tabs defaultValue="profil" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="profil" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="poste" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Poste
          </TabsTrigger>
          <TabsTrigger value="match" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Matchs
          </TabsTrigger>
          <TabsTrigger value="athletique" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Athlétique
          </TabsTrigger>
        </TabsList>

        {/* Onglet Profil */}
        <TabsContent value="profil" className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nom complet</p>
                <p className="text-lg font-semibold">{joueur.prenom} {joueur.nom}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date de naissance</p>
                <p className="text-lg font-semibold">
                  {joueur.dateNaissance.toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Âge</p>
                <p className="text-lg font-semibold">{joueur.age} ans</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nationalité</p>
                <p className="text-lg font-semibold">{joueur.nationalite}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taille</p>
                <p className="text-lg font-semibold">{joueur.taille} cm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Poids</p>
                <p className="text-lg font-semibold">{joueur.poids} kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pied fort</p>
                <p className="text-lg font-semibold">{joueur.piedFort}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Poste */}
        <TabsContent value="poste" className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Positions</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Poste principal</p>
                <div className="inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-lg">
                  {joueur.postePrincipal}
                </div>
              </div>
              {joueur.postesSecondaires.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Postes secondaires</p>
                  <div className="flex flex-wrap gap-2">
                    {joueur.postesSecondaires.map((poste, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-lg bg-muted font-semibold">
                        {poste}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Terrain visuel (optionnel) */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-bold mb-4">Position sur le terrain</h3>
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto bg-green-600/20 rounded-lg border-2 border-white/20">
              {/* Simulation simple d'un terrain */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  <User className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/30"></div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Zone d'évolution principale: {joueur.postePrincipal}
            </p>
          </div>
        </TabsContent>

        {/* Onglet Match */}
        <TabsContent value="match" className="space-y-6">
          {/* Statistiques globales */}
          {statsMatch && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Matchs joués</p>
                <p className="text-3xl font-bold">{performances.length}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Note moyenne</p>
                <p className="text-3xl font-bold text-primary">{statsMatch.noteMoyenne}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Buts</p>
                <p className="text-3xl font-bold text-green-600">{statsMatch.butsTotal}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Passes D.</p>
                <p className="text-3xl font-bold text-blue-600">{statsMatch.passesTotal}</p>
              </div>
            </div>
          )}

          {/* Liste des performances */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Performances par match</h2>
            <div className="space-y-4">
              {performances.map((perf, idx) => {
                const match = matchs.find(m => m.id === perf.matchId);
                return (
                  <div key={perf.id} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">
                          vs {match?.adversaire || 'Adversaire'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {match?.date.toLocaleDateString('fr-FR')} • {match?.lieu} • {match?.competition}
                        </p>
                        {match?.resultat && (
                          <p className="text-sm font-semibold mt-1">
                            Score: {match.resultat.scoreEquipe} - {match.resultat.scoreAdversaire}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{perf.note}</div>
                        <p className="text-xs text-muted-foreground">Note</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Minutes</p>
                        <p className="font-bold">{perf.minutesJouees}'</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Buts</p>
                        <p className="font-bold text-green-600">{perf.buts}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Passes D.</p>
                        <p className="font-bold text-blue-600">{perf.passes}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tirs</p>
                        <p className="font-bold">{perf.tirs}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dribbles</p>
                        <p className="font-bold">{perf.dribbles}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interceptions</p>
                        <p className="font-bold">{perf.interceptions}</p>
                      </div>
                    </div>
                    {perf.zonesIntervention.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground mb-1">Zones d'intervention</p>
                        <div className="flex flex-wrap gap-1">
                          {perf.zonesIntervention.map((zone, zIdx) => (
                            <span key={zIdx} className="px-2 py-0.5 text-xs rounded bg-primary/20 text-primary">
                              {zone}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {performances.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Aucune performance enregistrée
              </p>
            )}
          </div>
        </TabsContent>

        {/* Onglet Athlétique */}
        <TabsContent value="athletique" className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Capacités athlétiques</h2>
              <p className="text-sm text-muted-foreground">
                Dernière évaluation: {joueur.athletique.derniereEvaluation.toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div className="space-y-6">
              {/* VMA */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">VMA (Vitesse Maximale Aérobie)</span>
                  <span className="font-bold text-primary">{joueur.athletique.vma} km/h</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(joueur.athletique.vma / 20) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Détente */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Détente verticale</span>
                  <span className="font-bold text-primary">{joueur.athletique.detente} cm</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(joueur.athletique.detente / 80) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Force */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Force</span>
                  <span className="font-bold text-primary">{joueur.athletique.force}/100</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all"
                    style={{ width: `${joueur.athletique.force}%` }}
                  ></div>
                </div>
              </div>

              {/* Endurance */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Endurance</span>
                  <span className="font-bold text-primary">{joueur.athletique.endurance}/100</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                    style={{ width: `${joueur.athletique.endurance}%` }}
                  ></div>
                </div>
              </div>

              {/* Vitesse */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Vitesse</span>
                  <span className="font-bold text-primary">{joueur.athletique.vitesse}/100</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all"
                    style={{ width: `${joueur.athletique.vitesse}%` }}
                  ></div>
                </div>
              </div>

              {/* Agilité */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Agilité</span>
                  <span className="font-bold text-primary">{joueur.athletique.agilite}/100</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                    style={{ width: `${joueur.athletique.agilite}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphique radar (simplifié) */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-bold mb-4">Profil physique</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-red-500/10">
                <div className="text-3xl font-bold text-red-600 mb-1">{joueur.athletique.force}</div>
                <div className="text-sm font-medium">Force</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-500/10">
                <div className="text-3xl font-bold text-green-600 mb-1">{joueur.athletique.endurance}</div>
                <div className="text-sm font-medium">Endurance</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                <div className="text-3xl font-bold text-yellow-600 mb-1">{joueur.athletique.vitesse}</div>
                <div className="text-sm font-medium">Vitesse</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-500/10">
                <div className="text-3xl font-bold text-purple-600 mb-1">{joueur.athletique.agilite}</div>
                <div className="text-sm font-medium">Agilité</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-500/10">
                <div className="text-3xl font-bold text-blue-600 mb-1">{joueur.athletique.vma}</div>
                <div className="text-sm font-medium">VMA (km/h)</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-500/10">
                <div className="text-3xl font-bold text-orange-600 mb-1">{joueur.athletique.detente}</div>
                <div className="text-sm font-medium">Détente (cm)</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

