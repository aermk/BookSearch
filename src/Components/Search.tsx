import React, { FC, useState } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarPropsType = {
  onSearch: (query: string) => void;
};

const SearchBar: FC<SearchBarPropsType> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
