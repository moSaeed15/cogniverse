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
    <div className="flex bg-welcome rounded-3xl p-7">
      <div className="flex flex-col gap-3 text-light-grey">
        <span className="text-sm">Welcome back,</span>
        <h2 className="text-white text-2xl">
          {status === 'authenticated' &&
            session.user?.name?.replace(/\b\w/g, function (char: string) {
              return char.toUpperCase();
            })}
        </h2>
        <p className="text-base">
          Glad to see you again! You are Viewing {getGameName(game)} statistics
        </p>
        <span className="font-bold ">
          Session {getSessionNumber(sessionNumber)}
        </span>
      </div>

      <Image
        src={image}
        alt={image.slice(1, -5)}
        width={300}
        height={300}
        priority
      />
    </div>
  );
};

export default WelcomeCard;
