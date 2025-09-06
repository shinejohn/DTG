import { useLoaderData } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Layout } from '@/components/dtg/Layout';
import BusinessCard from '@/components/dtg/business/BusinessCard';
import type { LoaderFunctionArgs } from 'react-router';

interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  address: string;
  phone: string;
  rating: number;
  reviews_count: number;
  price_level: string;
  hours: any;
  image_url: string;
  category: {
    name: string;
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const client = getSupabaseServerClient(request);
  
  // Get restaurants category ID
  const { data: category } = await client
    .from('business_categories')
    .select('id')
    .eq('slug', 'restaurants')
    .single();

  if (!category) {
    throw new Error('Restaurants category not found');
  }

  // Fetch all restaurant businesses
  const { data: businesses, error } = await client
    .from('businesses')
    .select(`
      id,
      name,
      slug,
      description,
      short_description,
      address,
      phone,
      rating,
      reviews_count,
      price_level,
      hours,
      image_url,
      category:business_categories!category_id(name)
    `)
    .eq('category_id', category.id)
    .eq('is_active', true)
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Failed to load restaurants');
  }

  return { businesses: businesses || [] };
}

export default function Restaurants() {
  const { businesses } = useLoaderData<typeof loader>();

  // Transform business data to match BusinessCard props
  const transformedBusinesses = businesses.map(business => ({
    id: business.id,
    name: business.name,
    image: business.image_url || 'https://via.placeholder.com/400x300?text=No+Image',
    category: business.category?.name || 'Restaurant',
    subcategory: '',
    rating: business.rating || 0,
    reviewCount: business.reviews_count || 0,
    priceRange: business.price_level || '$',
    address: business.address || '',
    description: business.short_description || business.description,
    openNow: true, // TODO: Calculate from hours
    tags: [],
    features: []
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
        
        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No restaurants found in this area.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformedBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                variant="grid"
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}