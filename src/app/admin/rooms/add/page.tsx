
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RoomDetailForm } from "@/components/admin/rooms/RoomDetailForm";

export default function AddRoomPage() {
  const breadcrumbItems = [
    { label: 'Room Management', href: '/admin/rooms' },
    { label: 'Add New Room' }
  ];

  const handleAddRoom = (data: any) => {
    // In a real app, this would be a server action or API call
    console.log("Adding new room:", data);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="font-headline text-3xl font-bold">Add New Room</h1>
      <RoomDetailForm mode="add" />
    </div>
  );
}
