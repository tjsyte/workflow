export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
  }>;
  createdAt: string;
  dueDate: string;
}