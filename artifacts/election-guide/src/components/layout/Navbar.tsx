import { memo, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, MapPin, MessageSquare, Landmark, HelpCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

function NavbarComponent() {
  const [location] = useLocation();

  // Memoize links array to prevent recreation on every render
  const links = useMemo(() => [
    { href: "/voter-journey", label: "Voter Guide", icon: Activity },
    { href: "/ballot", label: "Candidate Research", icon: BookOpen },
    { href: "/polling-places", label: "Election Schedule", icon: MapPin },
    { href: "/myths", label: "Fact Check", icon: HelpCircle },
    { href: "/quiz", label: "Civic Quiz", icon: Activity },
    { href: "/assistant", label: "AI Assistant", icon: MessageSquare },
  ], []);

  return (
    <header 
      aria-label="Main navigation header"
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          aria-label="Election Hub India Home"
          className="flex items-center gap-2 group"
        >
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md group-hover:bg-primary/90 transition-colors">
            <Landmark className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">Election Hub India</span>
        </Link>
        
        <nav 
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6"
        >
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              aria-current={location === link.href ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Link href="/assistant">
            <Button 
              size="sm" 
              variant="outline"
              aria-label="Open AI Assistant"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Memoize the Navbar component to prevent unnecessary re-renders
export const Navbar = memo(NavbarComponent);
