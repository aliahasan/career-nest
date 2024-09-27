import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <div className="bg-[#6C63FF] flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 rounded-2xl my-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6 text-center">
        New Things Will Always <br /> Update Regularly
      </h2>

      <div className="w-full max-w-lg flex items-center">
        <div className="flex-grow relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email here"
            className="appearance-none w-full px-4 pl-10 py-3 pr-16 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l7.89 5.26a1 1 0 001.22 0L20 8"></path>
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            </svg>
          </div>
        </div>
        <Button
          onClick={handleSubscribe}
          className="ml-4 py-6 px-6 "
        >
          Subscribe
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl lg:grid-cols-4">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="author5.jpg" alt="People" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="/author3.jpg" alt="Meeting" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="/author6.jpg" alt="Discussion" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="author1.jpg" alt="Discussion" className="w-full h-full object-cover" />
        </div>
       
      </div>
    </div>
  );
}
