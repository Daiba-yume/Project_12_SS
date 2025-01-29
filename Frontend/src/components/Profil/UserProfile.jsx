/* eslint-disable react/prop-types */
import "./UserProfile.scss";
import { getUserInfoData } from "../../Service/apiService";
import { useEffect, useState } from "react";

const UserProfile = ({ id }) => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfoData(id);
      setUserInfo(data);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

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
