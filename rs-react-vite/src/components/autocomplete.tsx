import React, { ChangeEvent, useState } from 'react';
import './componentStyle.css';

type AutocompleteProps = {
  label: string;
  pholder: string;
  data: string[];
  onSelected: (value: string) => void;
  onChange: (value: string) => void;
  setValue: (label: string, value: string) => void;
  errors: string | undefined;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  pholder,
  data,
  onSelected,
  setValue,
  errors,
}: AutocompleteProps) => {
  const [suggestions, setSugesstions] = useState<string[]>([]);
  const [isHideSuggs, setIsHideSuggs] = useState<boolean>(false);
  const [selectedVal, setSelectedVal] = useState<string>('');

  const handler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSugesstions(
      data.filter((i) => i.toLowerCase().startsWith(e.currentTarget.value)),
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIsHideSuggs(false);
    setSelectedVal(input);
    setValue(label, input);
  };

  const hideSuggs = (value: string) => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(true);
  };

  return (
    <div className="sugesstion-auto">
      <div className="form-control-auto">
        <label htmlFor="tag-input">{label}</label>
        <input
          placeholder={pholder}
          type="search"
          value={selectedVal}
          onChange={handleChange}
          onKeyUp={handler}
        />
      </div>
      <p className="errorMessage">{errors && errors}</p>

      <div
        className="suggestions"
        style={{ display: isHideSuggs ? 'none' : 'block' }}
      >
        {suggestions.map((item, idx) => (
          <div
            key={'' + item + idx}
            onClick={() => {
              hideSuggs(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autocomplete;
