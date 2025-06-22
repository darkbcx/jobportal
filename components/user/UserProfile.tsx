'use client';

import React, { useState } from 'react';
import { useUserProfile, useUser, isJobSeeker, isEmployer, isAdmin } from '@/lib/contexts/UserContext';

export const UserProfile: React.FC = () => {
  const { user, updateUser } = useUserProfile();
  const { logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: isJobSeeker(user) ? user.first_name : '',
    lastName: isJobSeeker(user) ? user.last_name : '',
    companyName: isEmployer(user) ? user.company_name : '',
    bio: isJobSeeker(user) ? user.bio || '' : '',
    location: isJobSeeker(user) ? user.location || '' : '',
  });

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(formData);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={!isJobSeeker(user)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={!isJobSeeker(user)}
              />
            </div>
          </div>

          {isEmployer(user) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {isJobSeeker(user) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">User Type</label>
              <p className="text-gray-900 capitalize">{user.user_type.replace('_', ' ').toLowerCase()}</p>
            </div>
          </div>

          {isJobSeeker(user) && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <p className="text-gray-900">{user.first_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <p className="text-gray-900">{user.last_name}</p>
                </div>
              </div>
              {user.location && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-900">{user.location}</p>
                </div>
              )}
              {user.bio && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <p className="text-gray-900">{user.bio}</p>
                </div>
              )}
            </>
          )}

          {isEmployer(user) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <p className="text-gray-900">{user.company_name}</p>
            </div>
          )}

          {isAdmin(user) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Level</label>
              <p className="text-gray-900 capitalize">{user.admin_level.replace('_', ' ').toLowerCase()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 