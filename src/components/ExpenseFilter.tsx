import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../styles'
import ExpensePicker from './ExpensePicker'
import { Expense } from '../types'

type ExpenseFilterProps = {
    filter: string
    setFilter: React.Dispatch<React.SetStateAction<string>>
    expenses: Expense[]
    setFilteredExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export default function ExpenseFilter({ filter: category, setFilter: setCategory, expenses, setFilteredExpenses }: ExpenseFilterProps) {

    useEffect(() => {
        if (!category) {
            setFilteredExpenses([])
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === category)
            setFilteredExpenses(filteredExpenses)
        }
    }, [category])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Filter expenses</Text>

            <ExpensePicker
                category={category}
                setCategory={setCategory}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        transform: [{ translateY: 0 }],
        marginTop: 80
    },
    label: {
        fontSize: 22,
        fontWeight: '900',
        color: '#64748B'
    }
})