package li.barlog.app.rest

import li.barlog.app.service.FooService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(
	path = arrayOf("\${api.prefix}/foo"),
	consumes = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE),
	produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE)
)
class FooController @Autowired constructor(
	private val fooService: FooService
) {
	companion object {
		private val log = LoggerFactory.getLogger(FooController::class.java)
	}

	@GetMapping
	fun get() = run {
		log.info("get list")
		ResponseEntity.ok(fooService.list())
	}
}
