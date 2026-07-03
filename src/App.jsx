import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  AlertCircle,
  IndianRupee,
  Settings,
  Search,
  Bell,
  User,
  MapPin,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  MoreVertical,
  Truck,
  Phone,
  MessageSquare,
  Info,
  Flag
} from 'lucide-react';

// --- MOCK DATA ---
const orders = [
  { id: 'AWB109283741', customer: 'Rahul Sharma', dest: 'Mumbai, MH', status: 'Shipper Unavailable', time: 'Today, 10:42 AM', isDisputed: true },
  { id: 'AWB109283742', customer: 'Priya Singh', dest: 'Bengaluru, KA', status: 'Pending Pickup', time: 'Today, 02:00 PM', isDisputed: false },
  { id: 'AWB109283743', customer: 'Amit Patel', dest: 'Ahmedabad, GJ', status: 'In Transit', time: 'Yesterday, 04:15 PM', isDisputed: false },
  { id: 'AWB109283744', customer: 'Neha Gupta', dest: 'Delhi, DL', status: 'Delivered', time: 'Yesterday, 11:30 AM', isDisputed: false },
];

export default function App() {
  const [isTrustLayerOn, setIsTrustLayerOn] = useState(false);
  const [activeOrder, setActiveOrder] = useState(orders[0]);
  const [ticketRaised, setTicketRaised] = useState(false);
  const [escalationPanelOpen, setEscalationPanelOpen] = useState(false);
  const [escalationStatus, setEscalationStatus] = useState(null); // null, 'connecting'
  const [isFlagged, setIsFlagged] = useState(false);

  // Reset states when switching toggles or orders
  useEffect(() => {
    setTicketRaised(false);
    setEscalationPanelOpen(false);
    setEscalationStatus(null);
    setIsFlagged(false);
  }, [isTrustLayerOn, activeOrder]);

  const handleRaiseTicket = () => {
    setTicketRaised(true);
    setTimeout(() => setTicketRaised(false), 3000);
  };

  const handleFlagUpdate = () => {
    setIsFlagged(true);
  };

  const handleEscalationOption = () => {
    setEscalationStatus('connecting');
    setTimeout(() => {
      setEscalationPanelOpen(false);
    }, 4000);
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA] font-sans text-brand-dark overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-brand-grey flex flex-col z-20">
        <div className="p-6 border-b border-brand-grey flex items-center space-x-2">
          <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center text-white font-bold text-xl leading-none">
            D
          </div>
          <span className="font-bold text-xl tracking-tight">Delhivery <span className="font-light">One</span></span>
        </div>
        <nav className="flex-1 py-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem icon={<Package size={20} />} label="Orders" active />
          <NavItem icon={<AlertCircle size={20} />} label="NDR" badge="12" />
          <NavItem icon={<IndianRupee size={20} />} label="Finance" />
          <NavItem icon={<Settings size={20} />} label="Services" />
        </nav>
        <div className="p-4 border-t border-brand-grey text-xs text-gray-500">
          Seller ID: D-928374<br/>
          v2.4.1 (Observation 1)
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-brand-grey flex items-center justify-between px-6 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by AWB, Order ID, or Phone" 
              className="w-full pl-10 pr-4 py-2 bg-brand-lightgrey border border-transparent rounded focus:bg-white focus:border-brand-red focus:outline-none transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-brand-lightgrey p-1 rounded-lg">
              <button 
                onClick={() => setIsTrustLayerOn(false)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${!isTrustLayerOn ? 'bg-white shadow text-brand-dark' : 'text-gray-500 hover:text-brand-dark'}`}
              >
                Current System
              </button>
              <button 
                onClick={() => setIsTrustLayerOn(true)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all flex items-center space-x-1 ${isTrustLayerOn ? 'bg-white shadow text-brand-red' : 'text-gray-500 hover:text-brand-dark'}`}
              >
                <span>Proposed: Trust Layer</span>
                {isTrustLayerOn && <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse ml-1"></span>}
              </button>
            </div>
            
            <div className="relative">
              <Bell className="text-gray-600 cursor-pointer hover:text-brand-dark" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full"></span>
            </div>
            <div className="w-8 h-8 bg-brand-lightgrey rounded-full flex items-center justify-center border border-brand-grey cursor-pointer">
              <User size={18} className="text-gray-600" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-auto p-6 flex space-x-6">
          
          {/* ORDERS LIST */}
          <div className="w-1/3 flex flex-col h-full bg-white border border-brand-grey rounded-lg shadow-sm">
            <div className="p-4 border-b border-brand-grey flex justify-between items-center">
              <h2 className="font-semibold text-lg">Pickups</h2>
              <span className="text-xs font-medium bg-brand-lightgrey px-2 py-1 rounded text-gray-600">4 Orders</span>
            </div>
            <div className="overflow-y-auto flex-1">
              {orders.map(order => (
                <div 
                  key={order.id} 
                  onClick={() => setActiveOrder(order)}
                  className={`p-4 border-b border-brand-lightgrey cursor-pointer transition-colors ${activeOrder.id === order.id ? 'bg-blue-50/50 border-l-4 border-l-brand-red' : 'hover:bg-brand-lightgrey border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">{order.id}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{order.customer} • {order.dest}</div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Clock size={12} className="mr-1" /> {order.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DETAIL VIEW */}
          <div className="flex-1 h-full overflow-y-auto pb-20">
            {activeOrder.isDisputed ? (
              <div className="max-w-2xl mx-auto">
                {/* DYNAMIC CARD CONTENT */}
                <div className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-500 ${isTrustLayerOn ? 'border-blue-100 ring-1 ring-blue-50' : 'border-brand-grey'}`}>
                  
                  {/* HEADER */}
                  <div className="p-6 border-b border-brand-grey flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h2 className="font-bold text-2xl">{activeOrder.id}</h2>
                        {isTrustLayerOn && isFlagged && (
                          <span className="bg-red-100 text-brand-red text-xs font-bold px-2 py-1 rounded flex items-center">
                            <Flag size={12} className="mr-1" /> Under Review — Auto-escalated
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">To: {activeOrder.customer}, {activeOrder.dest}</p>
                    </div>
                    {!isFlagged && (
                      <div className={`text-right ${isTrustLayerOn ? 'text-brand-red' : 'text-gray-500'}`}>
                        <div className="font-semibold text-lg">{activeOrder.status}</div>
                        <div className="text-sm">{activeOrder.time}</div>
                      </div>
                    )}
                  </div>

                  {/* BODY - TOGGLES BASED ON STATE */}
                  <div className="relative">
                    
                    {/* STATE A: CURRENT SYSTEM */}
                    <div className={`p-8 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${!isTrustLayerOn ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-brand-red">
                        <AlertTriangle size={32} />
                      </div>
                      <h3 className="font-bold text-xl mb-2">Pickup Failed</h3>
                      <p className="text-gray-600 max-w-sm mb-8">
                        The courier reported that the shipper was unavailable at the location.
                      </p>
                      
                      <div className="w-full max-w-sm bg-brand-lightgrey p-4 rounded text-left mb-6 border border-brand-grey">
                        <div className="text-sm font-semibold mb-1">Last Update</div>
                        <div className="text-sm text-gray-700">Shipper Unavailable</div>
                        <div className="text-xs text-gray-500 mt-1">{activeOrder.time}</div>
                      </div>

                      <button 
                        onClick={handleRaiseTicket}
                        className="w-full max-w-sm py-3 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
                      >
                        Raise a ticket
                      </button>
                    </div>

                    {/* STATE B: TRUST LAYER */}
                    <div className={`transition-opacity duration-500 ${isTrustLayerOn ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                      <div className="p-6 grid grid-cols-2 gap-8">
                        
                        {/* LEFT: TIMELINE */}
                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Pickup Timeline</h3>
                            {!isFlagged && activeOrder.status === 'Shipper Unavailable' && (
                              <button onClick={handleFlagUpdate} className="text-brand-red text-xs font-semibold hover:underline flex items-center">
                                <Flag size={12} className="mr-1" /> This doesn't look right?
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-green before:via-brand-green before:to-gray-200">
                            
                            {/* Step 1 */}
                            <div className="relative flex items-start space-x-4">
                              <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center border-4 border-white z-10 shrink-0">
                                <CheckCircle2 size={12} className="text-white" />
                              </div>
                              <div className="-mt-1">
                                <div className="font-semibold text-sm">Order Ready for Pickup</div>
                                <div className="text-xs text-gray-500">Today, 09:00 AM</div>
                              </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative flex items-start space-x-4">
                              <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center border-4 border-white z-10 shrink-0">
                                <CheckCircle2 size={12} className="text-white" />
                              </div>
                              <div className="-mt-1">
                                <div className="font-semibold text-sm">Agent Assigned</div>
                                <div className="text-xs text-gray-500">Today, 09:15 AM</div>
                                <div className="text-sm mt-1 bg-gray-50 p-2 rounded flex items-center space-x-2 border border-gray-100">
                                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">SM</div>
                                  <span>Sanjay M.</span>
                                </div>
                              </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex items-start space-x-4">
                              <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center border-4 border-white z-10 shrink-0">
                                <CheckCircle2 size={12} className="text-white" />
                              </div>
                              <div className="-mt-1">
                                <div className="font-semibold text-sm">Agent En Route</div>
                                <div className="text-xs text-gray-500">Today, 10:10 AM</div>
                              </div>
                            </div>

                            {/* Step 4 (The conflict) */}
                            <div className="relative flex items-start space-x-4">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-white z-10 shrink-0 ${isFlagged ? 'bg-red-500' : 'bg-brand-red'}`}>
                                {isFlagged ? <AlertTriangle size={12} className="text-white" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <div className="-mt-1 flex-1">
                                <div className={`font-bold text-sm ${isFlagged ? 'text-brand-red' : ''}`}>
                                  {isFlagged ? 'Flagged: Shipper Unavailable' : 'Shipper Unavailable'}
                                </div>
                                <div className="text-xs text-gray-500">Today, 10:42 AM</div>
                                {isFlagged && (
                                  <div className="mt-2 text-xs bg-red-50 text-red-700 p-2 rounded border border-red-100 flex items-start">
                                    <Info size={14} className="mr-1 mt-0.5 shrink-0" />
                                    <span>You flagged this update. We are checking the agent's GPS log and will resolve this within 15 minutes.</span>
                                  </div>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* RIGHT: MAP & ESCALATION */}
                        <div className="flex flex-col h-full">
                          <h3 className="font-bold text-lg mb-4">Agent Tracking (Log)</h3>
                          <div className="flex-1 bg-brand-lightgrey rounded-lg border border-brand-grey overflow-hidden relative flex items-center justify-center min-h-[200px]">
                            {/* Mock Map Background */}
                            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] mix-blend-multiply"></div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="animate-bounce">
                                <MapPin className="text-brand-red" size={32} fill="#EE3C26" fillOpacity="0.2" />
                              </div>
                              <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-semibold text-gray-700 mt-2 flex items-center border border-gray-100">
                                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse mr-2"></span>
                                Agent pinged 1.2 km away at 10:40 AM
                              </div>
                            </div>
                          </div>

                          {!isFlagged && (
                            <button 
                              onClick={() => setEscalationPanelOpen(true)}
                              className="mt-6 w-full py-3 bg-brand-dark text-white rounded-lg font-semibold shadow-lg hover:bg-black transition-colors flex items-center justify-center space-x-2 group"
                            >
                              <Phone size={18} className="group-hover:animate-wiggle" />
                              <span>Something wrong? Escalate</span>
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 flex-col">
                <Package size={48} className="mb-4 opacity-20" />
                <p>Select the "Shipper Unavailable" order to view the prototype.</p>
              </div>
            )}
          </div>
        </div>

        {/* TOAST NOTIFICATION (STATE A) */}
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl transition-all duration-300 z-50 flex items-center space-x-3 ${ticketRaised ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          <CheckCircle2 size={18} className="text-green-400" />
          <span>Ticket #48213 raised. Avg. resolution time: 3-5 days.</span>
        </div>

        {/* SLIDE OVER ESCALATION PANEL (STATE B) */}
        {escalationPanelOpen && (
          <div className="absolute inset-0 bg-black/20 z-40 flex justify-end backdrop-blur-sm transition-opacity">
            <div className="w-96 bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg">Quick Escalation</h3>
                <button onClick={() => setEscalationPanelOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                {escalationStatus === 'connecting' ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center mb-6 relative">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-red border-t-transparent animate-spin"></div>
                      <Phone size={24} className="text-brand-red animate-pulse" />
                    </div>
                    <h4 className="font-bold text-xl mb-2">Connecting to Live Agent</h4>
                    <p className="text-gray-500 mb-6">Avg. response time: 4 minutes</p>
                    <div className="text-sm bg-gray-50 p-4 rounded text-gray-600 border border-gray-100">
                      We are routing you to the hub manager for <strong>{activeOrder.dest}</strong> to resolve the pickup issue immediately.
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-6">What went wrong with pickup for {activeOrder.id}?</p>
                    
                    <div className="space-y-3">
                      <button onClick={handleEscalationOption} className="w-full p-4 border border-gray-200 rounded-lg text-left hover:border-brand-red hover:bg-red-50 transition-colors flex items-center justify-between group">
                        <span className="font-medium">No agent showed up</span>
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-brand-red" />
                      </button>
                      <button onClick={handleEscalationOption} className="w-full p-4 border border-gray-200 rounded-lg text-left hover:border-brand-red hover:bg-red-50 transition-colors flex items-center justify-between group">
                        <span className="font-medium">Wrong status shown</span>
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-brand-red" />
                      </button>
                      <button onClick={handleEscalationOption} className="w-full p-4 border border-gray-200 rounded-lg text-left hover:border-brand-red hover:bg-red-50 transition-colors flex items-center justify-between group">
                        <span className="font-medium">Need urgent pickup today</span>
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-brand-red" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- COMPONENTS ---

function NavItem({ icon, label, active, badge }) {
  return (
    <div className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${active ? 'bg-red-50 text-brand-red border-r-4 border-brand-red' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-dark'}`}>
      <div className="flex items-center space-x-3">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge && (
        <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  let bg = 'bg-gray-100';
  let text = 'text-gray-600';
  
  if (status === 'Shipper Unavailable' || status === 'Failed') {
    bg = 'bg-red-100';
    text = 'text-brand-red';
  } else if (status === 'Pending Pickup' || status === 'In Transit') {
    bg = 'bg-amber-100';
    text = 'text-brand-amber';
  } else if (status === 'Delivered') {
    bg = 'bg-green-100';
    text = 'text-brand-green';
  }

  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${bg} ${text}`}>
      {status}
    </span>
  );
}
