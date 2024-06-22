import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { MdDashboard, MdOutlineHealthAndSafety, MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/healthcare.png'
import { IoHome } from "react-icons/io5";
import { GiBarracksTent } from "react-icons/gi";
import queryString from 'query-string';
import Proptypes from 'prop-types'
import { ContextApi, ContextProvider } from "../Providers/ContextProvider";
import { FaList, FaUserCircle } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { LoadingSpinner } from "./LoadingSpinner";

// profile menu component
const profileMenuItems = [

  {
    label: "My Profile",
    icon: UserCircleIcon,
    address: '/myProfile'
  },
  {
    label: "Dashboard",
    icon: MdDashboardCustomize,
    address: '/dashboard'
  },
];

function ProfileMenu({ handleSignOut, user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <div
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full p-3 hover:text-fourth"
        >
          <Avatar
            variant="circular"
            size="sm"
            className="border border-gray-900 p-0.5 hover:text-fourth"
            src={user?.photoURL || "https://i.ibb.co/Jjz3hM9/user.png"}
          />

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180 duration-500" : ""}`}
          />
        </div>
      </MenuHandler>
      <MenuList className="p-1">

        {user && <p className="p-2">{user.displayName}</p>}

        {profileMenuItems.map(({ label, icon, address }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <div
              key={label}
            >
              <Link
                to={address}
                key={label}
                className={`flex items-center gap-2 p-2 hover:bg-accent hover:text-white rounded  focus:bg-red-500/10 active:bg-red-500/10 border-none"
                  : ""
                  }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 `,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"

                >
                  {label}
                </Typography>

              </Link>

            </div>

          );
        })}

        {user && <Link onClick={handleSignOut} className="flex gap-2 items-center justify-center p-2 text-red-500 hover:bg-accent hover:text-white" size="sm" variant="text">
          <TbLogout2 /> Log out
        </Link>}

      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "2022",
    description:
      "During Covid-19 Our service towards people.",
  },
  {
    title: "2023",
    description:
      "Post Covid Service.",
  },
  {
    title: "2024",
    description:
      "Service on Heatwave.",
  },
];


function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Photo Gallary{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center bg-center bg-cover bg-[url('https://i.ibb.co/KbrjpHh/healthcare.png')] rounded-md"
          >
            {/* <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" /> */}
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Photo Gallary{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: IoHome,
    address: ""
  },
  {
    label: "Available Camps",
    icon: GiBarracksTent,
    address: "availableCamps",
  },

];

function NavList({setIsNavOpen}) {

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-black">
      {navListItems.map(({ label, icon, address }, key) => (
        <NavLink
          onClick={()=>setIsNavOpen(false)}
          to={address}
          key={label}
          className={({ isActive }) => isActive ? 'text-fourth font-extrabold p-2' : 'hover:text-fourth p-2 font-extrabold'}
        >
          <div className="flex items-center justify-center gap-2">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </div>
        </NavLink>
      ))}
      <NavListMenu />
    </ul>
  );
}

export function ComplexNavbar() {
  const { user, signOutfromLogin, loading } = useContext(ContextApi)

  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  const handleSignOut = () => {
    signOutfromLogin()
      .then((user) => {
        setUser(user)
        // setLoading(!null)
      }).catch((error) => {
        // console.log(error)
      });
  }

  return (
    <Navbar className="mx-auto w-full p-2 lg:pl-6 sticky top-0 z-50">
      <div className="relative mx-auto w-full flex items-center justify-between text-blue-gray-900">
        <Link
          to={'/'}
          className="mr-4 ml-2 cursor-pointer py-1.5 flex gap-2 md:text-2xl text-sm items-center font-extrabold"
        >
          <img className="w-8 h-8" src={logo} alt="" /> <span className="text-accent">Health Bridge</span>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="red"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <div className="flex items-center justify-center">
          {
            !user && <NavLink className={({ isActive }) => isActive ? 'text-fourth font-extrabold p-2' : 'hover:text-fourth p-2 font-extrabold'} to={'/joinUs'}>Join Us</NavLink>
          }

          {
            loading && <LoadingSpinner></LoadingSpinner>
          }

          {/* user Profile */}
          <ProfileMenu
            key={"profile"}
            handleSignOut={handleSignOut}
            user={user}
          />
        </div>


      </div>
      {/* sm screen navlist */}
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList setIsNavOpen={setIsNavOpen} />
      </Collapse>
    </Navbar>
  );
}

// renderItems.propTypes={
//   item: Proptypes.string.isRequired
// }