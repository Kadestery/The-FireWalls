import PropTypes from "prop-types";
import { FaBed, FaToilet, FaLightbulb } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
import { MdCurtainsClosed } from "react-icons/md";
import { GiTheaterCurtains } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { ProfileIcon } from "../../../generalComponents/ProfileImages";

const RoomTypeIcon = ({ type }) => {
  const iconProps = { className: "w-6 h-6 text-gray-700 hover:text-gray-500 m-auto" };
  switch (type) {
    case "Bedroom":
      return <FaBed {...iconProps} />;
    case "Kitchen":
      return <TbToolsKitchen2 {...iconProps} />;
    case "LivingRoom":
      return <PiTelevisionSimpleDuotone {...iconProps} />;
    case "Bathroom":
      return <FaToilet {...iconProps} />;
    default:
      return <div />;
  }
};

const WindowStateIcon = ({ isOpen }) => {
  const iconProps = { className: "w-4 h-4 text-gray-700 hover:text-gray-500 inline" };
  return isOpen ? <GiTheaterCurtains {...iconProps} title="Open" /> : <MdCurtainsClosed {...iconProps} title="Closed" />;
};

const DoorStateIcon = ({ isOpen }) => {
  const iconProps = { className: "w-4 h-4 text-gray-700 hover:text-gray-500 inline" };
  return isOpen ? <BsFillDoorOpenFill {...iconProps} title="Open" /> : <BsFillDoorClosedFill {...iconProps} title="Closed" />;
};

const LightStateIcon = ({ isOpen }) => {
  const iconProps = { className: "w-4 h-4 text-gray-700 hover:text-gray-500 inline" };
  return isOpen ? <HiOutlineLightBulb {...iconProps} title="On" /> : <FaLightbulb {...iconProps} title="Off" />;
};

const HomeLayout = ({ rooms }) => {
  return (
    <>
      <div className="w-full h-0 border-l-[200px] md:border-l-[150px] border-l-transparent border-b-[100px] border-b-blue-300  border-r-[200px] md:border-r-[150px]  border-r-transparent" />
      <div className="grid grid-cols-2 w-[400px] md:w-[300px] ">
        {rooms.map((room, index) => (
          <div key={index} className="border-2 m-1 border-gray-700 flex flex-col items-center justify-center p-4">
            <div className=" font-medium text-xl mb-2 text-center">{room.name}</div>

            <div className="relative inline-block group mb-3">
              <RoomTypeIcon type={room.room_type} />
              <span className=" group-hover:visible invisible absolute text-xs top-6 left-1/2 -translate-x-1/2 border-violet-700 border-2">{room.room_type}</span>
            </div>
            {room.profiles_in_room.length > 0  && (
              <div className="p-3 bg-green-300 rounded-full flex flex-row justify-center items-center mb-2">
                {room.profiles_in_room.map((profile, index) => (
                  <ProfileIcon key={index} profile_type={profile.profile_type} title={profile.profile_username} className="w-8 h-8" />
                ))}
              </div>
            )}

            <div className="text-sm text-center">
              <p className="mb-2">
                Window: <WindowStateIcon isOpen={room.window_state} />
              </p>
              <p className="mb-2">
                Door: <DoorStateIcon isOpen={room.door_state} />
              </p>
              <p>
                Light: <LightStateIcon isOpen={room.light_state} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeLayout;

HomeLayout.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      room_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      room_type: PropTypes.string.isRequired,
      window_state: PropTypes.bool.isRequired,
      door_state: PropTypes.bool.isRequired,
      light_state: PropTypes.bool.isRequired,
      profiles_in_room: PropTypes.arrayOf(
        PropTypes.shape({
          profile_username: PropTypes.string.isRequired,
          profile_type: PropTypes.string.isRequired,
          profile_id: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
};

RoomTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

WindowStateIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

DoorStateIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

LightStateIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
