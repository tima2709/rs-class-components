import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type PropsType = {
  register: UseFormRegister<any>;
  label: string;
  type: string;
  errors: string | undefined;
};

const ControlledInput: React.FC<PropsType> = ({
  register,
  label,
  type,
  errors,
}: PropsType) => {
  return (
    <div className="formStyle">
      <div className="form-control-auto">
        <label htmlFor={label}>{label}</label>
        <input
          {...register(label, { required: true })}
          type={type}
          id={label}
          placeholder={label}
        />
      </div>
      <p className="errorMessage">{errors}</p>
    </div>
  );
};

export default ControlledInput;
