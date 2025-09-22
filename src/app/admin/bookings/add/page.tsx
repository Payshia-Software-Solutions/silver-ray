
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BookingDetailForm } from "@/components/admin/bookings/BookingDetailForm";

export default function AddBookingPage() {
  const breadcrumbItems = [
    { label: 'Booking Management', href: '/admin/bookings' },
    { label: 'Add New Booking' }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbItems} />
      <BookingDetailForm mode="add" />
    </div>
  );
}
