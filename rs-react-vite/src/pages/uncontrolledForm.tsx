import React, { useRef, useState } from 'react';
import { Inputs } from './react-hook';
import { useAppDispatch } from '../redux/hooks';
import * as yup from 'yup';
import { validationForm } from '../validation/validationForm';
import { setUncontrolledData } from '../redux/slices/uncontrolledSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object(validationForm).required();

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const conditionsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const validateForm = async (): Promise<boolean> => {
    const inputs: Inputs = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value as 'male' | 'female',
      conditions: conditionsRef.current?.checked || false,
      country: countryRef.current?.value || '',
      picture: pictureRef.current?.files?.[0]?.name || '',
    };

    try {
      await schema.validate(inputs, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const fieldErrors: any = {};
        error.inner.forEach((err) => {
          if (err.path) fieldErrors[err.path] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const file = await pictureRef?.current?.files?.[0];
    let base64String;
    const isValidForm = await validateForm();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        base64String = reader.result as string;
        if (isValidForm) {
          const formData = {
            name: nameRef.current?.value || '',
            age: parseInt(ageRef.current?.value || '0', 10),
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            confirmPassword: confirmPasswordRef.current?.value || '',
            gender: genderRef.current?.value as 'male' | 'female',
            conditions: conditionsRef.current?.checked || false,
            country: countryRef.current?.value || '',
            picture: base64String,
          };
          dispatch(setUncontrolledData(formData));
          navigate('/');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input ref={nameRef} type="text" placeholder="Name" />
          {errors.name && <div>{errors.name}</div>}
        </div>
        <div>
          <input ref={ageRef} type="number" placeholder="Age" />
          {errors.age && <div>{errors.age}</div>}
        </div>
        <div>
          <input ref={emailRef} type="email" placeholder="Email" />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <input ref={passwordRef} type="text" placeholder="Password" />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <input
            ref={confirmPasswordRef}
            type="text"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </div>
        <div>
          <select ref={genderRef}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <div>{errors.gender}</div>}
        </div>
        <div>
          <input ref={conditionsRef} type="checkbox" />
          {errors.conditions && <div>{errors.conditions}</div>}
        </div>
        <div>
          <input ref={countryRef} type="text" placeholder="Country" />
          {errors.country && <div>{errors.country}</div>}
        </div>
        <div>
          <input
            ref={pictureRef}
            type="file"
            accept=".png,.jpeg,.jpg"
            // onChange={handleFileChange}
          />
          {errors.picture && <div>{errors.picture}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
