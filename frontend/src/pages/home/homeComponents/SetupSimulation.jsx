import PropTypes from "prop-types";
import ProfilePicture from "../../../generalComponents/ProfilePicture";

SetupSimulation.propTypes = {
    profiles: PropTypes.array,
    currentProfile: PropTypes.shape({
      profile_username: PropTypes.string,
      profile_type: PropTypes.string,
    }),
    setCurrentProfile: PropTypes.func.isRequired,
};

function SetupSimulation({ profiles, currentProfile, setCurrentProfile}) {
 

  const currentProfileHandler = (event) => {
    setCurrentProfile(JSON.parse(event.target.value));
    console.log(JSON.parse(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg font-semibold mb-5">Set Context Of Simulation</p>
      <p>
        username: <span className="font-medium">{currentProfile.profile_username}</span>{" "}
      </p>
      <ProfilePicture profile_type={currentProfile.profile_type} />

      <p className="mb-5">
        type: <span className="font-medium underline text-blue-500">{currentProfile.profile_type}</span>{" "}
      </p>
      <div className="w-full mb-5">
        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Location
        </label>
        <select id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5">
          <option value="brazil">Brazil</option>
          <option value="bucharest">Bucharest</option>
        </select>
      </div>

      <div className="w-full mb-5">
        <label htmlFor="profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Profiles
        </label>
        <select onChange={currentProfileHandler} id="profile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  ">
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
        <label htmlFor="temperature" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Set Temperature in °C
        </label>
        <input type="number" id="temperature" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="90210" required />
      </div>

      <div className="w-full mb-5">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Set Simulation Date
        </label>
        <input type="date" id="date" name="trip-start"  min="2018-01-01" max="2027-12-31" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
      </div>
    </div>
  );
}

export default SetupSimulation;
