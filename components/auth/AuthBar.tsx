import React from 'react';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FaCookieBite, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { MdAdd } from 'react-icons/md';
import AdminOnly from './AdminOnly';

const AuthBar = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: 'w-5 h-5', // Custom width and height
      userButtonPopoverCard: 'bg-off-white', // Custom background for the popover card
      userButtonPopoverActionButton: 'text-purple font-semibold', // Custom text color for action buttons
    },
  };

  const router = useRouter();

  const orderPage = () => {
    router.push('/orders');
  };

  const addGoodPage = () => {
    router.push('/add-good');
  };

  return (
    <div className="flex justify-center gap-5 w-full">
      {/* user button */}
      <div>
        <SignedOut>
          <SignInButton>
            <button className="">
              <FaUser size={20} />
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton appearance={userButtonAppearance} />
        </SignedIn>
      </div>

      {/* orders page */}
      <div
        className="hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
        onClick={orderPage}
      >
        <FaCookieBite size={20} />
      </div>

      {/* add good page */}
      <AdminOnly>
        <div
          className="hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
          onClick={addGoodPage}
        >
          <MdAdd size={20} />
        </div>
      </AdminOnly>
    </div>
  );
};

export default AuthBar;
