import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import {
  addToCart,
  IProduct,
  removeFromCart,
  updateQuantity,
} from "../redux/cartReducer";
import { RootState } from "../store";
import CartItem from "../components/CartItem";

const mockData: IProduct[] = [
  { name: "bacon", unitPrice: 10.99, quantity: 10 },
  { name: "eggs", unitPrice: 3.99, quantity: 10 },
  { name: "cheese", unitPrice: 6.99, quantity: 10 },
  { name: "chives", unitPrice: 1.0, quantity: 10 },
  { name: "wine", unitPrice: 11.99, quantity: 10 },
  { name: "brandy", unitPrice: 17.55, quantity: 10 },
  { name: "bananas", unitPrice: 0.69, quantity: 10 },
  { name: "ham", unitPrice: 2.69, quantity: 10 },
  { name: "tomatoes", unitPrice: 3.26, quantity: 10 },
  { name: "tissue", unitPrice: 8.45, quantity: 10 },
];

export const Inventory = memo(() => {
  const dispatch = useDispatch();

  const carts = useSelector((state: RootState) => state.items);

  const onAddToCart = useCallback(
    (product: IProduct) => {
      dispatch(
        addToCart({
          name: product.name,
          unitPrice: product.unitPrice,
          selectAmount: 1,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="w-full h-full p-4">
      <p className="font-semibold text-lg mb-4">Inventory</p>
      <div className="grid grid-cols-3 gap-4">
        {mockData.map((item, key) => {
          const isInCart = carts.find((cart) => cart.name === item.name);
          if (isInCart) {
            return (
              <CartItem
                key={`cart-${key}`}
                {...isInCart}
                showBadge={true}
                onRemove={() => dispatch(removeFromCart(item.name))}
                onUpdateQuantity={(quantity) =>
                  dispatch(
                    updateQuantity({
                      product: {
                        name: item.name,
                        unitPrice: item.unitPrice,
                        selectAmount: quantity,
                      },
                      quantity: quantity,
                    })
                  )
                }
              />
            );
          } else
            return (
              <ProductItem
                key={`product-${key}`}
                {...item}
                onAddToCart={() => onAddToCart(item)}
              />
            );
        })}
      </div>
    </div>
  );
});
