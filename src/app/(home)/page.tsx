export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bienvenido, Juan Morales</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Aquí se mostrará un resumen de tu actividad, saldo y beneficios destacados.
        </p>
      </div>

      {/* Points and Level Card */}
      <div className="bg-blue-900 rounded-lg p-6 text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm opacity-80 mb-1">MIS PUNTOS</div>
            <div className="text-3xl font-bold flex items-center gap-2">
              100 puntos
              <svg className="h-5 w-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80 mb-1">MI NIVEL</div>
            <div className="text-3xl font-bold flex items-center gap-2">
              Nivel 1
              <svg className="h-5 w-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">BENEFICIOS Y EXPERIENCIAS</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium dark:text-blue-400">Ver todo</button>
      </div>

      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>No hay beneficios disponibles en este momento.</p>
      </div>
    </div>
  )
}
