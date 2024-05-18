const PairText = ({ title, text }: { title: string; text: string }) => {
  return (
    <p className="text-light-grey flex items-center gap-3">
      {title}
      <span className="text-white">{text}</span>
    </p>
  );
};

export default PairText;
