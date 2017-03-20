import URI from "urijs";
import startsWith from "lodash.startswith";

import * as oauth from "../config/oauth";

export const refreshToken = refresh_token => {
	return new Promise((resolve, reject) => {
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.timeout = 5000;

		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				const data = JSON.parse(xmlHttp.responseText);
				resolve(data);
			} else if (xmlHttp.status >= 400) {
				reject({
						response: {
							status: xmlHttp.status,
							data: JSON.parse(xmlHttp.responseText)
						}
					}
				);
			}
		};
		xmlHttp.ontimeout = error => reject(error);

		xmlHttp.open("POST", createTokenRefreshUrl(refresh_token), true);
		xmlHttp.setRequestHeader("Accept", "application/json;charset=UTF-8");
		xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xmlHttp.send();
	});
};

export const createTokenRequestUrl = (username, password) =>
	URI("/oauth/token")
		.query({
			grant_type: "password",
			client_id: oauth.CLIENT_ID,
			client_secret: oauth.CLIENT_SECRET,
			username,
			password
		}).toString();

export const createTokenRefreshUrl = refresh_token =>
	URI("/oauth/token")
		.query({
			grant_type: "refresh_token",
			client_id: oauth.CLIENT_ID,
			client_secret: oauth.CLIENT_SECRET,
			refresh_token
		}).toString();

export const checkNeedRefresh = body => {
	if (body === "") {
		return false;
	} else if (body.error !== "invalid_token") {
		return false;
	} else if (startsWith(body.error_description, "Access token expired:")) {
		return true;
	}
};
