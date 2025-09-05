import React, { useEffect, useState, memo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { StarIcon, CameraIcon, TagIcon, EyeIcon, LockIcon, XIcon, PlusIcon, AlertCircleIcon, CalendarIcon, ChevronDownIcon, CheckIcon } from 'lucide-react';
// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  address: string;
  rating: number;
  reviewCount: number;
}
interface ReviewForm {
  overallRating: number;
  categoryRatings: {
    service: number;
    atmosphere: number;
    value: number;
    food?: number; // for restaurants only
  };
  title: string;
  content: string;
  photos: File[];
  photoPreviewUrls: string[];
  tags: string[];
  visitDate?: string;
  isAnonymous: boolean;
}
// Mock data
const mockBusiness: Business = {
  id: 'b1',
  name: 'Urban Bites Café',
  category: 'Restaurants',
  subcategory: 'Café',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  address: '123 Main Street, Downtown, CA',
  rating: 4.7,
  reviewCount: 243
};
// Available tags for reviews
const availableTags = ['Great Service', 'Good Value', 'Cozy Atmosphere', 'Delicious Food', 'Quick Service', 'Friendly Staff', 'Unique Experience', 'Great Coffee', 'Outdoor Seating', 'Vegetarian Options', 'Vegan Options', 'Gluten-Free Options', 'Great for Groups', 'Romantic', 'Family Friendly', 'Good for Work', 'Free WiFi', 'Pet Friendly'];
export function WriteReview() {
  const {
    businessId
  } = useParams<{
    businessId: string;
  }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // Initialize form state
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    overallRating: 0,
    categoryRatings: {
      service: 0,
      atmosphere: 0,
      value: 0,
      food: 0
    },
    title: '',
    content: '',
    photos: [],
    photoPreviewUrls: [],
    tags: [],
    visitDate: '',
    isAnonymous: false
  });
  // Fetch business data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setBusiness(mockBusiness);
      setLoading(false);
    }, 500);
  }, [businessId]);
  const handleRatingChange = (category: keyof ReviewForm['categoryRatings'] | 'overall', value: number) => {
    if (category === 'overall') {
      setReviewForm(prev => ({
        ...prev,
        overallRating: value
      }));
    } else {
      setReviewForm(prev => ({
        ...prev,
        categoryRatings: {
          ...prev.categoryRatings,
          [category]: value
        }
      }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleTagToggle = (tag: string) => {
    setReviewForm(prev => {
      const currentTags = [...prev.tags];
      if (currentTags.includes(tag)) {
        return {
          ...prev,
          tags: currentTags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...currentTags, tag]
        };
      }
    });
  };
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    // Create preview URLs for the new files
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setReviewForm(prev => ({
      ...prev,
      photos: [...prev.photos, ...newFiles],
      photoPreviewUrls: [...prev.photoPreviewUrls, ...newPreviewUrls]
    }));
  };
  const removePhoto = (index: number) => {
    setReviewForm(prev => {
      const newPhotos = [...prev.photos];
      const newPhotoPreviewUrls = [...prev.photoPreviewUrls];
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(newPhotoPreviewUrls[index]);
      newPhotos.splice(index, 1);
      newPhotoPreviewUrls.splice(index, 1);
      return {
        ...prev,
        photos: newPhotos,
        photoPreviewUrls: newPhotoPreviewUrls
      };
    });
  };
  const toggleAnonymous = () => {
    setReviewForm(prev => ({
      ...prev,
      isAnonymous: !prev.isAnonymous
    }));
  };
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (reviewForm.overallRating === 0) {
      errors.overallRating = 'Please provide an overall rating';
    }
    if (!reviewForm.content.trim()) {
      errors.content = 'Please write a review';
    } else if (reviewForm.content.trim().length < 50) {
      errors.content = 'Your review should be at least 50 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }
    // In a real app, this would send the review data to an API
    console.log('Submitting review:', reviewForm);
    // Navigate to the business page after submission
    navigate(`/business/${businessId}`);
  };
  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  if (!business) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Business Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The business you're trying to review doesn't exist or has been
              removed.
            </p>
            <Link to="/explore" className="text-blue-600 hover:text-blue-800 font-medium">
              Browse businesses
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  const renderStarRating = (category: keyof ReviewForm['categoryRatings'] | 'overall', currentRating: number, label: string) => <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" onClick={() => handleRatingChange(category, star)} className={`w-8 h-8 ${star <= currentRating ? 'text-yellow-400' : 'text-gray-300'}`}>
            <StarIcon className="w-full h-full" />
          </button>)}
        <span className="ml-2 text-sm text-gray-600">
          {currentRating > 0 ? category === 'overall' ? currentRating === 1 ? 'Poor' : currentRating === 2 ? 'Fair' : currentRating === 3 ? 'Good' : currentRating === 4 ? 'Very Good' : 'Excellent' : currentRating === 1 ? 'Poor' : currentRating === 2 ? 'Fair' : currentRating === 3 ? 'Good' : currentRating === 4 ? 'Very Good' : 'Excellent' : 'Select a rating'}
        </span>
      </div>
      {formErrors[category === 'overall' ? 'overallRating' : category] && <p className="text-red-500 text-sm mt-1 error-message">
          {formErrors[category === 'overall' ? 'overallRating' : category]}
        </p>}
    </div>;
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Business Summary */}
            <div className="p-6 bg-gray-50 border-b">
              <div className="flex items-center">
                <img src={business.image} alt={business.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h1 className="text-xl font-bold">{business.name}</h1>
                  <div className="text-sm text-gray-600">
                    {business.category}{' '}
                    {business.subcategory && `• ${business.subcategory}`}
                  </div>
                  <div className="text-sm text-gray-600">
                    {business.address}
                  </div>
                </div>
              </div>
            </div>
            {/* Review Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-xl font-bold mb-6">Write Your Review</h2>
              {/* Overall Rating */}
              {renderStarRating('overall', reviewForm.overallRating, 'Overall Rating')}
              {/* Category Ratings */}
              <div className="mt-6 mb-4">
                <h3 className="text-lg font-medium mb-3">Category Ratings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderStarRating('service', reviewForm.categoryRatings.service, 'Service')}
                  {renderStarRating('atmosphere', reviewForm.categoryRatings.atmosphere, 'Atmosphere')}
                  {renderStarRating('value', reviewForm.categoryRatings.value, 'Value')}
                  {business.category === 'Restaurants' && renderStarRating('food', reviewForm.categoryRatings.food || 0, 'Food')}
                </div>
              </div>
              {/* Review Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title (Optional)
                </label>
                <input type="text" id="title" name="title" value={reviewForm.title} onChange={handleInputChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Summarize your experience" />
              </div>
              {/* Review Content */}
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea id="content" name="content" rows={6} value={reviewForm.content} onChange={handleInputChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Share details about your experience at this business"></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  {reviewForm.content.length} / 2000 characters
                </p>
                {formErrors.content && <p className="text-red-500 text-sm mt-1 error-message">
                    {formErrors.content}
                  </p>}
              </div>
              {/* Photo Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Photos (Optional)
                </label>
                <div className="flex flex-wrap gap-4">
                  {/* Photo previews */}
                  {reviewForm.photoPreviewUrls.map((url, index) => <div key={index} className="relative w-24 h-24">
                      <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                      <button type="button" onClick={() => removePhoto(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>)}
                  {/* Upload button */}
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                    <CameraIcon className="w-8 h-8 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Add Photo</span>
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  You can upload up to 10 photos
                </p>
              </div>
              {/* Visit Date */}
              <div className="mb-6">
                <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-1">
                  When did you visit? (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="date" id="visitDate" name="visitDate" value={reviewForm.visitDate} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => <button key={tag} type="button" onClick={() => handleTagToggle(tag)} className={`px-3 py-1.5 rounded-full text-sm ${reviewForm.tags.includes(tag) ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'}`}>
                      {tag}
                    </button>)}
                </div>
              </div>
              {/* Visibility Settings */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Privacy Settings
                </label>
                <div className="flex items-center">
                  <button type="button" onClick={toggleAnonymous} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${reviewForm.isAnonymous ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${reviewForm.isAnonymous ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                  <span className="ml-3 text-sm text-gray-700">
                    Post anonymously
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {reviewForm.isAnonymous ? "Your name and profile picture won't be shown with this review" : 'Your name and profile picture will be shown with this review'}
                </p>
              </div>
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={handlePreview} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <EyeIcon className="w-4 h-4 inline-block mr-1.5" />
                  Preview
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* Review Preview Modal */}
      {showPreview && <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Review Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                {!reviewForm.isAnonymous ? <>
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Your profile" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-gray-600">Just now</div>
                    </div>
                  </> : <>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <UserIcon className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium">Anonymous</div>
                      <div className="text-sm text-gray-600">Just now</div>
                    </div>
                  </>}
              </div>
              <div className="mb-3">
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-5 h-5 ${i < reviewForm.overallRating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                </div>
                {reviewForm.title && <h4 className="text-lg font-semibold mb-2">
                    {reviewForm.title}
                  </h4>}
                <p className="text-gray-700 whitespace-pre-line">
                  {reviewForm.content}
                </p>
              </div>
              {reviewForm.photoPreviewUrls.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
                  {reviewForm.photoPreviewUrls.map((url, index) => <img key={index} src={url} alt={`Review photo ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />)}
                </div>}
              {reviewForm.tags.length > 0 && <div className="flex flex-wrap gap-1 mb-4">
                  {reviewForm.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                      {tag}
                    </span>)}
                </div>}
              {reviewForm.visitDate && <div className="text-sm text-gray-600 mb-4">
                  <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                  Visited on{' '}
                  {new Date(reviewForm.visitDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
                </div>}
              <div className="pt-4 border-t mt-4">
                <h4 className="font-medium mb-2">Category Ratings</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-600">Service</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < reviewForm.categoryRatings.service ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Atmosphere</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < reviewForm.categoryRatings.atmosphere ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Value</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < reviewForm.categoryRatings.value ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                    </div>
                  </div>
                  {business.category === 'Restaurants' && reviewForm.categoryRatings.food && <div>
                        <div className="text-gray-600">Food</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < reviewForm.categoryRatings.food ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                      </div>}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-2">
                Edit Review
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Submit Review
              </button>
            </div>
          </div>
        </div>}
      <Footer />
    </div>;
}