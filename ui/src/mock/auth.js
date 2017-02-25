import moxios from "moxios";

export default () => {
	moxios.stubRequest(/\/oauth\/token\?.*/, {
		status: 200,
		response: {
			"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODE3ODg5NTIsInVzZXJfbmFtZSI6InVzZXIiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiZmIyN2Q3NzctOTJmYS00NDMyLTg4YTItM2FiZmQwZDI0NTZjIiwiY2xpZW50X2lkIjoidWkiLCJzY29wZSI6WyJhbGwiXX0.SzzxvA6O6bEMyXD8Z0KwDn0vEBIbQCrxZAndqnjX1BE",
			"token_type": "bearer",
			"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsiYWxsIl0sImF0aSI6ImZiMjdkNzc3LTkyZmEtNDQzMi04OGEyLTNhYmZkMGQyNDU2YyIsImV4cCI6MTQ4NDM4MDk0NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjliNDcyZjdiLTAwZjEtNDU5Yi1iZWM5LTEyNmMxODc0MWEyNyIsImNsaWVudF9pZCI6InVpIn0.tFybE45LXIkF6daYqWlfr4kJZH0CVPicSElYuhoUQh4",
			"expires_in": 4,
			"scope": "all",
			"jti": "fb27d777-92fa-4432-88a2-3abfd0d2456c"
		}
	});

	moxios.stubRequest("/oauth/log_out", {
		status: 200,
		response: ""
	});
};
