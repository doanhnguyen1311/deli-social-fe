import React, { useState } from "react";
import SocialIcons from "./SocialIcon";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';

const SignInForm: React.FC = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState<string>("");
    
    const [password, setPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userData = await login(email, password);
            console.log('userData', userData);
            
            if (userData) {
                toast.success("Login successful!");
                navigate('/feeds');
            }

        } catch (error) {
            console.error("Login error:", error);
            if (error instanceof Error) {
                toast.error(`Login failed`);
            } else {
                toast.error("Login failed: Unknown error");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="form-container sign-in">
            <ToastContainer position="top-right" autoClose={3000} />
            {/* onSubmit={handleSubmit} */}
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <SocialIcons />
                <span>or use your email password</span>
                <input 
                    type="text" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                />
                <a href="#">Forget Your Password?</a>
                {/* <Link to={'feeds'}><button type="submit">Sign In</button></Link> */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <span className="d-flex align-center justify-center gap-8px">
                            <span className="loading-sm"></span>
                            Logging in...
                        </span>
                    ) : (
                        'Sign In'

                    )}
                </button>
            </form>
        </div>
    );
};

export default SignInForm;
