import Image from 'next/image';

interface Props {
  title: string;
  image: string;
  number: number;
  isTime?: boolean;
}

const StatusCard = ({ title, image, number, isTime }: Props) => {
  return (
    <div className="bg-status flex items-center justify-between py-3 pr-3 pl-5 rounded-2xl min-w-52">
      <div>
        <p className="text-xs text-light-grey">{title}</p>

        <span className="text-lg">
          {number}
          {isTime ? ' seconds' : ''}
        </span>
      </div>
      <div className="bg-status-blue p-2 rounded-lg ">
        {image && (
          <Image
            src={image}
            alt="Collision icon"
            height={0}
            width={0}
            style={{ width: '30px', height: 'auto' }}
          />
        )}
      </div>
    </div>
  );
};

export default StatusCard;
