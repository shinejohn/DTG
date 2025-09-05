// Mock community data
const communities = [{
  id: 'nyc',
  name: 'New York City'
}, {
  id: 'la',
  name: 'Los Angeles'
}, {
  id: 'chi',
  name: 'Chicago'
}, {
  id: 'sf',
  name: 'San Francisco'
}, {
  id: 'mia',
  name: 'Miami'
}, {
  id: 'sea',
  name: 'Seattle'
}, {
  id: 'aus',
  name: 'Austin'
}, {
  id: 'den',
  name: 'Denver'
}, {
  id: 'bos',
  name: 'Boston'
}, {
  id: 'por',
  name: 'Portland'
}, {
  id: 'foodie-quest-nyc',
  name: 'NYC Food Scene'
}, {
  id: 'foodie-quest-la',
  name: 'LA Food Scene'
}, {
  id: 'brewery-explorer-den',
  name: 'Denver Brewery District'
}, {
  id: 'brewery-explorer-por',
  name: 'Portland Brewery District'
}, {
  id: 'wine-quest-sf',
  name: 'Napa Valley Wine Region'
}, {
  id: 'wine-quest-por',
  name: 'Willamette Valley Wine Region'
}];
export const getAllCommunities = () => communities;
export const getCommunityById = (id: string) => {
  return communities.find(community => community.id === id);
};