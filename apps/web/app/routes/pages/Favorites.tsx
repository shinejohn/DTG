import React, { useEffect, useState, Component } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import Footer from '@/components/dtg/Footer';
import { SearchIcon, FilterIcon, HeartIcon, XIcon, PlusIcon, FolderIcon, ListIcon, GridIcon, MoreHorizontalIcon, EditIcon, TrashIcon } from 'lucide-react';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  address: string;
  distance?: string;
  tags?: string[];
  savedAt: string;
}
interface CustomList {
  id: string;
  name: string;
  description?: string;
  businessIds: string[];
  createdAt: string;
  updatedAt: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Business[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Business[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lists, setLists] = useState<CustomList[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [loading, setLoading] = useState(true);
  // Get unique categories from favorites
  const categories = Array.from(new Set(favorites.map(business => business.category)));
  // Fetch favorites data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    setLoading(true);
    setTimeout(() => {
      setFavorites(mockFavorites);
      setFilteredFavorites(mockFavorites);
      setLists(mockLists);
      setLoading(false);
    }, 500);
  }, []);
  // Filter favorites based on search query and selected category
  useEffect(() => {
    let result = [...favorites];
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(business => business.name.toLowerCase().includes(query) || business.subcategory?.toLowerCase().includes(query) || business.tags?.some(tag => tag.toLowerCase().includes(query)));
    }
    // Filter by category
    if (selectedCategory) {
      result = result.filter(business => business.category === selectedCategory);
    }
    // Filter by selected list
    if (selectedList) {
      const list = lists.find(l => l.id === selectedList);
      if (list) {
        result = result.filter(business => list.businessIds.includes(business.id));
      }
    }
    setFilteredFavorites(result);
  }, [favorites, searchQuery, selectedCategory, selectedList, lists]);
  // Handle removing a business from favorites
  const handleRemoveFavorite = (businessId: string) => {
    setFavorites(prev => prev.filter(business => business.id !== businessId));
    // Also remove from any lists
    setLists(prev => prev.map(list => ({
      ...list,
      businessIds: list.businessIds.filter(id => id !== businessId)
    })));
  };
  // Handle creating a new list
  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList: CustomList = {
        id: `l${lists.length + 1}`,
        name: newListName.trim(),
        description: newListDescription.trim() || undefined,
        businessIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setLists(prev => [...prev, newList]);
      setNewListName('');
      setNewListDescription('');
      setIsCreateListModalOpen(false);
    }
  };
  // Handle adding a business to a list
  const handleAddToList = (businessId: string, listId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId && !list.businessIds.includes(businessId)) {
        return {
          ...list,
          businessIds: [...list.businessIds, businessId],
          updatedAt: new Date().toISOString()
        };
      }
      return list;
    }));
  };
  // Handle removing a business from a list
  const handleRemoveFromList = (businessId: string, listId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          businessIds: list.businessIds.filter(id => id !== businessId),
          updatedAt: new Date().toISOString()
        };
      }
      return list;
    }));
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Favorites</h1>
          <div className="flex items-center space-x-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              <GridIcon className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="font-semibold text-lg mb-4">Filter By</h2>
              {/* Search Input */}
              <div className="relative mb-4">
                <input type="text" placeholder="Search favorites..." className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              {/* Category Filters */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 flex items-center">
                  <FilterIcon className="w-4 h-4 mr-1" /> Categories
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <button className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === null ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} `} onClick={() => setSelectedCategory(null)}>
                      All Categories
                    </button>
                  </div>
                  {categories.map(category => <div key={category} className="flex items-center">
                      <button className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} `} onClick={() => setSelectedCategory(category)}>
                        {category}
                      </button>
                    </div>)}
                </div>
              </div>
              {/* Custom Lists */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium flex items-center">
                    <FolderIcon className="w-4 h-4 mr-1" /> Your Lists
                  </h3>
                  <button onClick={() => setIsCreateListModalOpen(true)} className="text-blue-600 hover:text-blue-800">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <button className={`w-full text-left px-3 py-2 rounded-md ${selectedList === null ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} `} onClick={() => setSelectedList(null)}>
                      All Favorites
                    </button>
                  </div>
                  {lists.map(list => <div key={list.id} className="flex items-center justify-between group">
                      <button className={`flex-grow text-left px-3 py-2 rounded-md ${selectedList === list.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} `} onClick={() => setSelectedList(list.id)}>
                        {list.name}
                        <span className="text-xs text-gray-500 ml-1">
                          ({list.businessIds.length})
                        </span>
                      </button>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <EditIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="md:w-3/4">
            {loading ? <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div> : filteredFavorites.length === 0 ? <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  No favorites found
                </h2>
                <p className="text-gray-600 mb-4">
                  {searchQuery || selectedCategory || selectedList ? "We couldn't find any favorites matching your filters." : "You haven't saved any businesses to your favorites yet."}
                </p>
                {(searchQuery || selectedCategory || selectedList) && <button onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setSelectedList(null);
            } } className="text-blue-600 hover:text-blue-800 font-medium">
                    Clear all filters
                  </button>}
              </div> : <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredFavorites.length} of {favorites.length} {' '}
                    favorites
                  </p>
                  <div>
                    <select className="border rounded-md p-2 text-sm">
                      <option>Sort by: Recently Saved</option>
                      <option>Sort by: Name (A-Z)</option>
                      <option>Sort by: Highest Rated</option>
                    </select>
                  </div>
                </div>
                {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFavorites.map(business => <BusinessCard key={business.id} business={business} lists={lists} onRemove={handleRemoveFavorite} onAddToList={handleAddToList} onRemoveFromList={handleRemoveFromList} />)}
                  </div> : <div className="space-y-4">
                    {filteredFavorites.map(business => <BusinessListItem key={business.id} business={business} lists={lists} onRemove={handleRemoveFavorite} onAddToList={handleAddToList} onRemoveFromList={handleRemoveFromList} />)}
                  </div>}
              </>}
          </div>
        </div>
      </main>
      {/* Create List Modal */} {isCreateListModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New List</h2>
              <button onClick={() => setIsCreateListModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">List Name</label>
              <input type="text" className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Date Night, Quick Lunch" value={newListName} onChange={e => setNewListName(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="What kind of places are in this list?" rows={3} value={newListDescription} onChange={e => setNewListDescription(e.target.value)}></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsCreateListModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleCreateList} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={!newListName.trim()}>
                Create List
              </button>
            </div>
          </div>
        </div>}
      <Footer />
    </div>;
}
// Business Card Component
interface BusinessCardProps {
  business: Business;
  lists: CustomList[];
  onRemove: (id: string) => void;
  onAddToList: (businessId: string, listId: string) => void;
  onRemoveFromList: (businessId: string, listId: string) => void;
}
function BusinessCard({
  business,
  lists,
  onRemove,
  onAddToList,
  onRemoveFromList
}: BusinessCardProps) {
  const [isListMenuOpen, setIsListMenuOpen] = useState(false);
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <div className="relative">
        <img src={business.image} alt={business.name} className="w-full h-40 object-cover" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onRemove(business.id)} className="p-1.5 bg-white rounded-full text-gray-700 hover:text-red-600 shadow-sm" title="Remove from favorites">
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold mb-1">
              <a href={`/business/${business.id} `} className="hover:text-blue-600">
                {business.name}
              </a>
            </h3>
            <div className="text-sm text-gray-600 mb-1">
              {business.subcategory || business.category}
            </div>
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => <svg key={i} className={`w-4 h-4 ${i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>)}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                {business.rating} ({business.reviewCount})
              </span>
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setIsListMenuOpen(!isListMenuOpen)} className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <MoreHorizontalIcon className="w-4 h-4" />
            </button>
            {isListMenuOpen && <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-600 border-b">
                  Add to List
                </div>
                {lists.map(list => {
              const isInList = list.businessIds.includes(business.id);
              return <button key={list.id} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center justify-between" onClick={() => {
                isInList ? onRemoveFromList(business.id, list.id) : onAddToList(business.id, list.id);
                setIsListMenuOpen(false);
              }}>
                      <span>{list.name}</span>
                      {isInList && <CheckIcon className="w-4 h-4 text-blue-600" />}
                    </button>;
            })}
                <div className="border-t">
                  <button onClick={() => {
                onRemove(business.id);
                setIsListMenuOpen(false);
              } } className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Remove from favorites
                  </button>
                </div>
              </div>}
          </div>
        </div>
        <div className="text-sm text-gray-600">{business.address}</div>
        <div className="text-sm text-gray-600">{business.priceRange}</div>
        {business.tags && <div className="mt-2 flex flex-wrap gap-1">
            {business.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {tag}
              </span>)}
          </div>}
      </div>
    </div>;
}
// Business List Item Component
function BusinessListItem({
  business,
  lists,
  onRemove,
  onAddToList,
  onRemoveFromList
}: BusinessCardProps) {
  const [isListMenuOpen, setIsListMenuOpen] = useState(false);
  return <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4 group">
      <div className="flex-shrink-0">
        <img src={business.image} alt={business.name} className="w-24 h-24 object-cover rounded-md" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold mb-1">
              <a href={`/business/${business.id} `} className="hover:text-blue-600">
                {business.name}
              </a>
            </h3>
            <div className="text-sm text-gray-600 mb-1">
              {business.subcategory || business.category}
            </div>
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => <svg key={i} className={`w-4 h-4 ${i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>)}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                {business.rating} ({business.reviewCount})
              </span>
              <span className="mx-2">•</span>
              <span className="text-sm text-gray-600">
                {business.priceRange}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <button onClick={() => setIsListMenuOpen(!isListMenuOpen)} className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full" title="Add to list">
                <FolderIcon className="w-4 h-4" />
              </button>
              {isListMenuOpen && <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-600 border-b">
                    Add to List
                  </div>
                  {lists.map(list => {
                const isInList = list.businessIds.includes(business.id);
                return <button key={list.id} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center justify-between" onClick={() => {
                  isInList ? onRemoveFromList(business.id, list.id) : onAddToList(business.id, list.id);
                  setIsListMenuOpen(false);
                }}>
                        <span>{list.name}</span>
                        {isInList && <CheckIcon className="w-4 h-4 text-blue-600" />}
                      </button>;
              })}
                </div>}
            </div>
            <button onClick={() => onRemove(business.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full" title="Remove from favorites">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600">{business.address}</div>
        {business.tags && <div className="mt-2 flex flex-wrap gap-1">
            {business.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {tag}
              </span>)}
          </div>}
      </div>
    </div>;
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>;
}
