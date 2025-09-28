import { couponsEP } from "@/config/endpoints";
import { baseApi } from "./baseApi";

// Interfaz para Cupón (basada en la estructura real del backend)
export interface TCoupon {
  id: string;
  code: string;
  description: string;
  value: number; // El backend envía como number
  expirationDate: string;
  state: 'activo' | 'inactivo' | 'canjeado';
  created_at: string;
  updated_at: string;
  delete_at: string | null;
  redeemedAt: string | null;
}

// Interfaz para crear/actualizar cupón
export interface TCouponBody {
  code: string;
  description: string;
  value: number;
  expirationDate: string;
  state: 'activo' | 'inactivo' | 'canjeado';
}

// Interfaz para filtros de búsqueda
export interface TCouponFilters {
  state?: 'activo' | 'inactivo' | 'canjeado';
  fechaDesde?: string;
  fechaHasta?: string;
  valorMinimo?: number;
  valorMaximo?: number;
}

// Interfaz para respuesta de la API
export interface TCouponResponse {
  success: boolean;
  message: string;
  data?: TCoupon | TCoupon[];
}

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Obtener todos los cupones
    getCoupons: builder.query<TCoupon[], void>({
      query: () => couponsEP.getall,
      providesTags: ["Coupons"],
    }),

    // Obtener cupón por ID
    getCouponById: builder.query<{ success: boolean; data: TCoupon }, { id: string }>({
      query: ({ id }) => `${couponsEP.getById}${id}`,
      providesTags: ["Coupons"],
    }),

    // Obtener cupones por estado
    getCouponsByStatus: builder.query<{ success: boolean; data: TCoupon[] }, { status: 'activo' | 'inactivo' }>({
      query: ({ status }) => `${couponsEP.getByStatus}${status}`,
      providesTags: ["Coupons"],
    }),

    // Obtener cupones por rango de fechas
    getCouponsByDateRange: builder.query<{ success: boolean; data: TCoupon[] }, { fechaDesde: string; fechaHasta: string }>({
      query: ({ fechaDesde, fechaHasta }) => `${couponsEP.getByDateRange}?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`,
      providesTags: ["Coupons"],
    }),

    // Crear nuevo cupón
    createCoupon: builder.mutation<TCouponResponse, TCouponBody>({
      query: (newCoupon) => ({
        url: couponsEP.post,
        method: "POST",
        body: newCoupon,
      }),
      invalidatesTags: ["Coupons"],
    }),

    // Actualizar cupón existente
    updateCoupon: builder.mutation<TCouponResponse, { id: string; data: Partial<TCouponBody> }>({
      query: ({ id, data }) => ({
        url: `${couponsEP.put}${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),

    // Eliminar cupón (eliminación física)
    deleteCoupon: builder.mutation<TCouponResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${couponsEP.delete}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),

    // Desactivar cupón (eliminación lógica)
    deactivateCoupon: builder.mutation<TCouponResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${couponsEP.put}${id}`,
        method: "PUT",
        body: { state: 'inactivo' },
      }),
      invalidatesTags: ["Coupons"],
    }),

    // Activar cupón
    activateCoupon: builder.mutation<TCouponResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${couponsEP.put}${id}`,
        method: "PUT",
        body: { state: 'activo' },
      }),
      invalidatesTags: ["Coupons"],
    }),

    // Canjear cupón
    redeemCoupon: builder.mutation<TCouponResponse, { code: string }>({
      query: ({ code }) => ({
        url: couponsEP.redeem,
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useGetCouponsByStatusQuery,
  useGetCouponsByDateRangeQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useDeactivateCouponMutation,
  useActivateCouponMutation,
  useRedeemCouponMutation,
} = couponApi;
