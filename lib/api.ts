import axios from "axios";

export async function getUsers() {
  try {
    const response = await axios.get(`${process.env.NEXT_API_URL}/test/list`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch users. ${error}`);
  }
}
