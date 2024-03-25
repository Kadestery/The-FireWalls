import { IoIosMan } from "react-icons/io";
import { PiBabyBold } from "react-icons/pi";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { FaUserSecret } from "react-icons/fa";
import PropTypes from "prop-types";

ProfilePicture.propTypes = {
  profile_type: PropTypes.string.isRequired,
};

function ProfilePicture({ profile_type }) {
  let circleColor = "";
  let IconComponent = null;
  switch (profile_type) {
    case "parent":
      circleColor = "bg-blue-400";
      IconComponent = <IoIosMan className="w-8 h-8" />;
      break;
    case "child":
      circleColor = "bg-lime-400";
      IconComponent = <PiBabyBold className="w-8 h-8" />;
      break;
    case "guest":
      circleColor = "bg-yellow-400";
      IconComponent = <FaPersonWalkingLuggage className="w-8 h-8" />;
      break;
    case "stranger":
      circleColor = "bg-red-400";
      IconComponent = <FaUserSecret className="w-8 h-8" />;
      break;
    default:
        circleColor = "bg-gray-400";
        IconComponent = <p>N/A</p>
      break;
  }

  return (
    <>
      <div className={`flex items-center justify-center  ${circleColor} rounded-full w-20 h-20`}>{IconComponent}</div>
    </>
  );
}

export default ProfilePicture;
