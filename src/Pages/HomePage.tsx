import React from "react";
import Search from "../Components/Search";
import Header from "../Components/Header";
import { Container, Box } from "@mui/material";
import { HomePageProps } from "../types";
import BookList from "../Components/BookList";

const HomePage: React.FC<HomePageProps> = ({
  onSearch,
  averageDuration,
  bookListOnPage,
  loading,
  currentPage,
  onPageChange,
  numAllBooks,
  query,
}) => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Header averageDuration={averageDuration} />
      </Box>
      <Box my={2}>
        <Search onSearch={onSearch} />
      </Box>
      <Box my={2}>
        <BookList
          bookListOnPage={bookListOnPage}
          loading={loading}
          currentPage={currentPage}
          onPageChange={onPageChange}
          numAllBooks={numAllBooks}
          query={query}
        />
      </Box>
    </Container>
  );
};

export default HomePage;
