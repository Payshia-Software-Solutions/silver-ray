
import { Shirt, Clock } from 'lucide-react';

export function InfoBar() {
  return (
    <section className="py-8 lg:py-12 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto bg-card p-6 rounded-xl border border-border shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg mr-4">
              <Shirt className="w-6 h-6 text-primary flex-shrink-0" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">Dress Code</h3>
              <p className="font-body text-sm text-muted-foreground">
                Smart casual attire is kindly requested throughout our dining venues.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg mr-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">Hours of Operation</h3>
              <p className="font-body text-sm text-muted-foreground">
                Daily: 8:30 AM - 11:30 PM (Please check each venue for specific times)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
