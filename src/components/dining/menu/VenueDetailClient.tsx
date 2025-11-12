
'use client';

import NextImage from 'next/image';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import type { BreadcrumbItem, RestaurantFromApi, RestaurantImage } from '@/types';
import { IMAGE_BASE_URL } from '@/lib/config';
import { Clock, Users, MapPin, Phone } from 'lucide-react';
import { MenuSection } from '@/components/dining/menu/MenuSection';
import { MenuCategoryNavigation } from '@/components/dining/menu/MenuCategoryNavigation';
import { MenuHero } from '@/components/dining/menu/MenuHero';
import { getMenuByVenueId } from '@/data/menuData'; // We'll still use this for menu items for now

interface VenueDetailClientProps {
    venue: RestaurantFromApi;
    images: RestaurantImage[];
}

export function VenueDetailClient({ venue, images }: VenueDetailClientProps) {

    const menuData = getMenuByVenueId(String(venue.id)) || getMenuByVenueId('main-restaurant');

    const primaryImage = images.find(img => String(img.is_primary) === '1') || images[0];
    const heroImageUrl = menuData?.heroImageUrl || (primaryImage ? `${IMAGE_BASE_URL}${primaryImage.image_url}` : (venue['restaurant _image'] ? `${IMAGE_BASE_URL}${venue['restaurant _image']}` : 'https://placehold.co/1920x700.png'));
    
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Dining', href: '/dining' },
        { label: venue.venue_name },
    ];

    // Dummy data until API provides it
    const details = [
        { icon: Clock, label: 'Hours', value: venue.operating_hours_id || '8AM - 10PM' }, // Placeholder
        { icon: Users, label: 'Capacity', value: venue.capacity ? `${venue.capacity} guests` : 'N/A' },
        { icon: MapPin, label: 'Location', value: 'Lobby Level' }, // Placeholder
        { icon: Phone, label: 'Contact', value: '+94 11 234 5678' } // Placeholder
    ];
    
    const regularCategories = menuData?.categories.filter(cat => cat.id !== 'chef-specials') || [];
    const chefSpecialsCategory = menuData?.categories.find(cat => cat.id === 'chef-specials');


    return (
        <div className="bg-background">
            <MenuHero 
                venueName={menuData?.venueName || venue.venue_name}
                venueDescription={menuData?.venueDescription || venue.short_description}
                heroImageUrl={heroImageUrl}
                heroImageHint={menuData?.heroImageHint || primaryImage?.alt_text || 'restaurant interior'}
            />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            {menuData && menuData.categories.length > 0 && <MenuCategoryNavigation categories={menuData.categories} /> }

            {menuData ? (
                 <div className="bg-secondary/20">
                    {chefSpecialsCategory && (
                        <MenuSection key={chefSpecialsCategory.id} category={chefSpecialsCategory} isChefSpecialsSection={true} />
                    )}
                    {regularCategories.map((category) => (
                        <MenuSection key={category.id} category={category} />
                    ))}
                </div>
            ) : (
                 <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="lg:col-span-2">
                            <p className="font-body text-foreground/80 text-base leading-relaxed mb-8">
                                {venue.detailed_description || "Details for this venue are coming soon."}
                            </p>
                            
                            {images.length > 1 && (
                                <div className="mb-8">
                                    <h2 className="font-headline text-2xl font-bold mb-4">Gallery</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {images.map((image) => (
                                        <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
                                            <NextImage
                                                src={`${IMAGE_BASE_URL}${image.image_url}`}
                                                alt={image.alt_text}
                                                data-ai-hint={image.alt_text || 'restaurant detail'}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="lg:sticky lg:top-24 h-fit">
                            <div className="bg-card p-6 rounded-xl shadow-lg border">
                                <h3 className="font-headline text-xl font-semibold mb-4">Venue Information</h3>
                                <div className="space-y-3 font-body text-sm">
                                    {details.map((detail, index) => (
                                    <div key={index} className="flex items-start">
                                        <detail.icon className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                        <span className="font-medium text-foreground/90">{detail.label}:</span>{' '}
                                        <span className="text-muted-foreground">{detail.value}</span>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}
