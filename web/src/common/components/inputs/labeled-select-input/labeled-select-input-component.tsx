import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

interface LabeledSelectProps extends SelectProps {
  label?: string;
}

export const LabeledSelect = ({ label, ...props }: LabeledSelectProps) => {
  const filterSelectOption = (input: string, option: DefaultOptionType | undefined) => {
    return String(option?.label).toLowerCase().includes(input.toLowerCase());
  };

  return (
    <div className='w-full'>
      {label && <label className='text-sm font-medium'>{label}</label>}
      <Select
        {...props}
        className='block w-full rounded-md border border-[#34A0A4] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34A0A4]'
        showSearch
        placeholder='Select or type to search'
        filterOption={filterSelectOption}
        allowClear
      />
    </div>
  );
};

export default LabeledSelect;