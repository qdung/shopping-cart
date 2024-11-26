export interface IProduct {
  name: string;
  quantity: number;
  unitPrice: number;
  type?: "inventory" | "cart";

  onAddToCart?: (item: IProduct) => void;
  onRemove?: (item: IProduct) => void;
  onChangeQuatity?: (quantity: number) => void;
}

const ProductItem = (props: IProduct) => {
  return (
    <div className="w-full h-fit p-4 rounded shadow bg-white flex items-center justify-between relative">
      <div>
        <p className="font-semibold text-lg">{props.name}</p>
        <p className="text-gray-500">Pricing: {props.unitPrice}$</p>
      </div>

      {props.type === "cart" ? (
        <div className="flex flex-col items-end justify-center">
          <input
            type="number"
            className="p-2 w-16 bg-green-50"
            value={props.quantity}
            onChange={(e) =>
              props.onChangeQuatity &&
              props.onChangeQuatity(parseInt(e.target.value))
            }
          />
          <button
            type="button"
            className="p-1 text-red-500 text-2xl"
            onClick={(e) => {
              e.preventDefault();
              props.onRemove && props.onRemove(props);
            }}
          >
            x
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="px-4 py-2 bg-green-400 text-center"
          onClick={(e) => {
            e.preventDefault();
            props.onAddToCart && props.onAddToCart(props);
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default ProductItem;
