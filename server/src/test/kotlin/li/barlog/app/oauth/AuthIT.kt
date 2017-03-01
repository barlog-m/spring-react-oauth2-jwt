package li.barlog.app.oauth

import li.barlog.app.TestController
import com.fasterxml.jackson.databind.ObjectMapper
import li.barlog.app.security.CustomJwtTokenEnhancer
import li.barlog.app.settings.AuthenticationSettings
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.context.ApplicationContext
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner

import org.springframework.web.util.UriComponentsBuilder

@RunWith(SpringRunner::class)
@SpringBootTest(
	classes = arrayOf(
		AuthTestConfig::class,
		TestController::class,
		CustomJwtTokenEnhancer::class,
		AuthenticationSettings::class
	),
	webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class AuthIT {
	companion object {
		private val CLIENT_ID = "test_tool"
		private val CLIENT_SECRET = "06c8cab86d1fe668c4530a9fff15f7a6e35f1858"
	}

	@Autowired
	lateinit var mapper: ObjectMapper

	@Autowired
	lateinit var restTemplate: TestRestTemplate

	@Value("\${local.server.port}")
	val port: Int = 0

	@Autowired
	lateinit var context: ApplicationContext

	@Test
	fun authentication() {
		val url = createAuthURL()

		val response = restTemplate.postForEntity(url, null, String::class.java)
		assertEquals(HttpStatus.OK, response.statusCode)

		val results = mapper.readValue(response.body, Map::class.java)
		val token = results["access_token"]
		assertFalse(token.toString().isEmpty())
	}

	@Test
	fun postWithoutAuthentication() {
		val response = restTemplate.postForEntity("/api/test", null, String::class.java)
		assertEquals(HttpStatus.UNAUTHORIZED, response.statusCode)
	}

	@Test
	fun postWithAuthentication() {
		val access_token = requestToken().first

		val request = createRequestWithToken(access_token)

		val response = restTemplate.exchange("/api/test", HttpMethod.POST, request, String::class.java)
		assertEquals(HttpStatus.OK, response.statusCode)

		val map = mapper.readValue(response.body, Map::class.java)
		assertEquals("ok", map["status"])
	}

	@Test
	fun tokenRefresh() {
		val refresh_token = requestToken().second

		val url = createTokenRefreshURL(refresh_token)

		val e = restTemplate.postForEntity(url, null, String::class.java)
		val tokenMap = mapper.readValue(e.body, Map::class.java)
		val new_access_token = tokenMap["access_token"].toString()

		val request = createRequestWithToken(new_access_token)
		val response = restTemplate.exchange("/api/test", HttpMethod.POST, request, String::class.java)
		assertEquals(HttpStatus.OK, response.statusCode)

		val map = mapper.readValue(response.body, Map::class.java)
		assertEquals("ok", map["status"])
	}

	private fun createRequestWithToken(token: String): HttpEntity<Void> {
		val headers = HttpHeaders()
		headers.contentType = MediaType.APPLICATION_JSON_UTF8
		headers.accept = listOf(MediaType.APPLICATION_JSON_UTF8)
		headers.add("Authorization", "Bearer $token")

		val request = HttpEntity<Void>(headers)
		return request
	}

	private fun requestToken(): Pair<String, String> {
		val url = createAuthURL()

		val e = restTemplate.postForEntity(url, null, String::class.java)
		val tokenMap = mapper.readValue(e.body, Map::class.java)
		val access_token = tokenMap["access_token"].toString()
		val refresh_token = tokenMap["refresh_token"].toString()
		return Pair(access_token, refresh_token)
	}

	private fun createAuthURL() = UriComponentsBuilder
		.fromPath("/oauth/token")
		.scheme("http")
		.host("localhost")
		.port(port)
		.queryParam("grant_type", "password")
		.queryParam("client_id", CLIENT_ID)
		.queryParam("client_secret", CLIENT_SECRET)
		.queryParam("username", "foo")
		.queryParam("password", "bar")
		.build().toUri()

	private fun createTokenRefreshURL(refresh_token: String) = UriComponentsBuilder
		.fromPath("/oauth/token")
		.scheme("http")
		.host("localhost")
		.port(port)
		.queryParam("grant_type", "refresh_token")
		.queryParam("client_id", CLIENT_ID)
		.queryParam("client_secret", CLIENT_SECRET)
		.queryParam("refresh_token", refresh_token)
		.build().toUri()
}
