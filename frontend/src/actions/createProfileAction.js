import { redirect } from "react-router-dom";


export async function createProfileAction({ request }) {
  const data = await request.formData();
  console.log(localStorage.getItem("email"), data.get("username"), data.get("profileType"));
  const submission = {
    email: localStorage.getItem("email"),
    username: data.get("username"),
    profile_type: data.get("profileType"),
  };

  try {
    const response = await fetch("/api/profile/createprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });
    if (response.ok) {
      console.log(response.json())
      return redirect("/accounts");
    } else {
      const errorData = await response.json();
      console.log(errorData);
      return { error: `Signup failed: ${errorData.detail}` };
    }
  } catch (error) {
    return { error: `Signup failed: ${error.message}` };
  }
}
