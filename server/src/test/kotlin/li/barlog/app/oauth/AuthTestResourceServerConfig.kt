package li.barlog.app.oauth

import li.barlog.app.security.OAuth2LogoutSuccessHandler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.provider.token.TokenStore

@Configuration
@EnableResourceServer
open class AuthTestResourceServerConfig : ResourceServerConfigurerAdapter() {
	@Autowired
	private lateinit var tokenStore: TokenStore

	@Autowired
	private lateinit var oAuth2LogoutSuccessHandler: OAuth2LogoutSuccessHandler

	override fun configure(http: HttpSecurity) {
		// @formatter:off
		http
			.requestMatchers().antMatchers("/api/**", "/oauth/log_out")
			.and()
				.authorizeRequests()
					.anyRequest().authenticated()
			.and()
				.logout()
					.logoutUrl("/oauth/log_out")
					.logoutSuccessHandler(oAuth2LogoutSuccessHandler)
			.and()
				.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				.csrf().disable()
		// @formatter:on
	}

	override fun configure(resources: ResourceServerSecurityConfigurer) {
		resources.tokenStore(tokenStore)
	}
}
