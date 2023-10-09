import { API_URL } from "../constants/urls";

class JsonServerService {

  getData = async () => {
    let response = await fetch(`${API_URL}/db`);
    // let response = await fetch("http://localhost:3000/db");
    let result = await response.json();
    return result;
  }

  saveData = () => {
  }
}

export { JsonServerService };
