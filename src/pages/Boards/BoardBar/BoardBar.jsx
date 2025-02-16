import React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Tooltip } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatter";

const MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  ".MuiChip-label": {
    paddingTop: "2px",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: 2,
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={MENU_STYLES}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { color: "white" },
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: "10px",
            ".MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "#a4b0be" },
            },
          }}
        >
          <Tooltip title="Duy Tien">
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
          </Tooltip>
          <Tooltip title="Duy Tien">
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
          </Tooltip>
          <Tooltip title="Duy Tien">
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
          </Tooltip>
          <Tooltip title="Duy Tien">
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
          </Tooltip>
          <Tooltip title="Duy Tien">
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
          </Tooltip>
          <Tooltip title="Duy Tien">
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
