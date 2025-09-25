import 'little-state-machine';
import { GlobalState } from 'little-state-machine';

export interface HeaderState {
    company_id?: number | undefined
}

declare module 'little-state-machine' {
    export interface GlobalState {
        HeaderState?: HeaderState
    }
}
const defaultState: GlobalState = {
};

export function clearStateAction() {
    return defaultState;
}

export function updateAccouraCompany(state: any, payload: any) {
    return {
        ...state,
        HeaderState: {
            ...state.HeaderState,
            ...payload,
        },
    };
}
