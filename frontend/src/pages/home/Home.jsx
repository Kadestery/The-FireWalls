import SetupSimulationContext from "./homeComponents/SetupSimulationContext";
import SimulationInfo from "./homeComponents/SimulationInfo";
import HomeLayout from "./homeComponents/HomeLayout";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const profilesAndRooms = useLoaderData();
  const [profiles, setProfiles] = useState(profilesAndRooms.profiles); 
  const [rooms, setRooms] = useState(profilesAndRooms.rooms);
  const [currentProfile, setCurrentProfile] = useState({
    profile_username: "TBD",
    profile_type: "TBD",
  });
  //const [logs, setLogs] = useState([]); //display logs when simulation is running for open close light etc

  const [simulationRunning, setSimulationRunning] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-12 ">
        <label className="inline-flex items-center cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={simulationRunning}
            className="sr-only peer"
            onChange={() => {
              if ((!temperature || !date) && !simulationRunning) alert("Please set the simulation context");
              else{
                setSimulationRunning(!simulationRunning);
                setCurrentProfile({ profile_username: "TBD", profile_type: "TBD" })
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

      <div className=" flex flex-row justify-evenly items-center border-2 border-blue-500 rounded-md m-10">
        <div className="p-10">{simulationRunning ? <SimulationInfo rooms={rooms} setRooms={setRooms} profiles={profiles} setProfiles={setProfiles} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} date={date} temperature={temperature} /> : <SetupSimulationContext setTemperature={setTemperature} setDate={setDate} />}</div>
        {simulationRunning && <div className="p-10">hello</div>}
        <div className="p-10">
          <HomeLayout rooms={rooms} />
        </div>
      </div>
    </>
  );
}

export default Home;
