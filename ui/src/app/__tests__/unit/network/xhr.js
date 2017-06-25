import * as xhr from "../../../network/xhr";

describe("check result object format", () => {
	it("should be with empty data", () => {
		const xmlHttp = {
			status: 404,
			statusText: "NOT FOUND",
			responseText: ""
		};
		expect(xhr.createResultObject(xmlHttp)).toEqual({
			status: 404,
			statusText: "NOT FOUND",
		});
	});


	it("should be with object data", () => {
		const xmlHttp = {
			status: 404,
			statusText: "NOT FOUND",
			responseText: "{ \"value\": \"foo\" }"
		};
		expect(xhr.createResultObject(xmlHttp)).toEqual({
			status: 404,
			statusText: "NOT FOUND",
			data: {
				value: "foo"
			}
		});
	});


	it("should be with text data", () => {
		const xmlHttp = {
			status: 404,
			statusText: "NOT FOUND",
			responseText: "foo"
		};
		expect(xhr.createResultObject(xmlHttp)).toEqual({
			status: 404,
			statusText: "NOT FOUND",
			data: "foo"
		});
	});
});
