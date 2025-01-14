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
  baseURL: "http://localhost:3000/",
  timeout: 5000, // 5 sec de délais max (évite le blocage de la req, ex: soucis de rés ou serveur)
});

// Fonction pour récupérer les données des users avec l'ID (API et mocked)
export const getUserData = async (userId) => {
  try {
    //Envoie de la requête GET pour récupérer les données user
    const response = await api.get(`/user/${userId}`);
    const userData = response.data; // données user récup via l'API

    // Data formatées si l'API est accessible
    const user = formatUserMain(userData);
    const activity = formatUserActivity(userData);
    const session = formatUserSession(userData);
    const performance = formatUserPerformance(userData);
    const score = formatUserScore(userData);

    //return les données
    return { ...userData, user, activity, session, performance, score };
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données utilisateurs :",
      error
    );

    // Utilisation des dataMocked en cas d'échec de l'API
    const userMockData = USER_MAIN_DATA.find((user) => user.id === userId);
    const activityMockData = USER_ACTIVITY.find(
      (activity) => activity.id === userId
    );
    const sessionMockData = USER_AVERAGE_SESSIONS.find(
      (session) => session.id === userId
    );
    const performanceMockData = USER_PERFORMANCE.find(
      (performance) => performance.id === userId
    );

    // Si aucune dataMocked trouvée, return null
    if (
      !userMockData ||
      !activityMockData ||
      !sessionMockData ||
      !performanceMockData
    ) {
      return null;
    }
    // Return les dataMocked formatées
    const user = formatUserMain(userMockData);
    const activity = formatUserActivity(userMockData);
    const session = formatUserSession(userMockData);
    const performance = formatUserPerformance(userMockData);
    const score = formatUserScore(userMockData);

    return { ...userMockData, user, activity, session, performance, score };
  }
};
