'use client';

import { useState } from 'react';

const StatusBtnUser = ({ status }: { status: number }) => {
  const statusOptions = ['ORDERED', 'ACCEPTED', 'BAKED', 'DELIVERED'];

  return (
    <div className="bg-pink text-black w-full flex justify-center rounded-lg p-2 font-bold">
      {statusOptions[status]}
    </div>
  );
};

export default StatusBtnUser;
