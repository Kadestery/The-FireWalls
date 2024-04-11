import PropTypes from "prop-types";
import { FaBed, FaToilet, FaLightbulb } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
import { MdCurtainsClosed } from "react-icons/md";
import { GiTheaterCurtains } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { ProfileIcon } from "../../../generalComponents/ProfileImages";
import { IoAlarmOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

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

const ProfilesDisplay = ({ profiles }) => {
  return (
    <div className="p-3 bg-sky-300 rounded-full flex flex-row justify-center items-center mb-2">
      {profiles.map((profile, index) => (
        <ProfileIcon key={index} profile_type={profile.profile_type} title={profile.profile_username} className="w-8 h-8" />
      ))}
    </div>
  );
};

const HomeLayout = ({ zones, timerToCallCops }) => {
  zones.forEach((zone) => {
    zone.rooms.sort((a, b) => a.room_id - b.room_id);
  });

  const outsideRoom = zones.flatMap((zone) => zone.rooms).find((room) => room.room_type === "Outside");
  const indoorZones = zones.filter((zone) => !zone.rooms.some((room) => room.room_type === "Outside"));
  const zoneBackgroundColors = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-pink-100", "bg-purple-100"];

  const [callingPolice, setCallingPolice] = useState({});

  useEffect(() => {
    zones.forEach(zone => {
      zone.rooms.forEach(room => {
        if (room.motion_detector && room.profiles_in_room.some(profile => profile.profile_type === "stranger")) {
          setTimeout(() => setCallingPolice(prevState => ({ ...prevState, [room.room_id]: true })), timerToCallCops);
        }
        else setCallingPolice(prevState => ({ ...prevState, [room.room_id]: false }));
      });
    });
  }, [zones]);

  return (
    <>
      <div className="bg-lime-200 py-4 px-8">
        <div className="w-full h-0 md:border-l-[250px] border-l-transparent border-b-[100px] border-b-blue-300 border-r-[250px] border-r-transparent" />
        <div className="grid grid-cols-3 w-[500px] bg-white">
          {indoorZones.map((zone, zoneIndex) => (
            <div key={zone.zone_id} className={`border-orange-400 border-2 p-2 m-2 ${zoneBackgroundColors[zoneIndex % zoneBackgroundColors.length]}`}>
              <p className="text-center">
                <span className="font-medium">Zone Temp:</span> {zone.temperature}°C
              </p>
              {zone.rooms.map((room) => {
                const containsStranger = room.profiles_in_room.some((profile) => profile.profile_type === "stranger");
                const roomBorderColor = room.motion_detector && containsStranger ? "border-red-700" : "border-gray-700";
                const roomBackgroundColor = room.motion_detector && containsStranger ? "animate-alarm-blink" : "bg-transparent";
                return (
                  <div key={room.room_id} className={`border-2 m-1 ${roomBorderColor} flex flex-col items-center justify-center p-4 ${roomBackgroundColor}`}>
                    <p className="font-medium text-xl mb-2 text-center">{room.name}</p>
                    <div className="relative inline-block group mb-3">
                      <RoomTypeIcon type={room.room_type} />
                      <span className="group-hover:visible invisible absolute text-xs top-6 left-1/2 -translate-x-1/2 border-violet-700 border-2">{room.room_type}</span>
                    </div>
                    {room.profiles_in_room.length > 0 && <ProfilesDisplay profiles={room.profiles_in_room} />}
                    <div className="text-sm text-center">
                      <p className="mb-2">
                        Window: <WindowStateIcon isOpen={room.window_state} />
                      </p>
                      <p className="mb-2">
                        Door: <DoorStateIcon isOpen={room.door_state} />
                      </p>
                      <p className="mb-2">
                        Light: <LightStateIcon isOpen={room.light_state} />
                        {/* Add an alarm icon if the room has a motion detector, positioned after the LightStateIcon */}
                      </p>
                      {room.motion_detector && (
                        <>
                          <p>
                            Alarm: <IoAlarmOutline className="text-red-500 w-5 h-5 inline ml-2" />
                          </p>
                          {callingPolice[room.room_id] && <p className="text-red-700">Calling Cops!</p>}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {outsideRoom && (
          <div>
            <p className="text-center mt-4 font-medium text-xl underline">{outsideRoom.room_type}</p>
            <div className="flex justify-center">{outsideRoom.profiles_in_room.length > 0 && <ProfilesDisplay profiles={outsideRoom.profiles_in_room} />}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeLayout;

HomeLayout.propTypes = {
  zones: PropTypes.arrayOf(
    PropTypes.shape({
      zone_id: PropTypes.number.isRequired,
      temperature: PropTypes.number.isRequired,
      rooms: PropTypes.arrayOf(
        PropTypes.shape({
          room_id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          room_type: PropTypes.string.isRequired,
          window_state: PropTypes.bool.isRequired,
          door_state: PropTypes.bool.isRequired,
          light_state: PropTypes.bool.isRequired,
          motion_detector: PropTypes.bool.isRequired,
          profiles_in_room: PropTypes.arrayOf(
            PropTypes.shape({
              profile_username: PropTypes.string.isRequired,
              profile_type: PropTypes.string.isRequired,
              profile_id: PropTypes.number.isRequired,
            })
          ),
        })
      ).isRequired,
    })
  ).isRequired,
  timerToCallCops: PropTypes.number.isRequired,
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

ProfilesDisplay.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      profile_username: PropTypes.string.isRequired,
      profile_type: PropTypes.string.isRequired,
      profile_id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
