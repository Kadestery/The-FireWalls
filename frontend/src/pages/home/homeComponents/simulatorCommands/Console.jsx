import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

function Console({ logs }) {

    const endRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom of the container whenever logs update
        endRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [logs]);

    return (
      <div className="h-48 overflow-auto p-4 border-2 border-gray-500  w-[400px] bg-gray-400 rounded-lg">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <p key={index} className="whitespace-nowrap inline-block pr-4">
              {`${log.room_name}: ${log.action_on_room}`}
            </p>
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

