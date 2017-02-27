package li.barlog.app.security

import li.barlog.app.settings.AuthenticationSettings
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserDetailsEx(
	private val userInfo: AuthenticationSettings.UserInfo
) : UserDetails {
	val name: String by lazy {
		userInfo.name
	}

	override fun getUsername() = userInfo.user

	override fun getPassword() = userInfo.password

	override fun getAuthorities(): Collection<GrantedAuthority> {
		return setOf(SimpleGrantedAuthority("ROLE_USER"))
	}

	override fun isCredentialsNonExpired() = true

	override fun isAccountNonExpired() = true

	override fun isAccountNonLocked() = true

	override fun isEnabled() = userInfo.enabled
}
