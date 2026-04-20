
import { useState, useEffect, useRef } from 'react';
import {
  Send,
  MessageSquare,
  MoreVertical,
  Phone,
  HeartPulse,
  Users
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: 'parent' | 'clinic';
  studentName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export const ClinicAdminChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: 'P1', senderRole: 'parent', studentName: 'Abebe Bikila', text: 'Hi, Abebe has a minor allergy to dust. Please keep an eye on him.', timestamp: '10:00 AM', read: false },
    { id: '2', senderId: 'P2', senderRole: 'parent', studentName: 'Sara Kebede', text: 'Sara needs her medication at 2 PM.', timestamp: '11:30 AM', read: true }
  ]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat, messages]);

  const unreadCount = messages.filter(m => m.senderRole === 'parent' && !m.read).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <MessageSquare className="text-rose-500" size={32} />
            Clinic Support Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Direct communication channel with parents</p>
        </div>
        {unreadCount > 0 && (
          <div className="px-4 py-2 bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-200 dark:shadow-none animate-pulse">
            <HeartPulse size={16} />
            {unreadCount} Unread Inquiries
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-220px)] min-h-[600px]">
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Users size={16} className="text-rose-500" />
                Active Conversations
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {['Abebe Bikila', 'Sara Kebede', 'Dawit Lema'].map((name, i) => {
                const lastMsg = messages.find(m => m.studentName === name);
                const isSelected = selectedChat === name;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedChat(name);
                      setMessages(prev => prev.map(m => m.studentName === name ? { ...m, read: true } : m));
                    }}
                    className={`w-full p-6 flex items-center gap-4 transition-all border-b border-slate-50 dark:border-slate-800/50 ${isSelected ? 'bg-rose-50 dark:bg-rose-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                  >
                    <div className="relative">
                      <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 font-black text-lg">
                        {name[0]}
                      </div>
                      {lastMsg && !lastMsg.read && lastMsg.senderRole === 'parent' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-sm text-slate-800 dark:text-white truncate">{name}</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{lastMsg?.timestamp || '12:00 PM'}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate font-medium">
                        {lastMsg ? lastMsg.text : 'Start a new conversation...'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col shadow-2xl relative">
            {selectedChat ? (
              <>
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 font-black text-xl shadow-sm">
                      {selectedChat[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 dark:text-white text-lg tracking-tight">{selectedChat}</h4>
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                         <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Parent Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-3 text-slate-400 hover:text-rose-600 bg-slate-50 dark:bg-slate-800 rounded-xl transition-all"><Phone size={20} /></button>
                    <button className="p-3 text-slate-400 hover:text-rose-600 bg-slate-50 dark:bg-slate-800 rounded-xl transition-all"><MoreVertical size={20} /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:opacity-95">
                  {messages.filter(m => m.studentName === selectedChat).map((m) => (
                    <div key={m.id} className={`flex ${m.senderRole === 'clinic' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-5 rounded-[2rem] shadow-sm relative ${
                        m.senderRole === 'clinic'
                          ? 'bg-rose-600 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                      }`}>
                        <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                        <p className={`text-[9px] mt-2 font-black uppercase opacity-60 ${m.senderRole === 'clinic' ? 'text-white' : 'text-slate-400'}`}>
                          {m.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newMessage.trim()) return;
                      const msg: ChatMessage = {
                        id: Date.now().toString(),
                        senderId: 'CL1',
                        senderRole: 'clinic',
                        studentName: selectedChat,
                        text: newMessage,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        read: true
                      };
                      setMessages([...messages, msg]);
                      setNewMessage('');
                    }}
                    className="flex gap-3"
                  >
                    <div className="flex-1 relative">
                       <input
                         type="text"
                         value={newMessage}
                         onChange={(e) => setNewMessage(e.target.value)}
                         placeholder="Type your clinical advice or response..."
                         className="w-full pl-6 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-rose-500/50 dark:focus:border-rose-400/50 rounded-2xl text-sm font-bold outline-none transition-all shadow-inner"
                       />
                    </div>
                    <button className="bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-2xl transition-all shadow-xl shadow-rose-200 dark:shadow-none hover:scale-105 active:scale-95">
                      <Send size={24} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/20 dark:bg-slate-900/20">
                <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-[2.5rem] flex items-center justify-center text-rose-300 mb-8 animate-pulse shadow-inner">
                  <MessageSquare size={56} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Parent Support Channel</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-3 text-sm font-medium leading-relaxed italic">Select a conversation from the left to start providing professional medical support to parents.</p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};
