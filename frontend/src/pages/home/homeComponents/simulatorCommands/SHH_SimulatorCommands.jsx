import PropTypes from "prop-types";
import { RiSendPlane2Fill } from "react-icons/ri";

function SHH_SimulatorCommands({ zones, setZones, setRooms, setLogs, date, setAwayMode, awayMode }) {
  const filteredZones = zones.filter((zone) => !zone.rooms.some((room) => room.name === "Outside"));

  const changeRoomTemperatureHandler = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const zoneId = parseInt(form.elements[0].name, 10); 
    const temperature = form.elements[0].value; 
    const zoneInfo = { zone_id: zoneId, temperature: temperature };
    try {
      const response = await fetch(`api/zone/changezonetemperature?house_id=${encodeURIComponent(localStorage.getItem("house_id"))}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zoneInfo),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { zones, rooms, command_log } = await response.json();
      setZones(zones);
      setRooms(rooms);
      setLogs((prevLogs) => [...prevLogs, {date: date, message: command_log}]);
      if(temperature>=135 && awayMode){
        setAwayMode(false);
        setLogs((prevLogs) => [...prevLogs, {date: date, message: "Away mode has been turned off due to high temperature"}]);
      }
    } catch (error) {
      console.error("Failed to change temperature:", error);
    }
  };

  const changeRoomZoneHandler = async (event, roomId, previousZoneId, roomName) => {
    const newZoneId = event.target.value; // Capture the new zone ID from the event
    // Construct the body
    const bodyContent = {
      room_id: roomId,
      new_zone_id: parseInt(newZoneId), // Ensure the zone ID is an integer
      previous_zone_id: previousZoneId,
      room_name: roomName,
    };
    try {
      const response = await fetch(`api/zone/changezoneofroom?house_id=${encodeURIComponent(localStorage.getItem("house_id"))}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyContent),
      });
      if (!response.ok) {
        throw new Error("Failed to change the room zone");
      }
      const { zones, rooms, command_log } = await response.json();
      // Update your application state
      setZones(zones);
      setRooms(rooms);
      setLogs((prevLogs) => [...prevLogs, {date: date, message: command_log}]);
    } catch (error) {
      console.error("Error changing room zone:", error);
    }
  };

  return (
    <div className="mx-3 mb-3">
      {filteredZones.map((zone) => (
        <div key={zone.zone_id} className="mb-4">
          {" "}
          {/* Ensures each zone block is distinctly separated */}
          <strong>Zone ID:</strong> {zone.zone_id} {/* Made zone_id bold */}
          <div className="flex flex-col items-center justify-center mt-1">
            <div className="mt-1 w-full flex  items-center">
              <label htmlFor={`temperatureFor${zone.zone_id}`}>Temperature:</label>
              <form className="flex items-center" onSubmit={changeRoomTemperatureHandler}>
                <input type="number" id={`temperatureFor${zone.zone_id}`} placeholder={`current temperature: ${zone.temperature}`} name={zone.zone_id} className="border px-1 py-0.5 text-xs ms-2" /> {/* Smaller input */}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded flex items-center justify-center text-xs ml-2">
                  <RiSendPlane2Fill /> {/* Replaced text with icon */}
                </button>
              </form>
            </div>
            {zone.rooms.map((room) => (
              <div key={room.room_id} className="mt-1 w-full flex  items-center">
                <label htmlFor={`changezoneof${room.room_id}`}>Change Zone {room.name}:</label>
                <select id={`changezoneof${room.room_id}`} onChange={(event) => changeRoomZoneHandler(event, room.room_id, zone.zone_id, room.name)} value={zone.zone_id} className="border px-1 py-0.5 text-xs ms-2">
                  {filteredZones.map((z) => (
                    <option key={z.zone_id} value={z.zone_id}>
                      {z.zone_id}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SHH_SimulatorCommands;

SHH_SimulatorCommands.propTypes = {
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
  setZones: PropTypes.func.isRequired,
  setRooms: PropTypes.func.isRequired,
  setLogs: PropTypes.func.isRequired,
  date: PropTypes.string,
  awayMode: PropTypes.bool,
  setAwayMode: PropTypes.func,
};
