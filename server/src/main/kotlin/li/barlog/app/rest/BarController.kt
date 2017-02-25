package li.barlog.app.rest

import li.barlog.app.service.BarService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(
	path = arrayOf("\${api.prefix}/bar"),
	consumes = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE),
	produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE)
)
class BarController @Autowired constructor(
	private val barService: BarService
) {
	companion object {
		private val log = LoggerFactory.getLogger(BarController::class.java)
	}

	@GetMapping
	fun get() = run {
		log.info("get list")
		ResponseEntity.ok(barService.list())
	}
}
