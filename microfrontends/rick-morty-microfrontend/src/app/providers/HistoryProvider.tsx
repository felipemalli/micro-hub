import React, { createContext, useContext } from "react";
import { History } from "history";

interface HistoryContextType {
	history?: History;
}

const HistoryContext = createContext<HistoryContextType>({});

export const useHistory = () => {
	const context = useContext(HistoryContext);
	return context.history;
};

export const HistoryProvider: React.FC<{
	history?: History;
	children: React.ReactNode;
}> = ({ history, children }) => {
	return (
		<HistoryContext.Provider value={{ history }}>
			{children}
		</HistoryContext.Provider>
	);
};
