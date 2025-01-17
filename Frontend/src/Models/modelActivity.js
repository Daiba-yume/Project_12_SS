// Fonction pour formater les données d'activité utilisateur
export const formatUserActivity = (dataFromApi) => {
  // On vérifie si la propriété 'sessions' existe dans les données
  if (dataFromApi.sessions) {
    // On utilise map pour transformer chaque session en un objet
    return dataFromApi.sessions.map((session) => ({
      day: session.day,
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }
  // Si la propriété 'sessions' n'existe pas, retourne un tableau vide
  return [];
};
