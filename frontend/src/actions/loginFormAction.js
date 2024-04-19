import { redirect } from "react-router-dom";

export async function loginFormAction({ request }) {
    const data = await request.formData();
    const submission = {
      email: data.get("email"),
      password: data.get("password"),
    };
    //POST logins
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("house_id", data.house_id);
        return redirect("/");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        return { error: `Signup failed: ${errorData.detail}` };
      }
    } catch (error) {
      return { error: `Signup failed: ${error.message}` };
    }
  }
  
