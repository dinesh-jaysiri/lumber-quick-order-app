import React, { useReducer, useContext, createContext, useEffect } from "react";
import { LevelProvider } from "../classes/LevelProvider";
import { useData } from "./Data";

const LevelsContext = createContext();

const levelReducer = (state, action) => {
  switch (action.type) {
    case "ADDALL":
      return action.data;
    case "SELECTED":
      return [...state].map((n) => {
        if (
          n.level >= JSON.parse(action.selectedObj).level &&
          !(n.id === JSON.parse(action.selectedObj).id)
        )
          return { ...n, selected: false };

        if (!(n.id === JSON.parse(action.selectedObj).id)) return n;

        return { ...n, selected: true };
      });
    default:
      return [...state];
  }
};

export const LevelsProvider = ({ children }) => {
  const { levels } = useData();
  const [levelState, levelsDispatch] = useReducer(levelReducer, [levels]);

  const levelsProvider = new LevelProvider(levelState);

  useEffect(() => {}, [levels, levelState]);

  const resetLevels = () => {
    levelsDispatch({ type: "ADDALL", data: levels });
  };


  return (
    <LevelsContext.Provider
      value={{
        levelState,
        levelsDispatch,
        levelsProvider,
        resetLevels,
      }}
    >
      {children}
    </LevelsContext.Provider>
  );
};

export const useLevels = () => useContext(LevelsContext);
