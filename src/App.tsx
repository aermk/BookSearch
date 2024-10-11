import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import { useAuth } from "./useAuth";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import { useEffect, useState } from "react";
import { FiltredBook } from "./types";
import { fetchList } from "./api";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  const resultsPerPage = 10;
  const debounceDelay = 300;

  const [query, setQuery] = useState("");
  const [bookListOnPage, setBookListOnPage] = useState<FiltredBook[]>([]);
  const [numAllBooks, setNumAllBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [averageDuration, setAverageDuration] = useState(0);
  const [, setDurations] = useState<number[]>([]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 3) {
        setLoading(true);
        const startTime = performance.now();

        try {
          const filteredBooks = await fetchList(
            query,
            currentPage,
            resultsPerPage
          );

          setBookListOnPage(filteredBooks.docs);
          setNumAllBooks(filteredBooks.numFound);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (
            error.name === "TypeError" &&
            error.message === "Failed to fetch"
          ) {
            console.error("Network error or server is down", error);
            alert(
              "Network error or server is currently unavailable. Please try again later."
            );
          }
        } finally {
          const endTime = performance.now();
          const duration = endTime - startTime;

          setDurations((prevDurations) => {
            const updatedDurations = [...prevDurations, duration];

            const totalDuration = updatedDurations.reduce((a, b) => a + b, 0);
            setAverageDuration(totalDuration / updatedDurations.length);

            return updatedDurations;
          });

          setLoading(false);
        }
      }
    }, debounceDelay);

    return () => clearTimeout(delayDebounceFn);
  }, [query, currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <HomePage
              onSearch={handleSearch}
              averageDuration={averageDuration}
              bookListOnPage={bookListOnPage}
              loading={loading}
              currentPage={currentPage}
              onPageChange={handlePageClick}
              numAllBooks={numAllBooks}
              query={query}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
