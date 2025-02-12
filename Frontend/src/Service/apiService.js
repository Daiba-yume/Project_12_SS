import axios from "axios";
import { formatUserInfos } from "../Models/modelUser";
import { formatUserKeyData } from "../Models/modelUserKpis";
import { formatUserScore } from "../Models/modelScore";
import { formatUserSession } from "../Models/modelSession";
import { formatUserActivity } from "../Models/modelActivity";
import { formatUserPerformance } from "../Models/modelPerformance";
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../data/data"; // importation des dataMocked

//Config centralisée
const api = axios.create({
  baseURL: "http://localhost:3000/user/",
  timeout: 5000, // 5 sec de délais max (évite le blocage de la req, ex: soucis de rés ou serveur)
});
///////////////////
let isAlertShown = false; // Flag pour savoir si l'alerte a été déjà montrée
///////////////////
// Fonction principale pour récupérer toutes les données d'un utilisateur (userInfos, keyData, score)
export const getUserData = async (userId) => {
  const useMockedData = import.meta.env.VITE_USE_MOCKED_DATA === "true"; // Vérifie si on utilise les données simulées
  try {
    let userData;
    if (!useMockedData) {
      // Un seul appel API pour récupérer toutes les données de l'utilisateur
      const response = await api.get(`${userId}`);
      userData = response.data.data; // Toutes les données sont dans "data"
    } else {
      // Récupère les données simulées (mocked)
      userData = getUserMainMockData(userId);
      if (!userData) {
        console.log("Aucune donnée simulée trouvée");
        return null;
      }
    }
    // Renvoyer les données formatées pour chaque section
    return {
      userInfos: formatUserInfos(userData.userInfos),
      keyData: formatUserKeyData(userData.keyData),
      score: formatUserScore(userData),
    };
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données de l'API :",
      error.message
    );
    // Afficher l'alerte seulement si elle n'a pas été affichée
    if (!isAlertShown) {
      alert(
        "L'API n'est pas accessible pour le moment. Les données mockées seront utilisées en attendant."
      );
      isAlertShown = true; // Marque que l'alerte a été montrée
    }
    // En cas d'erreur, utiliser les données simulées
    const mockData = getUserMainMockData(userId);
    if (!mockData) {
      console.log("Aucune donnée simulée trouvée");
      return null;
    }
    // Retourne les données formatées à partir des données simulées
    return {
      userInfos: formatUserInfos(mockData.userInfos),
      keyData: formatUserKeyData(mockData.keyData),
      score: formatUserScore(mockData),
    };
  }
};
///////////////////
// Fonction pour récupérer les données simulées userInfos et KeyData(mockées)
const getUserMainMockData = (userId) => {
  console.log(`Recherche des données pour l'utilisateur avec l'ID : ${userId}`);
  const UserMainMockData = USER_MAIN_DATA.find((user) => user.id == userId);
  if (UserMainMockData) {
    console.log("Données simulées trouvées :", UserMainMockData);
    // Si des données simulées sont trouvées, sont renvoyer sous un format structuré
    return UserMainMockData;
  }
  console.log(`Aucune donnée simulée trouvée pour l'ID ${userId}`);
  return null; // si aucun utilisateur n'est trouvé avec cet ID
};
///////////////////
///////////////////
/*  Fonction pour récupérer les données des usersActivity avec l'ID (API et mocked )*/
export const getUserActivityData = async (userId) => {
  const useMockedData = import.meta.env.VITE_USE_MOCKED_DATA === "true";
  try {
    if (!useMockedData) {
      //Envoie de la requête GET pour récupérer les données
      const response = await api.get(`${userId}/activity`);
      const userData = response.data.data; // Stocke les données reçues de l'API
      return formatUserActivity(userData); // Formate les données et les renvoie
    } else {
      // On récupère les données simulées
      const mockData = getActivityMockedData(userId);
      if (!mockData) {
        console.log("Aucune donnée simulée trouvée");
        return null;
      }
      return formatUserActivity(mockData);
    }
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données de l'API :",
      error.message
    );
    // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
    const mockData = getActivityMockedData(userId);
    if (!mockData) {
      console.log("Aucune donnée simulée trouvée");
      return null;
    }
    return formatUserActivity(mockData);
  }
};
// Fonction pour récupérer les données simulées des sessions (mockées)
// Cherche dans la liste USER_ACTIVITY si l'ID correspond à un utilisateur
const getActivityMockedData = (userId) => {
  const activityMockData = USER_ACTIVITY.find(
    (activity) => activity.userId == userId
  );
  //On Vérifie si les données simulées existent pour chaque catégorie
  if (activityMockData) {
    return {
      sessions: activityMockData.sessions,
    };
  }
  return null;
};
///////////////////
///////////////////
/*  Fonction pour récupérer les données des usersSession avec l'ID (API et mocked) */
export const getUserSessionData = async (userId) => {
  const useMockedData = import.meta.env.VITE_USE_MOCKED_DATA === "true";
  try {
    if (!useMockedData) {
      //Envoie de la requête GET pour récupérer les données
      const response = await api.get(`${userId}/average-sessions`);
      const userData = response.data.data; // Stocke les données reçues de l'API
      return formatUserSession(userData); // Formate les données et les renvoie
    } else {
      // On récupère les données simulées
      const mockData = getSessionMockData(userId);
      if (!mockData) {
        console.log("Aucune donnée simulée trouvée");
        return null;
      }
      return formatUserSession(mockData);
    }
  } catch (error) {
    // Si une erreur se produit lors de l'appel à l'API, on affiche un message d'erreur
    console.log(
      "Erreur lors de la récupération des données de l'API :",
      error.message
    );
  }
  // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
  const mockData = getSessionMockData(userId);
  if (!mockData) {
    console.log("Aucune donnée simulée trouvée");
    return null;
  }
  return formatUserSession(mockData);
};
// Fonction pour récupérer les données simulées des sessions (mockées)
// Cherche dans la liste USER_AVERAGE_SESSIONS si l'ID correspond à un utilisateur
const getSessionMockData = (userId) => {
  const sessionMockData = USER_AVERAGE_SESSIONS.find(
    (session) => session.userId == userId
  );
  if (sessionMockData) {
    // Si des données simulées sont trouvées, sont renvoyer sous un format structuré
    return {
      sessions: sessionMockData.sessions,
    };
  }
  return null; // si aucun utilisateur n'est trouvé avec cet ID
};
///////////////////
///////////////////
/*  Fonction pour récupérer les données des usersPerformance avec l'ID (API et mocked)*/
export const getUserPerformanceData = async (userId) => {
  const useMockedData = import.meta.env.VITE_USE_MOCKED_DATA === "true";
  try {
    if (!useMockedData) {
      //Envoie de la requête GET pour récupérer les données
      const response = await api.get(`${userId}/performance`);
      const userData = response.data.data; // Stocke les données reçues de l'API
      return formatUserPerformance(userData); // Formate les données et les renvoie
    } else {
      // On récupère les données simulées
      const mockData = getPerformanceMockData(userId);
      if (!mockData) {
        console.log("Aucune donnée simulée trouvée");
        return null;
      }
      return formatUserPerformance(mockData);
    }
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données de l'API :",
      error.message
    );
    // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
    const mockData = getPerformanceMockData(userId);
    if (!mockData) {
      console.log("Aucune donnée simulée trouvée");
      return null;
    }
    return formatUserPerformance(mockData);
  }
};
// Fonction pour récupérer les données simulées des performances (mockées)
// Cherche dans la liste USER_PERFORMANCE si l'ID correspond à un utilisateur
const getPerformanceMockData = (userId) => {
  const performanceMockData = USER_PERFORMANCE.find(
    (performance) => performance.userId == userId
  );
  if (performanceMockData) {
    // Si des données simulées sont trouvées, sont renvoyer sous un format structuré
    return {
      kind: performanceMockData.kind,
      data: performanceMockData.data,
    };
  }
  return null; // si aucun utilisateur n'est trouvé avec cet ID
};
