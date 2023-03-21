import RegisterForm from "../../Components/RegisterForm";

const RegisterDoctor = () => {
    return (
      <>
        <div className="register_container lg:grid grid-cols-2 h-screen flex">
          <div className="lg:relative lg:block hidden  ">
            <img
              className=" lg:absolute lg:mt-96 ml-96 -z-10 scale-150 flex-shrink"
              src="/ImageUploads/singup logo.webp"
              alt=""
            />
          </div>
          {/* <div className="m-auto lg:mt-20 lg:w-4/5 lg:ml-0 md:p-7"> 
            <RegisterForm
              role="Doctor"
              updateForm={updateForm}
            />
          </div> */}
        </div>
      </>
    );
}

export default RegisterDoctor;