import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, putJSON, deleteJSON } from '../../utils/api';

const AdminSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: '', image: '', category: '', price: '', description: '', quantity: 0 });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);



  const token = localStorage.getItem('token');

  async function loadSweets() {
    setLoading(true);
    try {
      const res = await getJSON('/api/sweets', token);
      setSweets(res.sweets || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSweets(); }, []);

  

  async function handleDelete(sweet) {
    try {
      await deleteJSON(`/api/sweets/${sweet._id}`, token);
      loadSweets();
    } catch (err) {
      alert('Delete failed');
    }
  }

  async function handleRestock(sweet) {
    const qty = Number(prompt('Quantity to add', '10')) || 0;
    if (qty <= 0) return;
    try {
      await postJSON(`/api/sweets/${sweet._id}/restock`, { quantity: qty }, token);
      loadSweets();
    } catch (err) {
      alert('Restock failed');
    }
  }

  function startEdit(sweet) {
    setEditingId(sweet._id);
    setEditForm({ name: sweet.name, image: sweet.image || '', category: sweet.category || '', price: sweet.price || 0, description: sweet.description || '', quantity: sweet.quantity || 0 });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function saveEdit(id) {
    try {
      await putJSON(`/api/sweets/${id}`, { ...editForm, price: Number(editForm.price), quantity: Number(editForm.quantity) }, token);
      cancelEdit();
      loadSweets();
    } catch (err) {
      alert('Update failed');
    }
  }

  async function handleCreate() {
    try {
      await postJSON('/api/sweets', { ...form, price: Number(form.price), quantity: Number(form.quantity) }, token);
      setForm({ name: '', image: '', category: '', price: '', description: '', quantity: 0 });
      setShowModal(false);
      loadSweets();
    } catch (err) {
      alert(err.message || 'Create failed');
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Admin Sweets Management</h2>
        <button onClick={() => setShowModal(true)} className="px-3 py-2 bg-purple-600 text-white rounded">Add New Sweet</button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add New Sweet</h3>
              <button className="text-gray-600" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={async (e) => { e.preventDefault(); await handleCreate(); }} className="flex flex-col gap-3">
              <input className="p-2 border rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input className="p-2 border rounded" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
              <div className="flex gap-2">
                <input className="p-2 border rounded w-24" placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                <input className="p-2 border rounded w-24" placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
                <input className="p-2 border rounded" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
              </div>
              <input className="p-2 border rounded w-full" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <div className="flex gap-2 justify-end">
                <button type="button" className="px-3 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sweets.map(s => (
            <div key={s._id} className="border rounded p-3 w-full bg-white shadow-sm">
              {editingId === s._id ? (
                <div className="flex flex-col gap-2">
                  <input className="p-2 border rounded" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                  <input className="p-2 border rounded" value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} />
                  <input className="p-2 border rounded" type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
                  <input className="p-2 border rounded" type="number" value={editForm.quantity} onChange={e => setEditForm({ ...editForm, quantity: e.target.value })} />
                  <input className="p-2 border rounded" value={editForm.image} onChange={e => setEditForm({ ...editForm, image: e.target.value })} />
                  <textarea className="p-2 border rounded" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={() => saveEdit(s._id)}>Save</button>
                    <button className="px-3 py-2 bg-gray-300 rounded" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium">{s.name}</h3>
                  <div className="text-sm text-gray-600">Category: {s.category}</div>
                  <div className="mt-1 flex items-center justify-between text-sm text-gray-700">
                    <div className="font-medium">₹{typeof s.price === 'number' ? s.price.toFixed(2) : s.price}</div>
                    <div className="text-gray-600">Qty: {s.quantity}</div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded" onClick={() => handleRestock(s)}>Restock</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(s)}>Delete</button>
                    <button className="px-3 py-1 border rounded" onClick={() => startEdit(s)}>Edit</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSweets;
