// import { useState, useEffect } from "react";

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// // Usage in component
// function SearchComponent() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   // This effect runs only when debouncedSearchTerm changes
//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       // Make API call here
//       console.log("Searching for:", debouncedSearchTerm);
//     }
//   }, [debouncedSearchTerm]);

//   return (
//     <input
//       type="text"
//       placeholder="Search..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//   );
// }
