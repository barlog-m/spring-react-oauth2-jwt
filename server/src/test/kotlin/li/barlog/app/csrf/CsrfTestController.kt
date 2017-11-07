package li.barlog.app.csrf

import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/oauth/authorize",
	consumes = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE),
	produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE)
)
class CsrfTestController {
	@PostMapping
	fun post(): ResponseEntity<Map<String, String>> =
		ResponseEntity.ok(mapOf("status" to "ok"))
}
