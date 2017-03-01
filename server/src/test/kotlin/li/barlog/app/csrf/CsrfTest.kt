package li.barlog.app.csrf

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.setup.DefaultMockMvcBuilder
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@RunWith(SpringRunner::class)
@SpringBootTest(
	classes = arrayOf(CsrfTestConfig::class),
	webEnvironment = WebEnvironment.MOCK)
@ActiveProfiles("test")
class CsrfTest {
	@Autowired
	lateinit var context: WebApplicationContext

	lateinit var mvc: MockMvc

	@Before
	fun setup() {
		mvc = MockMvcBuilders
			.webAppContextSetup(context)
			.apply<DefaultMockMvcBuilder>(springSecurity())
			.build()
	}

	@Test
	@WithMockUser
	fun csrfOk() {
		mvc
			.perform(
				post("/oauth/authorize")
					.accept(MediaType.APPLICATION_JSON_UTF8)
					.contentType(MediaType.APPLICATION_JSON_UTF8)
					.with(csrf().asHeader()))
			.andExpect(status().isOk)
	}

	@Test
	@WithMockUser
	fun csrfError() {
		mvc
			.perform(
				post("/oauth/authorize")
					.accept(MediaType.APPLICATION_JSON_UTF8)
					.contentType(MediaType.APPLICATION_JSON_UTF8)
					.with(csrf().useInvalidToken()))
			.andExpect(status().isForbidden)
	}
}
