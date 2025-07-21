import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles'

export default function ControlBudget() {
    return (
        <View style={styles.container}>
            <View style={styles.centerGraph}>
                <Image
                    style={styles.image}
                    source={require('../img/grafico.jpg')}
                />
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
    image: {
        width: 250,
        height: 250
    }
})