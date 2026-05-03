import { useState } from "react";
import { useSearchPollingPlaces, getSearchPollingPlacesQueryKey } from "@workspace/api-client-react";
import { INDIAN_STATES } from "@/lib/states";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Search, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PollingPlaces() {
  const [state, setState] = useState<string>("MH");

  const { data, isLoading } = useSearchPollingPlaces({ state }, {
    query: {
      enabled: !!state,
      queryKey: getSearchPollingPlacesQueryKey({ state })
    }
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Find Your Polling Station</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Locate designated polling stations in your area, check their operating hours, and see estimated wait times for a hassle-free voting experience.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="w-full max-w-md p-4 bg-muted/30 rounded-xl border border-muted/50">
          <label className="block text-sm font-medium mb-2 text-center text-muted-foreground">Search by State / UT</label>
          <div className="flex gap-2">
            <Select value={state} onValueChange={setState}>
              <SelectTrigger data-testid="select-state" className="bg-white">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="icon" variant="default" className="shrink-0" disabled={isLoading} aria-label="Search polling stations">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2,3,4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-48 bg-muted/20" />
            </Card>
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={place.waitTime < 15 ? "default" : place.waitTime < 45 ? "secondary" : "destructive"} 
                           className={`font-semibold ${place.waitTime < 15 ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200' : 
                                      place.waitTime < 45 ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200' : ''}`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {place.waitTime} min wait
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{place.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      <span>
                        {place.address}<br />
                        {place.city}, {place.state}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                      <span>{place.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5" asChild>
                      <a href={`https://maps.google.com/?q=${place.latitude},${place.longitude}`} target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No polling stations found for the selected state/UT.</p>
        </div>
      )}
    </div>
  );
}
