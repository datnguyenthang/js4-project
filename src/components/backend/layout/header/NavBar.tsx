import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {

    return (
            <div className="text-sm lg:flex-grow">
                <Link to="/backend/news" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    News
                </Link>
                <Link to="/backend/category" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Category
                </Link>
                <Link to="/backend/user" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                    User
                </Link>
            </div>
    );
};

export default NavBar;
