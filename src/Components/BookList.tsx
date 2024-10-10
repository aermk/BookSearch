import { FC } from "react";
// import Pagination from "@mui/material/Pagination";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";
import { BookListProps } from "../types";
// import Pagination from "rc-pagination";
// import "rc-pagination/assets/index.css";

const BookList: FC<BookListProps> = ({
  bookListOnPage,
  loading,
  //   currentPage,
  //   onPageChange,
  //   numAllBooks,
}) => {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return bookListOnPage.length ? (
    <Box p={3}>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Author
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          Title
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          Edition Count
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          First Publish Year
        </Typography>
      </Box>
      {bookListOnPage.map((book, index) => (
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mb: 2,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
          key={index}
        >
          <Typography>{book.author}</Typography>
          <Typography>{book.title}</Typography>
          <Typography>{book.editionCount}</Typography>
          <Typography>{book.firstPublishYear}</Typography>
        </Paper>
      ))}
      {/* <Pagination
        pageSize={10}
        onChange={onPageChange}
        current={currentPage}
        total={numAllBooks}
      /> */}
      {/* <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(numAllBooks / 10)}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
        />
      </Box> */}
    </Box>
  ) : (
    <Typography variant="h6" textAlign="center" mt={3}>
      No books found
    </Typography>
  );
};

export default BookList;
