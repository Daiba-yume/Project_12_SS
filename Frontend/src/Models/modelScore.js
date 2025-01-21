// Fonction pour récup et formater les données userScore
export const formatUserScore = (dataFromApi) => {
  // vérifie si 'score' existe, sinon 'todayscore', sinon 0 par default
  return dataFromApi.score || dataFromApi.todayScore || 0;
};
