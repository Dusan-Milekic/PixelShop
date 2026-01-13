import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, LogOut, Edit2, Save, X, Camera } from 'lucide-react';
import Navigation from './components/user/Navigation';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    id: '',
    full_name: '',
    email: ''
  });

  const [editData, setEditData] = useState({
    full_name: '',
    email: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper funkcije za cookies
  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  };

  // Učitaj korisničke podatke iz cookies
  useEffect(() => {
    const userCookie = getCookie('user');
    const token = getCookie('token');
    const savedImage = localStorage.getItem('profileImage');

    if (!token || !userCookie) {
      window.location.href = '/account';
      return;
    }

    if (savedImage) {
      setProfileImage(savedImage);
    }

    try {
      const user = JSON.parse(userCookie);
      setUserData(user);
      setEditData({
        full_name: user.full_name,
        email: user.email
      });
    } catch (e) {
      console.error('Error parsing user data:', e);
      window.location.href = '/account';
    }
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Proveri da li je fajl slika
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Proveri veličinu (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Ovde bi trebalo da pozoveš API za update korisnika
      // const response = await axios.put(`http://localhost:8000/api/user/${userData.id}`, editData);
      
      // Za sada samo ažuriraj cookie
      const updatedUser = {
        ...userData,
        full_name: editData.full_name,
        email: editData.email
      };
      
      setCookie('user', JSON.stringify(updatedUser), 5);
      setUserData(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      full_name: userData.full_name,
      email: userData.email
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('user');
    localStorage.removeItem('profileImage');
    window.location.href = '/account';
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-neutral-800 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            My Profile
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Manage your account settings and preferences
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Profile Image */}
                  <div className="relative group">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-indigo-600" />
                      )}
                    </div>
                    
                    {/* Camera Icon Overlay */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                    
                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">{userData.full_name}</h2>
                    <p className="text-indigo-200">{userData.email}</p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {/* Remove Image Button */}
              {profileImage && (
                <div className="mt-4">
                  <button
                    onClick={handleRemoveImage}
                    className="text-sm text-indigo-200 hover:text-white underline"
                  >
                    Remove profile picture
                  </button>
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="p-8 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                      type="text"
                      name="full_name"
                      value={editData.full_name}
                      onChange={handleEditChange}
                      className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 bg-neutral-900 px-4 py-3 rounded-lg">
                    <User className="w-5 h-5 text-neutral-500" />
                    <span className="text-white">{userData.full_name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 bg-neutral-900 px-4 py-3 rounded-lg">
                    <Mail className="w-5 h-5 text-neutral-500" />
                    <span className="text-white">{userData.email}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing ? (
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 flex items-center justify-center space-x-2 bg-neutral-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-600 transition-colors duration-300"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-neutral-700">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-neutral-800 p-6 rounded-xl border border-neutral-700">
            <h3 className="text-xl font-bold text-white mb-4">Account Information</h3>
            <div className="space-y-3 text-neutral-400">
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Member Since:</span>
                <span className="text-white">January 2025</span>
              </div>
              <div className="flex justify-between">
                <span>User ID:</span>
                <span className="text-white font-mono">{userData.id}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}