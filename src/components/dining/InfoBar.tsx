
import { Shirt, Clock } from 'lucide-react';

export function InfoBar() {
  return (
    <section className="py-8 lg:py-12 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center p-6">
            <Shirt className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-headline text-xl font-semibold mb-1">Dress Code</h3>
              <p className="font-body text-sm text-muted-foreground">
                Smart, casual attire is kindly requested for all dining venues.
              </p>
            </div>
          </div>
          <div className="flex items-center p-6">
            <Clock className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-headline text-xl font-semibold mb-1">Hours of Operation</h3>
              <p className="font-body text-sm text-muted-foreground">
                Daily from 8AM - 10PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
