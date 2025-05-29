import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="">
      <nav className="flex items-center justify-between p-4">
        <NavLink to={"/"}>
          <img className="w-36 cursor-pointer" src={assets.logo} alt="" />
        </NavLink>
        <ul className="md:flex hidden items-center gap-4">
          <NavLink
            className="nav-link flex flex-col items-center gap-1"
            to={"/"}
          >
            <p className="cursor-pointer">HOME</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 " />
          </NavLink>
          <NavLink
            className="nav-link flex flex-col items-center gap-1"
            to={"/navlink-1"}
          >
            <p className="cursor-pointer">Navlink-1</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 " />
          </NavLink>
          <NavLink
            className="nav-link flex flex-col items-center gap-1"
            to={"/navlink-2"}
          >
            <p className="cursor-pointer">Navlink-2</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 " />
          </NavLink>
          <NavLink
            className="nav-link flex flex-col items-center gap-1"
            to={"/navlink-3"}
          >
            <p className="cursor-pointer">Navlink-3</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 " />
          </NavLink>
        </ul>
        <div className="buttons items-center gap-4 flex">
            <img
              className="h-6 sm:block hidden cursor-pointer"
              src={assets.search_icon}
              alt=""
            />
          <div className="relative group">
            <img
              className="h-6 sm:block hidden cursor-pointer"
              src={assets.profile_icon}
              alt=""
            />
            <div className="absolute hidden group-hover:block dropdown-menu right-0 py-4">
              <div className="flex flex-col bg-slate-200 w-36 py-3 px-5 gap-2 rounded text-gray-500">
                <p className="cursor-pointer hover:text-gray-950">My Profile</p>
                <NavLink to={"/navlink-4"}>
                  <p className="cursor-pointer hover:text-gray-950">
                    My Orders
                  </p>
                </NavLink>
                <NavLink to={"/navlink-5"}>
                  <p className="cursor-pointer hover:text-gray-950">Log In</p>
                </NavLink>
              </div>
            </div>
          </div>
          <NavLink className="relative" to={"/navlink-6"}>
            <img
              className="h-6 sm:block hidden cursor-pointer"
              src={assets.cart_icon}
              alt=""
            />
            <p className="absolute -right-1 -bottom-1 border rounded-full size-4.5 bg-black text-white flex items-center justify-center text-xs">
              0
            </p>
          </NavLink>
          <img
            className="h-6 md:hidden block cursor-pointer"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
