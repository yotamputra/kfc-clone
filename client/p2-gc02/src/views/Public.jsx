import { useEffect, useState } from "react";
import Card from "../components/CardCuisine";
import SearchBar from "../components/SearchBar";
import axios from "../config/axiosInstance";
import { showErrorAlert } from "../components/Error";
import showLoading from "../components/Loading";
import Swal from "sweetalert2";

function Public() {
  const [cuisine, setCuisine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCuisine, setFilteredCuisine] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(8);

  async function fetchCuisine() {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "get",
        url: "/pub",
        params: {
          filter,
          sort,
          search,
          page: {
            number: currentPage,
            size: dataPerPage,
          },
        },
      });

      setCuisine(data.data);
      setFilteredCuisine(data.data);
      setTotalPages(data.totalPage)
    } catch (err) {
      console.log(err, "<---");
      showErrorAlert(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setSearch('')
    setCurrentPage(1);
  }, [filter, sort]);

  useEffect(() => {
    fetchCuisine();
  }, [filter, sort, currentPage, search]);

  useEffect(() => {
    if (search === "") {
      setFilteredCuisine(cuisine);
    } else {
      setFilteredCuisine(
        cuisine.filter((el) =>
          el.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, cuisine]);

  if (isLoading) {
    showLoading();
  } else {
    Swal.close();
  }

  // console.log(cuisine, " <--");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 font-sans">
      <main className="p-6">
        <SearchBar onSearch={setSearch} onFilter={setFilter} onSort={setSort} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredCuisine.map((data) => {
            return <Card key={data.id} data={data} />;
          })}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-l"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-r"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default Public;
