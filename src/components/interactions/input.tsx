type Props = {
  title: string;
};

const Input = ({ title }: Props) => {
  return (
    <div className="mb-4">
      <div className="w-full font-medium">{title}</div>
      <input className="w-full rounded-lg border border-gray-1 px-3 py-1"></input>
    </div>
  );
};

export default Input;
