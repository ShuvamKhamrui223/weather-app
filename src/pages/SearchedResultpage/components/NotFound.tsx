import { PiListMagnifyingGlassBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="content-area flex flex-col items-center justify-center">
      <PiListMagnifyingGlassBold className="text-9xl text-gray-500" />
      <p className="text-xl first-letter:uppercase">no city found</p>
      <Link to={"/"}>
        <button className="mt-4 btn bg-gray-200 text-gray-900 hover:bg-gray-200/80 capitalize">
          back to home
        </button>
      </Link>
    </section>
  );
};

export default NotFound;
