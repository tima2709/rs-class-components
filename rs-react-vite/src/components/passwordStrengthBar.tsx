const PasswordStrengthBar: React.FC<{ strength: number }> = ({ strength }) => {
  let color = 'red';
  if (strength >= 3) color = 'green';
  else if (strength >= 2) color = 'orange';

  return (
    <div style={{ height: '5px', backgroundColor: color, marginTop: '10px' }} />
  );
};

export default PasswordStrengthBar;
