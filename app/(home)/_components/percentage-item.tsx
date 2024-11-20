import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex justify-between items-center">
      {/* Icon: */}
      <div className="flex items-center gap-3">
        <div className="bg-white bg-opacity-[3%] rounded-lg p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      {/* Value: */}
      <p className="font-bold text-sm">{(value || 0) + `%`}</p>
    </div>
  )
};

export default PercentageItem;
