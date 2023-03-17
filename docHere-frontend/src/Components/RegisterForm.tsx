import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../Hooks/FormValidation";

interface RoleProps {
  role: String;
  updateForm: (arg: User) => void;
}

interface User{
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const RegisterForm: FC<RoleProps> = (props: RoleProps): JSX.Element => {

    const {
      errors,
      data: user,
      handleChange,
      handleSubmit,
    } = useForm<User>({
      validations: {
        name: {
          required: {
            value: true,
            message: "Name is mandatory",
          },
          pattern: {
            value: "^[A-Za-z]*$",
            message: "Name should contain only alphabets",
          },
        },
        email: {
          required: {
            value: true,
            message: "Email is mandatory",
          },
          pattern: {
            value:
              "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
            message: "Email should have valid charachers",
          },
        },
        password: {
          required: {
            value: true,
            message: "Password is mandatory",
          },
          custom: {
            isValid: (value) => value?.length > 2,
            message: "Password must contain at least 3 charachers",
          },
        },
        confirmPassword: {
          required: {
            value: true,
            message: "This field is mandatory",
          },
          custom: {
            isValid: (value) => value === user?.password,
            message: `Passwords don't match`,
          },
        },
      },
      onSubmit: () => handleErrorChange(),
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    
    const handleErrorChange = () => {        
        if (Object.keys(errors).length === 0) props.updateForm(user)
    }
    

  return (
    <>
      <div className="lg:p-5 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl lg:px-8 lg:pt-6 lg:pb-8 lg:mb-4 lg:border-8 border-4 p-5 lg:p-0 border-main-blue"
        >
          <h1 className="text-center font-bold text-2xl text-main-blue">
            {props ? `Register ${props.role}` : ""}
          </h1>
          <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              onChange={handleChange("name")}
              className={`${
                errors.name ? "border-red-500" : "text-gray-700"
              } shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="name"
              name="name"
              type="text"
              value={user.name || ""}
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={handleChange("email")}
              className={`shadow border rounded w-full py-2 px-3 ${
                errors.email ? "border-red-500" : "text-gray-700"
              } leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="text"
              value={user.email || ""}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-6 relative">
            <label className=" text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border ${
                  errors.password ? "border-red-500" : "text-gray-700"
                } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                value={user.password || ""}
                placeholder="*******"
                autoComplete="on"
              />
              <label
                onClick={handleShowPassword}
                className="absolute -ml-14 mt-1 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer "
                htmlFor="toggle"
              >
                {showPassword ? "Hide" : "Show"}
              </label>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-3 relative">
            <label className=" text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3
                ${errors.confirmPassword ? "border-red-500" : "text-gray-700"} 
                mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleChange("confirmPassword")}
                value={user.confirmPassword || ""}
                placeholder="*******"
                autoComplete="on"
              />
              <label
                onClick={handleShowConfirmPassword}
                className="absolute -ml-14 mt-1 bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer "
                htmlFor="toggle"
              >
                {showPassword ? "Hide" : "Show"}
              </label>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex flex-row mb-6">
          <p className="text-gray-700 text-sm">Already have an account?</p>
          <p className="ml-2 font-bold text-sm text-blue-500 hover:text-blue-800"><Link to={'/login'}>Login</Link></p>
          </div>
            
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 lg:w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default RegisterForm;