import ExpoModulesCore

public class ExpoScreenLockUnlockDetectModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoScreenLockUnlockDetectModule")

    Function("getTheme") { () -> String in
      "system"
    }
  }
}
