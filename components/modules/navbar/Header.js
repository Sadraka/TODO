"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useScrollTrigger } from "@mui/material";
import { Window } from "@mui/icons-material";

const unAuthPages = ["Login"];
const AuthPages = ["Todos", "Add Todo", "Profile", "Logout"];
const authSetting = ["Profile", "Logout"];
const unauthSetting = ["Login"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { data, status } = useSession();

  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    const childNode = e.target.textContent
      ? e.target.textContent
      : !e.target.textContent
      ? e.target.childNodes[0].attributes[5].nodeValue
      : null;
    // let childNode;
    // if (e.target.textContent) {
    //   childNode = e.target.textContent;
    // } else if (
    //   !e.target.textContent &&
    //   e.target.childNodes[0].attributes[5].nodeValue
    // ) {
    //   childNode = e.target.childNodes[0].attributes[5].nodeValue;
    // } else {
    //   childNode = "";
    // }
    //to select li ==> li and Typography are not same attributes

    switch (childNode) {
      case "Login":
        router.push("/login");
        return;
      case "Logout":
        signOut({
          redirect: "/",
        });
        return;
      case "Profile":
        router.push("/profile");
        return;
      case "Todos":
        router.push("/todos");
        return;
      case "Add Todo":
        router.push("/");
        return;
    }
  };

  const handleCloseUserMenu = (e) => {
    //for close menu
    setAnchorElUser(null);

    switch (e.target.textContent) {
      case "Login":
        router.push("/login");
        return;
      case "Logout":
        signOut({
          redirect: "/",
        });
        return;
      case "Profile":
        router.push("/profile");
        return;
    }
  };
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }));
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {status === "authenticated"
                ? AuthPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {page === "Todos" && <FormatListBulletedIcon />}
                        {page === "Add Todo" && <PlaylistAddIcon />}
                        {page === "Profile" && <ManageAccountsIcon />}
                        {page === "Logout" && <LogoutIcon />}
                        <Typography
                          textAlign="center"
                          sx={{ paddingLeft: "15px", fontWeight: "500" }}
                        >
                          {page}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))
                : unAuthPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      {page === "Login" && <LockOpenIcon />}
                      <Typography
                        textAlign="center"
                        sx={{ paddingLeft: "15px", fontWeight: "500" }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Todo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                minWidth: "80vw",
              }}
            >
              {status === "authenticated"
                ? AuthPages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ marginLeft: "50px" }}
                    >
                      {page === "Todos" && (
                        <LightTooltip title={page} id="salam">
                          <FormatListBulletedIcon />
                        </LightTooltip>
                      )}
                      {page === "Add Todo" && (
                        <LightTooltip title={page}>
                          <PlaylistAddIcon />
                        </LightTooltip>
                      )}
                      {page === "Profile" && (
                        <LightTooltip title={page}>
                          <ManageAccountsIcon />
                        </LightTooltip>
                      )}
                      {page === "Logout" && (
                        <LightTooltip title={page}>
                          <LogoutIcon />
                        </LightTooltip>
                      )}
                      <Typography textAlign="center"></Typography>
                    </MenuItem>
                  ))
                : unAuthPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <LightTooltip title={page}>
                        <LockOpenIcon />
                      </LightTooltip>
                    </MenuItem>
                  ))}
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  <Avatar
                    sx={{ bgcolor: "transparent" }}
                    alt="S"
                    src={status === "authenticated" ? data.user.image : " "}
                  >
                    <PersonIcon />
                  </Avatar>
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {status === "authenticated"
                ? authSetting.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))
                : unauthSetting.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
