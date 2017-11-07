package li.barlog.app.settings

import li.barlog.app.config.AppConfig
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(
	classes = arrayOf(AppConfig::class),
	webEnvironment = WebEnvironment.NONE
)
@ActiveProfiles("test")
class AuthenticationSettingsTest {
	@Autowired
	private lateinit var authenticationSettings: AuthenticationSettings

	@Test
	fun test() {
		val foo = authenticationSettings.users.find { it.user == "foo" }!!
		assertNotNull("user 'foo' does not exists", foo)
		assertEquals("name for user 'foo' not 'Фун'",
			"Фун", foo.name)
		assertEquals("password for user 'foo' not '123'",
			"123", foo.password)

		val bar = authenticationSettings.users.find { it.user == "bar" }!!
		assertNotNull("user 'bar' does not exists", bar)
		assertEquals("name for user 'bar' not 'Бун'",
			"Бун", bar.name)
		assertEquals("password for user 'foo' not '123'",
			"321", bar.password)
	}
}
