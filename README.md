# darBeya

Ce projet est un site web de location de tenues traditionnelles Maghrebines. Il permet aux utilisateurs de louer des tenues traditionnelles maghrebines pour des événements tels que les mariages, les fiançailles, les fêtes, etc. Le projet est développé avec le framework JavaScript React.js pour le front-end et Node.js pour le back-end. Le projet est développé dans le cadre du cours de développement web avancé à l'UQAM.

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

s'assurer que le fichier .env se trouve dans le répertoire `darBeya/backend`. Le fichier .env contient les informations de connexion à la base de données PostgreSQL. Ainsi que les informations de connexion au amazon Web Services (AWS S3).
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