type Props = {
  title: string;
};

const ContainerTitle = ({ title }: Props) => {
  return (
    <div className=" mb-6 w-full border-b border-black text-lg font-semibold ">
      {title}
    </div>
  );
};

export default ContainerTitle;
