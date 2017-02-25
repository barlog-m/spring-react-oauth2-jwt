package li.barlog.app.security

import li.barlog.app.settings.AuthenticationSettings
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class SettingsUserDetailsService @Autowired constructor(
	private val settings: AuthenticationSettings
) : UserDetailsService {
	override fun loadUserByUsername(username: String): UserDetails {
		return UserDetailsEx(
			settings.users.find {it.user == username}!!
		)
	}
}
