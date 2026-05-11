import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SafeScreen = () => {
    return (
        <SafeAreaView
            edges={[
                'top',

            ]}

            


            style={styles.container}>

            <Text>safe Screen</Text>
            <Text>safe Screen</Text>
            <Text>safe Screen</Text>
            <Text>safe Screen</Text>
            <Text>safe Screen</Text>
            <Text>safe Screen</Text>
        </SafeAreaView>
    )
}

export default SafeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        padding: 12,
        // justifyContent: 'center'
    }
})