/**
 * Home Page
 * 
 * The main entry point of the application that renders the Home component.
 * This is a Server Component that simply delegates rendering to the client-side Home component.
 * 
 * @module HomePage
 */
import { Home } from '@/components/pages/home';

/**
 * HomePage Component
 * 
 * Acts as a wrapper for the client-side Home component.
 * This separation allows for server-side rendering of the page container
 * while delegating interactive elements to client components.
 * 
 * @returns The Home component
 */
export default function HomePage() {
  return <Home />;
}