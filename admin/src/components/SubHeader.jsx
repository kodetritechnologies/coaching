import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

function SubHeader({
  searchFilter = true,
  addButton = true,
  HeaderNavigation = [],
  fetchData,
}) {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.trim() !== "") {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
      fetchData();
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleReset = async () => {
    setSearch("");
    setSearchParams({});
  };

  useEffect(() => {
    setSearch(searchParams.get("search"));
  }, [searchParams]);

  return (
    <div className="subheader">
      <div className="subhLeft">
        {HeaderNavigation.length > 0 && (
          <div
            id="dropdown"
            className="subheaderDropdown"
            onClick={() => setDropdown(!dropdown)}
          >
            <div>{HeaderNavigation[0]?.name}</div> <MdArrowDropDown />
            <ul
              className="dropdownList"
              style={{ display: `${dropdown ? "inline-block" : "none"}` }}
            >
              {HeaderNavigation?.map((nav, index) => (
                <NavLink to={nav?.link} key={index}>
                  <li>
                    {nav?.icon}
                    {nav?.name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
        {addButton && (
          <button
            onClick={() => {
              navigate(`${HeaderNavigation[1].link}`);
            }}
          >
            Add New
          </button>
        )}
      </div>
      {searchFilter && (
        <div className="subright">
          <input
            className="subheaderSearch"
            type="text"
            value={search}
            placeholder="Search..."
            name="search"
            onChange={handleChange}
          />

          <div className="searchButton">
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubHeader;
