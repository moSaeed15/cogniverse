import PairText from "./PairText";

const PatientCard = () => {
  return (
    <div className="bg-patient  rounded-3xl p-7 w-3/4 ">
      <h3 className="text-lg">Patient Information</h3>
      <p className="text-sm text-light-grey mt-3 ">
        Patient came in on the day of 16/04/2024 and time 15:28 for the first
        session
      </p>
      <div className="custom-divider my-5"></div>
      <div className=" flex gap-10 text-sm ">
        <div className="flex flex-col gap-3">
          <PairText title="Full Name:" text="Mohammed El Saeed" />
          <PairText title="Age:" text="23" />
          <PairText title="Gender:" text="Male" />
          <PairText title="Mobile:" text="0155 8202011" />
        </div>
        <div className="flex flex-col gap-3">
          <PairText title="Email:" text="mohammed.elsaeed@gmail.com" />
          <PairText title="Diagnosis:" text="ADHD" />
          <PairText title="Reinforcment Type:" text="Negative" />
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
