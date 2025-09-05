import type { Route } from './+types/route';
import React from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';
import { NewspaperIcon, ArrowLeftIcon, CalendarIcon, ShareIcon, BookmarkIcon } from 'lucide-react';
const allNewsItems = [{
  id: 1,
  title: 'New Downtown Art Gallery Opening This Weekend',
  source: 'Downtown Chronicle',
  author: 'Sarah Johnson',
  date: 'Today',
  publishedDate: 'May 15, 2023',
  image: 'https://images.unsplash.com/photo-1577720580479-7d839d829c59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  content: `<p>The new Downtown Art Gallery is set to open this weekend with an exhibition featuring local artists. The gallery aims to showcase contemporary art and provide a platform for emerging artists in the community.</p>
    <p>Located in the heart of the Arts District, the gallery will feature rotating exhibitions, artist talks, and workshops. The opening exhibition, titled "Local Perspectives," includes works from 15 local artists working in various media, from painting and sculpture to digital art and installations.</p>
    <p>"We wanted to create a space that celebrates the incredible artistic talent in our community," said gallery director Emma Chen. "This opening exhibition is just the beginning of what we hope will be a vibrant cultural hub for years to come."</p>
    <p>The gallery will be open Tuesday through Sunday, with free admission on the first Saturday of each month. The opening reception will be held this Saturday from 6-9 PM and is open to the public.</p>`,
  category: 'Arts & Culture',
  tags: ['Art Gallery', 'Local Artists', 'Exhibition', 'Downtown', 'Arts District']
}, {
  id: 2,
  title: 'City Council Approves New Restaurant Row Development',
  source: 'Local Business Times',
  author: 'Michael Rodriguez',
  date: 'Yesterday',
  publishedDate: 'May 14, 2023',
  image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  content: `<p>The City Council has approved plans for a new Restaurant Row development downtown. The project will feature a mix of local and national restaurant chains and is expected to create hundreds of jobs.</p>
    <p>The development, which will be located on the former site of the old Central Market, will include 12 restaurant spaces, a central courtyard for outdoor dining, and a rooftop event space. Construction is expected to begin next month, with the first restaurants opening in early 2024.</p>
    <p>"This project will transform an underutilized area into a vibrant dining destination," said Mayor Rebecca Williams. "It's a win-win for our community, bringing new dining options, jobs, and economic growth."</p>
    <p>Local restaurant owners have expressed mixed reactions to the development. Some see it as an opportunity to expand their businesses, while others are concerned about increased competition.</p>
    <p>"We're excited about the possibility of opening a second location," said Carlos Mendez, owner of popular local eatery Taco Fusion. "The central location and foot traffic potential are very appealing."</p>`,
  category: 'Business',
  tags: ['Restaurants', 'Development', 'City Council', 'Downtown', 'Jobs']
}, {
  id: 3,
  title: 'Downtown Farmers Market Expands to Twice Weekly',
  source: 'Community News',
  author: 'Jennifer Lee',
  date: '2 days ago',
  publishedDate: 'May 13, 2023',
  image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  content: `<p>Due to popular demand, the Downtown Farmers Market will now be held twice weekly. Starting next month, the market will be open on both Saturdays and Wednesdays, giving residents more opportunities to purchase fresh, local produce.</p>
    <p>The Saturday market will continue to operate from 8 AM to 1 PM, while the new Wednesday market will run from 4 PM to 7 PM, catering to after-work shoppers.</p>
    <p>"We've seen such tremendous growth in attendance over the past year that expanding to a second day made perfect sense," said market manager David Thompson. "The Wednesday evening hours will make it easier for people who work during the day to shop for fresh, local food."</p>
    <p>In addition to the usual vendors selling produce, meats, and baked goods, the Wednesday market will feature a rotating selection of food trucks and live music.</p>
    <p>"As a farmer, having another day to sell directly to customers is a huge benefit," said Maria Garcia, who runs Sunshine Organic Farm. "It helps us move more product and connect with customers who might not be able to make it on Saturdays."</p>`,
  category: 'Community',
  tags: ['Farmers Market', 'Local Produce', 'Downtown', 'Community Events']
}, {
  id: 4,
  title: 'Local Tech Startup Secures $5 Million in Funding',
  source: 'Tech Business Journal',
  author: 'Robert Chen',
  date: '3 days ago',
  publishedDate: 'May 12, 2023',
  image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  content: `<p>A local tech startup has secured $5 million in Series A funding. The company, which specializes in AI-powered retail solutions, plans to use the funding to expand its team and accelerate product development.</p>
    <p>RetailAI, founded just two years ago by former retail executives and AI researchers, has developed a platform that helps brick-and-mortar retailers optimize inventory and personalize customer experiences using artificial intelligence.</p>
    <p>"This funding will allow us to scale our technology and bring our solution to more retailers across the country," said CEO and co-founder Lisa Park. "We're excited to grow our team and continue innovating in this space."</p>
    <p>The funding round was led by Venture Capital Partners, with participation from several angel investors and retail industry veterans.</p>
    <p>"RetailAI is addressing a critical need in the retail industry with cutting-edge technology," said John Mercer, partner at Venture Capital Partners. "We believe they have the potential to transform how physical retail stores operate in the digital age."</p>
    <p>The company currently employs 25 people and plans to double its workforce by the end of the year, with a focus on hiring software engineers and data scientists.</p>`,
  category: 'Business',
  tags: ['Tech Startup', 'Funding', 'AI', 'Retail Technology', 'Local Business']
}];
export default function NewsDetail() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const newsItem = allNewsItems.find(item => item.id === Number(id));
  if (!newsItem) {
    return <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <NewspaperIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              News article not found
            </h1>
            <p className="text-gray-500 mb-6">
              The news article you're looking for doesn't exist or has been
              removed.
            </p>
            <button onClick={() => navigate('/news')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to News
            </button>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-blue-600 py-6">
          <div className="container mx-auto px-4">
            <Link to="/news" className="inline-flex items-center text-white hover:text-blue-100 mb-4">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </div>
        </div>
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-6">
              <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
                {newsItem.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {newsItem.title}
              </h1>
              <div className="flex flex-wrap items-center text-gray-600 text-sm mb-4">
                <span className="mr-4">{newsItem.source}</span>
                <span className="mr-4">By {newsItem.author}</span>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>{newsItem.publishedDate}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {newsItem.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>)}
              </div>
            </div>
            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img src={newsItem.image} alt={newsItem.title} className="w-full h-auto object-cover" />
            </div>
            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-700 mb-8" dangerouslySetInnerHTML={{
            __html: newsItem.content
          } } />
            {/* Article Footer */}
            <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">
                  Published {newsItem.publishedDate}
                </span>
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <ShareIcon className="w-5 h-5 mr-1" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <BookmarkIcon className="w-5 h-5 mr-1" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </div>
          </div>
        </article>
        {/* Related Articles */}
        <div className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allNewsItems.filter(item => item.id !== newsItem.id && item.category === newsItem.category).slice(0, 3).map(news => <Link key={news.id} to={`/news/${news.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-40 overflow-hidden">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {news.title}
                      </h3>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{news.source}</span>
                        <span>{news.date}</span>
                      </div>
                    </div>
                  </Link>)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    const { data: items, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    return json({
      items: items || []
    }, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    return json({
      items: []
    }, { headers });
  }
}
export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">{error.status}</h1>
          <h2 className="text-xl font-semibold mt-2">{error.statusText}</h2>
          <p className="text-gray-600 mt-4">{error.data}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Something went wrong</p>
        <p className="text-sm text-gray-500 mt-2">{error?.message}</p>
      </div>
    </div>
  );
}
