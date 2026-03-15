import React, { useCallback, useEffect, useState } from "react";
import {
  CalendarClock,
  PackagePlus,
  ScanLine,
  Tags,
  Weight,
  X,
} from "lucide-react";
import { BarcodeScanner, BottomNavigation } from "../../components";
import { useAddProductScreenHelper } from "./addProduct.helper";

export const AddProductScreen: React.FC = () => {
  const [barcode, setBarcode] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const { handleOnClickAddProduct, handleOnClickBack } =
    useAddProductScreenHelper();

  const handleBarcodeDetected = useCallback((code: string) => {
    setBarcode(code);
    setIsScannerOpen(false);
  }, []);

  useEffect(() => {
    if (!isScannerOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isScannerOpen]);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-lime-50 px-4 py-6 pb-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Pantry Manager
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Add Product
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Fill in product details below to keep your pantry smart,
                organized, and easy to search.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Quick Note
              </p>
              <p className="mt-1 text-sm text-emerald-900">
                Use consistent names for easier filtering later.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
            onSubmit={handleOnClickAddProduct}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <PackagePlus className="h-4 w-4 text-emerald-600" />
                  Product Name
                </span>
                <input
                  type="text"
                  name="productName"
                  placeholder="Ex: Bananas"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </label>

              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Weight className="h-4 w-4 text-orange-500" />
                  Quantity
                </span>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </label>

              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Tags className="h-4 w-4 text-sky-500" />
                  Category
                </span>
                <select
                  name="category"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                >
                  <option>Choose a category</option>
                  <option>Grains</option>
                  <option>Snacks</option>
                  <option>Canned Goods</option>
                  <option>Frozen</option>
                </select>
              </label>

              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarClock className="h-4 w-4 text-rose-500" />
                  Expiration Date
                </span>
                <input
                  type="date"
                  name="expirationDate"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ScanLine className="h-4 w-4 text-indigo-500" />
                  Barcode
                </span>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    name="barcode"
                    value={barcode}
                    onChange={(event) => setBarcode(event.target.value)}
                    placeholder="Scan or type barcode"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 sm:min-w-40"
                  >
                    <>
                      <ScanLine className="h-4 w-4" />
                      Scan Barcode
                    </>
                  </button>
                </div>
              </label>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={handleOnClickBack}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Save Product
              </button>
            </div>
          </form>
        </section>
      </div>

      {isScannerOpen && (
        <div className="fixed inset-0 z-70 bg-black">
          <BarcodeScanner onDetected={handleBarcodeDetected} />

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
            <p className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Scan Barcode
            </p>
            <button
              type="button"
              aria-label="Close scanner"
              onClick={() => setIsScannerOpen(false)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-4">
            <div className="rounded-full bg-black/55 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur">
              Align the barcode inside the camera view
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};
