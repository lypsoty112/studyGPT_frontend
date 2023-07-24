type Props = {
  displayText: string;
  onClick: () => void;
};

const NavButton = ({ displayText, onClick }: Props) => {
  return (
    <div>
      <button
        className="animated-base cursor-pointer rounded p-2 text-base font-medium text-black-1 shadow-none "
        onMouseDown={onClick}
      >
        {displayText}
      </button>
    </div>
  );
};

export default NavButton;
