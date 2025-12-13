import React, { useEffect, useState } from 'react';
import { getJSON, postJSON } from '../../utils/api';
import SweetCard from './SweetCard';

const SweetsList = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ q: '', sort: null });

  const role = localStorage.getItem('role');

  async function loadSweets(q) {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (q?.q) qs.set('q', q.q);
      if (q?.sort) qs.set('sort', q.sort);
      const path = qs.toString() ? `/api/sweets/search?${qs.toString()}` : '/api/sweets';
      const res = await getJSON(path);
      setSweets(res.sweets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSweets(); }, []);

  async function handlePurchase(sweet) {
    try {
      const token = localStorage.getItem('token');
      await postJSON(`/api/sweets/${sweet._id}/purchase`, { quantity: 1 }, token);
      loadSweets(query);
      alert('Purchase successful');
    } catch (err) {
      alert(err.message || 'Purchase failed');
    }
  }



 

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Available Sweets</h2>
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <input
          className="p-2 border rounded flex-1"
          placeholder="Search name or category"
          value={query.q}
          onChange={e => {
            const newQuery = { ...query, q: e.target.value };
            setQuery(newQuery);
            loadSweets(newQuery);
          }}
        />
        <select
          className="p-2 border rounded"
          value={query.sort || ''}
          onChange={e => {
            const val = e.target.value || null;
            const newQuery = { ...query, sort: val };
            setQuery(newQuery);
            loadSweets(newQuery);
          }}
        >
          <option value="">No Sort</option>
          <option value="price_asc">Price: low → high</option>
          <option value="price_desc">Price: high → low</option>
        </select>
      </div>
      {query.q && <div className="text-sm text-gray-600 mb-3">Searching for: "{query.q}"</div>}

      {loading ? <div>Loading...</div> : (
        sweets.length === 0 ? (
          <div className="text-gray-600">No sweets found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {sweets.map(s => (
              <SweetCard key={s._id} sweet={s} onPurchase={handlePurchase} isAdmin={role === 'admin'} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default SweetsList;
