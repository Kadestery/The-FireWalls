import PropTypes from "prop-types";
import { RiSendPlane2Fill } from "react-icons/ri";

function SHP_SimulatorCommands({ awayMode, setAwayMode, rooms, setRooms, setZones, setLogs, date, timerToCallCops, setTimerToCallCops }) {
  const handleAwayMode = async () => {
    setAwayMode(!awayMode);
    if (awayMode) {
      setLogs((prevLogs) => [...prevLogs, { date: date, message: "Away mode has been turned off" }]);
      return;
    }
    try {
      const response = await fetch(`api/house/setHouseOnAwayMode?house_id=${encodeURIComponent(localStorage.getItem("house_id"))}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to change the room zone");
      }
      const { zones, rooms, command_log } = await response.json();
      // Update your application state
      setZones(zones);
      setRooms(rooms);
      setLogs((prevLogs) => [...prevLogs, { date: date, message: "Away mode has been turned on" }]);
      setLogs((prevLogs) => [...prevLogs, { date: date, message: command_log }]);
    } catch (error) {
      console.error("Error changing room zone:", error);
    }
  };

  const handleMotionDetectorChange = async (room_id, hasDetector) => {
    try {
      const response = await fetch(`api/room/changemotiondetector?house_id=${encodeURIComponent(localStorage.getItem("house_id"))}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to change motion detector status");
      }
      const { zones, rooms } = await response.json();
      setZones(zones);
      setRooms(rooms);
      const action = hasDetector ? "removed from" : "added to";
      setLogs((prevLogs) => [...prevLogs, { date: date, message: `In room ${rooms.find((r) => r.room_id === room_id).name}, motion detector was ${action}.` }]);
    } catch (error) {
      console.error("Error changing motion detector status:", error);
    }
  };

  // on away mode remove all people from house and close all windows inside house
  return (
    <div className=" border border-black border-opacity-50 rounded-md ">
      <p className="text-blue-600 text-center font-medium border-b border-black border-opacity-50 py-4">SHP Commands</p>
      <label className="flex items-center justify-center cursor-pointer my-4 ">
        <span className="me-3 text-md font-medium ">Away Mode</span>
        <input type="checkbox" checked={awayMode} className="sr-only peer" onChange={handleAwayMode} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
      </label>
      <div className="mx-2 flex justify-center items-center mb-3">
        <label htmlFor="removeDetector" className="me-2">
          Remove Motion Detector:
        </label>
        <select id="removeDetector" className="border rounded" onChange={(e) => handleMotionDetectorChange(parseInt(e.target.value, 10), true)}>
          <option value="">Select a room</option>
          {rooms
            .filter((room) => room.motion_detector)
            .map((room) => (
              <option key={room.room_id} value={room.room_id}>
                {room.name}
              </option>
            ))}
        </select>
      </div>

      {/* Rooms without motion detectors */}
      <div className="mx-2 flex justify-center items-center mb-3">
        <label htmlFor="addDetector" className="me-2">
          Add Motion Detector:
        </label>
        <select id="addDetector" className="border rounded" onChange={(e) => handleMotionDetectorChange(parseInt(e.target.value, 10), false)}>
          <option value="">Select a room</option>
          {rooms
            .filter((room) => !room.motion_detector)
            .map((room) => (
              <option key={room.room_id} value={room.room_id}>
                {room.name}
              </option>
            ))}
        </select>
      </div>
      <p className="font-medium text-center">Currently police called in {timerToCallCops} ms</p>
      <form
        className="mx-2 flex  justify-center items-center mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          const timeValue = event.target.elements.callPoliceTime.value; // Accesses the input by its 'id'
          setTimerToCallCops(timeValue); // Assuming `setTimerToCallCops` is your state setter function
        }}
      >
       
        <label htmlFor="callPoliceTime" className="mr-2">
          Call police in:
        </label>
        <input type="number" id="callPoliceTime" className="border border-neutral-800" /> {/* Added className for styling, replace with your class if needed */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded flex items-center justify-center text-xs ml-2">
          <RiSendPlane2Fill /> {/* Replaced text with icon */}
        </button>
      </form>
    </div>
  );
}

export default SHP_SimulatorCommands;

SHP_SimulatorCommands.propTypes = {
  awayMode: PropTypes.bool,
  setAwayMode: PropTypes.func,
  setRooms: PropTypes.func,
  setZones: PropTypes.func,
  setLogs: PropTypes.func,
  date: PropTypes.string,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      room_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      room_type: PropTypes.string.isRequired,
      window_state: PropTypes.bool.isRequired,
      door_state: PropTypes.bool.isRequired,
      light_state: PropTypes.bool.isRequired,
      motion_detector: PropTypes.bool.isRequired,
    })
  ),
  timerToCallCops: PropTypes.number,
  setTimerToCallCops: PropTypes.func,
};
