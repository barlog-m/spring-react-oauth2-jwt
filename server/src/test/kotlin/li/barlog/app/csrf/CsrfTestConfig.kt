package li.barlog.app.csrf

import li.barlog.app.config.JacksonConfig
import li.barlog.app.config.SecurityConfig
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@EnableAutoConfiguration
@ComponentScan(basePackages = arrayOf("li.barlog.app.csrf"))
@Configuration
@Import(SecurityConfig::class, JacksonConfig::class)
open class CsrfTestConfig
