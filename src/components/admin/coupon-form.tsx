"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useGetCouponByIdQuery,
  type TCoupon,
} from "@/redux/services/couponApi";
import { FormInput } from "@/components/ui/form-input";

// Schema de validación con Zod
const couponSchema = z.object({
  code: z
    .string()
    .min(1, "El código del cupón es requerido")
    .min(3, "El código debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  value: z.string().min(1, "El valor es requerido"),
  // .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
  //   message: "El valor debe ser un número positivo",
  // }),
  expirationDate: z.string().min(1, "La fecha de expiración es requerida"),
  // .refine(
  //   (date) => {
  //     const selectedDate = new Date(date);
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     return selectedDate >= today;
  //   },
  //   {
  //     message: "La fecha de expiración debe ser hoy o en el futuro",
  //   }
  // ),
  state: z.enum(["activo", "inactivo"]),
});

type CouponFormData = z.infer<typeof couponSchema>;

interface CouponFormProps {
  mode: "create" | "edit";
  initialData?: Partial<TCoupon>;
  couponId?: string;
}

export function CouponForm({ mode, initialData, couponId }: CouponFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Mutations
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

  // Query para obtener datos del cupón en modo edición
  const { data: couponData, isLoading: isLoadingCoupon } = useGetCouponByIdQuery(
    { id: couponId! },
    { skip: mode !== "edit" || !couponId }
  );

  // Función para obtener los valores por defecto
  const getDefaultValues = (): CouponFormData => {
    if (mode === "edit" && couponData?.data) {
      const coupon = couponData.data;
      return {
        code: coupon.code,
        description: coupon.description,
        value: coupon.value.toString(),
        expirationDate: coupon.expirationDate.split("T")[0],
        state: coupon.state === "canjeado" ? "activo" : (coupon.state as "activo" | "inactivo"),
      };
    }

    return {
      code: "",
      description: "",
      value: "0",
      expirationDate: "",
      state: "activo",
    };
  };

  // Configuración del formulario con RHF
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    mode: "onChange", // Validación en tiempo real
    defaultValues: getDefaultValues(),
  });

  // Actualizar el formulario cuando lleguen los datos del cupón
  useEffect(() => {
    if (mode === "edit" && couponData?.data) {
      const coupon = couponData.data;
      const newValues = {
        code: coupon.code,
        description: coupon.description,
        value: coupon.value.toString(),
        expirationDate: coupon.expirationDate.split("T")[0],
        state: coupon.state === "canjeado" ? "activo" : (coupon.state as "activo" | "inactivo"),
      };

      console.log("🔄 Reseteando formulario con:", newValues);
      reset(newValues);
    }
  }, [couponData, mode, reset]);

  const onSubmit = async (data: CouponFormData) => {
    setMessage("");
    setMessageType("");

    try {
      if (mode === "create") {
        const result = await createCoupon({
          code: data.code,
          description: data.description,
          value: Number(data.value),
          expirationDate: new Date(data.expirationDate).toISOString(),
          state: data.state,
        }).unwrap();

        if (result) {
          setMessage("¡Cupón creado exitosamente!");
          setMessageType("success");
          setTimeout(() => {
            router.push("/admin/coupons");
          }, 1500);
        } else {
          setMessage("Error al crear el cupón");
          setMessageType("error");
        }
      } else {
        const result = await updateCoupon({
          id: couponId!,
          data: {
            code: data.code,
            description: data.description,
            value: Number(data.value),
            expirationDate: new Date(data.expirationDate).toISOString(),
            state: data.state,
          },
        }).unwrap();

        if (result) {
          setMessage("¡Cupón actualizado exitosamente!");
          setMessageType("success");
          setTimeout(() => {
            router.push("/admin/coupons");
          }, 1500);
        } else {
          setMessage("Error al actualizar el cupón");
          setMessageType("error");
        }
      }
    } catch (error: any) {
      console.error(`Error al ${mode === "create" ? "crear" : "actualizar"} cupón:`, error);

      if (error?.data?.message) {
        setMessage(error.data.message);
      } else if (error?.message) {
        setMessage(error.message);
      } else {
        setMessage(
          `Error al ${mode === "create" ? "crear" : "actualizar"} el cupón. Intenta nuevamente.`
        );
      }
      setMessageType("error");
    }
  };

  // Loading state para modo edición
  if (mode === "edit" && isLoadingCoupon) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500 dark:text-gray-400">Cargando datos del cupón...</div>
      </div>
    );
  }

  const isLoading = isCreating || isUpdating || isSubmitting;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {mode === "create" ? "Crear nuevo cupón" : "Editar cupón"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {mode === "create"
            ? "Completa la información para crear un nuevo cupón de descuento."
            : "Modifica la información del cupón según sea necesario."}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* Form Header */}
        <div className="bg-blue-900 dark:bg-blue-950 rounded-t-lg px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Información del cupón</h2>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit, (errors) => {
              console.log("❌ Errores de validación:", errors);
              console.log("📝 Valores del formulario:", control._formValues);
            })}
            className="space-y-6"
          >
            {/* Código del cupón */}
            <div>
              <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    type="text"
                    placeholder="Ej: DESCUENTO20"
                    disabled={isLoading}
                    error={fieldState.error}
                    label="Código del cupón"
                  />
                )}
              />
            </div>

            {/* Descripción */}
            <div>
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descripción
                    </label>
                    <textarea
                      {...field}
                      placeholder="Describe el cupón y sus beneficios..."
                      disabled={isLoading}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                    />
                    {fieldState.error && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Valor */}
            <div>
              <Controller
                name="value"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    type="number"
                    placeholder="0"
                    disabled={isLoading}
                    error={fieldState.error}
                    label="Valor del descuento"
                  />
                )}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Ingresa el valor del descuento. Para porcentajes usa números menores a 100, para
                montos fijos usa números mayores.
              </p>
            </div>

            {/* Fecha de expiración */}
            <div>
              <Controller
                name="expirationDate"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    type="date"
                    disabled={isLoading}
                    error={fieldState.error}
                    label="Fecha de expiración"
                  />
                )}
              />
            </div>

            {/* Estado */}
            <div>
              <Controller
                name="state"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estado
                    </label>
                    <select
                      {...field}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                    {fieldState.error && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  messageType === "success"
                    ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                    : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                }`}
              >
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === "create" ? "Creando..." : "Actualizando..."}
                </div>
              ) : mode === "create" ? (
                "Crear cupón"
              ) : (
                "Actualizar cupón"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
