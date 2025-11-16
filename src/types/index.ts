// Types pour l'architecture hiérarchique du site

export interface Pays {
  id: string;
  nom: string;
  code: string; // ex: "FR", "ES", etc.
  drapeau?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Academie {
  id: string;
  paysId: string;
  nom: string;
  ville: string;
  adresse?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Equipe {
  id: string;
  academieId: string;
  nom: string;
  categorie: string; // ex: "U17", "U19", "Senior", etc.
  saison: string; // ex: "2024-2025"
  logo?: string;
  entraineurPrincipal?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Joueur {
  id: string;
  equipeId: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  age: number;
  nationalite: string;
  photo?: string;
  
  // Profil joueur
  taille: number; // en cm
  poids: number; // en kg
  piedFort: 'Gauche' | 'Droit' | 'Ambidextre';
  
  // Poste
  postePrincipal: string; // ex: "Attaquant", "Milieu", etc.
  postesSecondaires: string[];
  
  // Données athlétiques
  athletique: {
    vma: number; // Vitesse maximale aérobie
    detente: number; // en cm
    force: number;
    endurance: number;
    vitesse: number;
    agilite: number;
    derniereEvaluation: Date;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

export interface PerformanceCollective {
  id: string;
  equipeId: string;
  matchsJoues: number;
  victoires: number;
  nuls: number;
  defaites: number;
  butsMarques: number;
  butsEncaisses: number;
  possession: number; // pourcentage moyen
  passes: number;
  tirs: number;
  saison: string;
}

export interface PerformanceIndividuelle {
  id: string;
  joueurId: string;
  matchId: string;
  minutesJouees: number;
  buts: number;
  passes: number;
  tirs: number;
  dribbles: number;
  interceptions: number;
  tacles: number;
  note: number; // note sur 10
  zonesIntervention: string[]; // zones du terrain où le joueur intervient le plus
}

export interface Match {
  id: string;
  equipeId: string;
  adversaire: string;
  date: Date;
  lieu: 'Domicile' | 'Exterieur';
  competition: string; // ex: "Championnat", "Coupe", etc.
  resultat?: {
    scoreEquipe: number;
    scoreAdversaire: number;
    vainqueur: 'Equipe' | 'Adversaire' | 'Nul';
  };
  effectif: string[]; // IDs des joueurs
  performancesIndividuelles: PerformanceIndividuelle[];
  performanceEquipe: {
    possession: number;
    passes: number;
    tirs: number;
    corners: number;
    fautesCommises: number;
    cartonJaunes: number;
    cartonRouges: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Seance {
  id: string;
  equipeId: string;
  titre: string;
  description?: string;
  date: Date;
  duree: number; // en minutes
  lieu: string;
  type: 'Entrainement' | 'Match' | 'Reunion' | 'Autre';
  participantsAttendus: string[]; // IDs des joueurs
  participantsPresents?: string[]; // IDs des joueurs présents
  createdAt: Date;
  updatedAt: Date;
}

export interface Calendrier {
  id: string;
  equipeId: string;
  seances: Seance[];
  matchs: Match[];
}

