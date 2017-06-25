package li.barlog.app.rest

import li.barlog.app.model.Bar
import li.barlog.app.service.BarService
import mu.KLogging
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
class BarController constructor(
	private val barService: BarService
) {
	companion object : KLogging()

	@GetMapping
	fun get(): ResponseEntity<List<Bar>> = run {
		logger.info { "get list" }
		ResponseEntity.ok(barService.list())
	}
}
