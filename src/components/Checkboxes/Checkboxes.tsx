import React from "react";
import "./Checkboxes.scss";

type CheckboxesProps = {
  title: string;
  config: { label: string; value: string }[];
  onChange?: (value: string) => void;
  value?: string[];
};

export default function Checkboxes({ title, config, onChange, value }: CheckboxesProps) {
  return (
    <div className="checkboxes">
      <div className="checkboxes__title">{title}</div>
      <div className="checkboxes__list">
        {config.map((item) => (
          <label key={item.value} className="checkboxes__item">
            <input
              type="checkbox"
              onChange={() => onChange?.(item.value)}
              checked={value?.includes(item.value) ?? false}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
