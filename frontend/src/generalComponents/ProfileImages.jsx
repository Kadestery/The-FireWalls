import { IoIosMan } from "react-icons/io";
import { PiBabyBold } from "react-icons/pi";
import { FaUserSecret } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import PropTypes from "prop-types";

//Declaring types
ProfileIcon.propTypes = {
  profile_type: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

ProfilePicture.propTypes = {
  profile_type: PropTypes.string.isRequired,
};

const profileConfig = {
  parent: { Icon: IoIosMan, circleColor: "bg-blue-400" },
  child: { Icon: PiBabyBold, circleColor: "bg-lime-400" },
  guest: { Icon: FaPersonWalkingLuggage, circleColor: "bg-yellow-400" },
  stranger: { Icon: FaUserSecret, circleColor: "bg-red-400" },
  default: { Icon: () => <p>N/A</p>, circleColor: "bg-gray-400" },
};

function ProfileIcon({ profile_type, className, title }){
  const { Icon } = profileConfig[profile_type] || profileConfig.default;
  return <Icon className={className} title={title} />;
}

function ProfilePicture({ profile_type }){
  const { circleColor } = profileConfig[profile_type] || profileConfig.default;
  return (
    <div className={`flex items-center justify-center ${circleColor} rounded-full w-20 h-20`}>
      <ProfileIcon profile_type={profile_type} className="w-8 h-8" />
    </div>
  );
}
 
export { ProfileIcon, ProfilePicture };
