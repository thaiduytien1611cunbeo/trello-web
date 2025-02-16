import Box from "@mui/material/Box";
import TrelloCard from "./Card/TrelloCard";

function ListCards({ cards }) {
  return (
    <Box
      sx={{
        p: "0 5px",
        m: "0 5px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - 
			${theme.spacing(5)} - 
			  ${theme.trello.columnHeaderHeight} -
			  ${theme.trello.columnFooterHeight})`,
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
          borderRadius: "5px !important",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#bfc2df",
        },
      }}
    >
      {cards?.map((card) => (
        <TrelloCard key={card._id} card={card} />
      ))}
    </Box>
  );
}

export default ListCards;
