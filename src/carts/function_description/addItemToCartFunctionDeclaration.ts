export const addItemToCartFunctionDeclaration = {
    name: "addItemToCart",
    parameters: {
      type: "OBJECT",
      description: "Add an item to the user's cart. If the item already exists, increases the quantity. If not, adds it as a new item.",
      properties: {
        userId: {
          type: "NUMBER",
          description: "The ID of the user whose cart is being updated.",
        },
        shoeId: {
          type: "NUMBER",
          description: "The ID of the shoe being added to the cart.",
        },
        quantity: {
          type: "NUMBER",
          description: "The quantity of the shoe to add to the cart.",
        },
      },
      required: ["userId", "shoeId", "quantity"],
    },
  };
  