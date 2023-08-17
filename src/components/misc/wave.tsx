type Props = {
  color: string;
  className: string;
};

const Wave = ({ color, className }: Props) => {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 1440 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 51.9618L48 40.6789C96 29.396 192 7.21924 288 1.38325C384 -4.06367 480 7.21924 576 23.9491C672 40.6789 768 63.2447 864 65.9682C960 68.6916 1056 51.9618 1152 49.2383C1248 46.5149 1344 57.4087 1392 63.2447L1440 68.6916V136H1392C1344 136 1248 136 1152 136C1056 136 960 136 864 136C768 136 672 136 576 136C480 136 384 136 288 136C192 136 96 136 48 136H0V51.9618Z"
        fill={color}
      />
    </svg>
  );
};

export default Wave;
