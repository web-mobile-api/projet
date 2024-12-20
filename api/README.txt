# Instructions pour lancer l'application

## Prérequis
- Docker
- Docker Compose

## Étapes pour lancer l'application

1. Cloner le dépôt:
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_DEPOT>
   ```

2. Construire et démarrer les conteneurs Docker:
   ```bash
   docker-compose up --build
   ```

   (Normalement, cela devrait générer et remplir la base de données directement)

3. Accéder à l'API:
   Ouvrez votre navigateur et allez à `http://localhost:<PORT>` (remplacez `<PORT>` par le port configuré dans votre `docker-compose.yml`).

## Structure des routes de l'API

L'API est versionnée et les routes sont accessibles sous le préfixe `/v1/`. Par exemple:
- Compte: `http://localhost:<PORT>/v1/account`
- Localisation: `http://localhost:<PORT>/v1/location`
- Liste d'amis: `http://localhost:<PORT>/v1/friendList`
- Photos: `http://localhost:<PORT>/v1/photo`
- Événements: `http://localhost:<PORT>/v1/event`
- Commentaires: `http://localhost:<PORT>/v1/comment`

## Remarques
- Assurez-vous que les ports nécessaires sont libres et non utilisés par d'autres applications.
- Vous pouvez arrêter les conteneurs en utilisant `docker-compose down`.