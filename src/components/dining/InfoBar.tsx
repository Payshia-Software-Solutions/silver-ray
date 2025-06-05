
import { Users, Clock } from 'lucide-react';

export function InfoBar() {
  return (
    <section className="py-8 lg:py-12 bg-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start p-6 bg-card rounded-lg shadow-md">
            <Users className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-headline text-xl font-semibold mb-1">Dress Code</h3>
              <p className="font-body text-sm text-muted-foreground">
                Smart casual attire is kindly requested throughout our dining venues.
              </p>
            </div>
          </div>
          <div className="flex items-start p-6 bg-card rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-headline text-xl font-semibold mb-1">Hours of Operation</h3>
              <p className="font-body text-sm text-muted-foreground">
                Daily: 12:00 PM - 11:00 PM (Last order 10:30 PM). <br/>
                Hours may vary for specific venues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
