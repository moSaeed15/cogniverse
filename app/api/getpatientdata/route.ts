import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { DEMO_USER_ID, getSession } from '@/lib/auth';
import { isValidId } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user');

  if (!isValidId(user)) {
    return NextResponse.json(
      { success: false, message: 'Invalid user parameter' },
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
    const snapshot = await getAdminDb().ref(`users/${user}`).get();

    if (snapshot.exists()) {
      const patientObject = snapshot.val();

      const patientData = {
        age: patientObject.age,
        name: `${capitalize(patientObject.firstName)} ${capitalize(
          patientObject.lastName
        )}`,
        diagnosis: patientObject.diagnosis,
        email: patientObject.email,
        gender: patientObject.femalegender !== 'no' ? 'Female' : 'Male',
        reinforcementType: mapReinforcementType(
          patientObject.ispositiveGroup,
          patientObject.isnegativeGroup,
          patientObject.iscontrolGroup
        ),
      };

      return NextResponse.json(
        { success: true, data: patientData },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'No data found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('getpatientdata failed:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const mapReinforcementType = (
  isPositive: boolean,
  isNegative: boolean,
  isControl: boolean
): string => {
  if (isPositive) return 'Positive';
  if (isNegative) return 'Negative';
  if (isControl) return 'Control';
  return '';
};
