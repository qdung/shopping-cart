import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  selectCartProducts,
  updateQuantity,
} from "../redux/cartReducer";
import CartItem from "../components/CartItem";
import { RootState } from "../store";

export const Cart = memo(() => {
  const carts =
    useSelector((state: RootState) => selectCartProducts(state)) ?? [];
  const dispatch = useDispatch();

  const totalPrice = carts.reduce(
    (total, item) => total + item.unitPrice * item.selectAmount,
    0
  );

  return (
    <div className="w-full h-full p-2">
      <p className="font-semibold text-lg mb-4">Cart</p>
      <div className="grid grid-cols-3 gap-4">
        {carts?.length > 0 &&
          carts.map((item, key) => (
            <CartItem
              showBadge={false}
              key={`cart-${key}`}
              {...item}
              onRemove={() => dispatch(removeFromCart(item.name))}
              onUpdateQuantity={(quantity) =>
                dispatch(updateQuantity({ product: item, quantity }))
              }
            />
          ))}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg place-self-center absolute m-auto left-0 right-0 bottom-2">
        <p className="text-lg font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
});
