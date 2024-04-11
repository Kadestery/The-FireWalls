import PropTypes from "prop-types";
import { ProfilePicture } from "../../../../generalComponents/ProfileImages";
import { useEffect, useState } from "react";

function SimulationInfo({ rooms, setRooms, setCurrentRoom, profiles, setProfiles, currentProfile, setCurrentProfile, date, setDate, temperature, setTemperature, temperatureData, setZones }) {
  const [lastIndex, setLastIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDate((currentDate) => {
        const date = new Date(currentDate);
        date.setMinutes(date.getMinutes() + 1);

        const newDateStr = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
        return newDateStr;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Separate effect to update temperature based on the new date
  useEffect(() => {
    let found = false;
    for (let i = lastIndex; i < temperatureData.length; i++) {
      if (temperatureData[i].date > date) {
        if (i > 0) {
          setTemperature(temperatureData[i - 1].temperature);
          setLastIndex(i - 1);
          found = true;
          break;
        }
      }
    }

    if (!found && lastIndex < temperatureData.length) {
      setTemperature(temperatureData[temperatureData.length - 1].temperature);
      setLastIndex(temperatureData.length);
    }
  }, [date]);

  const submitHandler = async (event) => {
    event.preventDefault();

    // Assuming `profile` is a JSON string that needs parsing to access its properties
    const profile = JSON.parse(event.target.profile.value);
    const room = JSON.parse(event.target.location.value);

    try {
      const response = await fetch(`/api/profile/room-to-profile?house_id=${encodeURIComponent(localStorage.getItem("house_id"))}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          profile_username: profile.profile_username,
          room_id: room.room_id,
        }),
      });

      if (!response.ok) {
        console.log("Error during API call");
      }
      const data = await response.json();
      console.log(data);

      setProfiles(data.user_profiles);
      setZones(data.zones);
      setRooms(data.rooms);
      setCurrentProfile({ profile_username: profile.profile_username, profile_type: profile.profile_type, profile_room: room.name });
      setCurrentRoom(room);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-200 rounded-lg p-4 ">
      <p className="mb-4 text-xl">
        username: <span className="font-medium">{currentProfile.profile_username}</span>
      </p>
      <ProfilePicture profile_type={currentProfile.profile_type} />

      <p className="mb-1">
        type: <span className="font-medium text-blue-500">{currentProfile.profile_type}</span>
      </p>
      <p className="mb-5">
        location: <span className="font-medium text-blue-500">{currentProfile.profile_room ? currentProfile.profile_room : "N/A"}</span>
      </p>
      <form onSubmit={submitHandler}>
        <div className="w-full mb-5">
          <label htmlFor="profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Profiles
          </label>
          <select id="profile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  ">
            <option value="">Select a user</option>
            {profiles.map((user, index) => {
              return (
                <option key={index} value={JSON.stringify(user)}>
                  {`${user.profile_username}: ${user.profile_type}`}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full mb-5">
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Profile Location
          </label>
          <select id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5">
            <option value="">Select a location</option>
            {rooms.map((room, index) => {
              return (
                <option key={index} value={JSON.stringify(room)}>
                  {room.name}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center block m-auto mb-5">
          Set Profile
        </button>
      </form>

      <div className="w-full mb-5">
        <p className="text-center">
          temperature Outside: <span className="text-blue-600 font-medium">{temperature}°C</span>
        </p>
      </div>

      <div className="w-full mb-5">
        <p className="text-center">simulation Date:</p>
        <p className="text-center text-blue-600 font-medium">{date}</p>
      </div>
    </div>
  );
}

export default SimulationInfo;

SimulationInfo.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      profile_username: PropTypes.string,
      profile_type: PropTypes.string,
      profile_room: PropTypes.string,
    })
  ),
  setProfiles: PropTypes.func.isRequired,
  currentProfile: PropTypes.shape({
    profile_username: PropTypes.string,
    profile_type: PropTypes.string,
    profile_room: PropTypes.string,
  }),
  setCurrentProfile: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      room_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      room_type: PropTypes.string.isRequired,
      window_state: PropTypes.bool.isRequired,
      door_state: PropTypes.bool.isRequired,
      light_state: PropTypes.bool.isRequired,
    })
  ),
  setRooms: PropTypes.func.isRequired,
  setCurrentRoom: PropTypes.func,
  date: PropTypes.PropTypes.string,
  setDate: PropTypes.func,
  temperature: PropTypes.PropTypes.string,
  setTemperature: PropTypes.func,
  temperatureData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      temperature: PropTypes.string.isRequired,
    })
  ),
  setZones: PropTypes.func,
};
