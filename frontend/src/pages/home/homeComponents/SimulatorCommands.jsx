import SHC_SimulatorCommands from "./simulatorCommands/SHC_SimulatorCommands";
import SHP_SimulatorCommands from "./simulatorCommands/SHP_SimulatorCommands";
import SHS_SimulatorCommands from "./simulatorCommands/SHS_SimulatorCommands";
import SHH_SimalatorCommands from "./simulatorCommands/SHH_SimulatorCommands";
import Console from "./simulatorCommands/Console";
import { useState } from "react";
import PropTypes from "prop-types";

function SimulatorCommands({ currentProfile, currentRoom, setRooms, setCurrentRoom }) {
  const [logs, setLogs] = useState([]); //display logs when simulation is running for open close light etc
  const [simulatorCommand, setSimulatorCommand] = useState("SHC"); //command to be executed
  return (
    <>
      <div className="flex flex-col justify-between h-full" >
        <div>
          <div className="mb-4 ">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center" role="tablist">
              {["SHC", "SHP", "SHS", "SHH"].map((tab) => (
                <li key={tab} className="me-2" role="presentation">
                  <button className={`inline-block p-4 border-b-2 rounded-t-lg ${simulatorCommand === tab ? "border-blue-600 text-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} onClick={() => setSimulatorCommand(tab)}>
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {simulatorCommand === "SHC" && <SHC_SimulatorCommands currentProfile={currentProfile} currentRoom={currentRoom} setRooms={setRooms} setCurrentRoom={setCurrentRoom} setLogs={setLogs} />}
          {simulatorCommand === "SHP" && <SHP_SimulatorCommands currentProfile={currentProfile} currentRoom={currentRoom} setRooms={setRooms} setCurrentRoom={setCurrentRoom} setLogs={setLogs} />}
          {simulatorCommand === "SHS" && <SHS_SimulatorCommands currentProfile={currentProfile} currentRoom={currentRoom} setRooms={setRooms} setCurrentRoom={setCurrentRoom} setLogs={setLogs} />}
          {simulatorCommand === "SHH" && <SHH_SimalatorCommands currentProfile={currentProfile} currentRoom={currentRoom} setRooms={setRooms} setCurrentRoom={setCurrentRoom} setLogs={setLogs} />}
        </div>
        <Console logs={logs} />
      </div>
    </>
  );
}

export default SimulatorCommands;

SimulatorCommands.propTypes = {
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
};
