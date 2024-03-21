import { RegisterForm } from "./RegisterForm";
import "./style.scss";

export const Register = () => {
  return (
    <div className="Register">
      <div className="RegisterHeader">
        <h1>注册</h1>
      </div>
      <RegisterForm />
    </div>
  );
};
