const StatusBtn = ({ status }: { status: string }) => {
  const buttonText = status.toUpperCase();

  return (
    <div className="bg-pink text-black w-full flex justify-center rounded-lg p-2 font-bold">
      {buttonText}
    </div>
  );
};

export default StatusBtn;
