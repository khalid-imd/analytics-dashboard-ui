import { createContext, useContext, useEffect, useState } from "react";

const BoardContext = createContext(null);

const STORAGE_KEY = "kanban-board-data";

const initialBoard = {
  title: "Website redesign",
  columnOrder: [],
  columns: {},
  cards: {},
};

function loadBoard() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialBoard;
  } catch {
    return initialBoard;
  }
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function BoardProvider({ children }) {
  const [board, setBoard] = useState(loadBoard);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  const addColumn = (title) => {
    const id = generateId("col");
    setBoard((prev) => ({
      ...prev,
      columnOrder: [...prev.columnOrder, id],
      columns: {
        ...prev.columns,
        [id]: { id, title, cardIds: [] },
      },
    }));
  };

  const addCard = (columnId, title) => {
    const id = generateId("card");
    setBoard((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [id]: { id, title },
      },
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          cardIds: [...prev.columns[columnId].cardIds, id],
        },
      },
    }));
  };

  const updateCard = (cardId, updates) => {
    setBoard((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [cardId]: { ...prev.cards[cardId], ...updates },
      },
    }));
  };

  const deleteCard = (columnId, cardId) => {
    setBoard((prev) => {
      const { [cardId]: _, ...remainingCards } = prev.cards;
      return {
        ...prev,
        cards: remainingCards,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            cardIds: prev.columns[columnId].cardIds.filter(
              (id) => id !== cardId,
            ),
          },
        },
      };
    });
  };

  const moveCard = (cardId, fromColumnId, toColumnId, toIndex) => {
    setBoard((prev) => {
      const fromCardIds = prev.columns[fromColumnId].cardIds.filter(
        (id) => id !== cardId,
      );
      const toCardIds = [...prev.columns[toColumnId].cardIds];
      toCardIds.splice(toIndex, 0, cardId);

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [fromColumnId]: {
            ...prev.columns[fromColumnId],
            cardIds: fromCardIds,
          },
          [toColumnId]: { ...prev.columns[toColumnId], cardIds: toCardIds },
        },
      };
    });
  };

  const deleteColumn = (columnId) => {
    setBoard((prev) => {
      const { [columnId]: _, ...remainingColumns } = prev.columns;
      return {
        ...prev,
        columnOrder: prev.columnOrder.filter((id) => id !== columnId),
        columns: remainingColumns,
      };
    });
  };

  const value = {
    board,
    addColumn,
    addCard,
    updateCard,
    deleteCard,
    moveCard,
    deleteColumn,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard harus dipakai di dalam BoardProvider");
  }
  return context;
}
