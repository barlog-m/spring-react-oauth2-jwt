package li.barlog.app.oauth

import org.springframework.web.util.UriComponentsBuilder

private val CLIENT_ID = "test_tool"
private val CLIENT_SECRET = "06c8cab86d1fe668c4530a9fff15f7a6e35f1858"

private fun authUrl(password: String, user: String) =
	UriComponentsBuilder
		.fromPath("/oauth/token")
		.queryParam("grant_type", "password")
		.queryParam("client_id", CLIENT_ID)
		.queryParam("client_secret", CLIENT_SECRET)
		.queryParam("username", user)
		.queryParam("password", password)

fun createAuthUrl(user: String, password: String) =
	authUrl(password, user)
		.build().toUriString()

fun createAuthUrl(port: Int, user: String, password: String) =
	authUrl(password, user)
		.scheme("http")
		.host("localhost")
		.port(port)
		.build().toUri()

private fun tokenRefreshUrl(refresh_token: String) =
	UriComponentsBuilder
		.fromPath("/oauth/token")
		.queryParam("grant_type", "refresh_token")
		.queryParam("client_id", CLIENT_ID)
		.queryParam("client_secret", CLIENT_SECRET)
		.queryParam("refresh_token", refresh_token)

fun createTokenRefreshUrl(refresh_token: String) =
	tokenRefreshUrl(refresh_token)
		.build().toUriString()

fun createTokenRefreshUrl(port: Int,
						  refresh_token: String) =
	tokenRefreshUrl(refresh_token)
		.scheme("http")
		.host("localhost")
		.port(port)
		.build().toUri()
