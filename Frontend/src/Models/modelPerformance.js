// Fonction qui formate les données de performance utilisateur
export const formatUserPerformance = (dataFromApi) => {
  // On vérifie si la propriété 'kind' existe dans les données
  if (dataFromApi.data.kind) {
    // On utilise map pour transformer chaque performance en un objet
    return dataFromApi.data.data.map((performance) => ({
      value: performance.value,
      kind: performance.kind,
    }));
  }
  // On retourne un tableau vide si la propriété 'kind' n'existe pas
  return [];
};
