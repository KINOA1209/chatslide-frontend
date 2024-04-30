import Select from 'react-select';

export const ReactDropDown: React.FC<{
	options: { value: string; label: string | React.JSX.Element }[];
	onChange: (value: string) => void;
	placeholder: string;
	value: string;
}> = ({ options, onChange, placeholder, value }) => {
	return (
		<Select
			options={options}
			onChange={(selectedOption) => onChange(selectedOption?.value || '')}
			value={options.find((option) => option.value === value)}
			placeholder={placeholder}
			classNamePrefix='react-select'
		/>
	);
};
