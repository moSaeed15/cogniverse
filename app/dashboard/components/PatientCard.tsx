import { PatientData } from '@/app/hooks/usePatientData';
import PairText from '../../../components/PairText';
import { SessionTime } from '@/app/types/gameTypes';

interface Props {
  patientData: PatientData;
  sessionTime: SessionTime;
  sessionNumber: number;
}

const PatientCard = ({ patientData, sessionTime, sessionNumber }: Props) => {
  const getSessionNumber = (sessionNumber: number): string => {
    if (sessionNumber === 1) return 'First';

    if (sessionNumber === 2) return 'Second';
    if (sessionNumber === 3) return 'Third';
    return '';
  };

  return (
    <div className="bg-patient  rounded-3xl 2xl:p-10 p-6 col-span-2 lg:col-span-1 ">
      <h3 className="text-lg">Patient Information</h3>
      <p className="text-sm text-light-grey mt-3 ">
        Patient came in on the day of {sessionTime.date} and time{' '}
        {sessionTime.time} for the {getSessionNumber(sessionNumber)} session
      </p>
      <div className="custom-divider my-5"></div>
      <div className=" flex gap-5 text-sm ">
        <div className="flex flex-col gap-5">
          <PairText title="Full Name:" text={patientData.name} />
          <PairText title="Age:" text={String(patientData.age)} />
          <PairText title="Gender:" text={patientData.gender} />
        </div>
        <div className="flex flex-col gap-5 ">
          <PairText title="Email:" text={patientData.email} />
          <PairText title="Diagnosis:" text={patientData.diagnosis} />
          <PairText
            title="Reinforcment Type:"
            text={patientData.reinforcementType}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
