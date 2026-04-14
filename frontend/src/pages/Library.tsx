
import { Book, Search, Filter, Plus, MoreVertical, Bookmark, CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { mockLibrary, mockOverdueLoans } from '../data/mockData';
import { useState } from 'react';

export const Library = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'overdue'>('catalog');
  const [books] = useState(mockLibrary);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Library Management</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Organize school books, track loans, and manage digital resources.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-bold text-sm">
            Loan History
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-bold text-sm">
            <Plus size={18} />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 ${
            activeTab === 'catalog'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Book Catalog
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'overdue'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Overdue Returns
          <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px]">
            {mockOverdueLoans.length}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Book size={24} />
            </div>
            <Bookmark size={20} className="text-white/60" />
          </div>
          <p className="text-blue-100 text-sm font-medium">Total Collection</p>
          <h3 className="text-3xl font-bold mt-1">{books.length} Books</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-100">
            <CheckCircle size={14} />
            <span>12 Categories available</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-lg">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Currently Borrowed</p>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">45</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-amber-600">
            <AlertTriangle size={14} />
            <span>{mockOverdueLoans.length} Overdue returns</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
              <CheckCircle size={24} />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Available Books</p>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">{books.filter(b => b.status === 'Available').length}</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <span>Ready for checkout</span>
          </div>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
              />
            </div>
            <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Book Information</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ISBN</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBooks.map((book: any) => (
                  <tr key={book.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{book.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{book.author}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-400">{book.isbn}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{book.available} / {book.total}</span>
                        <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              (book.available / book.total) < 0.2 ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${(book.available / book.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        book.available > 0
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {book.available > 0 ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Book Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Overdue</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockOverdueLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-rose-50/30 dark:hover:bg-rose-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold text-xs">
                          {loan.studentName[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{loan.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{loan.bookTitle}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Calendar size={14} />
                        {loan.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg border border-rose-100">
                        {loan.daysOverdue} Days
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                        Notify Student
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
