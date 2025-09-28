"use client";

import Image from "next/image";
import { useState } from "react";
import { TCoupon, useGetCouponsQuery } from "@/redux/services/couponApi";
import couponIcon from "../../../../public/assets/icons/navigation/coupon.svg";

const tabs = [
  { id: "activo", label: "DISPONIBLES" },
  { id: "canjeado", label: "CANJEADOS" },
  { id: "all", label: "TODOS" },
];

// Función para formatear valor
const formatValue = (value: string) => {
  const numValue = parseFloat(value);
  if (numValue === 0) return "Envío gratis";
  if (numValue < 100) return `${numValue}% OFF`;
  return `$${numValue} OFF`;
};

// Función para formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState("activo");

  // Usar la query de cupones sin filtros
  const { data: couponsData, isLoading, error, refetch } = useGetCouponsQuery();

  // Obtener todos los cupones
  const allCoupons = couponsData || [];

  // Filtrar cupones localmente por tab activo
  const filteredCoupons = (() => {
    if (activeTab === "all") return allCoupons;
    return allCoupons.filter((coupon: TCoupon) => coupon.state === activeTab);
  })();

  // Usar datos filtrados
  const coupons = filteredCoupons;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mis cupones</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Una galería con todos los beneficios disponibles para vos
          <br />
          por ser parte de la plataforma.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-gray-900 text-gray-900 dark:border-white dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500 dark:text-gray-400">Cargando cupones...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-12">
          <div className="text-red-500">Error al cargar cupones.</div>
        </div>
      )}

      {/* Coupons grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coupons.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                No se encontraron cupones en esta categoría.
              </div>
            </div>
          ) : (
            coupons?.map((coupon: TCoupon) => (
              <div
                key={coupon.id}
                className="bg-blue-900 rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="drop-shadow-xl"
                      src={couponIcon}
                      alt={couponIcon.name}
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="flex-1 text-white">
                    <h1>Codigo: {coupon.code}</h1>
                    <h3 className="text-lg font-semibold mb-1">
                      {formatValue(coupon.value.toString())}
                    </h3>
                    <p className="mb-1">{coupon.description}</p>
                    <p className="mb-4">Vence: {formatDate(coupon.expirationDate)}</p>
                    <p className="mb-4">Estado: {coupon.state}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
