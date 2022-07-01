import axios from 'axios';
const SERVER_URL = 'http://localhost:5000';

export const getPhoneNumbers = async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/phoneNumbers`);
    return data
  } catch(e) {
    console.log('Error:', e.message);
  }
}