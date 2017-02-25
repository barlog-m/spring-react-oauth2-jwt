package li.barlog.app.config

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class JacksonConfig {
	@Bean
	open fun kotlinModule() = KotlinModule()

	@Bean
	open fun javaTimeModule() = JavaTimeModule()
}
