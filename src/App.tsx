import { useState } from "react";
import ProductItem, { IProduct } from "./components/ProductItem";
import Header from "./components/Header";

// See the available inventory
// Allow user to select items he wants to purchase in shopping cart
// Allow the user to update the number of items
// Allow the user to delete items in shopping carts

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
function App() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

  const onChangeQuatity = (product: IProduct, quantity: number) => {
    const index = cartProducts.findIndex(
      (_item) => _item.name === product.name
    );
    const _carts = [...cartProducts];
    if (quantity < 0) {
      _carts.splice(index, 1);
    } else {
      _carts[index].quantity = quantity;
    }

    setCartProducts(_carts);
  };

  const onRemoveItem = (product: IProduct) => {
    const index = cartProducts.findIndex(
      (_item) => _item.name === product.name
    );
    const _carts = [...cartProducts];
    _carts.splice(index, 1);

    setCartProducts(_carts);
  };

  const onAddToCart = (product: IProduct) => {
    const _carts = [...cartProducts];
    const productIndex = _carts.findIndex((item) => item.name === product.name);
    console.log(productIndex);
    if (productIndex === -1) {
      _carts.push({ ...product, quantity: 1 });
    } else {
      _carts[productIndex].quantity += 1;
    }
    setCartProducts(_carts);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1>Demo shopping cart</h1>
      {/* Inventory View */}
      <div className="w-full h-[50%] bg-gray-100 p-4">
        <p>Inventory</p>
        <div className="grid grid-cols-3 gap-2">
          {mockData.map((item, key) => (
            <ProductItem
              key={`inventory-${key}`}
              {...item}
              onAddToCart={() => onAddToCart(item)}
            />
          ))}
        </div>
      </div>
      {/* Cart View */}
      <div className="w-full h-[50%] p-2 bg-blue-400">
        <p>Cart</p>
        <div className="grid grid-cols-3 gap-2">
          {cartProducts.map((item, key) => (
            <ProductItem
              key={`cart-${key}`}
              {...item}
              type="cart"
              onRemove={() => onRemoveItem(item)}
              onChangeQuatity={(quantity) => onChangeQuatity(item, quantity)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
