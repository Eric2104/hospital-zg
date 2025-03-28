import { FaSearch } from "react-icons/fa";

const DoctorSeacher = () => {
    return (
        <div className="relative lg:w-full text-sm px-4">
            <form className="flex items-center bg-white rounded-2xl overflow-hidden gap-1">
                {/* Ícono de búsqueda */}
                <div className="relative w-full">
                    <input
                        placeholder="Buscar doctor por nombre"
                        name="nombreDoctor"
                        required
                        className="pl-4 lg:pl-12 pr-4 py-2 w-full lg:text-lg border-none focus:outline-none focus:ring-2 focus:ring-white rounded-full bg-stone-100 lg:bg-white sm:bg-gray-100"
                    />
                </div>
                {/* Botón de búsqueda */}
                <button
                    className="lg:ml-2 px-8 py-3 text-stone-600 bg-stone-100 lg:bg-white font-semibold hover:bg-stone-200 rounded-2xl transition-colors duration-300"
                    type="submit"
                >
                    <FaSearch className="text-lg" />
                </button>
            </form>
        </div>
    );
};

export default DoctorSeacher;