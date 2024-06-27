/* eslint-disable @next/next/no-img-element */
'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Props {
  sessionNumber: number;
  game: string;
  image: string;
}

const getSessionNumber = (sessionNumber: number): string => {
  if (sessionNumber === 1) return 'One';

  if (sessionNumber === 2) return 'Two';
  if (sessionNumber === 3) return 'Three';
  return '';
};

const getGameName = (game: string): string => {
  if (game === 'maze') return 'Electrical forest';

  if (game === 'focus') return 'Focus Fusion';

  if (game === 'whack') return 'Cosmic Whack';

  if (game === 'trail') return 'Trail Making';

  if (game === 'dualNback') return 'Potion Recall';

  return '';
};

const WelcomeCard = ({ sessionNumber, game, image }: Props) => {
  const { status, data: session } = useSession();

  if (status === 'loading') return null;

  return (
    <div className="flex bg-welcome rounded-3xl 2xl:p-7 p-6 col-span-2 lg:col-span-1 justify-between flex-col sm:flex-row items-center">
      <div className="flex flex-col gap-3 text-light-grey">
        <span className="text-sm">Welcome back,</span>
        <h2 className="text-white text-xl 2xl:text-2xl">
          {status === 'authenticated' &&
            session.user?.name?.replace(/\b\w/g, function (char: string) {
              return char.toUpperCase();
            })}
        </h2>
        <p className="2xl:text-base text-sm">
          Glad to see you again! You are Viewing {getGameName(game)} statistics
        </p>
        <span className="font-bold ">
          Session {getSessionNumber(sessionNumber)}
        </span>
      </div>

      <img
        src={image}
        alt={image.slice(1, -5)}
        className="2xl:max-w-xs  max-w-[230px] sm:inline-block hidden"
      />
      <img
        src={image}
        alt={image.slice(1, -5)}
        className="h-40 w-auto sm:hidden inline-block "
      />
    </div>
  );
};

export default WelcomeCard;
