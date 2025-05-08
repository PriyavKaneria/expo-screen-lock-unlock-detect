import { Image } from "expo-image"
import { Platform, StyleSheet } from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import {
	checkDeviceLockStatus,
	addOnScreenLockListener,
	addOnScreenUnlockListener,
} from "expo-screen-lock-unlock-detect"
import { useEffect, useState } from "react"

export default function HomeScreen() {
	// useEffect(() => {
	// 	const interval = setInterval(async () => {
	// 		console.log("Runnng")
	// 		console.log("response", await checkDeviceLockStatus())
	// 		console.log("Ran")
	// 	}, 10000)
	// 	return () => {
	// 		clearInterval(interval)
	// 	}
	// }, [])
	console.log("initial status", checkDeviceLockStatus())
	const [screenStatus, setScreenStatus] = useState("initui")

	const lockListener = addOnScreenLockListener(() => {
		console.log("Screen was locked")
		setScreenStatus("locked")
	})
	const unlockListener = addOnScreenUnlockListener(() => {
		console.log("Screen was unlocked")
		setScreenStatus("unlocked")
	})

	console.log(lockListener)
	console.log(unlockListener)

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/partial-react-logo.png")}
					style={styles.reactLogo}
				/>
			}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type='title'>Welcome!</ThemedText>
				<HelloWave />
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type='subtitle'>The screen is {screenStatus}</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
})
