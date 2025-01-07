function SearchBar({ onSearch, onFilter, onSort }) {
  return (
    <div className="flex justify-between gap-4 mb-6">
      <input
        type="text"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        placeholder="Search"
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-2/3 lg:w-2/5 mb-4 sm:mb-0 flex-grow"
      />

      <select
        onChange={(e) => {
          onFilter(e.target.value);
        }}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/4 lg:w-1/5 mb-4 sm:mb-0"
      >
        <option value="">Filter</option>
        <option value="1">Chicken</option>
        <option value="2">Soup</option>
      </select>

      <select
        onChange={(e) => {
          onSort(e.target.value);
        }}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/4 lg:w-1/5"
      >
        <option value="">Sort By</option>
        <option value="createdAt">Oldest</option>
        <option value="-createdAt">Newest</option>
        <option value="price">Price ↓ </option>
        <option value="-price">Price ↑</option>
      </select>
    </div>
  );
}

export default SearchBar;
