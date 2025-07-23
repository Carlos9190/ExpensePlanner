import { Picker } from '@react-native-picker/picker'
import React from 'react'

type ExpensePickerProps = {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function ExpensePicker({ category, setCategory }: ExpensePickerProps) {
    return (
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
    )
}