// import { serverRespondList, serverRespondListFirstPage } from "./mocks/mock";
import {
  ApiBook,
  // ApiBooksResponse,
  FiltredBook,
  FiltredBookWithNumFound,
} from "./types";

export async function fetchList(
  query: string,
  currentPage: number,
  resultsPerPage: number
): Promise<FiltredBookWithNumFound> {
  // Server fetch
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${query}&page=${currentPage}&limit=${resultsPerPage}`
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  const filteredBooksList: FiltredBook[] = data.docs.map((book: ApiBook) => ({
    author: book.author_name?.[0] || "Unknown author",
    title: book.title,
    editionCount: book.edition_count,
    firstPublishYear: book.first_publish_year || "N/A",
  }));

  return {
    numFound: data.numFound,
    docs: filteredBooksList,
  };

  //MOCK fetch

  // const dataMock: ApiBooksResponse = serverRespondListFirstPage;

  // const filteredBooksList: FiltredBook[] = dataMock.docs.map(
  //   (book: ApiBook) => ({
  //     author: book.author_name?.[0] || "Unknown author",
  //     title: book.title,
  //     editionCount: book.edition_count,
  //     firstPublishYear: book.first_publish_year || "N/A",
  //   })
  // );

  // return {
  //   numFound: dataMock.numFound,
  //   docs: filteredBooksList,
  // };
}
