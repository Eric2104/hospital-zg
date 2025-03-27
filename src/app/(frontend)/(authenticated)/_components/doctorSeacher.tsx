import { FaSearch } from "react-icons/fa";

const DoctorSeacher = () => {
    return (
        <div className="relative md:w-3/4 text-sm px-4">
            <form className="flex items-center bg-white shadow-lg rounded-full overflow-hidden">
                {/* Ícono de búsqueda */}
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                        <FaSearch />
                    </span>
                    <input
                        placeholder="Buscar doctor por nombre"
                        name="nombreDoctor"
                        required
                        className="pl-12 pr-4 py-3 w-full text-lg border-none focus:outline-none focus:ring-2 focus:ring-[#89ccc5] rounded-full"
                    />
                </div>
                {/* Botón de búsqueda */}
                <button
                    className="ml-2 px-6 py-3 bg-[#89ccc5] text-white font-semibold rounded-full hover:bg-[#78b3ad] transition-colors duration-300"
                    type="submit"
                >
                    Buscar
                </button>
            </form>
        </div>
    );
};

export default DoctorSeacher;