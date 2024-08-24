const OrderBtn = ({ handleClick }: { handleClick: any }) => {
  return (
    <button
      type="button"
      className="bg-purple w-full text-off-white rounded-lg p-2 font-bold"
      onClick={handleClick}
    >
      ORDER
    </button>
  );
};

export default OrderBtn;
