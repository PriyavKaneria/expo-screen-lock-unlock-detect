// ScreenLockService.js
import { NativeEventEmitter, NativeModules, AppState } from "react-native"
import * as TaskManager from "expo-task-manager"
import { registerTaskAsync } from "expo-background-task"
import {
	checkDeviceLockStatus,
	addOnScreenLockListener,
	addOnScreenUnlockListener,
} from "expo-screen-lock-unlock-detect"

// Task names for background tasks
const SCREEN_CHECK_TASK = "SCREEN_CHECK_TASK"

// Register the background tasks
TaskManager.defineTask(SCREEN_CHECK_TASK, async () => {
	try {
		console.log("Executing screen check task in background")
		// Your lock task implementation here
		const status = checkDeviceLockStatus()
		if (status == "locked") {
			console.log("Locked")
		} else if (status == "unlocked") {
			console.log("unlocked")
		}
	} catch (error) {
		console.error("Error executing screen check task:", error)
	}
})

class ScreenLockService {
	constructor() {
		this.lockSubscription = null
		this.unlockSubscription = null
		this.appStateSubscription = null
		this.isRegistered = false
		this.onLockCallback = null
		this.onUnlockCallback = null
	}

	async initialize() {
		// Register background tasks
		await this.registerBackgroundTasks()

		// Set up event listeners
		// this.lockSubscription = addOnScreenLockListener(() => {
		// 	console.log("Screen locked event received")
		// 	this.handleLockEvent()
		// })

		// this.unlockSubscription = addOnScreenUnlockListener(() => {
		// 	console.log("Screen unlocked event received")
		// 	this.handleUnlockEvent()
		// })

		// Listen for app state changes to reinitialize if needed
		this.appStateSubscription = AppState.addEventListener(
			"change",
			this.handleAppStateChange
		)

		// Get current lock status on initialization
		this.checkCurrentStatus()

		return true
	}

	async registerBackgroundTasks() {
		if (!this.isRegistered) {
			try {
				await registerTaskAsync(SCREEN_CHECK_TASK, {
					minimumInterval: 1, // minimum 1 second between task executions
					stopOnTerminate: true, // task continues to run when app is terminated
					startOnBoot: true, // run task when device reboots
				})

				this.isRegistered = true
				console.log("Background tasks registered successfully")
			} catch (error) {
				console.error("Error registering background tasks:", error)
			}
		}
	}

	checkCurrentStatus() {
		try {
			const status = checkDeviceLockStatus()
			console.log("Current device lock status:", status)
		} catch (error) {
			console.error("Error checking device lock status:", error)
		}
	}

	handleAppStateChange = async (nextAppState) => {
		if (nextAppState === "active") {
			// App coming to foreground - reinitialize if needed
			this.checkCurrentStatus()
		}
	}

	handleLockEvent() {
		// Execute foreground callback if available
		if (this.onLockCallback && typeof this.onLockCallback === "function") {
			this.onLockCallback()
		}
	}

	handleUnlockEvent() {
		// Execute foreground callback if available
		if (this.onUnlockCallback && typeof this.onUnlockCallback === "function") {
			this.onUnlockCallback()
		}

		// // Trigger background task after 5 s
		// this.triggerUnlockTask()
	}

	// async triggerScreenCheckTask() {
	// 	try {
	// 		await executeTaskAsync(SCREEN_CHECK_TASK)
	// 	} catch (error) {
	// 		console.error("Error triggering lock task:", error)
	// 	}
	// }

	setOnLockTask(callback) {
		this.onLockCallback = callback
	}

	setOnUnlockTask(callback) {
		this.onUnlockCallback = callback
	}

	cleanup() {
		// Remove event listeners
		if (this.lockSubscription) {
			this.lockSubscription.remove()
			this.lockSubscription = null
		}

		if (this.unlockSubscription) {
			this.unlockSubscription.remove()
			this.unlockSubscription = null
		}

		if (this.appStateSubscription) {
			this.appStateSubscription.remove()
			this.appStateSubscription = null
		}

		// Unregister background tasks
		this.unregisterBackgroundTasks()
	}

	async unregisterBackgroundTasks() {
		if (this.isRegistered) {
			try {
				await TaskManager.unregisterTaskAsync(SCREEN_CHECK_TASK)
				this.isRegistered = false
				console.log("Background tasks unregistered")
			} catch (error) {
				console.error("Error unregistering background tasks:", error)
			}
		}
	}
}

// Export singleton instance
export default new ScreenLockService()
