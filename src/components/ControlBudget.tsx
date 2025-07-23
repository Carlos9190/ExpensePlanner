import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles'
import { formatQuantity } from '../utils'
import { Expense } from '../types'
import CircularProgress from 'react-native-circular-progress-indicator'

type ControlBudgetProps = {
    budget: string
    expenses: Expense[]
    restartApp: () => void
}

export default function ControlBudget({ budget, expenses, restartApp }: ControlBudgetProps) {

    const [balance, setBalance] = useState('0')
    const [spent, setSpent] = useState('0')
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const expense = expenses.map(expense => expense.quantity)
        const totalSpent = expense.reduce((total, expense) => Number(expense) + total, 0)
        const totalBalance = Number(budget) - totalSpent
        const newPercentage = (
            ((Number(budget) - totalBalance) / Number(budget)) * 100
        )

        setSpent(totalSpent.toString())
        setBalance(totalBalance.toString())
        setTimeout(() => {
            setPercentage(newPercentage)
        }, 500)
    }, [expenses])

    return (
        <View style={styles.container}>
            <View style={styles.centerGraph}>
                <CircularProgress
                    value={percentage}
                    duration={1000}
                    radius={150}
                    valueSuffix={'%'}
                    title='Spent'
                    inActiveStrokeColor='#F5F5F5'
                    inActiveStrokeWidth={20}
                    activeStrokeColor='#3B82F6'
                    activeStrokeWidth={20}
                    titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                    titleColor='#64748B'
                />
            </View>

            <View style={styles.containerText}>
                <Pressable
                    style={styles.btnRestart}
                    onLongPress={restartApp}
                >
                    <Text style={styles.btnRestartText}>Restart app</Text>
                </Pressable>

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
    btnRestart: {
        backgroundColor: '#DB2777',
        padding: 10,
        marginBottom: 40,
        borderRadius: 5
    },
    btnRestartText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
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