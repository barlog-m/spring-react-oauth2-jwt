package li.barlog.app.ui

import org.springframework.http.HttpMethod
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
open class ForwardFilter : OncePerRequestFilter() {
	override fun doFilterInternal(request: HttpServletRequest,
								  response: HttpServletResponse,
								  chain: FilterChain) {
		if (HttpMethod.GET.matches(request.method)) {
			val uri = request.requestURI
			if (StringUtils.startsWithIgnoreCase(uri, "/ui") &&
				!StringUtils.startsWithIgnoreCase(uri, "/ui/js/") &&
				!StringUtils.startsWithIgnoreCase(uri, "/ui/css/") &&
				!StringUtils.startsWithIgnoreCase(uri, "/ui/images/") &&
				!StringUtils.startsWithIgnoreCase(uri, "/ui/fonts/")
			) {
				request.getRequestDispatcher("/ui/index.html")
					.forward(request, response)
				return
			}
		}
		chain.doFilter(request, response)
	}
}
