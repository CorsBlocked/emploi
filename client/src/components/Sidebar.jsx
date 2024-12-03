import React from 'react';
import { Home, LayoutDashboard, Bookmark,  LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-pink-500 rounded-lg"></div>
        <span className="ml-2 text-xl font-semibold">sfir</span>
      </div>

      <div className="mb-8">
        <div className="text-gray-400 mb-4">Menu</div>
        <nav className="space-y-4">
          <Link to="/admin" className="flex items-center text-pink-500 bg-purple-50 px-4 py-2 rounded-lg">
            <Home size={20} />
            <span className="ml-3">Home</span>
          </Link>
          <Link to="/Classes" className="flex items-center text-gray-600 px-4 py-2">
            <LayoutDashboard size={20} />
            <span className="ml-3">Classes</span>
          </Link>
          <Link to="/emploi" className="flex items-center text-gray-600 px-4 py-2">
            <Bookmark size={20} />
            <span className="ml-3">Ajout Emploi</span>
          </Link>
          {/* Fix: Add closing tag for Link and pass the userId */}
          <Link to="/Edittable" className="flex items-center text-gray-600 px-4 py-2">
            <Bookmark size={20} />
            <span className="ml-3">Emplois</span>
          </Link>
        </nav>
      </div>

    

      <div className="pt-8 space-y-4">
        <Link to="/LoginAdmin" className="flex items-center text-gray-600 px-4 py-2">
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </Link>
      </div>
    </div>
  );
};

export default Sidebar;