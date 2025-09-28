import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCoupon, TCouponFilters } from "../services/couponApi";

type TCouponState = {
  selectedCoupon: TCoupon | null;
  filters: TCouponFilters;
  isModalOpen: boolean;
  modalMode: 'create' | 'edit' | 'view' | null;
};

const initialState: TCouponState = {
  selectedCoupon: null,
  filters: {},
  isModalOpen: false,
  modalMode: null,
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    // Seleccionar cupón
    selectCoupon: (state, action: PayloadAction<TCoupon | null>) => {
      state.selectedCoupon = action.payload;
    },

    // Actualizar filtros
    setFilters: (state, action: PayloadAction<TCouponFilters>) => {
      state.filters = action.payload;
    },

    // Limpiar filtros
    clearFilters: (state) => {
      state.filters = {};
    },

    // Controlar modal
    openModal: (state, action: PayloadAction<'create' | 'edit' | 'view'>) => {
      state.isModalOpen = true;
      state.modalMode = action.payload;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalMode = null;
      state.selectedCoupon = null;
    },

    // Limpiar estado
    clearCouponState: (state) => {
      state.selectedCoupon = null;
      state.filters = {};
      state.isModalOpen = false;
      state.modalMode = null;
    },
  },
});

export const {
  selectCoupon,
  setFilters,
  clearFilters,
  openModal,
  closeModal,
  clearCouponState,
} = couponSlice.actions;

export default couponSlice.reducer;
