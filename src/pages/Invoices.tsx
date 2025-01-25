import React, { useState } from 'react';
import { Plus, Download, Trash2 } from 'lucide-react';
import { Invoice } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id' | 'createdAt'>>({
    clientName: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
    dueDate: ''
  });

  const addItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: '', quantity: 1, rate: 0 }]
    });
  };

  const updateItem = (index: number, field: keyof typeof newInvoice.items[0], value: string | number) => {
    const updatedItems = newInvoice.items.map((item, i) => {
      if (i === index) {
        const updatedValue = field === 'quantity' ? 
          Math.max(1, parseInt(value.toString()) || 1) : 
          field === 'rate' ? 
            Math.max(0, parseFloat(value.toString()) || 0) : 
            value;
        return { ...item, [field]: updatedValue };
      }
      return item;
    });
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  const removeItem = (index: number) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((_, i) => i !== index)
    });
  };

  const createInvoice = () => {
    if (!newInvoice.clientName || !newInvoice.dueDate) return;

    const invoice: Invoice = {
      id: uuidv4(),
      ...newInvoice,
      createdAt: new Date().toISOString()
    };

    setInvoices([...invoices, invoice]);
    setNewInvoice({
      clientName: '',
      items: [{ description: '', quantity: 1, rate: 0 }],
      dueDate: ''
    });
  };

  const downloadPDF = (invoice: Invoice) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Client: ${invoice.clientName}`, 20, 40);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 20, 50);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 20, 60);
    
    let y = 80;
    doc.text('Description', 20, y);
    doc.text('Qty', 120, y);
    doc.text('Rate', 140, y);
    doc.text('Amount', 160, y);
    
    y += 10;
    let total = 0;
    
    invoice.items.forEach(item => {
      const amount = item.quantity * item.rate;
      total += amount;
      
      doc.text(item.description, 20, y);
      doc.text(item.quantity.toString(), 120, y);
      doc.text(`$${item.rate}`, 140, y);
      doc.text(`$${amount}`, 160, y);
      
      y += 10;
    });
    
    doc.text(`Total: $${total}`, 160, y + 10);
    
    doc.save(`invoice-${invoice.id}.pdf`);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-cream-white">Invoices</h1>

      <div className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-emerald-300">Create New Invoice</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Client Name"
            value={newInvoice.clientName}
            onChange={(e) => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
          />
          
          <input
            type="date"
            value={newInvoice.dueDate}
            onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white"
          />

          <div className="space-y-4">
            {newInvoice.items.map((item, index) => (
              <div key={index} className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="flex-1 min-w-[200px] p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
                />
                <div className="flex sm:gap-4 items-center w-full sm:w-auto">
                <input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                  className="w-24 p-2 mr-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', e.target.value)}
                  className="w-32 p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white"
                />
                <button
                  onClick={() => removeItem(index)}
                  className="sm:ml-2 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="flex items-center px-4 py-2 text-primary-purple dark:text-emerald-300 hover:bg-gray-50 dark:hover:bg-emerald-900/20 rounded"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>

          <button
            onClick={createInvoice}
            className="w-full px-4 py-2 bg-primary-purple dark:bg-emerald-600 text-white rounded hover:opacity-90"
          >
            Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map(invoice => (
          <div
            key={invoice.id}
            className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <h3 className="text-lg font-semibold dark:text-cream-white">{invoice.clientName}</h3>
                <p className="text-gray-600 dark:text-emerald-300">
                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <p className="font-semibold dark:text-teal-300">Items:</p>
                  {invoice.items.map((item, index) => (
                    <p key={index} className="text-gray-600 dark:text-soft-lavender">
                      {item.description} - {item.quantity} x ${item.rate}
                    </p>
                  ))}
                </div>
              </div>
              <button
                onClick={() => downloadPDF(invoice)}
                className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary-purple dark:bg-emerald-600 text-white rounded hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
