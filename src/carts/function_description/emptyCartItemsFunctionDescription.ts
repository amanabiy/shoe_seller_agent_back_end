export const emptyCartFunctionDeclaration = {
    name: "emptyCart",
    parameters: {
      type: "OBJECT",
      description: "Remove all items from the user's cart.",
      properties: {
        userId: {
          type: "NUMBER",
          description: "The ID of the user whose cart is being emptied.",
        },
      },
      required: ["userId"],
    },
  };
  