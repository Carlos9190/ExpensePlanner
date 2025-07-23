import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { globalStyles } from '../styles'
import { Expense } from '../types'

type ExpenseFormProps = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    expense: Expense
    setExpense: React.Dispatch<React.SetStateAction<Expense>>
    initialExpense: Expense
    handleExpense: (expense: Expense) => void
    handleDeleteExpense: (id: Expense["id"]) => void
}

export default function ExpenseForm({ setModal, expense, setExpense, initialExpense, handleExpense, handleDeleteExpense }: ExpenseFormProps) {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if (expense?.name) {
            setId(expense.id)
            setName(expense.name)
            setQuantity(expense.quantity)
            setCategory(expense.category)
            setDate(expense.date)
        }
    }, [expense])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.btnContainer}>
                <Pressable
                    style={[styles.btn, styles.btnCancel]}
                    onLongPress={() => {
                        setModal(false)
                        setExpense(initialExpense)
                    }}
                >
                    <Text style={styles.btnText}>Cancel</Text>
                </Pressable>

                {expense.id && (
                    <Pressable
                        style={[styles.btn, styles.btnEdit]}
                        onLongPress={() => handleDeleteExpense(id)}
                    >
                        <Text style={styles.btnText}>Eliminar</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.form}>
                <Text style={styles.title}>{expense?.name ? 'Edit' : 'New'} expense</Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Expense name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Expense name: e.g. Food'
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Expense quantity</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Expense quantity: e.g. 300'
                        keyboardType='numeric'
                        value={quantity}
                        onChangeText={setQuantity}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Expense category</Text>
                    <Picker
                        selectedValue={category}
                        onValueChange={itemValue => {
                            setCategory(itemValue)
                        }}
                    >
                        <Picker.Item label='-- Select --' value='' />
                        <Picker.Item label='Saving' value='saving' />
                        <Picker.Item label='House' value='house' />
                        <Picker.Item label='Food' value='food' />
                        <Picker.Item label='Other expenses' value='expenses' />
                        <Picker.Item label='Leisure' value='leisure' />
                        <Picker.Item label='Health' value='health' />
                        <Picker.Item label='Subscriptions' value='subscriptions' />
                    </Picker>
                </View>

                <Pressable
                    style={styles.submitBtn}
                    onPress={() => handleExpense({ id, name, quantity, category, date })}
                >
                    <Text style={styles.submitBtnText}>{expense?.name ? 'Save changes' : 'Add expense'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E40AF',
        flex: 1
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1
    },
    btnCancel: {
        backgroundColor: '#DB2777'
    },
    btnEdit: {
        backgroundColor: 'red'
    },
    btnText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    },
    form: {
        ...globalStyles.container
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: "#64748B"
    },
    field: {
        marginVertical: 10
    },
    label: {
        color: "#64748B",
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20
    },
    submitBtnText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})