import PropTypes from "prop-types";


function SHC_SimulatorCommands({ currentProfile, currentRoom, setRooms, setCurrentRoom, setLogs }) {

  const handleStateChange = async (event) => {
    try {
      const response = await fetch(`api/room/room-action?house_id=${encodeURIComponent(localStorage.getItem("house_id"))}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id: currentRoom.room_id,
          action_type: event.target.value,
          profile_username: currentProfile.profile_username,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Network response was not ok");
      }
      const data = await response.json();
      const editedRoom = data.rooms.find((room) => room.room_id === currentRoom.room_id);
      console.log(editedRoom)
      setRooms(data.rooms);
      setCurrentRoom(editedRoom);
      setLogs((prevLogs) => [...prevLogs, { room_name: currentRoom.name, action_on_room: data.command_log }]);
    } catch (error) {
      setLogs((prevLogs) => [...prevLogs, { room_name: currentRoom.name, action_on_room: error.message }]);
    }
  };

  return (
    
      <div className=" border border-black border-opacity-50 rounded-md ">
        <p className="text-blue-600 text-center font-medium border-b border-black border-opacity-50 py-4">Items</p>
        {!currentRoom && <p className="text-center text-red-500 font-medium px-16 py-4">select a room and a profile</p>}
        {currentRoom && (
          <div className="my-4 px-16">
            <div className="flex items-center mb-4">
              <p className="ms-1 me-3 text-md font-semibold text-gray-900 ">Light State:</p>
              <input value="changeLight" onChange={handleStateChange} checked={currentRoom.light_state} id="lightOn" type="radio" name="lightState" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
              <label htmlFor="lightOn" className="ms-1 me-2 text-sm font-medium text-gray-900 ">
                On
              </label>
              <input value="changeLight" onChange={handleStateChange} checked={!currentRoom.light_state} id="lightOff" type="radio" name="lightState" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
              <label htmlFor="lightOff" className="ms-1 text-sm font-medium text-gray-900 ">
                Off
              </label>
            </div>
            <div className="flex items-center mb-4">
              <p className="ms-1 me-3 text-md font-semibold text-gray-900 ">Door State:</p>
              <input value="changeDoor" onChange={handleStateChange} checked={currentRoom.door_state} id="doorOpen" type="radio" name="doorState" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
              <label htmlFor="doorOpen" className="ms-1 me-2 text-sm font-medium text-gray-900 ">
                Open
              </label>
              <input value="changeDoor" onChange={handleStateChange} checked={!currentRoom.door_state} id="doorClosed" type="radio" name="doorState" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
              <label htmlFor="doorClosed" className="ms-1 text-sm font-medium text-gray-900 ">
                Close
              </label>
            </div>
            <div className="flex items-center mb-4">
              <p className="ms-1 me-3 text-md font-semibold text-gray-900 ">Window State:</p>
              <input value="changeWindow" onChange={handleStateChange} checked={currentRoom.window_state} id="lightOn" type="radio" name="windowState" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
              <label htmlFor="default-radio-1" className="ms-1 me-2 text-sm font-medium text-gray-900 ">
                Open
              </label>
              <input value="changeWindow" onChange={handleStateChange} checked={!currentRoom.window_state} id="lightOff" type="radio" name="windowState" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
              <label htmlFor="default-radio-2" className="ms-1 text-sm font-medium text-gray-900 ">
                Close
              </label>
            </div>
          </div>
        )}
      </div>
  );
}

export default SHC_SimulatorCommands;

SHC_SimulatorCommands.propTypes = {
  currentProfile: PropTypes.shape({
    profile_username: PropTypes.string,
    profile_type: PropTypes.string,
    profile_room: PropTypes.string,
  }),
  currentRoom: PropTypes.shape({
    room_id: PropTypes.number,
    name: PropTypes.string,
    room_type: PropTypes.string,
    window_state: PropTypes.bool,
    door_state: PropTypes.bool,
    light_state: PropTypes.bool,
  }),
  setRooms: PropTypes.func,
  setCurrentRoom: PropTypes.func,
  setLogs: PropTypes.func,
};
