export const formatQuantity = (quantity: string) => Number(quantity).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
})

export const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})

export const generateId = () => {
    const random = Math.random().toString(36).substring(2, 11)
    const date = Date.now().toString(36)

    return random + date
}