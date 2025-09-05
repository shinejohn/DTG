import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
interface SEOContentProps {
  communityName: string;
  communityDescription: string;
  brandInterest: string;
}
export default function SEOContent({
  communityName,
  communityDescription,
  brandInterest
}: SEOContentProps) {
  // Generate meta description based on community and interest
  const metaDescription = `Discover the best ${brandInterest.toLowerCase()} in ${communityName}. Local recommendations, reviews, and insider tips for exploring ${communityName}'s ${brandInterest.toLowerCase()} scene.`;
  // Generate structured data for local search
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${brandInterest} in ${communityName} | Global Explorer`,
    description: metaDescription,
    url: `https://globalexplorer.com/${communityName.toLowerCase().replace(/\s+/g, '-')}/${brandInterest.toLowerCase().replace(/\s+/g, '-')}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [{
        '@type': 'ListItem',
        position: 1,
        name: `Top ${brandInterest} in ${communityName}`,
        url: `https://globalexplorer.com/${communityName.toLowerCase().replace(/\s+/g, '-')}/${brandInterest.toLowerCase().replace(/\s+/g, '-')}/top`
      }, {
        '@type': 'ListItem',
        position: 2,
        name: `${brandInterest} Events in ${communityName}`,
        url: `https://globalexplorer.com/${communityName.toLowerCase().replace(/\s+/g, '-')}/${brandInterest.toLowerCase().replace(/\s+/g, '-')}/events`
      }, {
        '@type': 'ListItem',
        position: 3,
        name: `${brandInterest} Reviews in ${communityName}`,
        url: `https://globalexplorer.com/${communityName.toLowerCase().replace(/\s+/g, '-')}/${brandInterest.toLowerCase().replace(/\s+/g, '-')}/reviews`
      }]
    }
  };
  // Generate brand-specific content paragraphs
  const getBrandSpecificContent = () => {
    const interestLower = brandInterest.toLowerCase();
    if (interestLower.includes('brewery') || interestLower.includes('beer')) {
      return <>
          <p className="mb-4">
            {communityName}'s craft beer scene is a vibrant tapestry of
            innovation and tradition. From small-batch microbreweries to
            established taprooms, beer enthusiasts can explore a diverse range
            of brewing styles and flavors unique to this region.
          </p>
          <p className="mb-4">
            Local brewmasters take pride in creating distinctive beers that
            often incorporate regional ingredients and reflect the character of{' '}
            {communityName}. Many breweries offer tasting flights, brewery
            tours, and special events where you can meet the brewers and learn
            about their craft.
          </p>
          <p className="mb-4">
            Whether you're a certified cicerone or just beginning to explore
            craft beer, {communityName}'s brewery scene offers something for
            every palate. Use our guide to discover award-winning IPAs,
            experimental sours, rich stouts, and everything in between.
          </p>
        </>;
    }
    if (interestLower.includes('food') || interestLower.includes('restaurant') || interestLower === 'foodie quest') {
      return <>
          <p className="mb-4">
            {communityName} has established itself as a culinary destination
            with a food scene as diverse as it is delicious. From
            Michelin-starred restaurants to beloved food trucks, the city offers
            endless opportunities for memorable dining experiences.
          </p>
          <p className="mb-4">
            Local chefs embrace farm-to-table philosophies, working closely with
            regional producers to showcase the freshest seasonal ingredients.
            The result is a vibrant culinary landscape where traditional recipes
            meet innovative techniques and global influences.
          </p>
          <p className="mb-4">
            Whether you're craving authentic international cuisine, innovative
            fusion dishes, or comfort food classics with a modern twist,{' '}
            {communityName}'s restaurants deliver exceptional flavors and
            experiences for every occasion and budget.
          </p>
        </>;
    }
    if (interestLower.includes('wine')) {
      return <>
          <p className="mb-4">
            {communityName} boasts an exceptional wine culture with venues
            ranging from sophisticated wine bars to charming vineyards.
            Oenophiles will delight in the carefully curated selections
            featuring both local vintages and international labels.
          </p>
          <p className="mb-4">
            Local sommeliers and wine experts are passionate about sharing their
            knowledge, offering guided tastings and wine pairing events that
            highlight the complex flavors and regional characteristics that make
            each bottle unique.
          </p>
          <p className="mb-4">
            Whether you're a seasoned wine connoisseur or simply enjoy the
            occasional glass, {communityName}'s wine destinations provide the
            perfect setting to discover new favorites and deepen your
            appreciation for this timeless beverage.
          </p>
        </>;
    }
    if (interestLower.includes('coffee') || interestLower.includes('cafe')) {
      return <>
          <p className="mb-4">
            {communityName}'s coffee scene is a testament to the art and science
            of the perfect brew. From third-wave specialty cafes to cozy
            neighborhood coffee shops, the city offers countless options for
            caffeine enthusiasts.
          </p>
          <p className="mb-4">
            Local roasters take pride in their craft, meticulously sourcing
            beans from sustainable farms around the world and developing custom
            roast profiles that highlight each bean's unique characteristics and
            flavor notes.
          </p>
          <p className="mb-4">
            Beyond exceptional coffee, {communityName}'s cafes serve as
            community hubs where people gather to work, socialize, and enjoy the
            ambiance. Many also showcase local pastry chefs and bakers who
            create the perfect accompaniments to your favorite beverage.
          </p>
        </>;
    }
    if (interestLower.includes('retail') || interestLower.includes('shop')) {
      return <>
          <p className="mb-4">
            {communityName} offers a shopping experience as diverse as it is
            delightful. From luxury boutiques and department stores to quirky
            independent retailers and vintage shops, there's something for every
            style and budget.
          </p>
          <p className="mb-4">
            Local designers and artisans contribute to a thriving maker culture,
            creating unique clothing, jewelry, home goods, and more that you
            won't find anywhere else. Many shops emphasize sustainable and
            ethical practices, reflecting the community's values.
          </p>
          <p className="mb-4">
            Shopping districts throughout {communityName} each have their own
            distinct character, making exploration part of the fun. Discover
            hidden gems, trendsetting fashion, and one-of-a-kind treasures as
            you navigate the city's retail landscape.
          </p>
        </>;
    }
    if (interestLower.includes('entertainment') || interestLower.includes('nightlife')) {
      return <>
          <p className="mb-4">
            {communityName}'s entertainment scene pulses with energy and
            creativity. From intimate music venues and theaters to major concert
            halls and performance spaces, there's always something happening for
            night owls and culture seekers.
          </p>
          <p className="mb-4">
            Local performers and international acts alike grace the stages of{' '}
            {communityName}, offering everything from live music and comedy to
            theater and dance. The city's diverse venues ensure that whether you
            prefer acoustic sets in cozy bars or elaborate productions in
            historic theaters, you'll find your perfect entertainment match.
          </p>
          <p className="mb-4">
            Beyond performances, {communityName}'s nightlife includes everything
            from sophisticated cocktail lounges to energetic dance clubs. The
            scene is constantly evolving, with pop-up events and underground
            happenings adding to the established entertainment options.
          </p>
        </>;
    }
    if (interestLower.includes('pub') || interestLower.includes('bar')) {
      return <>
          <p className="mb-4">
            {communityName}'s pub and bar scene offers something for every taste
            and occasion. From historic taverns that have served patrons for
            generations to sleek modern bars pushing the boundaries of mixology,
            the city's drinking establishments reflect its diverse character.
          </p>
          <p className="mb-4">
            Local bartenders and publicans pride themselves on creating
            welcoming atmospheres where both regulars and visitors can feel at
            home. Many venues showcase local breweries, distilleries, and
            wineries, supporting the region's beverage producers while offering
            unique drinking experiences.
          </p>
          <p className="mb-4">
            Whether you're looking for a quiet spot to enjoy a pint, a lively
            pub with live music, or an elegant cocktail lounge for a special
            evening, {communityName}'s bar scene has the perfect spot waiting to
            be discovered.
          </p>
        </>;
    }
    if (interestLower.includes('happy hour')) {
      return <>
          <p className="mb-4">
            {communityName} takes happy hour seriously, with venues across the
            city offering exceptional deals on drinks and appetizers. From
            upscale hotel bars to neighborhood pubs, there's a happy hour
            special for every taste and budget.
          </p>
          <p className="mb-4">
            Local establishments use happy hour as an opportunity to showcase
            signature cocktails, craft beers, and wine selections at accessible
            prices. Many also feature special food menus with creative small
            plates perfect for sharing with friends or colleagues after work.
          </p>
          <p className="mb-4">
            Whether you're looking to unwind after a long day, meet up with
            friends, or sample a venue's offerings before committing to a full
            meal, {communityName}'s happy hour scene provides the perfect blend
            of value, quality, and atmosphere.
          </p>
        </>;
    }
    if (interestLower.includes('bucket list')) {
      return <>
          <p className="mb-4">
            {communityName} is filled with bucket list-worthy experiences that
            capture the essence of this unique destination. From iconic
            landmarks and natural wonders to once-in-a-lifetime activities,
            there's no shortage of memorable adventures to be had.
          </p>
          <p className="mb-4">
            Local experts and longtime residents continue to discover new hidden
            gems and extraordinary experiences that deserve a spot on any
            visitor's must-do list. These range from seasonal events and
            exclusive tours to simple pleasures that perfectly capture the
            spirit of {communityName}.
          </p>
          <p className="mb-4">
            Whether you're planning your first visit or you've lived here for
            years, our curated bucket list experiences will help you see{' '}
            {communityName} from new perspectives and create memories that will
            last a lifetime.
          </p>
        </>;
    }
    // Default content if no specific interest match
    return <>
        <p className="mb-4">{communityDescription}</p>
        <p className="mb-4">
          Whether you're a local resident or just visiting, our guide to{' '}
          {communityName} helps you discover the best{' '}
          {brandInterest.toLowerCase()} this vibrant community has to offer.
          From hidden gems to popular spots, we've curated the top
          recommendations to enhance your experience.
        </p>
        <p className="mb-4">
          Our community of passionate locals and travelers have contributed
          authentic reviews, photos, and insider tips to help you navigate{' '}
          {communityName}'s
          {brandInterest.toLowerCase() === 'local businesses' ? ' diverse business scene' : ` ${brandInterest.toLowerCase()} scene`}
          . Stay updated with the latest openings, special events, and seasonal
          highlights that make {communityName} a premier destination for{' '}
          {brandInterest.toLowerCase()} enthusiasts.
        </p>
      </>;
  };
  return <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{`${brandInterest} in ${communityName} | Global Explorer`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${brandInterest.toLowerCase()}, ${communityName}, local, guide, recommendations, reviews, best ${brandInterest.toLowerCase()} in ${communityName}, explore ${communityName}, ${communityName} ${brandInterest.toLowerCase()}`} />
        {/* Language and Locale */}
        <meta name="language" content="English" />
        <meta property="og:locale" content="en_US" />
        {/* Canonical URL */}
        <link rel="canonical" href={`https://globalexplorer.com/${communityName.toLowerCase().replace(/\s+/g, '-')}/${brandInterest.toLowerCase().replace(/\s+/g, '-')}`} />
        {/* Open Graph Meta Tags */}
        <meta property="og:site_name" content="Global Explorer" />
        <meta property="og:title" content={`${brandInterest} in ${communityName} | Global Explorer`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://globalexplorer.com/${communityName.toLowerCase().replace(/\s+/g, '-')}/${brandInterest.toLowerCase().replace(/\s+/g, '-')}`} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${brandInterest} in ${communityName}`} />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@globalexplorer" />
        <meta name="twitter:title" content={`${brandInterest} in ${communityName} | Global Explorer`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" />
        <meta name="twitter:image:alt" content={`${brandInterest} in ${communityName}`} />
        {/* Geo Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content={communityName} />
        {/* Mobile Specific */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* Visually distinct SEO content section with brand-specific information */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Discover {brandInterest} in {communityName}
            </h2>
            <div className="prose prose-lg text-gray-600 mx-auto">
              {getBrandSpecificContent()}
            </div>
          </div>
        </div>
      </section>
    </>;
}
