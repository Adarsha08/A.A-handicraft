'use client'

import { Package, Settings, TrendingUp, LogOut, User, Crown } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
  admin: any
  logout: () => void
}

const menuItems = [
  { id: 'overview', name: 'Overview', icon: TrendingUp, desc: 'Analytics & metrics' },
  { id: 'products', name: 'Inventory', icon: Package, desc: 'Manage products' },
  { id: 'categories', name: 'Categories', icon: Settings, desc: 'Manage categories' },
]

export default function AdminSidebar({ activeTab, setActiveTab, admin, logout }: SidebarProps) {
  return (
    <div className="bg-white border border-primary-brown/5 rounded-[2.5rem] p-6 lg:p-8 shadow-xl flex flex-col h-full justify-between">
      <div className="space-y-8">
        <div className="flex items-center space-x-3 pb-6 border-b border-primary-brown/5">
          <div className="w-10 h-10 rounded-xl bg-accent-gold/15 flex items-center justify-center text-accent-gold">
            <Crown size={22} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-primary-brown">A.A. Admin</h3>
            <p className="text-[10px] text-accent-gold font-bold uppercase tracking-wider">Control Panel</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-4 rounded-2xl flex items-center space-x-4 transition-all duration-300 group ${
                  isActive ? 'bg-primary-brown text-white shadow-md' : 'hover:bg-primary-brown/5 text-primary-brown/70'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'bg-primary-brown/5 text-primary-brown/60'
                }`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm leading-none">{item.name}</p>
                  <p className={`text-[10px] mt-1 ${isActive ? 'text-white/60' : 'text-primary-brown/40'}`}>{item.desc}</p>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="space-y-6 pt-6 border-t border-primary-brown/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-brown/5 text-primary-brown rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="min-w-0 flex-grow">
            <p className="font-serif font-bold text-xs truncate text-primary-brown">Authorized Admin</p>
            <p className="text-[9px] font-mono text-primary-brown/40 truncate">{admin?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full bg-accent-red/5 hover:bg-accent-red hover:text-white text-accent-red py-3 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all flex items-center justify-center space-x-2"
        >
          <LogOut size={14} />
          <span>Exit Dashboard</span>
        </button>
      </div>
    </div>
  )
}