import React, { useState } from 'react'
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Header from './src/components/Header'
import NewBudget from './src/components/NewBudget'
import ControlBudget from './src/components/ControlBudget'
import ExpenseForm from './src/components/ExpenseForm'
import { Expense } from './src/types'
import { generateId } from './src/utils'
import ExpenseList from './src/components/ExpenseList'

const initialExpense: Expense = {
  id: '',
  name: '',
  quantity: '',
  category: '',
  date: new Date()
}

export default function App() {

  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState('')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [modal, setModal] = useState(false)
  const [expense, setExpense] = useState<Expense>(initialExpense)

  const handleNewBudget = (budget: string) => {
    if (Number(budget) >= 0) {
      setIsValidBudget(true)
    } else {
      Alert.alert('Error', 'Budget must be greater than 0')
    }
  }

  const handleExpense = (expense: Expense) => {
    const { name, quantity, category } = expense

    if (Number(quantity) <= 0) {
      return Alert.alert('Error', 'Quantity must be greater than 0')
    } else if ([name, quantity, category].includes('')) {
      return Alert.alert('Error', 'All fields are required')
    }

    // Set the new expense and close modal
    expense.id = generateId()
    setExpenses([...expenses, expense])
    setModal(!modal)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {isValidBudget ? (
            <ControlBudget
              budget={budget}
              expenses={expenses}
            />
          ) : (
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              handleNewBudget={handleNewBudget}
            />
          )}
        </View>

        {isValidBudget && (
          <ExpenseList
            expenses={expenses}
            setModal={setModal}
            setExpense={setExpense}
          />
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
        >
          <ExpenseForm
            setModal={setModal}
            setExpense={setExpense}
            initialExpense={initialExpense}
            handleExpense={handleExpense}
          />
        </Modal>
      )}

      {isValidBudget && (
        <Pressable
          onPress={() => setModal(!modal)}
        >
          <Image
            style={styles.image}
            source={require('./src/img/new-expense.png')}
          />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    backgroundColor: '#3B82F6'
  },
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  image: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 20
  }
})