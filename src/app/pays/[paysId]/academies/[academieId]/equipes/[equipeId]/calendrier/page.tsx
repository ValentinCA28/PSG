'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Match, Seance, Calendrier } from '@/types';
import { ArrowLeft, Calendar, Download, FileText, Plus } from 'lucide-react';

export default function CalendrierPage() {
  const params = useParams();
  const router = useRouter();
  const paysId = params.paysId as string;
  const academieId = params.academieId as string;
  const equipeId = params.equipeId as string;

  const [calendrier, setCalendrier] = useState<Calendrier | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    // TODO: Récupérer les données depuis Firebase
    // Données de démonstration
    const matchsDemo: Match[] = [
      {
        id: 'm1',
        equipeId,
        adversaire: 'Lyon U17',
        date: new Date('2024-11-23'),
        lieu: 'Domicile',
        competition: 'Championnat',
        resultat: undefined,
        effectif: [],
        performancesIndividuelles: [],
        performanceEquipe: {
          possession: 0,
          passes: 0,
          tirs: 0,
          corners: 0,
          fautesCommises: 0,
          cartonJaunes: 0,
          cartonRouges: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'm2',
        equipeId,
        adversaire: 'Marseille U17',
        date: new Date('2024-11-30'),
        lieu: 'Exterieur',
        competition: 'Championnat',
        resultat: undefined,
        effectif: [],
        performancesIndividuelles: [],
        performanceEquipe: {
          possession: 0,
          passes: 0,
          tirs: 0,
          corners: 0,
          fautesCommises: 0,
          cartonJaunes: 0,
          cartonRouges: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'm3',
        equipeId,
        adversaire: 'Nice U17',
        date: new Date('2024-12-07'),
        lieu: 'Domicile',
        competition: 'Coupe',
        resultat: undefined,
        effectif: [],
        performancesIndividuelles: [],
        performanceEquipe: {
          possession: 0,
          passes: 0,
          tirs: 0,
          corners: 0,
          fautesCommises: 0,
          cartonJaunes: 0,
          cartonRouges: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const seancesDemo: Seance[] = [
      {
        id: 's1',
        equipeId,
        titre: 'Entraînement tactique',
        description: 'Travail sur les schémas offensifs',
        date: new Date('2024-11-18'),
        duree: 90,
        lieu: 'Terrain annexe',
        type: 'Entrainement',
        participantsAttendus: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 's2',
        equipeId,
        titre: 'Préparation physique',
        description: 'Renforcement musculaire et cardio',
        date: new Date('2024-11-20'),
        duree: 60,
        lieu: 'Salle de sport',
        type: 'Entrainement',
        participantsAttendus: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 's3',
        equipeId,
        titre: 'Séance technique',
        description: 'Travail individuel sur les gestes techniques',
        date: new Date('2024-11-22'),
        duree: 75,
        lieu: 'Terrain principal',
        type: 'Entrainement',
        participantsAttendus: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 's4',
        equipeId,
        titre: 'Briefing tactique',
        description: 'Analyse vidéo du prochain adversaire',
        date: new Date('2024-11-25'),
        duree: 45,
        lieu: 'Salle de réunion',
        type: 'Reunion',
        participantsAttendus: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const calendrierDemo: Calendrier = {
      id: '1',
      equipeId,
      seances: seancesDemo,
      matchs: matchsDemo
    };

    setCalendrier(calendrierDemo);
    setLoading(false);
  }, [equipeId]);

  const handleExportPDF = () => {
    // TODO: Implémenter l'export PDF
    alert('Export PDF en cours de développement');
  };

  const handleExportICS = () => {
    if (!calendrier) return;

    // Générer le fichier ICS
    let icsContent = 'BEGIN:VCALENDAR\n';
    icsContent += 'VERSION:2.0\n';
    icsContent += 'PRODID:-//Académie//Calendrier Équipe//FR\n';
    icsContent += 'CALSCALE:GREGORIAN\n';

    // Ajouter les matchs
    calendrier.matchs.forEach(match => {
      const startDate = match.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      icsContent += 'BEGIN:VEVENT\n';
      icsContent += `UID:match-${match.id}@academie.fr\n`;
      icsContent += `DTSTAMP:${startDate}\n`;
      icsContent += `DTSTART:${startDate}\n`;
      icsContent += `SUMMARY:Match vs ${match.adversaire}\n`;
      icsContent += `DESCRIPTION:${match.competition} - ${match.lieu}\n`;
      icsContent += `LOCATION:${match.lieu}\n`;
      icsContent += 'END:VEVENT\n';
    });

    // Ajouter les séances
    calendrier.seances.forEach(seance => {
      const startDate = seance.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      icsContent += 'BEGIN:VEVENT\n';
      icsContent += `UID:seance-${seance.id}@academie.fr\n`;
      icsContent += `DTSTAMP:${startDate}\n`;
      icsContent += `DTSTART:${startDate}\n`;
      icsContent += `SUMMARY:${seance.titre}\n`;
      icsContent += `DESCRIPTION:${seance.description || ''}\n`;
      icsContent += `LOCATION:${seance.lieu}\n`;
      icsContent += `DURATION:PT${seance.duree}M\n`;
      icsContent += 'END:VEVENT\n';
    });

    icsContent += 'END:VCALENDAR';

    // Télécharger le fichier
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `calendrier-equipe-${equipeId}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !calendrier) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  const basePath = `/pays/${paysId}/academies/${academieId}/equipes/${equipeId}`;

  // Combiner et trier tous les événements
  const allEvents = [
    ...calendrier.matchs.map(m => ({ ...m, type: 'match' as const })),
    ...calendrier.seances.map(s => ({ ...s, type: 'seance' as const }))
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

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

      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Calendrier</h1>
          <p className="text-muted-foreground">
            Séances d'entraînement et matchs planifiés
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </button>
          <button
            onClick={handleExportICS}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            Export ICS
          </button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Total événements</h3>
          </div>
          <p className="text-3xl font-bold">{allEvents.length}</p>
        </div>
        <div className="rounded-lg border bg-blue-500/10 border-blue-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Entraînements</h3>
          </div>
          <p className="text-3xl font-bold text-blue-500">{calendrier.seances.length}</p>
        </div>
        <div className="rounded-lg border bg-green-500/10 border-green-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Matchs</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">{calendrier.matchs.length}</p>
        </div>
      </div>

      {/* Liste des événements */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Événements à venir</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {allEvents.map((event) => {
            if (event.type === 'match') {
              const match = event as Match & { type: 'match' };
              return (
                <div
                  key={`match-${match.id}`}
                  className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 hover:bg-green-500/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-green-500 text-white">
                          MATCH
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded bg-muted">
                          {match.competition}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded bg-muted">
                          {match.lieu}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">
                        vs {match.adversaire}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        📅 {match.date.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} à {match.date.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                      {match.resultat && (
                        <div className="mt-2 text-sm font-semibold">
                          Score: {match.resultat.scoreEquipe} - {match.resultat.scoreAdversaire}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            } else {
              const seance = event as Seance & { type: 'seance' };
              const typeColors = {
                'Entrainement': 'blue',
                'Match': 'green',
                'Reunion': 'purple',
                'Autre': 'gray'
              };
              const color = typeColors[seance.type] || 'gray';

              return (
                <div
                  key={`seance-${seance.id}`}
                  className={`rounded-lg border border-${color}-500/20 bg-${color}-500/5 p-4 hover:bg-${color}-500/10 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded bg-${color}-500 text-white`}>
                          {seance.type.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded bg-muted">
                          {seance.duree} min
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">
                        {seance.titre}
                      </h3>
                      {seance.description && (
                        <p className="text-sm mb-2">
                          {seance.description}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        📅 {seance.date.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} à {seance.date.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        📍 {seance.lieu}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {allEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Aucun événement planifié pour le moment
            </p>
          </div>
        )}
      </div>

      {/* Instructions d'export */}
      <div className="mt-8 p-4 rounded-lg bg-muted">
        <h3 className="font-semibold mb-2">📥 Exports disponibles</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            <strong>PDF:</strong> Téléchargez une version imprimable du calendrier
          </li>
          <li>
            <strong>ICS:</strong> Importez le calendrier dans votre application favorite (Google Calendar, Outlook, Apple Calendar, etc.)
          </li>
        </ul>
      </div>
    </div>
  );
}

