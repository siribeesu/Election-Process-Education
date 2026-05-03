import { useState } from "react";
import { motion } from "framer-motion";
import { useGetVoterJourney, getGetVoterJourneyQueryKey } from "@workspace/api-client-react";
import { INDIAN_STATES } from "@/lib/states";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoterJourney() {
  const [state, setState] = useState<string>("MH");
  
  const { data, isLoading } = useGetVoterJourney({ state }, { 
    query: { 
      enabled: !!state, 
      queryKey: getGetVoterJourneyQueryKey({ state }) 
    } 
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Your Voter Journey (India)</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select your state or UT to see a step-by-step guide to participating in the upcoming Lok Sabha or State Assembly elections.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2 text-center">Select Your State / UT</label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger data-testid="select-state" aria-label="Select your state or union territory">
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
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1,2,3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-32 bg-muted/20" />
            </Card>
          ))}
        </div>
      ) : data ? (
        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-8 pb-8">
          {data.steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className={`absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-background
                ${step.status === 'completed' ? 'border-green-500 text-green-500' : 
                  step.status === 'active' ? 'border-primary text-primary' : 
                  'border-muted-foreground/30 text-transparent'}`}
              >
                {step.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                {step.status === 'active' && <div className="h-2 w-2 rounded-full bg-primary" />}
              </div>

              <Card className={`${step.status === 'active' ? 'border-primary shadow-md' : 'shadow-sm'}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    {step.deadline && (
                      <span className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        Due {new Date(step.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                  {step.link && step.linkText && (
                    <a href={step.link} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <Button variant="outline" size="sm" className="group">
                        {step.linkText}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
