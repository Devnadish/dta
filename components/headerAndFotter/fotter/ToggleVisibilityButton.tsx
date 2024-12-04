import DynamicOnOffMenu from "./EyeOnOffDynmic";

export default function ToggleVisibilityButton({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) {
  return (
    <div className="flex items-center  fixed bottom-2 right-2 rounded-full h-[40px] border border-foreground/20 bg-background/20 w-[38px] justify-evenly">
      <DynamicOnOffMenu onClick={onClick} isVisible={isVisible} />
    </div>
  );
}
