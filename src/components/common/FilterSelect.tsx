import { Select } from "antd";

interface FilterSelectProps<T extends string>  {
    value: T;
    options: { value: T; label: string }[];
    onChange: (value: T) => void;
    className?: string;
};

export const FilterSelect = <T extends string>({
    value,
    options,
    onChange,
    className,
}: FilterSelectProps<T>) => {
    return (
        <Select
          value={value}
          onChange={onChange}
          options={options}
          className={`px-3! text-[13px]! ${className}`}
        />
    );
};