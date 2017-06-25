import * as connectionSettings from "../config/connection";
import Error from "../error";

export const request = url => {
	return new Promise((resolve, reject) => {
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.timeout = connectionSettings.TIMEOUT;
		xmlHttp.onload = () => onLoad(xmlHttp, resolve, reject);
		xmlHttp.ontimeout = () => onTimeout(xmlHttp, resolve, reject);
		xmlHttp.onerror = () => onError(xmlHttp, resolve, reject);
		xmlHttp.open("POST", url(), true);
		console.debug("xhr: start request", xmlHttp);
		xmlHttp.send();
	});
};

export const onError = (xmlHttp, resolve, reject) => {
	console.error("xhr: on error", xmlHttp);
	reject(Error.network());
};

export const onTimeout = (xmlHttp, resolve, reject) => {
	console.error("xhr: on timeout", xmlHttp);
	reject(Error.network(-2, "TIMEOUT"));
};

export const onLoad = (xmlHttp, resolve, reject) => {
	console.debug("xhr: on load", xmlHttp);
	const result = createResultObject(xmlHttp);
	if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
		resolve(result);
	} else if (xmlHttp.status >= 400) {
		reject(Error.http(result.status, result.statusText, result.data));
	}
};

export const createResultObject = xmlHttp => {
	const result = {
		status: xmlHttp.status,
		statusText: xmlHttp.statusText
	};

	if (xmlHttp.responseText.length <= 0) {
		return ({
			...result,
		});
	} else {
		try {
			const data = JSON.parse(xmlHttp.responseText);
			return ({
				...result,
				data
			});

		} catch (e) {
			return ({
				...result,
				data: xmlHttp.responseText
			});
		}
	}
};
