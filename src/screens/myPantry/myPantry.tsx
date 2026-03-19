import { Search, Package, Plus, Minus, Trash2, Loader2 } from "lucide-react";
import { BottomNavigation } from "../../components";
import { useMyPantryScreenHelper } from "./myPantry.helper";

export const MyPantryScreen: React.FC = () => {
  const {
    products,
    isLoadingProducts,
    pendingProductId,
    search,
    setSearch,
    filteredProducts,
    handleOnClickDeleteProduct,
    handleOnClickAddOrDecreaseQuantity,
  } = useMyPantryScreenHelper();
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-emerald-50 via-cyan-50 to-slate-100 px-4 py-6 pb-32 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-lime-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <section className="mb-6 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Pantry Hub
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                My Pantry
              </h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Track everything in one place and quickly find what you need.
              </p>
            </div>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Total Items
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {products.length}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-emerald-700">
                Showing
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-800">
                {filteredProducts.length}
              </p>
            </div>
          </div>

          <form className="mb-2 max-w-xl">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center ps-3">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full rounded-xl border border-slate-300 bg-white p-3 ps-10 text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Search pantry..."
              />
            </div>
          </form>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {isLoadingProducts && (
            <div className="md:col-span-2 xl:col-span-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-emerald-600" />
              <p className="mt-3 text-sm font-medium text-slate-600">
                Loading pantry items...
              </p>
            </div>
          )}

          {!isLoadingProducts &&
            filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-100 p-2.5">
                      <Package className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 truncate">
                      {product.name}
                    </h3>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    Pantry
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">
                      Quantity
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleOnClickAddOrDecreaseQuantity(
                            product.id,
                            product.quantity,
                            false,
                          );
                        }}
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={pendingProductId === product.id}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                      >
                        {pendingProductId === product.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Minus className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <span className="w-8 text-center text-base font-bold text-slate-900">
                        {product.quantity ?? 0}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={pendingProductId === product.id}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                        onClick={() => {
                          handleOnClickAddOrDecreaseQuantity(
                            product.id,
                            product.quantity,
                            true,
                          );
                        }}
                      >
                        {pendingProductId === product.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex space-between items-center justify-between">
                    {product.expiration_date && (
                      <p>
                        <span className="font-semibold text-slate-800">
                          Expires:
                        </span>{" "}
                        {new Date(product.expiration_date).toLocaleDateString()}
                      </p>
                    )}
                    <button
                      onClick={() => {
                        handleOnClickDeleteProduct(product.id);
                      }}
                      type="button"
                      aria-label="Remove product"
                      disabled={pendingProductId === product.id}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-red-600 bg-red-50 text-red-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                    >
                      {pendingProductId === product.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </section>

        {!isLoadingProducts && filteredProducts.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm backdrop-blur">
            <Package className="mx-auto mb-4 h-14 w-14 text-slate-400" />
            <p className="text-lg font-semibold text-slate-700">
              {search ? "No items match your search." : "Your pantry is empty."}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Start by adding your first product.
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
