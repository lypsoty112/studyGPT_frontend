type Props = {
  color: string;
  className: string;
};

const ContainerWave = ({ color, className }: Props) => {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 564 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.9507C0 5.53335 5.2714 1.68236 10.4323 3.32946L23.5 7.5C47 15 94 30 141 34.5833C188 38.9583 235 32.9167 282 23.9583C329 15 376 2.91667 423 4.58333C470 6.04167 517 21.0417 540.5 28.5417L560.397 34.8919C562.543 35.5768 564 37.5708 564 39.8234V39.8234C564 42.6824 561.682 45 558.823 45H540.5C517 45 470 45 423 45C376 45 329 45 282 45C235 45 188 45 141 45C94 45 47 45 23.5 45H8C3.58172 45 0 41.4183 0 37V10.9507Z"
        fill={color}
      />
    </svg>
  );
};

export default ContainerWave;
