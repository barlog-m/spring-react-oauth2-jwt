package li.barlog.app.model

import com.ibm.icu.text.RuleBasedNumberFormat
import com.ibm.icu.text.RuleBasedNumberFormat.SPELLOUT
import com.ibm.icu.util.ULocale
import java.util.Random

data class Bar (
	val id: Int,
	val value: Int = Random().nextInt()
) {
	companion object {
		private val locale = ULocale("ru_RU")
		private val rule = RuleBasedNumberFormat(locale, SPELLOUT)
	}

	val message: String
		get() = rule.format(value)
}
