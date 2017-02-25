package li.barlog.app.service

import li.barlog.app.model.Bar
import org.springframework.stereotype.Service

@Service
class BarService {
	fun list(): List<Bar> = (0..49).map { Bar(it) }
}
