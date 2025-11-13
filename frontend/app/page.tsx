'use client';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
const supabase = createClient('https://yowxmyryujzttuhzlkje.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlvd3hteXJ5dWp6dHR1aHpsa2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMjI2ODIsImV4cCI6MjA3ODU5ODY4Mn0.yg08Fy7WyfPXLTPkldw_ZIONlnEWNByPgnnnYuz03fI');
export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const handleSearch = async () => {
    const { data: clients } = await supabase.from('clients').select('id, name').ilike('name', `%${search}%`).limit(3);
    const { data: policies } = await supabase.from('policies').select('id, policy_no').ilike('policy_no', `%${search}%`).limit(3);
    setResults([...(clients || []), ...(policies || [])]);
  };
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">BrokerOS Australia</h1>
      <div className="flex gap-2 mb-6">
        <input type="text" placeholder="Search clients, policies..." className="flex-1 px-4 py-2 border rounded-lg" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
        <button onClick={handleSearch} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Search</button>
      </div>
      {results.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="font-semibold mb-2">Results</h3>
          {results.map((r) => (
            <div key={r.id} className="py-1">{r.name ? `Client: ${r.name}` : `Policy: ${r.policy_no}`}</div>
          ))}
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow text-center"><h3 className="text-lg font-semibold">Renewals</h3><p className="text-3xl font-bold text-blue-600">0</p></div>
        <div className="bg-white p-6 rounded-lg shadow text-center"><h3 className="text-lg font-semibold">Bound Today</h3><p className="text-3xl font-bold text-green-600">0</p></div>
        <div className="bg-white p-6 rounded-lg shadow text-center"><h3 className="text-lg font-semibold">Premium</h3><p className="text-3xl font-bold text-purple-600">$0</p></div>
      </div>
    </div>
  );
}
