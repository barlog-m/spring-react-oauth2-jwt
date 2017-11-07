package li.barlog.app.security

import li.barlog.app.config.AppConfig
import org.junit.Assert.assertTrue
import org.junit.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(
	classes = arrayOf(AppConfig::class),
	webEnvironment = WebEnvironment.NONE
)
@ActiveProfiles("test")
class PropertiesUserDetailsServiceIT {
	@Autowired
	private lateinit var service: PropertiesUserDetailsService

	@Test
	fun loadUserByUsername() {
		val userDetails = service.loadUserByUsername("foo")

		assertTrue("user details isEnabled false", userDetails.isEnabled)
		assertTrue("user details isAccountNonLocked false",
			userDetails.isAccountNonLocked)
		assertTrue("user details isAccountNonExpired false",
			userDetails.isAccountNonExpired)
		assertTrue("user details isCredentialsNonExpired false",
			userDetails.isCredentialsNonExpired)

		assertEquals("user name not 'foo'", "foo", userDetails.username)
		assertEquals("user password not '123'", "123", userDetails.password)
		assertEquals("user authorities not 'ROLE_USER'",
			setOf(SimpleGrantedAuthority("ROLE_USER")), userDetails.authorities)
	}
}
