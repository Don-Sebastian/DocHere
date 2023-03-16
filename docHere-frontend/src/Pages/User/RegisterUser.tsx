import { FC, useState} from "react";
import RegisterForm from "../../Components/RegisterForm";

const RegisterUser: FC = () => {
        
    // const [validationErrors, setValidationErrors] = useState({})
    // const updateErrors = (errors : {}): void => {
    //     setValidationErrors(errors)
    // }
    
    
    
    return (
        <>
            <div className="register_container grid grid-cols-2">
                <div className="bg-slate-300">
                    <RegisterForm role="Patient"  />
                </div>
                <div className="bg-slate-500"></div>
            </div>
        </>
    );
}

export default RegisterUser;