import { API_URL } from "../constants/urls.js";

class JsonServerService {
  async get() {
    let response = await fetch(`${API_URL}/db`);
    let result = await response.json();
    return result;
  }

  async add(data) {
    const url = `${API_URL}/${data.status}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async update(data, currentStatus) {
    const url = `${API_URL}/${data.status}/${data.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    console.log(response.json());
    return response.json();
  }

  async delete(data) {
    const url = `${API_URL}/${data.status}/${data.id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }

}

export { JsonServerService };
