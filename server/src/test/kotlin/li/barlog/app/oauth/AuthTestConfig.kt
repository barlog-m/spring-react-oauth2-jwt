package li.barlog.app.oauth

import li.barlog.app.config.JacksonConfig
import li.barlog.app.config.SecurityConfig
import li.barlog.app.config.oauth.AuthorizationServerConfig
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.security.oauth2.OAuth2AutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter

@EnableAutoConfiguration(exclude = arrayOf(OAuth2AutoConfiguration::class))
@ComponentScan(basePackages = arrayOf("li.barlog.app.oauth"))
@Configuration
@Import(
	JacksonConfig::class,
	SecurityConfig::class,
	AuthorizationServerConfig::class
)
open class AuthTestConfig : GlobalAuthenticationConfigurerAdapter() {
	override fun init(auth: AuthenticationManagerBuilder) {
		auth.inMemoryAuthentication()
			.withUser("foo").password("bar").roles("USER")
	}
}
