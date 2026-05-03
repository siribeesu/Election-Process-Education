import { useListMyths, getListMythsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ShieldAlert, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Myths() {
  const { data: myths, isLoading } = useListMyths({
    query: {
      queryKey: getListMythsQueryKey()
    }
  });

  const categories = myths ? Array.from(new Set(myths.map(m => m.category))) : [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Election Myths & Facts</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Clear up common misconceptions about voting and the election process in India. 
          Information is sourced from official Election Commission of India (ECI) documentation.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1,2,3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-8 h-48 bg-muted/20" />
            </Card>
          ))}
        </div>
      ) : myths && categories ? (
        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category}>
              <div className="flex items-center gap-3 mb-6 border-b pb-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-slate-800">{category}</h2>
              </div>
              
              <div className="space-y-6">
                {myths.filter(m => m.category === category).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-md">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-6 md:p-8 bg-amber-50/50 border-b md:border-b-0 md:border-r border-amber-100">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-none font-bold uppercase tracking-wider text-[10px]">
                              Fiction
                            </Badge>
                          </div>
                          <p className="text-lg font-medium text-slate-900 leading-snug">"{item.myth}"</p>
                        </div>
                        
                        <div className="md:w-1/2 p-6 md:p-8 bg-white">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none font-bold uppercase tracking-wider text-[10px]">
                              Fact
                            </Badge>
                          </div>
                          <p className="text-slate-700 leading-relaxed mb-4">{item.fact}</p>
                          
                          <div className="pt-4 border-t border-slate-100 mt-auto">
                            <a 
                              href={item.source} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-primary transition-colors"
                            >
                              <FileText className="h-3 w-3 mr-1.5" />
                              Source documentation
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
