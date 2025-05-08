import { EventSubscription } from "expo-modules-core"
import ExpoScreenLockUnlockDetectModule from "./ExpoScreenLockUnlockDetectModule"

export type Status = "locked" | "unlocked" | "screen_on" | "unknown"

export function checkDeviceLockStatus(): Status {
	return ExpoScreenLockUnlockDetectModule.checkDeviceLockStatus()
}

export function addOnScreenLockListener(
	listener: () => void
): EventSubscription {
	return ExpoScreenLockUnlockDetectModule.addListener("onScreenLock", listener)
}

export function addOnScreenUnlockListener(
	listener: () => void
): EventSubscription {
	return ExpoScreenLockUnlockDetectModule.addListener(
		"onScreenUnlock",
		listener
	)
}
