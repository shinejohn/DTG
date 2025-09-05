# React Router 7 Conversion Checklist

## For Each Page Component

### 1. File Structure Changes
```typescript
// OLD (React 6 / Next.js style)
export default function SomePage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
}

// NEW (React Router 7)
import type { Route } from "./+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  // Fetch data here
  return { data };
}

export default function SomePage({ loaderData }: Route.ComponentProps) {
  // Use loaderData instead of useState
}
```

### 2. Data Loading Pattern
- [ ] Move all data fetching to `loader` function
- [ ] Remove `useState` for server data
- [ ] Remove `useEffect` for initial data load
- [ ] Use `useLoaderData()` hook if needed
- [ ] Add proper error handling in loader

### 3. Form Handling
- [ ] Convert form submissions to `action` functions
- [ ] Use `Form` component from React Router
- [ ] Add optimistic UI with `useNavigation`
- [ ] Handle validation in action

### 4. TypeScript Updates
- [ ] Import Route types
- [ ] Type loader return data
- [ ] Type action return data
- [ ] Update component props

### 5. Navigation Updates
- [ ] Replace `<a>` with `<Link>`
- [ ] Use `useNavigate` for programmatic navigation
- [ ] Update active link styling with `NavLink`

### 6. Error Handling
- [ ] Add `ErrorBoundary` export
- [ ] Handle loader errors
- [ ] Handle action errors
- [ ] Add proper error UI

### 7. Meta Tags
- [ ] Export `meta` function for SEO
- [ ] Move head tags to meta export
- [ ] Handle dynamic meta based on loader data

## For Each Component

### 1. Props Updates
- [ ] Remove data props (use context or loader)
- [ ] Update callback props to use actions
- [ ] Type props correctly

### 2. State Management
- [ ] Keep local UI state in useState
- [ ] Move server state to loaders
- [ ] Use optimistic updates for mutations

### 3. Event Handlers
- [ ] Update to use `useFetcher` for non-navigation updates
- [ ] Use `Form` for navigation mutations
- [ ] Add proper loading states

## Common Patterns

### Loading States
```typescript
export function loader() {
  // This runs on the server
  return defer({
    fastData: getImmediate(),
    slowData: getSlowData(), // Returns promise
  });
}

function Component() {
  const { fastData, slowData } = useLoaderData();
  return (
    <div>
      <h1>{fastData.title}</h1>
      <Suspense fallback={<Spinner />}>
        <Await resolve={slowData}>
          {(data) => <SlowComponent data={data} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

### Forms & Actions
```typescript
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  // Process form
  return redirect('/success');
}

export default function Component() {
  return (
    <Form method="post">
      <input name="field" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

### Error Boundaries
```typescript
export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
```