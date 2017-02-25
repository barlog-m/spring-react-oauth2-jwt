package li.barlog.app.security

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken
import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.token.TokenEnhancer
import org.springframework.stereotype.Service
import java.util.HashMap

@Service
class CustomJwtTokenEnhancer : TokenEnhancer {
	override fun enhance(
		accessToken: OAuth2AccessToken,
		authentication: OAuth2Authentication): OAuth2AccessToken {
		val principal = authentication.principal
		if (principal is UserDetailsEx) {
			val additionalInfo = HashMap<String, Any>()
			additionalInfo.put("name", principal.name)
			(accessToken as DefaultOAuth2AccessToken).additionalInformation = additionalInfo
		}
		return accessToken
	}
}
