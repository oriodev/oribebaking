'use client';

import { useState } from 'react';

const StatusBtn = ({ status }: { status: number }) => {
  const [statusIndex, setStatusIndex] = useState(status);

  const statusOptions = ['ORDERED', 'ACCEPTED', 'BAKED', 'DELIVERED'];
  const numOfOptions = statusOptions.length;

  const handleClick = () => {
    setStatusIndex((prev) => (prev + 1) % numOfOptions);
  };

  return (
    <div
      className="bg-pink text-black w-full flex justify-center rounded-lg p-2 font-bold hover:cursor-pointer"
      onClick={handleClick}
    >
      {statusOptions[statusIndex]}
    </div>
  );
};

export default StatusBtn;
