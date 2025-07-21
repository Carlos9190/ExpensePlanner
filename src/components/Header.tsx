import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

export default function Header() {
    return (
        <SafeAreaView>
            <Text style={styles.text}>Expense planner</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 30,
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 20
    }
})