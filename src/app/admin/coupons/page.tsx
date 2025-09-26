import { AdminNavbar } from "@/components/admin/admin-navbar";
import { CouponTable } from "@/components/admin/coupon-table";

export default function AdminCouponsPage() {
  return (
    <>
      <AdminNavbar title="25Watts" breadcrumb="Inicio > Cupones" />
      <main className="flex-1 overflow-y-auto p-6">
        <CouponTable />
      </main>
    </>
  );
}
