// 상품관련 slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  return await productData();
});

const productSlice = createSlice({
  name: "product",
  initialState: { items: {}, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.status = "failed";
        });
  },
});

export default productSlice.reducer;
