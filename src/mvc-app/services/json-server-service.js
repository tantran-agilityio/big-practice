import { API_URL } from "../constants/urls.js";

class JsonServerService {
  async get(status) {
    let response = await fetch(`${API_URL}/${status}?_sort=updateDate`);
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
		console.log(currentStatus);
		console.log(data.status);
		console.log(data.status == currentStatus);
		const data_url = `${API_URL}/${data.status}/${data.id}`;
		if (data.status == currentStatus) {

			const response = await fetch(data_url, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			return response.json();
		} else {
			const old_data_url = `${API_URL}/${currentStatus}/${data.id}`;
			const new_status_url = `${API_URL}/${data.status}`;

			await fetch(old_data_url, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});

			const response = await fetch(new_status_url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			return response.json();
		}
  }

  async delete(data) {
    const url = `${API_URL}/${data.status}/${data.id}`;
    await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }

}

export { JsonServerService };
