package li.barlog.app

import org.mockito.Mockito

fun <T> anyObject(): T {
    return Mockito.anyObject<T>()
}
