import { BsCartDash } from "react-icons/bs";
import { ICart } from "../redux/cartReducer";

const CartItem = (props: ICart & { showBadge: boolean }) => {
  const totalPrice = props.unitPrice * props.selectAmount;

  return (
    <div
      className={`w-full h-28 p-4 rounded-lg shadow bg-white flex items-center justify-between border border-blue-400 relative ${
        props.showBadge ? "border border-blue-500" : ""
      }`}
    >
      {props.showBadge && (
        <p className="text-[10px] italic absolute bottom-2">Added</p>
      )}
      <div>
        <p className="font-semibold text-lg">{props.name}</p>
        {props.showBadge ? (
          <p className="text-gray-500">Unit price: {props.unitPrice}$</p>
        ) : (
          <p className="text-gray-500">Total price: {totalPrice.toFixed(2)}$</p>
        )}
      </div>
      <div className="flex flex-col items-end justify-center">
        <input
          type="number"
          className="p-2 w-16 bg-green-50"
          value={props.selectAmount}
          onChange={(e) =>
            props.onUpdateQuantity &&
            props.onUpdateQuantity(parseInt(e.target.value))
          }
        />
        <button
          type="button"
          className="p-1 text-red-500 text-2xl"
          onClick={(e) => {
            e.preventDefault();
            return props.onRemove && props.onRemove();
          }}
        >
          <BsCartDash size={24} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
