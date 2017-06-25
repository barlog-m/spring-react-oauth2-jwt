package li.barlog.app.rest

import mu.KLogging
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(
	path = arrayOf("\${api.prefix}/errors"),
	consumes = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE),
	produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE)
)
class ErrorsController {
	companion object : KLogging()

	@GetMapping("/bad")
	fun bad(@RequestParam("id") id: Long): ResponseEntity<Long> = run {
		logger.info { "id: $id" }
		ResponseEntity.ok(id)
	}

	@GetMapping("/timeout")
	@ResponseStatus(value = HttpStatus.OK)
	fun timeout() = run {
		Thread.sleep(2000)
		logger.info { "timeout" }
	}
}
