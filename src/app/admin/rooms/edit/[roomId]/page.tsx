
'use client';

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RoomDetailForm } from "@/components/admin/rooms/RoomDetailForm";
import { mockRooms } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { notFound } from 'next/navigation';
import { useEffect, useState } from "react";
import type { Room } from "@/types";

export default function EditRoomPage({ params }: { params: { roomId: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const roomData = mockRooms.find(r => r.id === params.roomId);
    if (roomData) {
      setRoom(roomData);
    } else {
      // In a real app, you might show a not-found page
      // notFound(); 
      // For now, we'll just log an error
      console.error("Room not found!");
    }
  }, [params.roomId]);

  const handleDeleteRoom = () => {
    // In a real app, this would be a server action or API call
    console.log("Deleting room:", params.roomId);
    toast({
        title: 'Room Deleted',
        description: `Room "${room?.name}" has been successfully deleted.`,
        variant: 'destructive',
    });
    router.push('/admin/rooms');
  };

  const breadcrumbItems = [
    { label: 'Room Management', href: '/admin/rooms' },
    { label: 'Edit Room' },
    { label: room ? room.name : 'Loading...' }
  ];

  if (!room) {
    return <div>Loading room details...</div>; // Or a proper skeleton loader
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="font-headline text-3xl font-bold">Edit Room: {room.name}</h1>
      <RoomDetailForm mode="edit" initialData={room} onDelete={handleDeleteRoom} />
    </div>
  );
}
