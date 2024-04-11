export async function loadProfiles() {
  const email = localStorage.getItem("email");
  const house_id = localStorage.getItem("house_id");

  try {
    // Start both fetch operations in parallel
    const profilesResponse = fetch(`api/profile/getprofiles?email=${encodeURIComponent(email)}`);
    const roomsResponse = fetch(`api/room/getrooms?house_id=${encodeURIComponent(house_id)}`);
    const zonesResponse = fetch(`api/zone/getzones?house_id=${encodeURIComponent(house_id)}`);
   

    // Wait for both promises to resolve
    const [profiles, rooms, zones] = await Promise.all([profilesResponse, roomsResponse, zonesResponse]);
    
    // Check if both responses are ok (status in the range 200-299)
    if (profiles.ok && rooms.ok && zones.ok) {
      const profilesData = await profiles.json();
      const roomsData = await rooms.json();
      const zonesData = await zones.json();
      console.log(zonesData)

      // Assuming you want to return both profiles and rooms data
      return {
        profiles: profilesData,
        rooms: roomsData,
        zones: zonesData,
      };
    } else {
      // Handle unsuccessful responses
      console.error("Error loading data", { profilesStatus: profiles.status, roomsStatus: rooms.status, zonesStatus: zones.status});
      return {
        error: `Failed to load data: Profiles status - ${profiles.status}, Rooms status - ${rooms.status}, Zones status - ${zones.status}`,
      };
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch operation
    console.error("Error in fetch operation", error);
    return { error: `Error in fetch operation: ${error.message}` };
  }
}
