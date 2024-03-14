export async function loadProfiles({params}){
    const email = localStorage.getItem('email')
    const response = await fetch( `api/profile/getprofiles?email=${encodeURIComponent(email)}`);
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data
        // Process the received data here
    } else {
        // Handle unsuccessful response here
        console.log('Error: did not return anything', response.status);
        return { error: `Signup failed: ${response.status}` };
    }
    
}