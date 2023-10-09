import { API_URL } from "../constants/urls";

class JsonServerService {
	getData = async () => {
		let response = await fetch(`${API_URL}/db`);
		// let response = await fetch("http://localhost:3000/db");
		let result = await response.json();
		return result;
	};

	saveData = () => {};

	async add(data) {
		console.log(">>>>", data);
		const url = `${API_URL}/${data.status}`;
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			// mode: "cors", // no-cors, *cors, same-origin
			// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: "follow", // manual, *follow, error
			// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}
}

export { JsonServerService };
