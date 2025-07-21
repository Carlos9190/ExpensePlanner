import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Header from './src/components/Header'
import NewBudget from './src/components/NewBudget'
import ControlBudget from './src/components/ControlBudget'

export default function App() {

  const [isValidBudget, setIsValidBudget] = useState(false)

  const handleNewBudget = (budget: string) => {
    if (Number(budget) > 0) {
      setIsValidBudget(true)
    } else {
      Alert.alert('Error', 'Budget must be greater than 0')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        {isValidBudget ? (
          <ControlBudget />
        ) : (
          <NewBudget
            handleNewBudget={handleNewBudget}
          />
        )}

      </View>
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
  }
})