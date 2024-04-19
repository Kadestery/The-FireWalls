import SetupSimulationContext from "./homeComponents/simulationSetup/SetupSimulationContext";
import SimulationInfo from "./homeComponents/simulationSetup/SimulationInfo";
import HomeLayout from "./homeComponents/HomeLayout";
import SimulatorCommands from "./homeComponents/SimulatorCommands";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
//Homepage of simulation
function Home() {
  const profilesAndRooms = useLoaderData();
  const [profiles, setProfiles] = useState(profilesAndRooms.profiles);
  const [rooms, setRooms] = useState(profilesAndRooms.rooms);
  const [currentProfile, setCurrentProfile] = useState({
    profile_username: "TBD",
    profile_type: "TBD",
  });
  const [currentRoom, setCurrentRoom] = useState();
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [temperatureData, setTemperatureData] = useState([]);
  const [date, setDate] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-12 ">
        <p className="text-2xl font-medium mb-4">Hello {localStorage.getItem("username")}</p>
        <label className="inline-flex items-center cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={simulationRunning}
            className="sr-only peer"
            onChange={() => {
              if ((!temperature || !date) && !simulationRunning) alert("Please set the simulation context");
              else {
                if(simulationRunning){
                  setTemperature()
                  setTemperatureData([])
                  setDate()
                }
                setSimulationRunning(!simulationRunning);
                setCurrentProfile({ profile_username: "TBD", profile_type: "TBD" });
                setCurrentRoom();
              }
            }}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
          <span className="ms-3 text-md font-medium text-blue-600 ">Start Simulation</span>
        </label>
        <Link to="accounts" className="text-sm opacity-60 underline hover:opacity-30">
          Add Accounts +
        </Link>
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex flex-row justify-center items-stretch border-2 border-blue-500 rounded-md">
          <div className="pe-4 ps-8 my-auto ">{simulationRunning ? <SimulationInfo rooms={rooms} setRooms={setRooms} setCurrentRoom={setCurrentRoom} profiles={profiles} setProfiles={setProfiles} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} date={date} setDate={setDate} temperature={temperature} setTemperature={setTemperature} temperatureData={temperatureData} /> : <SetupSimulationContext setTemperature={setTemperature} setDate={setDate} setTemperatureData={setTemperatureData} />}</div>
          {simulationRunning && (
            <div className="py-16">
              <SimulatorCommands currentRoom={currentRoom} currentProfile={currentProfile} setRooms={setRooms} setCurrentRoom={setCurrentRoom} />
            </div>
          )}
          <div className="pe-8 ps-4 py-2 ">
            <HomeLayout rooms={rooms} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
