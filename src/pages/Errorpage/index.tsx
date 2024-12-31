import { MdOutlineError } from "react-icons/md";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <MdOutlineError className="text-9xl" />
      <h2 className="text-4xl first-letter:uppercase">
        opps, this page doesn't exists
      </h2>
      <Link to={"/"}>
        <button className="btn btn-neutral capitalize">back to home</button>
      </Link>
    </div>
  );
};

export default Errorpage;
