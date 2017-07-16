package li.barlog.app.config.oauth

import li.barlog.app.security.AuthenticationLoggerFilter
import li.barlog.app.security.SettingsUserDetailsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.provider.token.DefaultTokenServices
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor
import org.springframework.security.web.csrf.CookieCsrfTokenRepository

@Configuration
@EnableResourceServer
open class ResourceServerConfig : ResourceServerConfigurerAdapter() {
	@Autowired
	private lateinit var tokenServices: DefaultTokenServices

	@Autowired
	private lateinit var userDetailsService: SettingsUserDetailsService

	override fun configure(http: HttpSecurity) {
		// @formatter:offyarn
		http
			.addFilterAfter(AuthenticationLoggerFilter(userDetailsService),
				FilterSecurityInterceptor::class.java)
			.requestMatchers().antMatchers("/api/**")
			.and()
				.authorizeRequests()
					.antMatchers("/api/**").hasRole("USER")
					.anyRequest().denyAll()
			.and()
				.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				.csrf()
					.csrfTokenRepository(
						CookieCsrfTokenRepository.withHttpOnlyFalse())
		// @formatter:on
	}

	override fun configure(resources: ResourceServerSecurityConfigurer) {
		resources.tokenServices(tokenServices)
	}
}
