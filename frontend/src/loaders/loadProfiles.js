export async function loadProfiles() {
  const email = localStorage.getItem("email");
  const house_id = localStorage.getItem("house_id");
 
  try {
    // Start both fetch operations in parallel
    const profilesResponse = fetch(`api/profile/getprofiles?email=${encodeURIComponent(email)}`);
    const roomsResponse = fetch(`api/room/getrooms?house_id=${encodeURIComponent(house_id)}`);
   

    // Wait for both promises to resolve
    const [profiles, rooms] = await Promise.all([profilesResponse, roomsResponse]);

    // Check if both responses are ok (status in the range 200-299)
    if (profiles.ok && rooms.ok) {
      const profilesData = await profiles.json();
      const roomsData = await rooms.json();

      // Assuming you want to return both profiles and room data
      return {
        profiles: profilesData,
        rooms: roomsData,
      };
    } else {
      // Handle unsuccessful responses
      console.error("Error loading data", { profilesStatus: profiles.status, roomsStatus: rooms.status });
      return {
        error: `Failed to load data: Profiles status - ${profiles.status}, Rooms status - ${rooms.status}`,
      };
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch operation
    console.error("Error in fetch operation", error);
    return { error: `Error in fetch operation: ${error.message}` };
  }
}
