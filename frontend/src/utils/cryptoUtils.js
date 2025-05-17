// Utilitaire pour le chiffrement des mots de passe côté client
import CryptoJS from 'crypto-js';

// Clé de chiffrement - DOIT être identique à celle utilisée côté serveur
// ATTENTION: En production, utilisez une clé plus complexe et stockée de manière sécurisée
const ENCRYPTION_KEY = 'darBeya-encryption-key-2023';

/**
 * Chiffre un mot de passe avec SHA256 + sel
 * @param {string} password - Le mot de passe en clair
 * @returns {string} - Le mot de passe chiffré
 */
export const encryptPassword = (password) => {
  // Générer un sel unique basé sur l'identifiant de l'application
  const salt = 'darBeya-unique-salt';

  // Combinaison du sel et du mot de passe
  const saltedPassword = password + salt;

  // Chiffrement avec SHA256
  const hashedPassword = CryptoJS.SHA256(saltedPassword).toString();

  return hashedPassword;
};

/**
 * Chiffre un objet complet pour transmission sécurisée
 * Note: Utilisé principalement pour la démonstration, préférez HTTPS en production
 */
export const encryptObject = (object) => {
  const jsonString = JSON.stringify(object);
  return CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
};

/**
 * Déchiffre un objet chiffré
 */
export const decryptObject = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedJson);
};
