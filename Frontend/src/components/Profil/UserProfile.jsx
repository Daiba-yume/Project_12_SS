import "./UserProfile.scss";
import { getUserData } from "../../Service/apiService";
import { useEffect, useState } from "react";

const UserProfile = ({ id }) => {
  const [userInfo, setUserInfo] = useState([]); // stock les datas
  // On récupére les données userInfos au chargement ou quand l'id change
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(id); // call API to recover les datas
      setUserInfo(data.userInfos); // met à jour l'état userInfos avec les dataMocked
    };
    if (id) {
      fetchData(); // recover datas if id present
    }
  }, [id]); // If "id" change relance l'éxécution

  if (!userInfo) {
    return <p>Aucune donnée infos trouvée pour cet utilisateur.</p>;
  }
  return (
    <div className="profile-container">
      <h1>
        Bonjour <span style={{ color: "red" }}>{userInfo.firstName} </span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
    </div>
  );
};

export default UserProfile;
