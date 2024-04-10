import DropdownUser from './MenuUser';
import NavBar from './NavBar';

const BackendHeader = () => {
    const isAuthenticated = !!localStorage.getItem('userLoginData');

    return isAuthenticated ? (
            <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-2">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <svg className="fill-current h-8 w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14.5 10.5h5.75v2h-5.75zM10 10.5h4v2h-4zm0 3h9v2h-9zm0 3h9v2h-9zM5.25 10.5h4v2h-4zM3 3v18h18V3H3zm15 15H6V6h12v12z"/>
                    </svg>
                    <span className="font-semibold text-xl tracking-tight">Instant News</span>
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <NavBar />
                    
                    <DropdownUser />
                </div>
            </nav>
    ) : null;
};

export default BackendHeader;
