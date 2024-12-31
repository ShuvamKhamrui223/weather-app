import logo from "/favicon.png"
const Header = () => {
  return (
    <header className="py-4 px-2 md:px-8 max-h-20 glass rounded-2xl flex justify-between items-center">
      <img
        src={logo}
        loading="lazy"
        alt="logo"
        className="size-8 drop-shadow-xl "
      />
    </header>
  );
};

export default Header;
