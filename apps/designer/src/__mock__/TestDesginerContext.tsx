import React, { createContext, useContext, useReducer } from 'react';

interface Element {
    id: string;
    htmlTag: string;
    textContent: string | null;
    className: string;
    attributes: Record<string, string>;
}

interface DesignerState {
    elements: Element[];
    activeElementID: string;
}

type Action =
    | { type: 'SET_DESIGNER_STATE'; payload: DesignerState }
    | { type: 'ADD_ELEMENT'; payload: Element }
    | { type: 'REMOVE_ELEMENT'; payload: string }
    | { type: 'UPDATE_ELEMENT'; payload: Element };

const initialState: DesignerState = {
    elements: [],
    activeElementID: '',
};

const DesignerContext = createContext<{
    state: DesignerState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

const designerReducer = (state: DesignerState, action: Action): DesignerState => {
    switch (action.type) {
        case 'SET_DESIGNER_STATE':
            return { ...state, ...action.payload };
        case 'ADD_ELEMENT':
            const newElement = action.payload.htmlTag === 'img'
                ? { ...action.payload, attributes: { ...action.payload.attributes, src: 'https://via.placeholder.com/150' } }
            : action.payload.htmlTag === 'div'
                ? { ...action.payload, className: 'h-[100px] w-[100%] bg-blue-100' }
                : action.payload;
            return { ...state, elements: [...state.elements, newElement] };
        case 'REMOVE_ELEMENT':
            return { ...state, elements: state.elements.filter(el => el.id !== action.payload) };
        case 'UPDATE_ELEMENT':
            return {
                ...state,
                elements: state.elements.map(el => el.id === action.payload.id ? action.payload : el),
            };
        default:
            return state;
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const DesignerProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(designerReducer, initialState);

    return (
        <DesignerContext.Provider value={{ state, dispatch }}>
            {children}
        </DesignerContext.Provider>
    );
};

export const useDesignerContext = () => useContext(DesignerContext);