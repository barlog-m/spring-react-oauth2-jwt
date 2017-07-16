package li.barlog.app.security

import li.barlog.app.settings.AuthenticationSettings
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class SettingsUserDetailsService(
	private val settings: AuthenticationSettings
) : UserDetailsService {
	override fun loadUserByUsername(username: String): UserDetails {
		val user = settings.users.find { it.user == username } ?:
			throw UsernameNotFoundException("User not found")

		return UserDetailsEx(user)
	}
}
