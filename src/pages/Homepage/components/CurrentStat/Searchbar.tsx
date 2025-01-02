// internal imports
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

// icons
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiLoader } from "react-icons/bi";

// types
import { ISearched } from "../../../../types/API_geocoding";

// custom hooks
import { useDebounce } from "../../../../hooks/useDebounce";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchquery, setSearchQuery] = useState<string>("");
  const debouncedValue = useDebounce(searchquery, 500);
  const { isLoading, data: suggestions } = useQuery({
    queryKey: ["search-suggestions", searchquery],
    queryFn: async (): Promise<ISearched[] | undefined> => {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${debouncedValue}&limit=5&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      );
      return response.json();
    },
    enabled: searchquery.length > 2,
  });
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  // };

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
        inputMode="text"
        type="text"
        name="q"
        list="searchquery"
        value={searchquery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        min={3}
        placeholder="search cities"
        className="flex-1 py-2 px-2 bg-none bg-transparent text-gray-200 outline-none placeholder:capitalize"
      />
      <datalist id="searchquery" className="p-2 w-full">
        {isLoading && (
          <div className="animate-spin">
            <BiLoader />
          </div>
        )}
        {suggestions?.length === 0 && "no match found"}
        {suggestions?.length &&
          suggestions?.length > 0 &&
          suggestions?.map((suggestion) => (
            <option key={suggestion.name} className="flex flex-col gap-1">
              <strong className="text-lg text-gray-400 mr-2">
                {suggestion.name}
              </strong>
            </option>
          ))}
      </datalist>
      <button className="btn btn-sm btn-circle">
        <FaMagnifyingGlass className="text-base" />
      </button>
    </Form>
  );
};

export default Searchbar;
