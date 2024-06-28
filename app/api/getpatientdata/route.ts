import { NextResponse } from 'next/server';
import { get, ref } from 'firebase/database';
import { database } from '@/app/FirebaseConfig';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user');

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Missing user parameter' },
      { status: 400 }
    );
  }

  try {
    const userRef = ref(database, `users/${user}`);
    const snapshot = await get(userRef);

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
