import axios from "axios";
import { formatUserMain } from "../Models/modelUser";
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

// Fonction pour récupérer les données des users avec l'ID (API et mocked)
export const getUserData = async (userId) => {
  try {
    //Envoie de la requête GET pour récupérer les données user
    const response = await api.get(`${userId}`);
    const userData = response.data; // données user récup via l'API
    console.log(userData);
    // Formatage des données si l'API est accessible
    return formatUserData(userData);
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données utilisateurs :",
      error.response ? error.response.data : error.message
    );
    // Utilisation des données simulées (mocked) en cas d'échec de l'API
    const mockData = getMockedData(userId);
    if (!mockData) {
      console.log("Aucune donnée simulée trouvée");
      return null;
    }
    return formatUserData(mockData);
  }
};

// Fonction pour formaté les données
const formatUserData = (data) => {
  const user = formatUserMain(data);
  const activity = formatUserActivity(data);
  const session = formatUserSession(data);
  const performance = formatUserPerformance(data);
  const score = formatUserScore(data);

  //return les données
  return { ...data, user, activity, session, performance, score };
};

// Fonction pour récupérer les données simulées (mocked)
const getMockedData = (userId) => {
  const userMockData = USER_MAIN_DATA.find((user) => user.id === userId);
  const activityMockData = USER_ACTIVITY.find(
    (activity) => activity.userId === userId
  );
  const sessionMockData = USER_AVERAGE_SESSIONS.find(
    (session) => session.userId === userId
  );
  const performanceMockData = USER_PERFORMANCE.find(
    (performance) => performance.userId === userId
  );

  //On Vérifie si les données simulées existent pour chaque catégorie
  if (
    userMockData &&
    activityMockData &&
    sessionMockData &&
    performanceMockData
  ) {
    return {
      user: userMockData,
      activity: activityMockData,
      session: sessionMockData,
      performance: performanceMockData,
    };
  }
  return null;
};
