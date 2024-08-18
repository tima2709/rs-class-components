import React, { ChangeEvent, useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import './styles.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Autocomplete from '../components/autocomplete';
import ControlledInput from '../components/controlledInput';
import { setInputData } from '../redux/slices/inputFormSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordStrengthBar from '../components/passwordStrengthBar';
import { useNavigate } from 'react-router-dom';
import { validationForm } from '../validation/validationForm';

const schema = yup.object(validationForm).required();

export interface Inputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  conditions: boolean;
  country: string;
  picture: string;
}

const ReactHook: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries.countries);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as Resolver<Inputs>,
    mode: 'onChange',
  });

  const passwordStrength = watch('password');

  const strength = getPasswordStrength(passwordStrength);

  function getPasswordStrength(passwordStrength: string) {
    let strength = 0;
    if (/[A-Z]/.test(passwordStrength)) strength++;
    if (/[a-z]/.test(passwordStrength)) strength++;
    if (/[0-9]/.test(passwordStrength)) strength++;
    if (/[^A-Za-z0-9]/.test(passwordStrength)) strength++;
    return strength;
  }

  const getSelectedVal = (value: string) => {
    setValue('country', value);
  };

  const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('picture', { message: 'Размер файла должен быть меньше 2MB' });
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('picture', { message: 'Поддерживаются только PNG и JPEG' });
        return;
      }

      const base64 = await fileToBase64(file);
      setValue('picture', base64);
      setImage(base64);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(setInputData(data));
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          register={register}
          label="name"
          type="text"
          errors={errors.name?.message}
        />
        <ControlledInput
          register={register}
          label="age"
          type="text"
          errors={errors.age?.message}
        />
        <ControlledInput
          register={register}
          label="email"
          type="email"
          errors={errors.email?.message}
        />
        <ControlledInput
          register={register}
          label="conditions"
          type="checkbox"
          errors={errors.conditions?.message}
        />
        <ControlledInput
          register={register}
          label="password"
          type="text"
          errors={errors.password?.message}
        />
        {passwordStrength && <PasswordStrengthBar strength={strength} />}
        <ControlledInput
          register={register}
          label="confirmPassword"
          type="text"
          errors={errors.confirmPassword?.message}
        />
        <div className="formStyle">
          <div className="form-control-auto">
            <label htmlFor={'picture'}>picture</label>
            <input
              type="file"
              id="picture"
              accept=".png,.jpeg,.jpg"
              placeholder="picture"
              onChange={handleChangeInput}
            />
          </div>
          <p className="errorMessage">
            {errors.picture && errors.picture?.message}
          </p>
          {image && (
            <div className="previewImage">
              <img src={image} alt="picture" />
            </div>
          )}
        </div>
        <div className="formStyle">
          <label>Gender Selection</label>
          <select {...register('gender')}>
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <p className="errorMessage">{errors.gender?.message}</p>
        </div>
        <div className="formStyle">
          <Autocomplete
            label="country"
            pholder="Keyword..."
            data={countries}
            onSelected={getSelectedVal}
            setValue={setValue}
            errors={errors.country?.message}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReactHook;
