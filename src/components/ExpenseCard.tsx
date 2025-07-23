import React from 'react'
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import { Expense } from '../types'
import { globalStyles } from '../styles'
import { formatDate, formatQuantity } from '../utils'

type ExpenseCardProps = {
    expense: Expense
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    setExpense: React.Dispatch<React.SetStateAction<Expense>>
}

const icons: Record<Expense['category'], ImageSourcePropType> = {
    saving: require('../img/icon_saving.png'),
    house: require('../img/icon_house.png'),
    food: require('../img/icon_food.png'),
    expenses: require('../img/icon_expenses.png'),
    leisure: require('../img/icon_leisure.png'),
    health: require('../img/icon_health.png'),
    subscriptions: require('../img/icon_subscriptions.png')
}

export default function ExpenseCard({ expense, setModal, setExpense }: ExpenseCardProps) {

    const { name, quantity, category, date } = expense
    const handleActions = () => {
        setModal(true)
        setExpense(expense)
    }

    return (
        <Pressable
            onLongPress={() => {
                handleActions()
            }}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.containerImage}>
                        <Image
                            style={styles.image}
                            source={icons[category]}
                        />

                        <View style={styles.containerText}>
                            <Text style={styles.category}>{category}</Text>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.date}>{formatDate(date)}</Text>
                        </View>
                    </View>
                    <Text style={styles.quantity}>{formatQuantity(quantity)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        marginBottom: 20
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 20
    },
    containerText: {
        flex: 1
    },
    category: {
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    name: {
        fontSize: 22,
        color: '#64748B',
        marginBottom: 5
    },
    date: {
        fontWeight: '700',
        color: '#DB2777'
    },
    quantity: {
        fontSize: 20,
        fontWeight: '700'
    }
})