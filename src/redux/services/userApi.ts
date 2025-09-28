import { usersEP } from "@/config/endpoints";
import { baseApi } from "./baseApi";

// Interfaz para Usuario (coincide con la entidad User del backend)
export interface TUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

// Interfaz para crear usuario
export interface TCreateUserBody {
  name: string;
  email: string;
  password: string;
  role?: string;
  isActive?: boolean;
}

// Interfaz para actualizar usuario
export interface TUpdateUserBody {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
}
export interface ILogin {
  email: string;
  password: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoints modernos con interfaz simplificada
    getAllUsers: builder.query({
      query: () => usersEP.getall,
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: ({ id }: { id: string }) => `${usersEP.getById}${id}`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (newUser: TCreateUserBody) => ({
        url: usersEP.post,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }: { id: number; data: TUpdateUserBody }) => ({
        url: `${usersEP.put}${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `${usersEP.delete}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    
    // getMe: builder.query({
    //   query: () => usersEP.getMe,
    //   providesTags: ["Users"],
    // }),
    login: builder.mutation({
      query: (user: ILogin) => ({
        url: usersEP.login,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: usersEP.logout,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
    // resetPassword: builder.mutation({
    //   query: (data: { token: string; newPassword: string }) => ({
    //     url: `${usersEP.putResetPassword}${data.token}`,
    //     method: "PUT",
    //     body: { newPassword: data.newPassword },
    //   }),
    //   invalidatesTags: ["Users"],
    // }),
    // forgotPassword: builder.mutation({
    //   query: (data: { email: string }) => ({
    //     url: usersEP.postForgotPassword,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Users"],
    // }),
    // updatePassword: builder.mutation({
    //   query: (password: Partial<TUsuarioBody>) => ({
    //     url: usersEP.updatePassword,
    //     method: "PUT",
    //     body: password,
    //   }),
    //   invalidatesTags: ["Users"],
    // }),
    // getValidarToken: builder.query({
    //   query: ({ resetToken }: { resetToken: string }) => `${usersEP.getValidateToken}${resetToken}`,
    // }),
  }),
  overrideExisting: false,
});

export const {
  // Hooks modernos
  useGetAllUsersQuery,
  useGetUserByIdQuery: useGetUserByIdQueryNew,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  // useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  // useResetPasswordMutation,
  // useForgotPasswordMutation,
  // useUpdatePasswordMutation,
  // useGetValidarTokenQuery,
} = userApi;
