import PropTypes from "prop-types";

function SetupSimulationContext({ setDate, setTemperature }) {


  return (
    <div className="flex flex-col items-center justify-center bg-slate-200 rounded-lg p-4">
      <p className="text-xl font-semibold mb-14">Set Context Of Simulation</p>
      <div className="w-full mb-5">
        <label htmlFor="temperature" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Set Temperature Outside in °C
        </label>
        <input onChange={(e)=>setTemperature(e.target.value)} type="number" id="temperature" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="20" required />
      </div>

      <div className="w-full mb-5">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Set Simulation Date
        </label>
        <input onChange={(e)=>setDate(e.target.value)} type="date" id="date" name="trip-start" min="2018-01-01" max="2027-12-31" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
      </div>
      
    </div>
  );
}

export default SetupSimulationContext;

SetupSimulationContext.propTypes = {
  setDate: PropTypes.func.isRequired,
  setTemperature: PropTypes.func.isRequired,
};
