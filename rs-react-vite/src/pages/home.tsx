import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Card from '../components/card';
import './styles.css';

const Home: React.FC = () => {
  const controlledForm = useAppSelector((state) => state.controlledData.data);
  const uncontrolledData = useAppSelector(
    (state) => state.uncontrolledData.data,
  );

  return (
    <div className="homePage">
      <div>
        <div>
          <NavLink to="controlled">
            <button>Controlled inputs</button>
          </NavLink>
        </div>
        {controlledForm
          .slice()
          .reverse()
          .map((el, idx) => (
            <Card el={el} key={idx} isLast={idx === 0} />
          ))}
      </div>
      <div>
        <div>
          <NavLink to="uncontrolled">
            <button>Unontrolled inputs</button>
          </NavLink>
        </div>
        {uncontrolledData
          .slice()
          .reverse()
          .map((el, idx) => (
            <Card el={el} key={idx} isLast={idx === 0} />
          ))}
      </div>
    </div>
  );
};

export default Home;
