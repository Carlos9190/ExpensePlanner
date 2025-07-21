import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { globalStyles } from '../styles'

type NewBudgetProps = {
    handleNewBudget: (budget: string) => void
}

export default function NewBudget({ handleNewBudget }: NewBudgetProps) {

    const [budget, setBudget] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Define budget</Text>

            <TextInput
                keyboardType='numeric'
                placeholder='Add your budget: e.g. 300'
                style={styles.input}
                value={budget.toString()}
                onChangeText={setBudget}
            />

            <Pressable
                style={styles.button}
                onPress={() => handleNewBudget(budget.toString())}
            >
                <Text style={styles.buttonText}>Add budget</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    button: {
        marginTop: 30,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})