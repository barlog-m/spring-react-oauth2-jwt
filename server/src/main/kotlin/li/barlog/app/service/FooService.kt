package li.barlog.app.service

import li.barlog.app.model.Foo
import org.springframework.stereotype.Service

@Service
class FooService {
	fun list(): List<Foo> = (0..49).map { Foo(it) }
}
