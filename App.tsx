import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from './src/components/Header'
import NewBudget from './src/components/NewBudget'
import ControlBudget from './src/components/ControlBudget'
import ExpenseForm from './src/components/ExpenseForm'
import ExpenseList from './src/components/ExpenseList'
import ExpenseFilter from './src/components/ExpenseFilter'
import { Expense } from './src/types'
import { generateId } from './src/utils'

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
  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const getBudgetStorage = async () => {
      try {
        const budgetStorage = await AsyncStorage.getItem('expense_planner') ?? ''

        if (Number(budgetStorage) > 0) {
          setBudget(budgetStorage)
          setIsValidBudget(true)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getBudgetStorage()
  }, [])

  useEffect(() => {
    if (isValidBudget) {
      const setBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('expense_planner', budget)
        } catch (error) {
          console.log(error)
        }
      }

      setBudgetStorage()
    }
  }, [isValidBudget])

  useEffect(() => {
    const getExpensesStorage = async () => {
      try {
        const expensesStorage = await AsyncStorage.getItem('expenses') ?? JSON.stringify([])
        const parsedExpenses: Expense[] = JSON.parse(expensesStorage).map((expense: Expense) => ({
          ...expense,
          date: new Date(expense.date)
        }))

        setExpenses(parsedExpenses)
      } catch (error) {
        console.log(error)
      }
    }

    getExpensesStorage()
  }, [])

  useEffect(() => {
    const setExpensesStorage = async () => {
      try {
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses))
      } catch (error) {
        console.log(error)
      }
    }

    setExpensesStorage()
  }, [expenses])

  const handleNewBudget = (budget: string) => {
    if (Number(budget) >= 0) {
      setIsValidBudget(true)
    } else {
      Alert.alert('Error', 'Budget must be greater than 0')
    }
  }

  const handleExpense = (expense: Expense) => {
    const { id, name, quantity, category } = expense

    if (Number(quantity) <= 0) {
      return Alert.alert('Error', 'Quantity must be greater than 0')
    } else if ([name, quantity, category].includes('')) {
      return Alert.alert('Error', 'All fields are required')
    }

    if (id) {
      // Set the updated expense
      const updatedExpense = expenses.map(expenseState => expenseState.id === id ? expense : expenseState)
      setExpenses(updatedExpense)
    } else {
      // Set the new expense
      expense.id = generateId()
      setExpenses([...expenses, expense])
    }

    setModal(!modal)
  }

  const handleDeleteExpense = (id: Expense['id']) => {
    Alert.alert(
      'Are you sure you want to delete this expense?',
      'This action is irreversible and the patient will be permanently removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: () => {
            const updatedExpenses = expenses.filter(expenseState => expenseState.id !== id)
            setExpenses(updatedExpenses)
            setExpense(initialExpense)
            setModal(!modal)
          }
        }
      ]
    )
  }

  const restartApp = () => {
    Alert.alert(
      'Do you want to restart the app?',
      'This will delete the current budget and its expenses',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm', onPress: async () => {
            try {
              await AsyncStorage.clear()

              setIsValidBudget(false)
              setBudget('')
              setExpenses([])
            } catch (error) {
              console.log(error)
            }
          }
        }
      ]
    )
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
              restartApp={restartApp}
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
          <>
            <ExpenseFilter
              filter={filter}
              setFilter={setFilter}
              expenses={expenses}
              setFilteredExpenses={setFilteredExpenses}
            />

            <ExpenseList
              expenses={expenses}
              setModal={setModal}
              setExpense={setExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
        >
          <ExpenseForm
            setModal={setModal}
            expense={expense}
            setExpense={setExpense}
            initialExpense={initialExpense}
            handleExpense={handleExpense}
            handleDeleteExpense={handleDeleteExpense}
          />
        </Modal>
      )}

      {isValidBudget && (
        <Pressable
          style={styles.pressable}
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
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 20
  },
  image: {
    width: 60,
    height: 60
  }
})