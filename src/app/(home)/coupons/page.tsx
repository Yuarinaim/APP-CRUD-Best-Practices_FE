"use client";

import Image from "next/image";
import { useState } from "react";

const tabs = [
  { id: "disponibles", label: "DISPONIBLES" },
  { id: "cash", label: "CASH" },
  { id: "usados", label: "USADOS" },
];

const coupons = [
  {
    id: 1,
    brand: "Adidas",
    discount: "20 % OFF",
    description: "En tiendas deportivas",
    details: "Válido en productos seleccionados",
    validUntil: "Vence: 01/12/2024",
    logo: "/adidas-logo.png",
  },
  {
    id: 2,
    brand: "Envío gratis",
    discount: "Envío gratis",
    description: "En compras online",
    details: "Superando los $5000 en tu carrito.",
    validUntil: "Vence: 01/01/2025",
    logo: "/shipping-truck-icon.png",
  },
  {
    id: 3,
    brand: "Adidas",
    discount: "20 % OFF",
    description: "En tiendas deportivas",
    details: "Válido en productos seleccionados",
    validUntil: "Vence: 01/12/2024",
    logo: "/adidas-logo.png",
  },
  {
    id: 4,
    brand: "Envío gratis",
    discount: "Envío gratis",
    description: "En compras online",
    details: "Superando los $5000 en tu carrito.",
    validUntil: "Vence: 01/01/2025",
    logo: "/shipping-truck-icon.png",
  },
];

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState("disponibles");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Mis cupones
        </h1>
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

      {/* Coupons grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={coupon.logo || "/placeholder.svg"}
                  alt={coupon.brand}
                  className="object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {coupon.discount}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {coupon.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  {coupon.details}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                  {coupon.validUntil}
                </p>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 rounded-lg transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
                  ABRIR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
