package li.barlog.app.oauth

import li.barlog.app.TestController
import li.barlog.app.security.CustomJwtTokenEnhancer
import li.barlog.app.settings.AuthenticationSettings
import com.fasterxml.jackson.databind.ObjectMapper
import org.hamcrest.Matchers
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.setup.DefaultMockMvcBuilder
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath

@RunWith(SpringRunner::class)
@SpringBootTest(
	classes = arrayOf(
		AuthTestConfig::class,
		TestController::class,
		CustomJwtTokenEnhancer::class,
		AuthenticationSettings::class
	),
	webEnvironment = WebEnvironment.MOCK)
@ActiveProfiles("test")
class AuthTest {
	@Autowired
	private lateinit var context: WebApplicationContext

	@Autowired
	private lateinit var mapper: ObjectMapper

	@Value("\${api.prefix}")
	private val apiPrefix = ""

	private lateinit var mvc: MockMvc

	@Before
	fun setup() {
		mvc = MockMvcBuilders
			.webAppContextSetup(context)
			.apply<DefaultMockMvcBuilder>(springSecurity())
			.build()
	}

	@Test
	fun authentication() {
		mvc
			.perform(
				post(createAuthUrl("foo", "bar"))
					.with(csrf().asHeader()))
			.andExpect(status().isOk)
			.andExpect(jsonPath("access_token", Matchers.not(Matchers.isEmptyString())))
	}

	@Test
	@WithMockUser
	fun postWithoutAuthentication() {
		mvc
			.perform(
				post("$apiPrefix/test")
					.accept(MediaType.APPLICATION_JSON_UTF8)
					.contentType(MediaType.APPLICATION_JSON_UTF8)
					.with(csrf().asHeader()))
			.andExpect(status().isUnauthorized)
	}

	@Test
	fun postWithAuthentication() {
		val access_token = requestToken().first

		val resultBody = mvc
			.perform(
				post("$apiPrefix/test")
					.accept(MediaType.APPLICATION_JSON_UTF8)
					.contentType(MediaType.APPLICATION_JSON_UTF8)
					.header("Authorization", "Bearer $access_token")
					.with(csrf().asHeader()))
			.andExpect(status().isOk)
			.andReturn().response.contentAsString

		val map = mapper.readValue(resultBody, Map::class.java)
		Assert.assertEquals("ok", map["status"])
	}

	@Test
	fun tokenRefresh() {
		val refresh_token = requestToken().second

		val tokenBody = mvc
			.perform(
				post(createTokenRefreshUrl(refresh_token))
					.with(csrf().asHeader()))
			.andExpect(status().isOk)
			.andReturn().response.contentAsString

		val tokenMap = mapper.readValue(tokenBody, kotlin.collections.Map::class.java)
		val access_token = tokenMap["access_token"].toString()

		val resultBody = mvc
			.perform(
				post("$apiPrefix/test")
					.accept(MediaType.APPLICATION_JSON_UTF8)
					.contentType(MediaType.APPLICATION_JSON_UTF8)
					.header("Authorization", "Bearer $access_token")
					.with(csrf().asHeader()))
			.andExpect(status().isOk)
			.andReturn().response.contentAsString

		val map = mapper.readValue(resultBody, Map::class.java)
		Assert.assertEquals("ok", map["status"])
	}

	@Test
	fun tokenCheck() {
		val access_token = requestToken().first

		mvc
			.perform(
				get(createTokenCheckURL(access_token))
					.header("Authorization", basicAuthHeader())
					.with(csrf().asHeader()))
			.andExpect(status().isOk)
			.andReturn().response.contentAsString
	}

	private fun requestToken(): Pair<String, String> {
		val tokenBody = mvc
			.perform(
				post(createAuthUrl("foo", "bar"))
					.with(csrf().asHeader()))
			.andExpect(status().isOk)
			.andReturn().response.contentAsString

		val tokenMap = mapper.readValue(tokenBody, kotlin.collections.Map::class.java)
		val access_token = tokenMap["access_token"].toString()
		val refresh_token = tokenMap["refresh_token"].toString()
		return Pair(access_token, refresh_token)
	}
}
