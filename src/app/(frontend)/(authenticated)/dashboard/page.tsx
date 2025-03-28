import React from "react";
import SpecialtyOptions from "./_components/specialtyOpcions";
import FeatureDoctors from "./_components/featuredDoctors";
import DoctorSeacher from "../_components/doctorSeacher";

const Page = () => {
    return (
        <div className="w-[96vw] mx-auto px-2 pb-6">
            <h3 className="text-2xl lg:text-3xl font-semibold text-stone-600">
                Bienvenido a tu <span className=" text-[#89ccc5]">dashboard</span>
            </h3>
            <div className="py-2">
                <DoctorSeacher />
            </div>
            <div className="mt-2">
                <p className="text-lg lg:text-2xl text-stone-600">Especialidades</p>
                <SpecialtyOptions />
            </div>
            <div className="">
                <p className="text-lg lg:text-2xl text-stone-600 mt-2">Medicos destacados</p>
                <FeatureDoctors />
            </div>

        </div>
    );
};

export default Page;