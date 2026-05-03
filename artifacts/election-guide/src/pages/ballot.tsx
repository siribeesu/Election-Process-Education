import { useState } from "react";
import { useGetBallotInfo, getGetBallotInfoQueryKey } from "@workspace/api-client-react";
import { INDIAN_STATES } from "@/lib/states";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Building2, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Ballot() {
  const [state, setState] = useState<string>("MH");

  const { data, isLoading } = useGetBallotInfo({ state }, {
    query: {
      enabled: !!state,
      queryKey: getGetBallotInfoQueryKey({ state })
    }
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">What's on My Ballot? (India)</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the candidates and key constituency focus areas for your state/UT in the upcoming elections.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2 text-center">Select Your State / UT</label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger data-testid="select-state">
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
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2,3,4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-40 bg-muted/20" />
            </Card>
          ))}
        </div>
      ) : data ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div>
              <p className="text-sm font-medium text-primary">Election Period</p>
              <p className="text-lg font-bold">{data.electionDate}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-primary opacity-50" />
          </div>

          <Tabs defaultValue="candidates" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="candidates" className="text-base py-3">Candidates ({data.candidates.length})</TabsTrigger>
              <TabsTrigger value="measures" className="text-base py-3">Constituency Focus ({data.measures.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="candidates">
              <div className="grid md:grid-cols-2 gap-6">
                {data.candidates.map((candidate, i) => (
                  <motion.div
                    key={`${candidate.name}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl mb-1">{candidate.name}</CardTitle>
                            <CardDescription className="flex items-center text-sm font-medium">
                              <Building2 className="h-3 w-3 mr-1" />
                              {candidate.office}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-slate-50">
                            {candidate.party}
                          </Badge>
                        </div>
                      </CardHeader>
                      {candidate.website && (
                        <CardContent>
                          <a 
                            href={candidate.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-primary hover:underline font-medium"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Candidate Affidavit/Info
                          </a>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="measures">
              <div className="space-y-6">
                {data.measures.map((measure, i) => (
                  <motion.div
                    key={`${measure.title}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start gap-4">
                          <CardTitle className="text-lg leading-snug">{measure.title}</CardTitle>
                          <Badge variant="secondary" className="whitespace-nowrap shrink-0">
                            <FileText className="h-3 w-3 mr-1" />
                            {measure.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm leading-relaxed">{measure.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
}
