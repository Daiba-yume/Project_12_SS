// Fonction pour formater les données de session utilisateur
export const formatUserSession = (dataFromApi) => {
  // On vérifie si les data des sessions sont présent selon la res API
  if (dataFromApi.data.sessions) {
    // MAPPE chaque session pr récup seulement les info nécessaires
    return dataFromApi.data.session.map((session) => ({
      day: session.day,
      sessionLength: session.sessionLength, // durée de la session
    }));
  }
  // retourn un tabl vide si aucune donnée session
  return [];
};
