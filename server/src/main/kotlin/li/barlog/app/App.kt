@file:JvmName("App")

package li.barlog.app

import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.FilterType

@Configuration
@EnableAutoConfiguration
@ComponentScan(
	basePackages = arrayOf("li.barlog.app"),
	excludeFilters = arrayOf(
		ComponentScan.Filter(
			type = FilterType.ASSIGNABLE_TYPE,
			classes = arrayOf(UnsecureApp::class)
		)
	)
)
open class App {
	companion object {
		@JvmStatic
		fun main(vararg args: String) {
			SpringApplicationBuilder(App::class.java)
				.registerShutdownHook(true).run(*args)
		}
	}
}
