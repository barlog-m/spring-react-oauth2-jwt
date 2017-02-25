package li.barlog.app.service

import org.junit.Test
import org.junit.Assert.assertEquals

class BarServiceTest {
	@Test
	fun list() {
		val list = BarService().list()
		assertEquals(50, list.size)
	}
}
