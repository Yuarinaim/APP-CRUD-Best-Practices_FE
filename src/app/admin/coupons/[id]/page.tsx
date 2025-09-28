import { AdminNavbar } from "@/components/admin/admin-navbar";
import { CouponForm } from "@/components/admin/coupon-form";

interface EditCouponPageProps {
  params: {
    id: string;
  };
}

export default function EditCouponPage({ params }: EditCouponPageProps) {
  const breadcrumbs = [
    { label: "Inicio", href: "/admin" },
    { label: "Cupones", href: "/admin/coupons" },
    { label: "Editar cupón", href: `/admin/coupons/${params.id}` },
  ];

  return (
    <div className="flex h-full flex-col">
      <AdminNavbar
        title="25Watts"
        breadcrumb={breadcrumbs.map((breadcrumb) => breadcrumb.label).join(" > ")}
      />
      <main className="flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-900">
        <CouponForm mode="edit" couponId={params.id} />
      </main>
    </div>
  );
}
