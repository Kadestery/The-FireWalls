import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

function Console({ logs }) {

    const endRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom of the container whenever logs update
        endRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [logs]);

    return (
      <div className="h-48 overflow-y-auto overflow-x-auto border-2 border-gray-500 p-4 w-[400px] bg-gray-400 rounded-lg">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="whitespace-nowrap">
              {`${log.room_name}: ${log.action_on_room}`}
            </div>
          ))
        ) : (
          <p className="text-center font-medium">No logs to display yet</p>
        )}
        <div ref={endRef} />
      </div>
      
    );
  }

export default Console

Console.propTypes = {
    logs: PropTypes.arrayOf(
      PropTypes.shape({
        room_name: PropTypes.string.isRequired,
        action_on_room: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

