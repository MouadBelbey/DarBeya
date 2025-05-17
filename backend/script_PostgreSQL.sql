-- Database script for darBeya application
-- Table for storing administrator credentials
CREATE TABLE Admin (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing dresses
CREATE TABLE robes (
    robe_id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    couleur VARCHAR(50) NOT NULL,
    categorie VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing accessories
CREATE TABLE accessoires (
    accessoire_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing images with relationships to both robes and accessoires
CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- Filename of the image
    mimetype VARCHAR(100) NOT NULL, -- MIME type of the image (e.g., image/jpeg)
    image_data BYTEA NOT NULL, -- Binary image data stored directly in the database
    image_size BIGINT, -- Size of the image in bytes
    is_primary BOOLEAN DEFAULT false, -- Flag to indicate if this is the primary/thumbnail image
    robe_id INTEGER REFERENCES robes(robe_id) ON DELETE CASCADE,
    accessoire_id INTEGER REFERENCES accessoires(accessoire_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_reference CHECK (
        (robe_id IS NOT NULL AND accessoire_id IS NULL) OR
        (robe_id IS NULL AND accessoire_id IS NOT NULL)
    )
);

-- Table for clients (users of the application)
CREATE TABLE client (
    client_id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    age INTEGER,
    sexe VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample client data
INSERT INTO client (nom, prenom, age, telephone, sexe, email)
VALUES
    ('Dupont', 'Alice', 25, '123-456-7890', 'F', 'alice.dupont@email.com'),
    ('Martin', 'Bob', 30, '987-654-3210', 'M', 'bob.martin@email.com'),
    ('Lefevre', 'Catherine', 22, '555-123-4567', 'F', 'catherine.lefevre@email.com'),
    ('Durand', 'David', 35, '777-888-9999', 'M', 'david.durand@email.com'),
    ('Moreau', 'Eva', 28, '444-333-2222', 'F', 'eva.moreau@email.com'),
    ('Leclerc', 'Frank', 40, '111-222-3333', 'M', 'frank.leclerc@email.com'),
    ('Girard', 'Giselle', 29, '999-111-8888', 'F', 'giselle.girard@email.com'),    ('Roux', 'Hugo', 26, '666-777-5555', 'M', 'hugo.roux@email.com'),
    ('Fournier', 'Isabelle', 33, '222-333-4444', 'F', 'isabelle.fournier@email.com'),
    ('Bertrand', 'Jean', 32, '888-444-6666', 'M', 'jean.bertrand@email.com');

-- Table for bookings/reservations
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES client(client_id) ON DELETE CASCADE,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    statut VARCHAR(20) DEFAULT 'en_attente', -- en_attente, confirmee, annulee
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for items in a reservation
CREATE TABLE items_reservation (
    item_id SERIAL PRIMARY KEY,
    reservation_id INTEGER REFERENCES reservations(reservation_id) ON DELETE CASCADE,
    robe_id INTEGER REFERENCES robes(robe_id) ON DELETE SET NULL,
    accessoire_id INTEGER REFERENCES accessoires(accessoire_id) ON DELETE SET NULL,
    quantite INTEGER DEFAULT 1,
    CONSTRAINT check_item_type CHECK (
        (robe_id IS NOT NULL AND accessoire_id IS NULL) OR
        (robe_id IS NULL AND accessoire_id IS NOT NULL)
    )
);

-- Insert initial admin user (password: darbeyaTest1)
-- Note: The password should be hashed in a real application
-- The hash below is for demonstration; in your app it will be hashed using bcrypt
INSERT INTO Admin (username, password)
VALUES ('darbeyaTest1', '$2b$10$X7PzVX3N9PzEpnW7H8F65OVOu.DxhfxQRC7wrkyjZ3rGQG.vLI0sK');

-- Some sample robes data
INSERT INTO robes (nom, couleur, categorie) VALUES
    ('Caftan Marocain', 'Rouge', 'Mariage'),
    ('Gandoura Algérienne', 'Blanc', 'Soirée'),
    ('Djellaba Tunisienne', 'Bleu', 'Quotidien'),
    ('Caftan Moderne', 'Or', 'Fiançailles'),
    ('Takchita', 'Vert', 'Cérémonie');

-- Some sample accessoires data
INSERT INTO accessoires (name, description) VALUES
    ('Bijou de tête', 'Bijou décoratif pour cheveux en métal doré'),
    ('Ceinture traditionnelle', 'Ceinture d\'apparat brodée de fil d\'or'),
    ('Boucles d\'oreilles', 'Boucles d\'oreilles pendantes en argent'),
    ('Bracelet berbère', 'Bracelet en argent avec gravures berbères'),
    ('Collier de perles', 'Collier traditionnel avec perles et ornements');

-- Important note: Image records would be inserted dynamically when uploading images through the application

-- Create indexes for better query performance
CREATE INDEX idx_images_robe_id ON images(robe_id);
CREATE INDEX idx_images_accessoire_id ON images(accessoire_id);
CREATE INDEX idx_images_is_primary ON images(is_primary);
CREATE INDEX idx_images_id_and_type ON images(image_id, mimetype);
CREATE INDEX idx_items_reservation_robe_id ON items_reservation(robe_id);
CREATE INDEX idx_items_reservation_accessoire_id ON items_reservation(accessoire_id);
