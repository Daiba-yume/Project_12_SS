import axios from "axios";

//backend
const API_Url = "http://localhost:3000/";

// Fonction pour récupérer les données des users avec l'ID
export const getUserData = async (userId) => {
  try {
    //Envoie de la requête GET pour récupérer les données user
    const response = await axios.get(`${API_Url}/user/${userId}`);
    return response.data; // données user
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des données utilisateurs :",
      error
    );
    return null; // si l'API échoue
  }
};
