import SetupSimulation from "./homeComponents/SetupSimulation"
import { useLoaderData } from "react-router-dom";
import { useState } from "react";


function Home() {
  const profilesAndRooms = useLoaderData();
  const profiles = profilesAndRooms.profiles;
  const rooms = profilesAndRooms.rooms; //display rooms
  const [logs, setLogs] = useState([]); //display logs when simulation is running for open close light etc
  const [currentProfile, setCurrentProfile] = useState({
    profile_username: "TBD",
    profile_type: "TBD",
  });


    return (
        <div className="h-screen flex flex-row justify-center items-center" >
            <div className="p-20">
                <SetupSimulation currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} profiles={profiles} />
            </div>
            <div className="p-20">hello</div>
            <div className="p-20">hello</div>
        </div>
    )
}

export default Home