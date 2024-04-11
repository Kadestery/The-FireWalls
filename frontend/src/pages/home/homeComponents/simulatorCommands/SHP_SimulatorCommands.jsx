import PropTypes from "prop-types";

function SHP_SimulatorCommands({ awayMode, setAwayMode, setRooms, setZones, setLogs, date }) {
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

  // on away mode remove all people from house and close all windows inside house
  return (
    <div className=" border border-black border-opacity-50 rounded-md ">
      <p className="text-blue-600 text-center font-medium border-b border-black border-opacity-50 py-4">SHP Commands</p>
      <label className="flex items-center justify-center cursor-pointer my-4 ">
        <span className="me-3 text-md font-medium ">Away Mode</span>
        <input type="checkbox" checked={awayMode} className="sr-only peer" onChange={handleAwayMode} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
      </label>
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
};
