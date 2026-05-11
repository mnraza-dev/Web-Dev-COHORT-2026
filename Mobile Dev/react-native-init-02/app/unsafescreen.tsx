import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const UnsafeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Unsafe Screen</Text>
            <Text>Unsafe Screen</Text>
            <Text>Unsafe Screen</Text>
            <Text>Unsafe Screen</Text>
            <Text>Unsafe Screen</Text>
            <Text>Unsafe Screen</Text>
            <Text>Unsafe Screen</Text>
            <Text>Unsafe Screen</Text>
        </View>
    )
}

export default UnsafeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        // justifyContent: 'center'
    }
})