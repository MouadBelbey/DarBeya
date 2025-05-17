CREATE TABLE Acceuil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    sous_titre VARCHAR(255) NOT NULL,
    image_principale INT DEFAULT 1,
    image_secondaire INT DEFAULT 2,
    description_1 TEXT NOT NULL,
    description_2 TEXT NOT NULL,
)