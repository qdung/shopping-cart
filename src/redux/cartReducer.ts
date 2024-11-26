import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IProduct {
  name: string;
  quantity: number;
  unitPrice: number;
  type?: "inventory" | "cart";

  onAddToCart?: () => void;
}

export interface ICart {
  name: string;
  unitPrice: number;
  selectAmount: number;

  onUpdateQuantity?: (amount: number) => void;
  onRemove?: () => void;
}

export interface InitCart {
  items: ICart[];
}

export interface UpdateQuantity {
  product: ICart;
  quantity: number;
}

const initialState: InitCart = {
  items: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICart>) => {
      const productIndex = state.items.findIndex(
        (item) => item.name === action.payload.name
      );
      if (productIndex === -1) {
        state.items = [...state.items, action.payload];
      } else {
        state.items[productIndex].selectAmount += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantity>) => {
      const productIndex = state.items.findIndex(
        (item) => item.name === action.payload.product.name
      );
      if (action.payload.quantity <= 0) {
        state.items.splice(productIndex, 1);
      } else {
        state.items[productIndex].selectAmount = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const selectCartProducts = (state: RootState) => state.items;
export const selectCartCount = (state: RootState) => {
  const carts = state.items;
  const total = carts.reduce((total, curr) => total + curr.selectAmount, 0);
  return total;
};

export default cartSlice.reducer;
