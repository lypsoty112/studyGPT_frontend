type Props = {
  title: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ title, type = "text", onChange }: Props) => {
  return (
    <div className="mb-4">
      <div className="w-full font-medium">{title}</div>
      <input
        className="w-full rounded-lg border border-gray-1 px-3 py-1"
        onChange={onChange}
        type={type}
      ></input>
    </div>
  );
};

export default Input;
