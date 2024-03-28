import PropTypes from "prop-types";

function SetupSimulationContext({ setDate, setTemperature, setTemperatureData }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const content = e.target.result;
        const rows = content.split("\n").map((row) => row.split(","));
        // Assume the first row contains headers and the rest contain data
        const temperatureAndTimeData = rows.slice(1).map((row) => ({
          date: row[0] + "T" + row[1],
          temperature: row[2],
        }));   
        setTemperatureData(temperatureAndTimeData);  
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-200 rounded-lg p-4">
      <p className="text-xl font-semibold mb-14">Set Context Of Simulation</p>
      <div className="w-full mb-5">
        <label htmlFor="temperature" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Set Temperature Outside in °C
        </label>
        <input onChange={(e) => setTemperature(e.target.value)} type="number" id="temperature" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="20" required />
      </div>

      <div className="w-full mb-5">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Set Simulation Date
        </label>
        <input onChange={(e) => setDate(e.target.value)} type="datetime-local" id="date" name="trip-start" min="2018-01-01T00:00" max="2027-12-31T23:59" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
      </div>
      <label htmlFor="csvFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Upload Temperature Data (CSV)
      </label>
      <input onChange={handleFileUpload} type="file" id="csvFile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" accept=".csv" />
    </div>
  );
}

export default SetupSimulationContext;

SetupSimulationContext.propTypes = {
  setDate: PropTypes.func.isRequired,
  setTemperature: PropTypes.func.isRequired,
  setTemperatureData: PropTypes.func
};
