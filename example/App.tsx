// import * as ExpoScreenLockUnlockDetect from "expo-screen-lock-unlock-detect"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
console.log("App loading")

export default function App() {
	console.log("App loaded")
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.container}>
				<Text style={styles.header}>Module API Example</Text>
				{/* <Group name='Functions'> */}
				{/* <Text>{ExpoScreenLockUnlockDetect.getTheme()}</Text> */}
				{/* </Group> */}
			</ScrollView>
		</SafeAreaView>
	)
}

function Group(props: { name: string; children: React.ReactNode }) {
	return (
		<View style={styles.group}>
			<Text style={styles.groupHeader}>{props.name}</Text>
			{props.children}
		</View>
	)
}

const styles = {
	header: {
		fontSize: 30,
		margin: 20,
	},
	groupHeader: {
		fontSize: 20,
		marginBottom: 20,
	},
	group: {
		margin: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
	},
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
	view: {
		flex: 1,
		height: 200,
	},
}
