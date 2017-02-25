package li.barlog.app.security

import org.springframework.security.oauth2.common.exceptions.OAuth2Exception
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.HttpServletRequest

@Controller
class OAuth2ErrorController {
	@RequestMapping("/oauth/error")
	fun handleError(request: HttpServletRequest): ModelAndView {
		val error = request.getAttribute("error")

		val model = when (error is OAuth2Exception) {
			true -> mapOf(
				"status" to (error as OAuth2Exception).oAuth2ErrorCode,
				"message" to error.message
			)
			else -> mapOf("message" to "Unknown error")
		}

		return ModelAndView("error", model)
	}
}
