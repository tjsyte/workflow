import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Request } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function Requests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    budget: 0,
    timeline: ''
  });

  const statusColors = {
    pending: 'bg-yellow-100 dark:bg-yellow-500 text-yellow-800 dark:text-white',
    approved: 'bg-green-100 dark:bg-green-500 text-green-800 dark:text-white',
    rejected: 'bg-red-100 dark:bg-red-500 text-red-800 dark:text-white'
  };

  const submitRequest = () => {
    if (!newRequest.title || !newRequest.description) return;

    const request: Request = {
      id: uuidv4(),
      ...newRequest,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setRequests([...requests, request]);
    setNewRequest({
      title: '',
      description: '',
      budget: 0,
      timeline: ''
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-cream-white">Requests</h1>

      <div className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-fuchsia-300">Submit New Request</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Request title"
            value={newRequest.title}
            onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
          />
          
          <textarea
            placeholder="Description"
            value={newRequest.description}
            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
            rows={4}
          />
          
          <input
            type="number"
            placeholder="Budget"
            value={newRequest.budget}
            onChange={(e) => setNewRequest({ ...newRequest, budget: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
          />
          
          <input
            type="text"
            placeholder="Timeline (e.g., '2 weeks', '3 months')"
            value={newRequest.timeline}
            onChange={(e) => setNewRequest({ ...newRequest, timeline: e.target.value })}
            className="w-full p-2 border rounded dark:bg-deep-purple dark:border-light-lavender dark:text-cream-white dark:placeholder-gray-400"
          />

          <button
            onClick={submitRequest}
            className="flex items-center px-4 py-2 bg-primary-purple dark:bg-fuchsia-600 text-white rounded hover:opacity-90"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Request
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {requests.map(request => (
          <div
            key={request.id}
            className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold dark:text-cream-white">{request.title}</h3>
                <p className="text-gray-600 dark:text-soft-lavender mt-2">
                  {request.description}
                </p>
                <div className="mt-4 flex gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-fuchsia-300">Budget</p>
                    <p className="font-semibold dark:text-cream-white">${request.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-pink-300">Timeline</p>
                    <p className="font-semibold dark:text-cream-white">{request.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-purple-300">Status</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[request.status]}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}