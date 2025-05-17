// Utilitaire pour le chiffrement des mots de passe côté serveur
import crypto from 'crypto';

// Clé de chiffrement - DOIT être identique à celle utilisée côté client
// ATTENTION: En production, stockez cette clé dans des variables d'environnement, pas dans le code
const ENCRYPTION_KEY = 'darBeya-encryption-key-2023';

/**
 * Chiffre un mot de passe avec SHA256 + sel (identique à la méthode côté client)
 * @param {string} password - Le mot de passe en clair
 * @returns {string} - Le mot de passe chiffré
 */
export const encryptPassword = (password) => {
  // Générer un sel unique basé sur l'identifiant de l'application
  const salt = 'darBeya-unique-salt';

  // Combinaison du sel et du mot de passe
  const saltedPassword = password + salt;

  // Chiffrement avec SHA256
  return crypto.createHash('sha256')
    .update(saltedPassword)
    .digest('hex');
};

/**
 * Valide un mot de passe en le comparant avec la version stockée
 * @param {string} inputHashedPassword - Le mot de passe chiffré soumis par l'utilisateur
 * @param {string} storedHashedPassword - Le mot de passe chiffré stocké dans la BD
 * @returns {boolean} - True si les mots de passe correspondent
 */
export const validatePassword = (inputHashedPassword, storedHashedPassword) => {
  return inputHashedPassword === storedHashedPassword;
};
