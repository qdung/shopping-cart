import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/cartReducer";
import { GiShoppingCart } from "react-icons/gi";
import { memo } from "react";
import { RootState } from "../store";

const Header = memo(() => {
  const count = useSelector((state: RootState) => selectCartCount(state));

  return (
    <div className="h-20 w-full flex items-center justify-between px-4 bg-blue-600 text-white shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-12" />
        <p className="text-xl font-bold">Demo Shopping Cart</p>
      </div>
      <nav className="flex space-x-4">
        <a href="/inventory" className="hover:underline">
          Inventory
        </a>
      </nav>
      <a href="/cart" className="relative flex items-center justify-center">
        <GiShoppingCart size={30} />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
            {count}
          </span>
        )}
      </a>
    </div>
  );
});

export default Header;
