import { requireNativeModule } from "expo"

console.log("Finding native modules")
// This call loads the native module object from the JSI.
export default requireNativeModule("ExpoScreenLockUnlockDetect")
