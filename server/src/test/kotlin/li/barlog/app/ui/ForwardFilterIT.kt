package li.barlog.app.ui

import li.barlog.app.config.AppConfig
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(
	classes = arrayOf(AppConfig::class),
	webEnvironment = WebEnvironment.RANDOM_PORT
)
@ActiveProfiles("test")
class ForwardFilterIT {
	@Autowired
	private lateinit var restTemplate: TestRestTemplate

	@Test
	fun redirect() {
		val response = restTemplate.exchange("/ui/foo", HttpMethod.GET,
			HttpEntity.EMPTY, String::class.java)
		assertEquals(HttpStatus.OK, response.statusCode)
		assertEquals("7387fba3f72dcb8457af712367ab6e34", response.body.trim())
	}

	@Test
	fun skip() {
		val response = restTemplate.exchange("/health", HttpMethod.GET,
			HttpEntity.EMPTY, String::class.java)
		assertEquals(HttpStatus.OK, response.statusCode)
		assertNotEquals("7387fba3f72dcb8457af712367ab6e34", response.body.trim())
	}
}
