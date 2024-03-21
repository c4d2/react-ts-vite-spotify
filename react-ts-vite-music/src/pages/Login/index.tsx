import React from 'react';
import './style.scss';
import { LoginForm } from './LoginForm';
import { LoginHeader } from './LoginHeader';

export const Login: React.FC = () => {
    return (
        <div className='Login'>
            <LoginHeader />
            <LoginForm />
        </div>
    )
}
