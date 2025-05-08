// App.js
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Button, AppState } from "react-native"
import ScreenLockService from "@/services/screenLockService"
import { checkDeviceLockStatus } from "expo-screen-lock-unlock-detect"

export default function App() {
	const [lockStatus, setLockStatus] = useState("unknown")
	const [lastEvent, setLastEvent] = useState("none")

	useEffect(() => {
		const setupScreenLockService = async () => {
			try {
				// Initialize the service
				await ScreenLockService.initialize()

				// Set up foreground callbacks
				ScreenLockService.setOnLockTask(() => {
					console.log("Foreground lock task executed")
					setLastEvent("Screen Locked: " + new Date().toLocaleTimeString())
					setLockStatus("locked")

					// Your custom lock task here
					performLockTask()
				})

				ScreenLockService.setOnUnlockTask(() => {
					console.log("Foreground unlock task executed")
					setLastEvent("Screen Unlocked: " + new Date().toLocaleTimeString())
					setLockStatus("unlocked")

					// Your custom unlock task here
					performUnlockTask()
				})
			} catch (error) {
				console.error("Error setting up screen lock service:", error)
			}
		}

		setupScreenLockService()

		// Cleanup function
		return () => {
			ScreenLockService.cleanup()
		}
	}, [])

	// Example functions that will be called on lock/unlock
	const performLockTask = () => {
		// Implement your lock task logic here
		console.log("🔒 Custom lock task running...")

		// Examples:
		// - Save application state
		// - Pause ongoing operations
		// - Log out user for security
		// - Send analytics data
	}

	const performUnlockTask = () => {
		// Implement your unlock task logic here
		console.log("🔓 Custom unlock task running...")

		// Examples:
		// - Resume operations
		// - Refresh data
		// - Reconnect to services
		// - Show notifications
	}

	const checkStatus = async () => {
		try {
			const status = checkDeviceLockStatus()
			setLockStatus(status)
			console.log("Current device lock status:", status)
		} catch (error) {
			console.error("Error checking status:", error)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Screen Lock/Unlock Demo</Text>
			<Text style={styles.status}>Current Status: {lockStatus}</Text>
			<Text style={styles.event}>Last Event: {lastEvent}</Text>

			<View style={styles.buttonContainer}>
				<Button title='Check Current Status' onPress={checkStatus} />
			</View>

			<Text style={styles.instructions}>
				Try locking and unlocking your device to see the events in action.
				Background tasks will also run when the app is not in the foreground.
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	status: {
		fontSize: 18,
		marginBottom: 10,
	},
	event: {
		fontSize: 16,
		marginBottom: 20,
	},
	buttonContainer: {
		marginVertical: 20,
		width: "80%",
	},
	instructions: {
		textAlign: "center",
		color: "#333",
		marginTop: 20,
	},
})
