import { NextResponse } from 'next/server';
import { get, ref } from 'firebase/database';
import { database } from '@/app/FirebaseConfig';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user');
  const game = url.searchParams.get('game');

  if (!user || !game) {
    return NextResponse.json(
      { success: false, message: 'Missing user or game parameter' },
      { status: 400 }
    );
  }

  try {
    const gameRef = ref(database, `users/${user}/${game}`);
    const gameSnapshot = await get(gameRef);

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
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
