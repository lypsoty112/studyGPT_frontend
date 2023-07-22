import { BackgroundWaveIcon } from "./backgroundWaveIcon";

type Props = {
  height?: number | false;
  heightPct?: number | false;
};

const Footer: React.FC<Props> = ({
  height = false,
  heightPct = false,
}: Props) => {
  if (!height && !heightPct) {
    throw new Error("Either height or heightPct must be set");
  }
  const heightStyle = !height ? heightPct + "vh" : height + "px";
  return (
    // If height is not set, use heightPct
    <footer>
      <div className="mt-6">
        <BackgroundWaveIcon />
        {/* Add a white bottom who's height can be edited */}
        <div
          style={{
            height: heightStyle,
            maxHeight: "300px",
            width: "100%",
            background: "white",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
