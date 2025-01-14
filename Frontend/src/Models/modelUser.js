// Fonction qui formate les data USER
export const formatUserMain = (dataFromAPi) => {
  // On vérifie si dataFromApi est un []
  if (Array.isArray(dataFromAPi)) {
    // On utilise map pour transformer chaque élmt du []
    return dataFromAPi.map((data) => ({
      id: data.id,
      userInfos: data.userInfos,
      keyData: data.keyData,
      score: data.score || data.todayScore,
    }));
  }
  // [] vide si dataFrompApi n'en est pas un
  return [];
};
