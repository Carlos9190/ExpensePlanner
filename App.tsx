import React, { useState } from 'react'
import { Alert, Image, Modal, Pressable, StyleSheet, View } from 'react-native'
import Header from './src/components/Header'
import NewBudget from './src/components/NewBudget'
import ControlBudget from './src/components/ControlBudget'
import ExpenseForm from './src/components/ExpenseForm'
import { Expense } from './src/types'
import { generateId } from './src/utils'

export default function App() {

  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState('')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [modal, setModal] = useState(false)

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
      Alert.alert('Error', 'Quantity must be greater than 0')
    } else if ([name, quantity, category].includes('')) {
      Alert.alert('Error', 'All fields are required')
      return
    }

    // Set the new expense and close modal
    expense.id = generateId()
    setExpenses([...expenses, expense])
    setModal(!modal)
  }

  return (
    <View style={styles.container}>
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

      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
        >
          <ExpenseForm
            setModal={setModal}
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
            source={require('./src/img/nuevo-gasto.png')}
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
    top: 65,
    right: 20
  }
})