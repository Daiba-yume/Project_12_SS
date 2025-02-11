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
///////////////////
/*  Fonction pour récupérer les données des usersInfo avec l'ID (API et mocked) */
export const getUserInfoData = async (userId) => {
  const useMockedData = import.meta.env.VITE_USE_MOCKED_DATA === "true"; // Vérifie si on utilise les données simulées
  try {
    if (!useMockedData) {
      //Envoie de la requête GET pour récupérer les données API
      const response = await api.get(`${userId}`);
      const userData = response.data.data.userInfos; // Stocke les données reçues de l'API
      return formatUserInfos(userData); // Formate les données et les renvoie
    } else {
      // On récupère les données simulées
      const mockData = getUserMainMockData(userId); // Récupère les données simulées pour l'user
      if (!mockData) {
        console.log("Aucune donnée simulée trouvée");
        return null; // si aucune donnée n'est trouvée return null
      }
      return formatUserInfos(mockData.userInfos); // sinon formate et renvoie les données simulées
    }
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des data users ",
      error.message
    );
    // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
    const mockData = getUserMainMockData(userId);
    return mockData ? formatUserInfos(mockData) : null; // Retourne les données simulées si disponibles
  }
};
///////////////////
///////////////////
// Fonction pour récupèrer les données KeyData de l'user avec l'ID (API et mocked) */
export const getUserKpisData = async (userId) => {
  const useMockedData = import.meta.env.VITE_USE_MOCKED_DATA === "true"; // Vérifie si on utilise les données simulées
  try {
    if (!useMockedData) {
      //Envoie de la requête GET pour récupérer les données API
      const response = await api.get(`${userId}`);
      const userData = response.data.data.keyData; // Stocke les données reçues de l'API
      return formatUserKeyData(userData); // Formate les données et les renvoie
    } else {
      // On récupère les données simulées
      const mockData = getUserMainMockData(userId);
      if (!mockData) {
        console.log("Aucune donnée simulée trouvée");
        return null;
      }
      return formatUserKeyData(mockData.keyData); // formate et renvoie les données simulées
    }
  } catch (error) {
    console.log("Erreur lors de la récupération des data users", error.message);
    // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
    const mockData = getUserMainMockData(userId);
    return mockData ? formatUserKeyData(mockData) : null; // Retourne les données simulées si disponibles
  }
};
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
      "Erreur lors de la récupération des données utilisateurs :",
      error.response ? error.response.data : error.message
    );
    // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
    const mockData = getActivityMockedData(userId);
    return mockData ? formatUserActivity(mockData) : null;
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

    console.log("Erreur lors de la réupération des datas users", error.message);
  }
  // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
  const mockData = getUserSessionData(userId);
  return mockData ? formatUserSession(mockData) : null;
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
      "Erreur lors de la récupération des data users ",
      error.message
    );
    // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
    const mockData = getUserPerformanceData(userId);
    return mockData ? formatUserPerformance(mockData) : null;
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
///////////////////
///////////////////
/*  Fonction pour récupérer les données des usersScore avec l'ID (API et mocked) */
export const getUserScoreData = async (userId) => {
  const useMockedData = import.meta.env.VITE_USE_MOCKED_DATA === "true";
  try {
    if (!useMockedData) {
      //Envoie de la requête GET pour récupérer les données
      const response = await api.get(`${userId}`);
      const userData = response.data.data; // Stocke les données reçues de l'API
      return formatUserScore(userData); // Formate les données et les renvoie
    } else {
      // On récupère les données simulées
      const mockData = getUserMainMockData(userId);
      if (!mockData) {
        console.log("Aucune donnée simulée trouvée");
        return null;
      }
      return formatUserScore(mockData);
    }
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des data users ",
      error.message
    );
    // Si l'appel à l'API échoue,on utilise les données mockées (simulées)
    const mockData = getUserMainMockData(userId);
    return mockData ? formatUserScore(mockData) : null;
  }
};
