const InfoBox = ({
  title,
  icon,
  info,
}: {
  title?: string;
  info?: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-start rounded-lg p-2 border border-border text-sm font-medium flex-grow">
    <p className="text-xs w-full">{title}</p>
    <div className="flex flex-row items-center gap-1">
      {icon && icon}
      <p>{info}</p>
    </div>
  </div>
);
export default InfoBox;
