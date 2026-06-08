# Initialisation du projet Jeux Shop

## 1. Installation de Supabase

Installation des dépendances nécessaires pour intégrer Supabase au projet Next.js :

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## 2. Initialisation de Shadcn UI

Lancement de l'outil d'initialisation :

```bash
npx shadcn@latest init
```

### Configuration choisie

- Component Library : Radix
- Preset : Nova
- Framework détecté : Next.js
- Tailwind CSS : v4

### Fichiers générés

```text
src/components/ui/button.tsx
src/lib/utils.ts
components.json
```

### Fichiers modifiés

```text
src/app/globals.css
```

---

## 3. Installation des composants Shadcn UI

Tentative initiale :

```bash
npx shadcn@latest add button card input label badge table dialog toast select
```

Le composant `toast` étant déprécié, utilisation de `sonner` à la place :

```bash
npx shadcn@latest add card input label badge table dialog select sonner
```

### Composants ajoutés

```text
src/components/ui/card.tsx
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/badge.tsx
src/components/ui/table.tsx
src/components/ui/select.tsx
src/components/ui/sonner.tsx
src/components/ui/dialog.tsx
```

### Composant ignoré

```text
src/components/ui/button.tsx
```

(car déjà créé lors de l'initialisation)

---

## 4. Installation des dépendances utilitaires

Installation des bibliothèques utilisées dans l'interface :

```bash
npm install lucide-react clsx date-fns
```

### Dépendances installées

- lucide-react : bibliothèque d'icônes
- clsx : gestion des classes CSS conditionnelles
- date-fns : manipulation et formatage des dates

---

## 5. Création du fichier d'environnement

La commande :

```bash
echo. > .env.local
```

n'a pas fonctionné sous PowerShell.

Création du fichier avec :

```powershell
New-Item .env.local
```

### Résultat

Création du fichier :

```text
.env.local
```

Ce fichier servira à stocker les variables d'environnement du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## État actuel du projet

✅ Supabase installé

✅ Shadcn UI initialisé

✅ Composants UI principaux installés

✅ Bibliothèques utilitaires installées

✅ Fichier `.env.local` créé

🚀 Le projet est prêt pour la configuration de Supabase et le développement des fonctionnalités.
