import "./UserProfile.scss";

const UserProfile = () => {
  return (
    <div className="profile-container">
      <h1>
        Bonjour <span style={{ color: "red" }}></span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
    </div>
  );
};

export default UserProfile;
