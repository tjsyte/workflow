import React from 'react';
import { Zap, AlertCircle, TrendingUp, Clock } from 'lucide-react';

export default function Automation() {
  const suggestions = [
    {
      title: 'Automate Invoice Generation',
      description: 'Set up automatic invoice generation for recurring clients to save 2-3 hours weekly.',
      impact: 'High',
      effort: 'Medium',
      timesSaved: '2-3 hours/week',
      iconBg: 'bg-accent-blue/20',
      iconColor: 'text-accent-blue',
      impactColor: 'text-accent-green'
    },
    {
      title: 'Task Status Updates',
      description: 'Implement automatic status updates based on task activity to reduce manual updates.',
      impact: 'Medium',
      effort: 'Low',
      timesSaved: '1 hour/week',
      iconBg: 'bg-accent-violet/20',
      iconColor: 'text-accent-violet',
      impactColor: 'text-accent-yellow'
    },
    {
      title: 'Request Approval Workflow',
      description: 'Create an automated approval workflow to streamline the request process.',
      impact: 'High',
      effort: 'High',
      timesSaved: '4-5 hours/week',
      iconBg: 'bg-accent-pink/20',
      iconColor: 'text-accent-pink',
      impactColor: 'text-accent-orange'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-cream-white">Automation Suggestions</h1>

      <div className="sm:grid sm:grid-cols-1 lg:flex lg:flex-col gap-6">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white dark:bg-muted-plum rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 mb-4 sm:mb-4"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 ${suggestion.iconBg} rounded-lg dark:bg-opacity-20`}>
                <Zap className={`w-6 h-6 ${suggestion.iconColor}`} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 dark:text-cream-white">
                  {suggestion.title}
                </h3>
                <p className="text-gray-600 dark:text-soft-lavender mb-4">
                  {suggestion.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className={suggestion.iconColor} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-soft-lavender">Impact</p>
                      <p className={`font-medium dark:${suggestion.impactColor}`}>
                        {suggestion.impact}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className={suggestion.iconColor} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-soft-lavender">Effort</p>
                      <p className="font-medium dark:text-cream-white">
                        {suggestion.effort}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className={suggestion.iconColor} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-soft-lavender">Time Saved</p>
                      <p className="font-medium dark:text-cream-white">
                        {suggestion.timesSaved}
                      </p>
                    </div>
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
