import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRoutes } from "../../api/transportApi";
import type { TransportRoute } from "../../types";

export interface ItemsState {
  routes: TransportRoute[];
  loading: boolean;
  favourites: number[];
  error: string | null;
}

export const fetchRoutes = createAsyncThunk<TransportRoute[]>(
  "items/fetchRoutes",
  async () => {
    const data = await getRoutes();
    return data;
  }
);

const initialState: ItemsState = {
  routes: [],
  loading: false,
  favourites: [],
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    toggleFavourite: (state: ItemsState, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.favourites.indexOf(id);
      if (index === -1) {
        state.favourites.push(id);
      } else {
        state.favourites.splice(index, 1);
      }
      void AsyncStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    restoreFavourites: (state: ItemsState, action: PayloadAction<number[] | null>) => {
      state.favourites = action.payload ?? [];
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ItemsState>) => {
    builder
      .addCase(fetchRoutes.pending, (state: ItemsState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state: ItemsState, action: PayloadAction<TransportRoute[]>) => {
        state.routes = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoutes.rejected, (state: ItemsState, action: any) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Unable to load transport routes.";
      });
  },
});

export const { toggleFavourite, restoreFavourites } = itemsSlice.actions;
export default itemsSlice.reducer;
