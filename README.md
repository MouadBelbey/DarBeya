# darBeya

Ce projet est un site web de location de tenues traditionnelles Maghrebines. Il permet aux utilisateurs de louer des tenues traditionnelles maghrebines pour des événements tels que les mariages, les fiançailles, les fêtes, etc. Le projet est développé avec le framework JavaScript React.js pour le front-end et Node.js pour le back-end. Le projet est développé dans le cadre du cours de développement web avancé à l'UQAM.

> **Note importante pour la première utilisation** : Lors de la première installation, vous devrez créer un compte administrateur initial en visitant `/setup` dans votre navigateur (http://localhost:3000/setup). Cette page n'est accessible que si aucun compte administrateur n'existe encore dans le système.

## Pour Commencer

Ces instructions vous permettront d'obtenir une copie du projet et de le faire fonctionner sur votre machine locale à des fins de développement et de test.

### Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- Node.js : [Téléchargez et installez Node.js](https://nodejs.org/)
- PostgreSQL : [Téléchargez et installez PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. Clonez le dépôt :

    ```
    git clone https://gitlab.info.uqam.ca/belbey.mouad/darbeya.git
    ```

2. Accédez au répertoire du projet :

    ```
    cd chemin/vers/le/répertoire/darbeya
    ```

3. Installez les dépendances côté `backend` :

    ```
    cd vers/le/répertoire/darbeya/backend
    npm install
    ```

4. Accédez au répertoire `frontend` :

    ```
    cd vers/le/répertoire/darbeya/frontend
    ```

5. Installez les dépendances côté `frontend` :

    ```
    npm install
    ```

### Configuration de la Base de Données

S'assurer que le fichier .env se trouve dans le répertoire `darBeya/backend`. Le fichier .env contient les informations de connexion à la base de données PostgreSQL.

### Considérations de Sécurité

**Important** : Cette application stocke les images directement dans la base de données PostgreSQL au format BYTEA. Les fonctionnalités d'authentification suivent les bonnes pratiques de sécurité :

1. Mots de passe chiffrés côté client avec SHA-256 avant transmission
2. Sessions sécurisées avec cookies httpOnly
3. Données sensibles filtrées des réponses API
4. Mots de passe invisibles dans les requêtes réseau

**Pour la production** :
- Activez toujours HTTPS en production en définissant `NODE_ENV=production` dans votre environnement
- Ne déployez jamais d'informations d'identification dans le code source
- Utilisez un environnement de production avec CORS correctement configuré

**Note sur les transmissions de données** :
Comme dans toute application web, les mots de passe sont transmis du client au serveur lors de l'authentification et peuvent être visibles dans les outils de développement Web. C'est pourquoi l'utilisation de HTTPS est cruciale en production.
```

### Exécution de l'Application

1. Dans le répertoire `backend`, démarrez le serveur :

    ```
    node server.js
    ```

2. Dans le répertoire `client`, démarrez le serveur de développement React :

    ```
    npm start
    ```

L'application devrait maintenant être accessible localement pour le frontend. Ouvrez votre navigateur et accédez à [http://localhost:3000](http://localhost:3000) pour utiliser l'application. Le backend est accessible à l'adresse [http://localhost:5000](http://localhost:5000).

## Construit Avec

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [React](https://reactjs.org/)
```

## Authentication et Authorisation Administrateur
nom d'utilisateur : darbeyaTest1
mot de passe : darbeyaTest1