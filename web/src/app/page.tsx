'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  'https://yowxmyryujzttuhzlkje.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlvd3hteXJ5dWp6dHR1aHpsa2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMjI2ODIsImV4cCI6MjA3ODU5ODY4Mn0.yg08Fy7WyfPXLTPkldw_ZIONlnEWNByPgnnnYuz03fI'
);

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [renewals, setRenewals] = useState(0);

  useEffect(() => {
    const countRenewals = async () => {
      const { data } = await supabase
        .from('policies')
        .select('id', { count: 'exact' })
        .eq('status', 'bound')
        .gte('end_date', new Date().toISOString().split('T')[0])
        .lte('end_date', new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]);
      setRenewals(data?.length || 0);
    };
    countRenewals();
  }, []);

  const handleSearch = async () => {
    const { data: clients } = await supabase
      .from('clients')
      .select('id, name, abn')
      .ilike('name', `%${search}%`)
      .limit(5);

    const { data: policies } = await supabase
      .from('policies')
      .select('id, policy_no, status')
      .ilike('policy_no', `%${search}%`)
      .limit(5);

    setResults([...(clients || []), ...(policies || [])]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">BrokerOS Australia</h1>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search clients, policies, quotes..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Search
          </button>
        </div>

        {results.length > 0 && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Results</h3>
            {results.map((r: any) => (
              <div key={r.id} className="py-1">
                {r.name ? `Client: ${r.name} (ABN: ${r.abn || '—'})` : `Policy: ${r.policy_no}`}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Upcoming Renewals (30d)</h3>
            <p className="text-3xl font-bold text-blue-600">{renewals}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Bound Today</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Premium (MTD)</h3>
            <p className="text-3xl font-bold text-purple-600">$0</p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/clients/new" className="px-4 py-2 bg-indigo-600 text-white rounded">+ New Client</a>
          <a href="/policies/new" className="px-4 py-2 bg-teal-600 text-white rounded">+ New Policy</a>
          <a href="/admin/policy-types" className="px-4 py-2 bg-gray-700 text-white rounded">Admin</a>
        </div>
      </div>
    </div>
  );
}
