import { BsCartPlus } from "react-icons/bs";
import { IProduct } from "../redux/cartReducer";

const ProductItem = (props: IProduct) => {
  return (
    <div className="w-full h-28 p-4 rounded-lg shadow bg-white flex items-center justify-between relative">
      <div>
        <p className="font-semibold text-lg">{props.name}</p>
        <p className="text-gray-500">Pricing: {props.unitPrice}$</p>
      </div>
      <BsCartPlus
        size={24}
        color="green"
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          return props.onAddToCart && props.onAddToCart();
        }}
      />
    </div>
  );
};

export default ProductItem;
