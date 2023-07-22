type Props = {
  children: React.ReactNode;
};

const BigContainer = ({ children }: Props) => {
  return (
    <div className="h-full w-full overflow-y-auto rounded-t-xl bg-white-1 p-10 text-black">
      {children}
    </div>
  );
};

export default BigContainer;
