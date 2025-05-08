package expo.modules.screenlockunlockdetect

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoScreenLockUnlockDetectModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoScreenLockUnlockDetect")

    Function("getTheme") {
      return@Function "system"
    }
  }
}
