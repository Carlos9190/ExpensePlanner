export const formatQuantity = (quantity: string) => {
    return Number(quantity).toLocaleString('en-US',
        {
            style: 'currency',
            currency: 'USD'
        }
    )
}