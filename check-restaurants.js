const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRestaurants() {
  // Check if restaurants category exists
  const { data: category } = await supabase
    .from('business_categories')
    .select('*')
    .eq('slug', 'restaurants')
    .single();

  console.log('Restaurants category:', category);

  if (category) {
    // Count businesses in restaurants category
    const { data: businesses, error, count } = await supabase
      .from('businesses')
      .select('name, slug', { count: 'exact' })
      .eq('category_id', category.id)
      .limit(5);

    console.log('Restaurant businesses:', businesses);
    console.log('Total count:', count);
    console.log('Error:', error);
  }
}

checkRestaurants();