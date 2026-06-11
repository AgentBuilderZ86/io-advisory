# COSUMAR — Mission Roadmap IA & CorpGPT

Application web de la mission **Sia × Cosumar** : élaboration de la feuille de route IA
pluriannuelle et sensibilisation du management. Mission de **18 semaines (4,5 mois)**, **4 phases**.

> Opérateur sucrier marocain, leader au Maroc et acteur de référence en Afrique.
> Mission confidentielle.

## 🚀 Ouvrir l'application

Ouvrez **`index.html`** dans un navigateur (hub de la mission), ou déployez le dossier
sur GitHub Pages. Les outils sont 100 % statiques (HTML/CSS/JS, aucune dépendance serveur).

```
index.html                        ← Hub de la mission
tools/
  dashboard-copil.html            ← Pilotage : Gantt 18 sem., livrables, risques, décisions, allocation
  dashboard-entretiens.html       ← Phase 2 : suivi des 42 entretiens, 8 directions, pain points
  use-cases-ia.html               ← Phase 3 : 10 UC, prérequis, ROI, risques, funnel 3 filtres, Go/No-Go
  roadmap-builder.html            ← Phase 3 : roadmap 3 vagues (drag & drop), budgets, export CSV
  simulateur-coe.html             ← Phase 4 : staffing/budget CoE, RACI, Charte IA, plan compétences
assets/
  sia.css  sia.js                 ← Design system Sia (palette navy/teal, Syne + DM Sans)
excel/
  build_excels.py                 ← Générateur des 4 classeurs Excel
  *.xlsx                          ← Classeurs générés (branding Sia, radars & bar charts)
```

## 🧭 Les 4 phases

| Phase | Période | Objet |
|-------|---------|-------|
| 1 — Acculturation | S1–S4 | Séminaire C-Level, 50 Champions IA, sessions 1-to-1, kits com |
| 2 — Diagnostic | S3–S6 | 42 entretiens, audit SI, maturité IA & Data, benchmark 14 opérateurs |
| 3 — Stratégie & Roadmap | S6–S11 | Co-identification UC, funnel 3 filtres, scoring, roadmap 3 vagues |
| 4 — Operating Model | S12–S16 | CoE hub-and-spoke, gouvernance, Charte IA, plan compétences 24 m |

## 📊 Classeurs Excel

Régénérer les 4 classeurs (radars & bar charts inclus) :

```bash
pip install openpyxl
python3 excel/build_excels.py
```

- `Scoring_Maturite_IA.xlsx` — 8 dimensions × 5 niveaux, radar Actuel/Cible
- `Scoring_Maturite_Data.xlsx` — 9 dimensions × 6 niveaux (35 questions), radar
- `Grille_Audit_SI_Benchmark.xlsx` — 13 systèmes + benchmark 14 opérateurs sucriers
- `Matrice_Priorisation.xlsx` — scoring pondéré, ranking auto, méthodologie

## 🧩 Frameworks Sia mobilisés

- **AI Roadmap 360** — 7 axes (Strategy, Value, Organization, People & Culture, Governance, Engineering, Data)
- **Maturité IA** (8 dim. × 5 niveaux) & **Maturité Data** (9 dim. × 6 niveaux)
- **Priorisation** — scoring multicritère pondéré + funnel 3 filtres
- **CoE** hub-and-spoke — 4 rôles : Persuader / Informer / Standardiser / Innover
- **Build / Buy / Borrow / Bot** — cadre de décision par use case
- **IA Responsable** — 8 principes, alignement Morocco AI 2030 / EU AI Act / UNESCO

## 🔐 Contraintes réglementaires

Conformité **CNDP**, hébergement souverain marocain pour les données sensibles,
alignement **Morocco AI 2030** / **Digital Morocco 2030**, éthique IA
(équité, transparence, explicabilité).

---

*Sia Partners — Casablanca · © 2026 · Confidentiel Cosumar*
