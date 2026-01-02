import { Menu, X, User, Settings, LogIn, LogOut, HelpCircle, Search, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext'; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Get auth state from context
  const { user, isLoading, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (isProfileOpen && !e.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between z-50 transition-all duration-300 ${scrolled ? "bg-white backdrop-blur-md shadow-lg" : "bg-linear-to-r from-[#ECEFCA] via-[#ECEFCA] to-[#ECEFCA] shadow-md"}`}>
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <BookOpen className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Tic's Course</h1>
            {/* <p className="hidden sm:block text-xs text-gray-500">Learn & Grow</p> */}
          </div>
        </div>

        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full group">
            <input type="text" placeholder="Search for courses, topics, or instructors..." className="w-full px-6 py-3 pr-14 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 group-hover:border-gray-300 shadow-sm" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
              <Search size={20} />
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-amber-600 transition-colors duration-300 relative group">About<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span></a>
          <a href="#" className="hover:text-amber-600 transition-colors duration-300 relative group">Courses<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span></a>
          <a href="#" className="hover:text-amber-600 transition-colors duration-300 relative group">FAQ<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span></a>
          <a href="#" className="hover:text-amber-600 transition-colors duration-300 relative group">Contact<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span></a>

          <div className="relative profile-dropdown">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 border-2 border-gray-300 rounded-full hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 shadow-sm hover:shadow-md">
              <User size={24} className="text-gray-700" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-5 bg-linear-to-r from-amber-50 to-orange-50 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                      <User size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {isLoading ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                      ) : isLoggedIn && user ? (
                        <>
                          <p className="font-semibold text-gray-800 truncate">{user.fullName}</p>
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
                          {user.appId && <p className="text-xs text-gray-500 mt-1">ID: {user.appId}</p>}
                        </>
                      ) : (
                        <>
                          <p className="font-semibold text-gray-800">Guest User</p>
                          <p className="text-sm text-gray-600">guest@example.com</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  {isLoading ? null : isLoggedIn && user ? (
                    <>
                      <a href="/settings" className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50 text-gray-700 font-medium transition-colors duration-200"><Settings size={18} />Settings</a>
                      <div className="border-t border-gray-100 my-2"></div>
                      <a href="/support" className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50 text-gray-700 font-medium transition-colors duration-200"><HelpCircle size={18} />Help & Support</a>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-left text-red-600 font-medium transition-colors duration-200 border-t border-gray-100"><LogOut size={18} />Logout</button>
                    </>
                  ) : (
                    <>
                      <a href="/login" className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50 text-gray-700 font-medium transition-colors duration-200"><LogIn size={18} />Login</a>
                      <a href="/support" className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50 text-gray-700 font-medium transition-colors duration-200 border-t border-gray-100"><HelpCircle size={18} />Help & Support</a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-800 z-50 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">{isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </header>

      <div className="hidden md:block lg:hidden fixed top-18 left-0 right-0 px-4 sm:px-6 py-3 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="relative max-w-3xl mx-auto group">
          <input type="text" placeholder="Search for courses..." className="w-full px-6 py-3 pr-14 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 shadow-sm" />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md"><Search size={20} /></button>
        </div>
      </div>

      <div className="md:hidden fixed top-16 left-0 right-0 px-4 py-3 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="relative group">
          <input type="text" placeholder="Search courses..." className="w-full px-5 py-3 pr-14 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-sm" />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"><Search size={20} /></button>
        </div>
      </div>

      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

      {isMobileMenuOpen && (
        <div className="fixed top-30 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden">
          <div className="p-6 flex flex-col gap-1">
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-xl transition-all duration-200">About</a>
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-xl transition-all duration-200">Courses</a>
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-xl transition-all duration-200">FAQ</a>
            <a href="#" className="text-lg font-medium text-gray-800 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-xl transition-all duration-200">Contact</a>

            <div className="border-t border-gray-200 mt-3 pt-3">
              <div className="flex items-center gap-3 px-4 py-2 mb-3 bg-linear-to-r from-amber-50 to-orange-50 rounded-xl">
                <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm"><User size={20} className="text-white" /></div>
                <div className="flex-1 min-w-0">
                  {isLoading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                  ) : isLoggedIn && user ? (
                    <>
                      <p className="font-semibold text-gray-800 text-sm truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-gray-800 text-sm">Guest User</p>
                      <p className="text-xs text-gray-600">guest@example.com</p>
                    </>
                  )}
                </div>
              </div>

              {isLoading ? null : isLoggedIn && user ? (
                <>
                  <a href="/settings" className="block text-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 px-4 py-3 rounded-xl transition-all duration-200"><div className="flex items-center gap-3"><Settings size={20} />Settings</div></a>
                  <a href="/support" className="block text-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 px-4 py-3 rounded-xl transition-all duration-200 mt-1"><div className="flex items-center gap-3"><HelpCircle size={20} />Help & Support</div></a>
                  <button onClick={handleLogout} className="w-full text-left text-red-600 font-medium text-lg hover:bg-red-50 px-4 py-3 rounded-xl transition-all duration-200 mt-1"><div className="flex items-center gap-3"><LogOut size={20} />Logout</div></button>
                </>
              ) : (
                <>
                  <a href="/login" className="block text-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 px-4 py-3 rounded-xl transition-all duration-200"><div className="flex items-center gap-3"><LogIn size={20} />Login</div></a>
                  <a href="/support" className="block text-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 px-4 py-3 rounded-xl transition-all duration-200 mt-1"><div className="flex items-center gap-3"><HelpCircle size={20} />Help & Support</div></a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16 md:h-32 lg:h-18"></div>
    </>
  );
}