import Image from "next/image";

interface Props {
  title: string;
  image: string;
  number: number;
  isTime?: boolean;
}

const StatusCard = ({ title, image, number }: Props) => {
  return (
    <div>
      <p>Number of hits</p>
      <Image src="./crash.svg" alt="Collision icon" />
      <span>1</span>
    </div>
  );
};

export default StatusCard;
