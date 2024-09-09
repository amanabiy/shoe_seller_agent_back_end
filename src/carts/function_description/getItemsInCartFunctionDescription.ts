export const getItemsInCartFunctionDeclaration = {
  name: "getItemsInCart",
  parameters: {
    type: "OBJECT",
    description: "Retrieve all items in the cart for a specific user.",
    properties: {
      userId: {
        type: "NUMBER",
        description: "The ID of the user whose cart items are being retrieved.",
      },
    },
    required: ["userId"],
  },
  returns: {
    type: "OBJECT",
    description: "An object containing a status message and a list of items in the cart.",
    properties: {
      text: {
        type: "STRING",
        description: "A message indicating the status of the cart retrieval.",
      },
      items: {
        type: "ARRAY",
        description: "A list of items in the cart for the specified user.",
        items: {
          type: "OBJECT",
          description: "Details of a cart item.",
          properties: {
            id: {
              type: "NUMBER",
              description: "The unique ID of the cart item.",
            },
            shoe: {
              type: "OBJECT",
              description: "Details of the shoe associated with the cart item.",
              properties: {
                id: {
                  type: "NUMBER",
                  description: "The unique ID of the shoe.",
                },
                name: {
                  type: "STRING",
                  description: "The name of the shoe.",
                },
                price: {
                  type: "NUMBER",
                  description: "The price of the shoe.",
                },
              },
              required: ["id", "name", "price"],
            },
            quantity: {
              type: "NUMBER",
              description: "The quantity of the shoe in the cart.",
            },
            price: {
              type: "NUMBER",
              description: "The price of the shoe when added to the cart.",
            },
            totalPrice: {
              type: "NUMBER",
              description: "The total price of the cart item (quantity * price).",
            },
          },
          required: ["id", "shoe", "quantity", "price", "totalPrice"],
        },
      },
    },
    required: ["text", "items"],
  },
};