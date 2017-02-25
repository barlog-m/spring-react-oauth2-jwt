package li.barlog.app.security

import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AbstractAuthenticationTargetUrlRequestHandler
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException
import org.springframework.security.oauth2.provider.token.TokenStore

@Component
open class OAuth2LogoutSuccessHandler @Autowired constructor(
	private val tokenStore: TokenStore
) :
	AbstractAuthenticationTargetUrlRequestHandler(),
	LogoutSuccessHandler {
	companion object {
		private val log = LoggerFactory.getLogger(OAuth2LogoutSuccessHandler::class.java)

		private val BEARER_AUTHENTICATION = "Bearer "
		private val HEADER_AUTHORIZATION = "Authorization"
	}

	override fun onLogoutSuccess(request: HttpServletRequest,
								 response: HttpServletResponse,
								 authentication: Authentication?) {
		val token = request.getHeader(HEADER_AUTHORIZATION)

		try {
			if (token != null && token.startsWith(BEARER_AUTHENTICATION)) {
				val oAuth2AccessToken = tokenStore.readAccessToken(token.split(" ")[1])

				if (oAuth2AccessToken != null) {
					tokenStore.removeAccessToken(oAuth2AccessToken)
					response.status = HttpServletResponse.SC_OK
					return
				}
			}
		} catch (e: InvalidTokenException) {
			log.warn("invalid token when log out")
			response.status = HttpServletResponse.SC_UNAUTHORIZED
			return
		}

		response.status = HttpServletResponse.SC_BAD_REQUEST
	}
}
