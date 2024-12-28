// import { BiChevronDown } from "react-icons/bi";

const Header = () => {
  // const themes = [
  //   "winter",
  //   "dark",
  //   "cmyk",
  //   "luxury",
  //   "fantasy",
  //   "dracula",
  //   "night",
  // ];

  return (
    <header className="py-4 px-2 md:px-8 max-h-20 glass rounded-2xl flex justify-between items-center">
      <img
        src="./favicon.png"
        loading="lazy"
        alt="logo"
        className="size-8 drop-shadow-xl "
      />
      {/* <div className="dropdown ">
        <button className="btn capitalize">
          theme <BiChevronDown />
        </button>
        <ul id="" className="dropdown-content theme-controller rounded-box">
          {themes.map((theme) => (
            <li key={theme} className="flex items-center">
              <input
                type="radio"
                className="theme-controller btn-sm btn-block btn-ghost"
                name="theme-dropdown"
                aria-label={theme}
                value={theme}
              />
              <label htmlFor={"theme-dropdown"} className="">
                {theme}
              </label>
            </li>
          ))}
        </ul>
      </div> */}
    </header>
  );
};

export default Header;
