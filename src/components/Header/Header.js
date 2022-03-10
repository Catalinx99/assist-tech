import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import logo from "./icon.png";

import "./HeaderCss.css";
import {
  headerTabsLabel,
  userRoleLabel
} from '../../Common/components/constants'

const Header = () => {
  const [userRole, setUserRole] = useState('admin');
  const [headerTabs, setHeaderTabs] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const getHeaderTabs = () => {
    switch (userRole) {
      case userRoleLabel.adminType:
        return (
          setHeaderTabs(headerTabsLabel.admin)
        );
      case userRoleLabel.officeAdmType:
        return (
          setHeaderTabs(headerTabsLabel.officeAdministrator)
        );
      case userRoleLabel.employeeType:
        return (
          setHeaderTabs(headerTabsLabel.employee)
        );
      default:
        return;
    }
  }

  useEffect(() => {
    getHeaderTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <img src={logo} alt="logo" className="logoPanel" />
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className="iconButton"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {headerTabs.map((tab, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <a href={tab.link}>
                    {tab.name}
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* full menu */}
          <Box sx={{ flexGrow: 3, display: { xs: "none", md: "flex" } }}>
            {headerTabs.map((tab, index) => (
              <a
                href={tab.link}
                key={index}
                className="navStyle"
              >
                {tab.name}
              </a>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
