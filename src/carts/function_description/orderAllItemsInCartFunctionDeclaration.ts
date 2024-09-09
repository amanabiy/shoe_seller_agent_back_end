export const orderAllItemsInCartFunctionDeclaration = {
    name: "orderAllItemsInCart",
    parameters: {
        type: "OBJECT",
        description: "Orders all items in the user's cart, calculates the total price, generates a payment link, and sends an email with the payment link and cart details.",
        properties: {
            user: {
                type: "OBJECT",
                description: "The user whose cart items are being ordered.",
                properties: {
                    id: {
                        type: "NUMBER",
                        description: "The unique ID of the user.",
                    },
                    email: {
                        type: "STRING",
                        description: "The email address of the user.",
                    },
                },
                required: ["id", "email"],
            },
        },
        required: ["user"],
    },
};
