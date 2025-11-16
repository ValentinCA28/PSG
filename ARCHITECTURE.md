# Architecture du Site - Académie de Football

## Vue d'ensemble

Ce projet implémente une architecture hiérarchique pour la gestion d'académies de football, suivant le diagramme suivant :

```
Pays
  └── Académies du pays
       └── Équipes de l'académie
            └── Hub équipe
                 ├── Effectif et performances collectives
                 │    └── Carte joueur
                 │         ├── Profil joueur
                 │         ├── Poste
                 │         ├── Match
                 │         └── Athlétique
                 └── Calendrier séances et matchs (export PDF/ICS)
```

## Structure des Routes

### Hiérarchie Principale

1. **`/pays`** - Liste des pays
2. **`/pays/[paysId]/academies`** - Académies d'un pays spécifique
3. **`/pays/[paysId]/academies/[academieId]/equipes`** - Équipes d'une académie
4. **`/pays/[paysId]/academies/[academieId]/equipes/[equipeId]`** - Hub de l'équipe

### Hub Équipe - Sections

Depuis le hub de l'équipe (`/pays/[paysId]/academies/[academieId]/equipes/[equipeId]`), deux sections principales sont accessibles :

#### 1. Effectif et Performances Collectives
**Route :** `/pays/[paysId]/academies/[academieId]/equipes/[equipeId]/effectif`

Cette section affiche :
- Statistiques collectives de l'équipe (victoires, défaites, buts marqués/encaissés, etc.)
- Liste complète des joueurs de l'effectif
- Lien vers la carte de chaque joueur

#### 2. Carte Joueur
**Route :** `/pays/[paysId]/academies/[academieId]/equipes/[equipeId]/effectif/joueurs/[joueurId]`

Système d'onglets avec 4 sections :

##### Onglet 1 : Profil
- Nom, prénom, âge
- Date de naissance
- Nationalité
- Taille, poids
- Pied fort

##### Onglet 2 : Poste
- Poste principal
- Postes secondaires
- Visualisation des zones d'évolution sur le terrain

##### Onglet 3 : Match - Performances
- Liste des performances par match
- Statistiques : buts, passes décisives, tirs, dribbles, interceptions, tacles
- Note moyenne par match
- Zones d'intervention

##### Onglet 4 : Athlétique
- VMA (Vitesse Maximale Aérobie)
- Détente verticale
- Force, endurance, vitesse, agilité
- Visualisation en barres de progression
- Date de dernière évaluation

#### 3. Calendrier Séances et Matchs
**Route :** `/pays/[paysId]/academies/[academieId]/equipes/[equipeId]/calendrier`

Cette section permet de :
- Visualiser tous les événements (séances d'entraînement et matchs)
- Voir les détails de chaque événement (date, lieu, durée, participants)
- **Exporter en PDF** : version imprimable du calendrier
- **Exporter en ICS** : format compatible avec Google Calendar, Outlook, Apple Calendar, etc.

## Types de Données

### Entités Principales

#### Pays
```typescript
{
  id: string;
  nom: string;
  code: string; // "FR", "ES", etc.
  drapeau?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Académie
```typescript
{
  id: string;
  paysId: string;
  nom: string;
  ville: string;
  adresse?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Équipe
```typescript
{
  id: string;
  academieId: string;
  nom: string;
  categorie: string; // "U17", "U19", "Senior"
  saison: string; // "2024-2025"
  logo?: string;
  entraineurPrincipal?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Joueur
```typescript
{
  id: string;
  equipeId: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  age: number;
  nationalite: string;
  photo?: string;
  taille: number; // cm
  poids: number; // kg
  piedFort: 'Gauche' | 'Droit' | 'Ambidextre';
  postePrincipal: string;
  postesSecondaires: string[];
  athletique: {
    vma: number;
    detente: number;
    force: number;
    endurance: number;
    vitesse: number;
    agilite: number;
    derniereEvaluation: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Performance Collective
```typescript
{
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
```

#### Match
```typescript
{
  id: string;
  equipeId: string;
  adversaire: string;
  date: Date;
  lieu: 'Domicile' | 'Exterieur';
  competition: string;
  resultat?: {
    scoreEquipe: number;
    scoreAdversaire: number;
    vainqueur: 'Equipe' | 'Adversaire' | 'Nul';
  };
  effectif: string[]; // IDs des joueurs
  performancesIndividuelles: PerformanceIndividuelle[];
  performanceEquipe: { ... };
  createdAt: Date;
  updatedAt: Date;
}
```

#### Séance
```typescript
{
  id: string;
  equipeId: string;
  titre: string;
  description?: string;
  date: Date;
  duree: number; // minutes
  lieu: string;
  type: 'Entrainement' | 'Match' | 'Reunion' | 'Autre';
  participantsAttendus: string[];
  participantsPresents?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Composants de Navigation

### Breadcrumb
Composant pour afficher le fil d'Ariane dans les pages.

```tsx
<Breadcrumb items={[
  { label: 'Pays', href: '/pays' },
  { label: 'France', href: `/pays/${paysId}/academies` },
  { label: 'Académie PSG', href: `/pays/${paysId}/academies/${academieId}/equipes` },
  { label: 'U17 Elite' }
]} />
```

### HierarchyNav
Composant de navigation hiérarchique avec icônes.

```tsx
<HierarchyNav levels={[
  { label: 'France', href: `/pays/${paysId}/academies`, icon: '🇫🇷' },
  { label: 'Académie PSG', href: `/pays/${paysId}/academies/${academieId}/equipes` },
  { label: 'U17 Elite', href: basePath }
]} />
```

### Navigation
Sidebar de navigation principale du site.

## Fonctionnalités d'Export

### Export ICS (Calendrier)
Le calendrier peut être exporté au format ICS (iCalendar), compatible avec :
- Google Calendar
- Microsoft Outlook
- Apple Calendar
- Tout autre logiciel supportant le format RFC 5545

L'export inclut :
- Tous les matchs avec adversaire, lieu, compétition
- Toutes les séances d'entraînement avec durée, lieu, description
- Format standard permettant l'importation dans n'importe quel calendrier

### Export PDF (Calendrier)
Version imprimable du calendrier (à implémenter).

## Intégration Firebase

Tous les types de données sont conçus pour être stockés dans Firestore avec les collections suivantes :

```
/pays/{paysId}
/academies/{academieId}
/equipes/{equipeId}
/joueurs/{joueurId}
/matchs/{matchId}
/seances/{seanceId}
/performances-collectives/{performanceId}
/performances-individuelles/{performanceId}
```

## Prochaines Étapes

1. ✅ Structure hiérarchique des pages
2. ✅ Types TypeScript pour les données
3. ✅ Pages Effectif et Performances collectives
4. ✅ Carte joueur avec onglets (Profil, Poste, Match, Athlétique)
5. ✅ Calendrier avec export ICS
6. ✅ Composants de navigation

### À implémenter

- [ ] Connexion Firebase Firestore pour les données réelles
- [ ] Formulaires d'ajout/modification de joueurs, équipes, matchs, séances
- [ ] Export PDF du calendrier
- [ ] Graphiques et visualisations de statistiques avancées
- [ ] Système de notifications pour les événements à venir
- [ ] Module de gestion des présences aux séances
- [ ] Système d'évaluation et de suivi des progrès des joueurs
- [ ] Module de communication (messages entre entraîneurs, joueurs, parents)

