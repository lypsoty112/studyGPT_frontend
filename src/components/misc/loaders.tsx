import ContentLoader from "react-content-loader";

type Props = {
  className?: string;
  rectangleCount?: number;
};

const FormLoader = ({ className, rectangleCount }: Props) => {
  if (!rectangleCount) rectangleCount = 4;

  return (
    <ContentLoader
      className={className}
      speed={2}
      width="100%"
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {Array.from(Array(rectangleCount)).map((_, index) => {
        return (
          <rect
            key={index}
            x="0"
            y={index * 20}
            rx="3"
            ry="3"
            width="100%"
            height="16"
          />
        );
      })}
    </ContentLoader>
  );
};

export default FormLoader;
