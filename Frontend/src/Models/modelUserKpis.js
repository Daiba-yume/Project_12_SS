export const formatUserKeyData = (dataFromApi) => {
  if (dataFromApi) {
    return {
      calorieCount: dataFromApi.calorieCount,
      proteinCount: dataFromApi.proteinCount,
      carbohydrateCount: dataFromApi.carbohydrateCount,
      lipidCount: dataFromApi.lipidCount,
    };
  }
  return {
    calorieCount: 0,
    proteinCount: 0,
    carbohydrateCount: 0,
    lipidCount: 0,
  };
};
