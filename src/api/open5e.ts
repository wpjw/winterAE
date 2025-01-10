import axios from "axios";

// Base URL for the Open5e API
const BASE_URL = "https://api.open5e.com";

// Function to fetch monsters from the Open5e API
export const fetchMonsters = async (cr?: string) => {
  try {
    // Make a GET request to the Open5e API to fetch monsters
    const response = await axios.get(`${BASE_URL}/monsters/`, {
      params: {
        document__slug__iexact: "wotc-srd", // Filter to include only official DnD SRD monsters
        ...(cr !== undefined && { cr }), // Include challenge rating filter if provided
      },
    });
    // Return the response data
    return response.data;
  } catch (error) {
    // Log and rethrow any errors that occur during the request
    console.error("Error fetching monsters:", error);
    throw error;
  }
};