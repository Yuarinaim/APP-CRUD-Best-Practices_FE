"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRedeemCouponMutation } from "@/redux/services/couponApi";
import { FormInput } from "@/components/ui/form-input";

// Schema de validación con Zod
const redeemCouponSchema = z.object({
  couponCode: z
    .string()
    .min(1, "El código del cupón es requerido")
    .min(3, "El código debe tener al menos 3 caracteres")
    .max(50, "El código no puede exceder 50 caracteres")
    .regex(
      /^[A-Z0-9_-]+$/i,
      "El código solo puede contener letras, números, guiones y guiones bajos"
    ),
});

type RedeemCouponFormData = z.infer<typeof redeemCouponSchema>;

export default function RedeemPage() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Mutation para canjear cupón
  const [redeemCoupon, { isLoading }] = useRedeemCouponMutation();

  // Configuración del formulario con RHF
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RedeemCouponFormData>({
    resolver: zodResolver(redeemCouponSchema),
    defaultValues: {
      couponCode: "",
    },
  });

  const onSubmit = async (data: RedeemCouponFormData) => {
    setMessage("");
    setMessageType("");

    try {
      // Llamar a la API para canjear el cupón
      const result = await redeemCoupon({ code: data.couponCode.trim() }).unwrap();

      if (result) {
        setMessage("¡Cupón canjeado exitosamente!");
        setMessageType("success");
        reset(); // Limpiar el formulario
      } else {
        setMessage("Error al canjear el cupón");
        setMessageType("error");
      }
    } catch (error: any) {
      console.error("Error al canjear cupón:", error);

      // Manejar diferentes tipos de errores
      if (error?.data?.message) {
        setMessage(error.data.message);
      } else if (error?.message) {
        setMessage(error.message);
      } else {
        setMessage("Error al procesar el cupón. Intenta nuevamente.");
      }
      setMessageType("error");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Canjear cupón</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ingresa el código de tu cupón para canjearlo y obtener tu descuento.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* Form Header */}
          <div className="bg-blue-900 dark:bg-blue-950 rounded-t-lg px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Código de cupón</h2>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Controller
                  name="couponCode"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      type="text"
                      control={control}
                      placeholder="Ingresa tu código de cupón"
                      disabled={isLoading || isSubmitting}
                      error={errors.couponCode}
                      label="Código del cupón"
                    />
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
                disabled={isLoading || isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {isLoading || isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando...
                  </div>
                ) : (
                  "Canjear cupón"
                )}
              </button>
            </form>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                ¿Cómo usar tu cupón?
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Ingresa el código exactamente como aparece en tu cupón</li>
                <li>• Los códigos son sensibles a mayúsculas y minúsculas</li>
                <li>• Verifica que el cupón no haya expirado</li>
                <li>• Cada cupón solo puede ser usado una vez</li>
              </ul>
            </div>

            {/* Demo Codes */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">
                Códigos de prueba:
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>
                  • <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">DESCUENTO20</code> -
                  Cupón válido
                </li>
                <li>
                  • <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">EXPIRADO</code> -
                  Cupón expirado
                </li>
                <li>
                  • <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">USADO</code> - Cupón
                  ya utilizado
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
