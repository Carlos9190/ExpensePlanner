import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Expense } from '../types'
import ExpenseCard from './ExpenseCard'

type ExpenseListProps = {
    expenses: Expense[]
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    setExpense: React.Dispatch<React.SetStateAction<Expense>>
    filter: string
    filteredExpenses: Expense[]
}

export default function ExpenseList({ expenses, setModal, setExpense, filter, filteredExpenses }: ExpenseListProps) {
    if (expenses) return (
        <View style={styles.container}>
            <Text style={styles.title}>Gastos</Text>

            {filter ? filteredExpenses.map(expense => (
                <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    setModal={setModal}
                    setExpense={setExpense}
                />
            )) :
                expenses.map(expense => (
                    <ExpenseCard
                        key={expense.id}
                        expense={expense}
                        setModal={setModal}
                        setExpense={setExpense}
                    />
                ))
            }

            {(!expenses.length || (!filteredExpenses.length && filter)) && (
                <Text style={styles.noExpenses}>No expenses yet</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 120
    },
    title: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noExpenses: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
    }
})