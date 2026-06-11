# COSUMAR — Mission Roadmap IA & CorpGPT

Application web de la mission **Sia × Cosumar** : élaboration de la feuille de route IA
pluriannuelle et sensibilisation du management. Mission de **18 semaines (4,5 mois)**, **4 phases**.

> Opérateur sucrier marocain, leader au Maroc et acteur de référence en Afrique.
> Mission confidentielle.

## 🚀 Ouvrir l'application

Ouvrez **`index.html`** dans un navigateur (hub de la mission), ou déployez le dossier
sur GitHub Pages. Les outils sont 100 % statiques (HTML/CSS/JS, aucune dépendance serveur).

```
index.html                        ← Hub de la mission (+ sauvegarde/restauration JSON)
tools/
  executive-story.html            ← Premium : narration plein écran CODIR (10 slides) + export deck PDF
  corpgpt.html                    ← Premium : assistant IA conversationnel (RAG local sur la base mission)
  jumeau-usine.html               ← Premium : jumeau visuel de la sucrerie, UC cartographiés sur les équipements
  monte-carlo.html                ← Premium : simulation probabiliste du portefeuille (P10/P50/P90)
  acculturation.html              ← Phase 1 : séminaire C-Level, 50 Champions (3 cohortes × 6 modules), 1-to-1, com
  dashboard-copil.html            ← Pilotage : Gantt 18 sem., livrables, risques, décisions, allocation
  dashboard-entretiens.html       ← Phase 2 : suivi des 42 entretiens, 8 directions, pain points
  use-cases-ia.html               ← Phase 3 : 10 UC, prérequis, ROI, risques, funnel 3 filtres, Go/No-Go
  roi-business-case.html          ← Phase 3 : ROI Build vs Buy, TCO, VAN/NPV, payback, cash-flow cumulé
  roadmap-builder.html            ← Phase 3 : roadmap 3 vagues (drag & drop), budgets, export CSV
  simulateur-coe.html             ← Phase 4 : staffing/budget CoE, RACI, Charte IA, plan compétences
  conformite.html                 ← Transversal : référentiels locaux/intl, EU AI Act, AIPD/DPIA, souveraineté
  compliance-copilot.html         ← Transversal : génération auto des AIPD/DPIA pré-remplies par UC + export
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

## 🛡️ Conformité & réglementation

Le module **`tools/conformite.html`** centralise les aspects de conformité, traités
*by design* à chaque phase de la mission :

**Réglementation locale 🇲🇦**
- **CNDP — Loi 09-08** (protection des données personnelles)
- **Loi 05-20** cybersécurité & **DGSSI / DNSSI**
- **Morocco AI 2030** / **Digital Morocco 2030**
- **Code du travail** (encadrement people analytics / RH)

**Réglementation & standards internationaux 🌍**
- **EU AI Act** (Règlement UE 2024/1689) — classification par niveau de risque
- **RGPD / GDPR** (AIPD art. 35, décision automatisée art. 22)
- **UNESCO** — Recommandation sur l'éthique de l'IA · **OCDE** — Principes IA
- **ISO/IEC 42001** (management de l'IA), **ISO/IEC 27001** (sécurité), **NIST AI RMF**

**Compliance Copilot** (`tools/compliance-copilot.html`) — **génère automatiquement une
AIPD/DPIA pré-remplie** par use case (profils de conformité des 10 UC) : identification du
traitement, finalités, base légale, catégories de données & personnes concernées, résidence
& conservation, mesures de sécurité, **classification & obligations EU AI Act**, table
d'évaluation des risques (probabilité × gravité, risque initial → résiduel) et **avis du DPO**
(favorable / sous conditions). Export **Markdown** et **PDF** (impression). Document éditable
(organisation, DPO, référence).

**Fonctionnalités du module Conformité**
- Cartographie des 12 référentiels (local + international)
- Classification des 10 use cases par niveau de risque EU AI Act (export CSV)
- Checklist de conformité par use case (AIPD/DPIA, registre, human-in-the-loop…)
- Matrice de traçabilité **Charte IA (8 principes) ↔ Réglementation**
- Souveraineté & matrice de résidence des données (Public/Interne/Confidentiel/Critique)
  et garde-fous GenAI pour CorpGPT

> Hébergement **souverain marocain** obligatoire pour les données critiques (RH, secrets
> industriels) ; éthique IA : équité, transparence, explicabilité, human-in-the-loop.

## ✨ Modules premium

- **Executive Story** (`tools/executive-story.html`) — narration plein écran cinématique
  pour le CODIR : 10 slides (mandat, diagnostic, potentiel, funnel, roadmap, ROI, CoE,
  conformité, vision) avec animations, navigation clavier/tactile, lecture auto, plein écran
  et **export du deck en PDF** (impression navigateur).
- **CorpGPT** (`tools/corpgpt.html`) — l'assistant conversationnel de la mission, **embarqué
  dans le portail** (« vendre l'IA avec de l'IA »). Moteur de **RAG local** : recherche par
  mots-clés sur une base de ~25 entrées (mission, phases, 10 use cases, roadmap & budgets, ROI,
  conformité, CoE, Charte, benchmark, équipe), réponses **avec sources citées**, suggestions,
  effet de frappe, historique persisté. Bandeau garde-fous : souveraineté 🇲🇦, RAG maîtrisé,
  human-in-the-loop, confidentialité. *(Démo 100 % locale, sans LLM/back-end ; en production :
  RAG souverain sur la base documentaire Cosumar avec supervision humaine.)*
- **Jumeau visuel de l'usine** (`tools/jumeau-usine.html`) — schéma interactif de la
  sucrerie (amont agricole, ligne de production diffusion→centrifugation, énergie & vapeur,
  stockage/expédition, administration, logistique). Chaque use case s'allume sur l'équipement
  concerné ; survol → mise en valeur de la zone, clic → fiche, filtres par vague et
  **tournée guidée** animée.
- **Simulateur Monte-Carlo** (`tools/monte-carlo.html`) — au lieu d'un ROI unique, une
  **distribution probabiliste** de la VAN du portefeuille : tirages triangulaires (coûts,
  bénéfices) + probabilité de succès par use case, propagés sur 2 000 à 20 000 scénarios.
  Sorties : **P10 / P50 / P90**, proba VAN > 0, proba d'atteinte d'objectif, histogramme et
  profil risque/rendement par use case. Export CSV. *(Valeurs illustratives, paramétrables.)*

## 💾 Sauvegarde de la mission

Toutes les saisies (avancement formation, livrables, checklists conformité, scénarios ROI,
roadmap…) sont persistées localement (`localStorage`, préfixe `cosumar.*`). Depuis le **hub**,
trois actions :

- **Exporter (JSON)** — télécharge un instantané complet de l'état de la mission.
- **Importer** — restaure un instantané (utile pour changer de poste ou partager l'avancement).
- **Réinitialiser** — efface l'état local.

---

*Sia Partners — Casablanca · © 2026 · Confidentiel Cosumar*
