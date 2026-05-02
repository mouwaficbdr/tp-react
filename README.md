# Blog Minimaliste en React

L'application consomme l'API publique [JSONPlaceholder](https://jsonplaceholder.typicode.com/) pour simuler un véritable blog interactif.

## Fonctionnalités Principales

*   **Lecture dynamique** : Affichage des articles sous forme de grille adaptative (jusqu'à 4 colonnes). L'ordre des articles est mélangé aléatoirement à chaque chargement tout en conservant une grande fluidité visuelle grâce à un dictionnaire de tri mis en cache.
*   **Recherche locale** : Recherche instantanée dans le titre **et** le contenu des articles sans rechargement.
*   **Lecture détaillée** : Pages de lecture incluant l'affichage du véritable auteur (via `/users`) et des commentaires associés (via `/comments`).
*   **Opérations CRUD avec Mises à jour** : 
    *   Création, modification et suppression d'articles.
    *   Grâce à **TanStack Query (React Query)**, l'interface utilisateur réagit instantanément aux modifications avant même que le serveur ne réponde, garantissant une sensation de rapidité et de fluidité.
*   **Notifications Intégrées** : Retours visuels clairs (succès, erreurs) à l'aide de Toasts animés après chaque action de l'utilisateur.

## Stack Technique & Choix Architecturaux

*   **Core** : React 18, TypeScript, Vite.
*   **Routage** : `react-router-dom` pour une navigation fluide côté client.
*   **Gestion d'état asynchrone** : `@tanstack/react-query`. C'est le cœur de l'application, gérant le cache, la synchronisation, les requêtes en arrière-plan et les mutations optimistes.
*   **Design & UI** :
    *   **Tailwind CSS (v4)** : Utilisation de classes utilitaires combinées à des variables CSS personnalisées pour un thème neutre, élégant et premium.
    *   **Framer Motion** : Pour des animations d'entrée et des transitions subtiles et professionnelles.
    *   **Sonner** : Pour les notifications Toast non-intrusives.
    *   **Lucide React** : Pour une iconographie moderne et cohérente.


## Installation et Lancement

1.  **Cloner le dépôt et installer les dépendances :**
    ```bash
    npm install
    ```

2.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```
    L'application sera accessible sur `http://localhost:5173`.

3.  **Compiler pour la production :**
    ```bash
    npm run build
    ```

---
*Projet réalisé dans le cadre d'un TP de classe du cours de développement Web frontend avec React.*
