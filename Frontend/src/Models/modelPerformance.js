// Fonction qui formate les données de performance utilisateur
export const formatUserPerformance = (dataFromApi) => {
  // On vérifie si la propriété 'kind' et 'data' existe dans les données
  if (dataFromApi.kind && dataFromApi.data) {
    const kindMapping = dataFromApi.kind; //Objet qui mappe les indices en noms
    // On utilise map pour transformer chaque performance en un objet
    return dataFromApi.data.map((performance) => ({
      value: performance.value,
      // Associe l'indice au nom
      kind: kindMapping[performance.kind].replace(
        /^\w/,
        (c) => c.toUpperCase() //Capitalise la 1ère lettre
      ),
    }));
  }
  // On retourne un tableau vide si la propriété 'kind' n'existe pas
  return [];
};
