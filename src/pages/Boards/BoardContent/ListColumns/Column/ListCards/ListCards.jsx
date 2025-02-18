import Box from "@mui/material/Box";
import TrelloCard from "./Card/TrelloCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListCards({ cards }) {
  return (
    <SortableContext
      items={cards?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
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
    </SortableContext>
  );
}

export default ListCards;
