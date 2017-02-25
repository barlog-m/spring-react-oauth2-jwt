package li.barlog.app.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.SessionAttributes
import org.springframework.security.oauth2.provider.ClientDetailsService
import org.springframework.security.oauth2.provider.approval.ApprovalStore
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView
import org.springframework.security.oauth2.provider.AuthorizationRequest
import org.springframework.security.oauth2.common.util.OAuth2Utils
import org.springframework.security.oauth2.provider.ClientDetails
import org.springframework.security.oauth2.provider.approval.Approval.ApprovalStatus
import java.util.LinkedHashMap
import java.security.Principal

@Controller
@SessionAttributes("authorizationRequest")
class OAuth2AccessConfirmationController @Autowired constructor(
	private var clientDetailsService: ClientDetailsService,
	private var approvalStore: ApprovalStore
) {
	@RequestMapping("/oauth/confirm_access")
	fun getAccessConfirmation(model: MutableMap<String, Any>,
							  principal: Principal): ModelAndView {
		val clientAuth = model.remove("authorizationRequest") as AuthorizationRequest
		model.put("auth_request", clientAuth)

		val client = clientDetailsService.loadClientByClientId(clientAuth.clientId)
		model.put("client", client)

		val scopes = getScopes(client, clientAuth, principal)
		model.put("scopes", scopes)

		return ModelAndView("access_confirmation", model)
	}

	private fun getScopes(client: ClientDetails,
						  clientAuth: AuthorizationRequest,
						  principal: Principal): LinkedHashMap<String, String> {
		val scopes = LinkedHashMap<String, String>()
		clientAuth.scope.forEach { scopes.put(OAuth2Utils.SCOPE_PREFIX + it, "false") }

		approvalStore.getApprovals(principal.name, client.clientId)
			.filter { clientAuth.scope.contains(it.scope) }
			.forEach {
				scopes.put(OAuth2Utils.SCOPE_PREFIX + it.scope,
					if (it.status == ApprovalStatus.APPROVED) "true" else "false")
			}
		return scopes
	}
}
