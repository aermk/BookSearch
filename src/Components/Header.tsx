import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../useAuth";

type HeaderProps = {
  averageDuration: number;
};

const Header: React.FC<HeaderProps> = ({ averageDuration }) => {
  const { isAuthenticated, username, logout } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {isAuthenticated && (
            <Typography variant="h6">
              {`Hello, ${username}`} <br />
              {averageDuration > 0 && (
                <Typography variant="body2">
                  Average search duration: {averageDuration.toFixed(2)} ms
                </Typography>
              )}
            </Typography>
          )}
        </Box>
        {isAuthenticated && (
          <Button color="inherit" onClick={logout}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
