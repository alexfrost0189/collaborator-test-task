import React from "react";
import clsx from "clsx";
import "./Tabs.scss";

type TabsProps = {
  config: { label: string; value: string }[];
  onChange?: (value: string) => void;
  value?: string;
};

export default function Tabs({ config, value, onChange }: TabsProps) {
  return (
    <div className="tabs">
      {config.map((item) => (
        <button
          onClick={() => onChange?.(item.value)}
          key={item.value}
          className={clsx("tabs__item", { "tabs__item--active": item.value === value })}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
