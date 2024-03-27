//function HouseLayoutCanvas() {
    //     const hello = "hello world"
    //     return (
    //         <p className="text-3xl">{hello}</p>
    //     )
    // }
    //
    // export default HouseLayoutCanvas
   
    import React, { useState, useRef, useEffect } from 'react';
   
    function HouseLayoutCanvas() {
        const [houseData, setHouseData] = useState(null);
        const canvasRef = useRef(null);
   
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file && file.type === "application/json") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target.result;
                    try {
                        const json = JSON.parse(text);
                        setHouseData(json);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                };
                reader.readAsText(file);
            } else {
                console.error("Please upload a JSON file.");
            }
        };
        // useEffect(() => {
        //     if (houseData && canvasRef.current && houseData['Smart Home'] && houseData['Smart Home'].Rooms) {
        //         const canvas = canvasRef.current;
        //         canvas.width = 800; // Adjust as needed
        //         canvas.height = 1000; // Adjust based on the number of rooms
        //         const ctx = canvas.getContext('2d');
        //         ctx.clearRect(0, 0, canvas.width, canvas.height);
        //
        //         let yOffset = 20; // Initial vertical offset for drawing
        //
        //         // Simplify: Just increment yOffset for each room to avoid stacking
        //         Object.keys(houseData['Smart Home'].Rooms).forEach((roomName, index) => {
        //             const x = 50; // Horizontal offset for all rooms
        //             const width = 200; // Simplified width for all rooms
        //             const height = 100; // Simplified height for all rooms
        //             yOffset += height + 20; // Increment yOffset for each room
        //
        //             // Draw the rectangle for the room
        //             ctx.fillStyle = 'skyblue';
        //             ctx.fillRect(x, yOffset, width, height);
        //             ctx.strokeRect(x, yOffset, width, height);
        //
        //             // Label the room
        //             ctx.fillStyle = 'black';
        //             ctx.textAlign = 'center';
        //             ctx.fillText(roomName, x + width / 2, yOffset + height / 2);
        //         });
        //     }
        // }, [houseData]);
   
        useEffect(() => {
            if (houseData && canvasRef.current && houseData['Smart Home'] && houseData['Smart Home'].Rooms) {
                const canvas = canvasRef.current;
                canvas.width = 800; // Adjust as needed
                canvas.height = 1000; // Adjust based on the number of rooms
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
   
                const roomsAndAreas = { ...houseData['Smart Home'].Rooms, ...houseData['Smart Home']['Other Areas'] };
                let yOffset = 20; // Initial vertical offset for drawing
                Object.keys(roomsAndAreas).forEach((roomName, index) => {
                    const x = 50; // Horizontal offset
                    const width = 200; // Simplified width for all rooms
                    const height = 100; // Simplified height for all rooms
                    const y = yOffset + (index * (height + 20)); // Calculate Y position
   
                    // Draw the rectangle for the room
                    ctx.fillStyle = 'skyblue';
                    ctx.fillRect(x, y, width, height);
                    ctx.strokeRect(x, y, width, height);
   
                    // Label the room
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.fillText(roomName, x + width / 2, y + height / 2);
   
                    // Additional features or details can be added here
                });
            }
        }, [houseData]);
   
   
   
   
   
        return (
            <div>
                <input type="file" accept=".json" onChange={handleFileChange} />
                <canvas ref={canvasRef}></canvas>
            </div>
        );
    }
   
    export default HouseLayoutCanvas;