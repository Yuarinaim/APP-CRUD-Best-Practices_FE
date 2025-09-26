import { AdminNavbar } from "@/components/admin/admin-navbar"

export default function AdminDashboardPage() {
  return (
    <>
      <AdminNavbar title="25Watts" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Administración</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Bienvenido al panel de administración de 25Watts</p>
        </div>
      </main>
    </>
  )
}
