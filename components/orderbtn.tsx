const OrderBtn = ({
  handleClick,
  text,
}: {
  handleClick: any;
  text: string;
}) => {
  return (
    <button
      type="button"
      className="bg-purple w-full text-off-white rounded-lg p-2 font-bold"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default OrderBtn;
