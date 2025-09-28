import { AdminNavbar } from "@/components/admin/admin-navbar";
import { CouponForm } from "@/components/admin/coupon-form";

export default function CreateCouponPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/admin" },
    { label: "Cupones", href: "/admin/coupons" },
    { label: "Crear nuevo cupón", href: "/admin/coupons/create" },
  ];

  return (
    <div className="flex h-full flex-col">
      <AdminNavbar
        title="25Watts"
        breadcrumb={breadcrumbs.map((breadcrumb) => breadcrumb.label).join(" > ")}
      />
      <main className="flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-900">
        <CouponForm mode="create" />
      </main>
    </div>
  );
}
