import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { getSession } from '@/lib/auth';
import { capitalize } from '@/utils/captalize';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const snapshot = await getAdminDb().ref('users').get();
    const patients: { id: string; name: string }[] = [];

    snapshot.forEach(child => {
      const { firstName, lastName } = child.val() ?? {};
      const name = `${capitalize(firstName ?? '')} ${capitalize(lastName ?? '')}`
        .replace(/\s+/g, ' ')
        .trim();
      patients.push({ id: child.key ?? '', name });
    });

    return NextResponse.json(
      { success: true, data: patients },
      { status: 200 }
    );
  } catch (error) {
    console.error('getpatients failed:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
