// // import axios from "axios";
// // import "./App.css";
// // import { useEffect, useState } from "react";
// // // import CardItem from "./CardItem";

// // function App() {
// //   const [countriesData, setCountriesData] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [filterCountries, setFilterCountries] = useState([]);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetchCountries();
// //   }, []);

// //   const fetchCountries = async () => {
// //     try {
// //       const response = await axios.get("https://restcountries.com/v3.1/all");
// //       setCountriesData(response.data);
// //       setFilterCountries(response.data);
// //     } catch (error) {
// //       setError("Error fetching countries");
// //       console.error("API Error:", error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     const result = countriesData.filter((country) =>
// //       country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
// //     );
// //     setFilterCountries(result);
// //   }, [search, countriesData]);

// //   return (
// //     <div>
// //       <div className="searchCountries">
// //         <input
// //           type="text"
// //           placeholder="Search for a Countries.."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //       </div>

// //       <div className="countryGrid">
// //         {filterCountries.map((country, index) => (
// //           <div key={index} className="countryCard">
// //             <img
// //               src={country.flags.png}
// //               alt={`Flag of ${country.name.common}`}
// //               className="flagImage"
// //             />
// //             <p>{country.name.common}</p>
// //           </div>
// //         ))}
// //         {error && <p className="errorMessage">{error}</p>}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import axios from "axios";
// import "./App.css";
// import { useEffect, useState } from "react";

// function App() {
//   const [countriesData, setCountriesData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterCountries, setFilterCountries] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);  // To track loading state

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   // Retry function to make the API call a few times before giving up
//   const fetchCountries = async (retryCount = 3) => {
//     setLoading(true);
//     try {
//       const response = await axios.get("https://restcountries.com/v3.1/all");
//       setCountriesData(response.data);
//       setFilterCountries(response.data);
//       setError(""); // Clear error if request is successful
//     } catch (error) {
//       setLoading(false); // Stop loading
//       setError("Error fetching countries");
//       console.error("API Error:", error.message);

//       if (retryCount > 0) {
//         // Retry the request after 2 seconds if it fails
//         setTimeout(() => {
//           fetchCountries(retryCount - 1);
//         }, 2000);
//       }
//     }
//   };

//   useEffect(() => {
//     const result = countriesData.filter((country) =>
//       country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
//     );
//     setFilterCountries(result);
//   }, [search, countriesData]);

//   return (
//     <div>
//       <div className="searchCountries">
//         <input
//           type="text"
//           placeholder="Search for a Country..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="countryGrid">
//         {filterCountries.map((country, index) => (
//           <div key={index} className="countryCard">
//             <img
//               src={country.flags.png}
//               alt={`Flag of ${country.name.common}`}
//               className="flagImage"
//             />
//             <p>{country.name.common}</p>
//           </div>
//         ))}
//         {error && <p className="errorMessage">{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default App;

import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);  // To track loading state

  useEffect(() => {
    fetchCountries();
  }, []);

  // Retry function to make the API call a few times before giving up
  const fetchCountries = async (retryCount = 3) => {
    setLoading(true);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountriesData(response.data);
      setFilterCountries(response.data);
      setError(""); // Clear error if request is successful
      setLoading(false); // Stop loading when data is loaded
    } catch (error) {
      setLoading(false); // Stop loading
      setError("Error fetching countries");
      console.error("API Error:", error.message);

      if (retryCount > 0) {
        // Retry the request after 2 seconds if it fails
        setTimeout(() => {
          fetchCountries(retryCount - 1);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const result = countriesData.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
    );
    setFilterCountries(result);
  }, [search, countriesData]);

  return (
    <div>
      <div className="searchCountries">
        <input
          type="text"
          placeholder="Search for a Country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p>Loading countries...</p>} {/* Display loading message */}

      <div className="countryGrid">
        {filterCountries.map((country, index) => (
          <div key={index} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="flagImage"
            />
            <p>{country.name.common}</p>
          </div>
        ))}
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
}

export default App;
