// Fonction qui formate les data USER
export const formatUserInfos = (dataFromApi) => {
  if (dataFromApi) {
    return {
      firstName: dataFromApi.firstName,
      lastName: dataFromApi.lastName,
      age: dataFromApi.age,
    };
  } else
    return {
      firstName: "test",
      lastName: "test",
      age: 0,
    };
};
