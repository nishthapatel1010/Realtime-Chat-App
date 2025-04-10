import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios"; // Ensure axios is imported

function userGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]); // Initializing with an empty array
  const [loading, setLoading] = useState([]); // Loading state should be a boolean, not an array

  useEffect(() => {
    const getUser = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        // Logging cookies to check if the browser is sending the cookie automatically
        // console.log("All cookies: ", document.cookie); // You can inspect this in browser dev tools
        const token = Cookies.get("jwt");
        // console.log("JWT from Cookies:", token);
        // Sending a request to get user data with 'withCredentials' to include cookies in the request
        const response = await axios.get(
          "http://localhost:5002/api/users/getuserdata",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // This ensures the JWT cookie is sent with the request automatically
          }
        );

        // console.log("Fetched Users:", response.data); // Log the response for debugging
        setAllUsers(response.data); // Set the fetched users in state
      } catch (error) {
        console.error("Error in fetching users:", error); // Log the error
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    getUser(); // Call the function to fetch users when the component mounts
  }, []); // Empty dependency array means this will only run once when the component mounts

  return [allUsers, loading]; // Returning the users and loading state
}

export default userGetAllUsers;
