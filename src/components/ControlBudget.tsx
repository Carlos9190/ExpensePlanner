import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles'
import { formatQuantity } from '../utils'

type ControlBudgetProps = {
    budget: string
    expenses: {
        id: number
        quantity: string
    }[]
}

export default function ControlBudget({ budget, expenses }: ControlBudgetProps) {

    const [balance, setBalance] = useState('0')
    const [spent, setSpent] = useState('0')

    useEffect(() => {
        const expense = expenses.map(expense => expense.quantity)
        const totalSpent = expense.reduce((total, expense) => Number(expense) + total, 0)
        const totalBalance = Number(budget) - totalSpent

        setSpent(totalSpent.toString())
        setBalance(totalBalance.toString())
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.centerGraph}>
                <Image
                    style={styles.image}
                    source={require('../img/grafico.jpg')}
                />
            </View>

            <View style={styles.containerText}>
                <Text style={styles.value}>
                    <Text style={styles.label}>Budget: {''}</Text>
                    {formatQuantity(budget)}
                </Text>

                <Text style={styles.value}>
                    <Text style={styles.label}>Balance: {''}</Text>
                    {formatQuantity(balance)}
                </Text>

                <Text style={styles.value}>
                    <Text style={styles.label}>Spent: {''}</Text>
                    {formatQuantity(spent)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    centerGraph: {
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250
    },
    containerText: {
        marginTop: 50
    },
    value: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    label: {
        fontWeight: '700',
        color: '#3B82F6'
    }
})