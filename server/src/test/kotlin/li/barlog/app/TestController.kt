package li.barlog.app

import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("\${api.prefix}/test",
	consumes = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE),
	produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE)
)
class TestController {
	@PostMapping
	fun post() = run {
		ResponseEntity.ok(mapOf("status" to "ok"))
	}

	@GetMapping
	fun get() = run {
		ResponseEntity.ok(mapOf("status" to "ok"))
	}
}
