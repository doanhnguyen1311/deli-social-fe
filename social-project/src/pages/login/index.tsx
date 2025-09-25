import { useState } from 'react';
import SignUpForm from '../../component_helper/Auth/SignUpForm';
import SignInForm from '../../component_helper/Auth/SignInForm';
import TogglePanel from '../../component_helper/Auth/TogglePanel';
import './index.css';

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="body">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        <SignUpForm />
        <SignInForm />
        <TogglePanel isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  );
};

export default Login;
