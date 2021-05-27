import Image from "next/image";
import { SearchIcon, ShoppingCartIcon} from "@heroicons/react/outline";
function Header() {
    
    return (
        <header className="">
            {/* top nav */}
            <div className="flex items-center bg-gradient-to-tl from-green-500 to-green-700 p-1 flex-grow py-2 ">
                <div className="my-1 flex items-center flex-grow sm:flex-grow-0">
                    <Image 
                        src='/neppharm.png'
                        width={150}
                        height={50}
                        quality="100"
                        objectFit="contain"
                        className="cursor-pointer"
                        />
                </div>
                <div className=" hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500">
                    <input className="p-2  h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text"/>
                    <SearchIcon className="h-12 p-4"/>
                </div>
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap ">
                    <div className="link">
                        <p>Hello, Manoj Pudasaini</p>
                    </div>
                    <div className=" link hidden sm:flex">
                        <button className="font-bold tracking-wide  focus:outline-none  ">UPLOAD</button>
                    </div>
                    <div className="link relative flex items-center">
                        <span className="absolute top-0 right-0 h-4 w-4 bg-blue-300 text-center rounded-full text-black font-bold">0</span>
                        <ShoppingCartIcon className="link h-10"/>
                    </div> 
                </div>
            </div>
            {/* bottom nav */}
            <div className=" p-2 bg-gradient-to-b from-green-500 to-green-600 sm:hidden">
                <div className="flex items-center h-8 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500 ">
                    <input className="p-2  h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text"/>
                    <SearchIcon className="h-12 p-4"/>
                </div>
            </div>
            <div className="flex text-center text-xs bg-gradient-to-b from-green-500 to-green-600 justify-around md:text-sm text-white tracking-wide font-semibold items-center p-2">
                <div className="link">
                    <p>Medicines</p>
                </div>

                <div className="link">
                    <p>Health Products</p>
                </div>

                <div className="link">
                    <p>Diagnostic</p>
                </div>

                <div className="link">
                    <p>Health Corner</p>
                </div>
            </div>
        </header>
    )
}

export default Header
