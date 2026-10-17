import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { DEMO_USER_ID, getSession } from '@/lib/auth';
import { isValidGame, isValidId } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user');
  const game = url.searchParams.get('game');

  if (!isValidId(user) || !isValidGame(game)) {
    return NextResponse.json(
      { success: false, message: 'Invalid user or game parameter' },
      { status: 400 }
    );
  }

  if (user !== DEMO_USER_ID && !(await getSession())) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const gameSnapshot = await getAdminDb().ref(`users/${user}/${game}`).get();

    if (gameSnapshot.exists()) {
      const data = gameSnapshot.val();
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: 'No data found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('getgamedata failed:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
