import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Calculator, ShoppingBag, Menu } from "lucide-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Sokogate Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E31E24] text-white font-bold text-xl">
                S
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#E31E24]">
                SOKOGATE
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-sm font-medium hover:text-[#E31E24] transition-colors"
              >
                Products
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-[#E31E24] transition-colors"
              >
                Calculators
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-[#E31E24] transition-colors"
              >
                About Us
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden sm:flex h-10 items-center justify-center rounded-full bg-[#E31E24] px-6 text-sm font-semibold text-white hover:bg-[#c4191f] transition-colors shadow-lg shadow-red-200">
                Download App
              </button>
              <button className="md:hidden p-2 text-slate-600">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Sokogate Footer */}
        <footer className="mt-20 border-t bg-slate-900 py-12 text-slate-400">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[#E31E24] font-bold">
                    S
                  </div>
                  <span className="text-xl font-bold text-white">SOKOGATE</span>
                </div>
                <p className="max-w-xs text-sm leading-relaxed">
                  Your number one marketplace for building and construction
                  materials in Nigeria. Quality products, delivered to your
                  site.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Calculators
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Product Catalogue
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Delivery Terms
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
                  Contact
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>support@sokogate.com</li>
                  <li>+234 (0) 800 SOKOGATE</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs">
              &copy; {new Date().getFullYear()} Sokogate Technologies. All
              rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
