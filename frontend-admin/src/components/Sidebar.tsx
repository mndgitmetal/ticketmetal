import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  Settings,
  Ticket,
  Users
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard
    },
    {
      name: 'Eventos',
      href: '/events',
      icon: Calendar
    },
    {
      name: 'Relatórios',
      href: '/reports',
      icon: BarChart3
    },
    {
      name: 'Ingressos',
      href: '/tickets',
      icon: Ticket
    },
    {
      name: 'Usuários',
      href: '/users',
      icon: Users
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: Settings
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">🎫 TicketMetal</h1>
        <p className="text-sm text-gray-600 mt-1">Painel Administrativo</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
