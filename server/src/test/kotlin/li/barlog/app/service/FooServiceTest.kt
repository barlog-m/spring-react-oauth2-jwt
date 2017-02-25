package li.barlog.app.service

import org.junit.Test
import org.junit.Assert.assertEquals

class FooServiceTest {
	@Test
	fun list() {
		val list = FooService().list()
		assertEquals(50, list.size)
	}
}
