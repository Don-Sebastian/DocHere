import { FC } from 'react';

const DoctorNavbar: FC = () => {
    return (
      <div className="grid grid-flow-col px-5 bg-gray-300 shadow">
        <div className="col-span-1 flex justify-center">
          <img
            className="w-48"
            src="/ImageUploads/dochere_logo-removebg-preview.png"
            alt="DocHere Logo"
          />
        </div>
        <div className="col-span-10 flex justify-center my-auto">
          <div className="flex justify-end">
            <p className="mr-5 text-main-blue font-medium">Update Appointments</p>
            <p className="mr-5 text-main-blue font-medium">Profile</p>
            <p className="text-main-blue font-medium">Chat History</p>
          </div>
        </div>
        <div className="col-span-1 flex justify-start my-auto">
          <div className="flex justify-between w-40 border bg-main-blue rounded-lg p-1">
            <h2 className="text-white font-semibold m-auto">Dr.Poly</h2>
            <img
              className=""
              src="https://www.freeiconspng.com/uploads/white-down-arrow-png-2.png"
              width="20"
              alt="Icon Transparent Arrow Down"
            />
          </div>
        </div>
      </div>
    );
}

export default DoctorNavbar;