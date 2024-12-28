import { FormEvent } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Form, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("q");
    // if (!searchTerm?.toString().length > 3) return;

    navigate(`city/?q=${searchTerm}`);
  };
  return (
    <Form
      action="/city"
      method="get"
      onSubmit={handleSearchSubmit}
      className="w-full flex items-center p-3 bg-gray-950/40 mt-4 rounded-full"
    >
      <input
        required
        inputMode="numeric"
        type="text"
        name="q"
        min={3}
        placeholder="search cities"
        className="flex-1 h-full px-2 bg-transparent text-gray-200 outline-none placeholder:capitalize"
      />
      <button className="btn btn-sm btn-circle">
        <FaMagnifyingGlass className="text-base" />
      </button>
    </Form>
  );
};

export default Searchbar;
