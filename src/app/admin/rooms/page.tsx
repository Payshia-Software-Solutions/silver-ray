
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Pencil, Trash2, Hotel, CheckCircle2, MinusCircle, Search, Settings, Eye } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { mockRooms, type Room } from '@/data/mockData'; 
import { RoomFormDialog, type RoomFormData } from '@/components/admin/rooms/RoomFormDialog';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Helper function to determine status and badge variant
const getRoomStatus = (room: Room): { text: string; variant: 'default' | 'destructive' | 'outline' | 'secondary'; className: string } => {
  // Example logic: If category is 'Booked', it's booked.
  // If category is 'Villa', let's say it's 'Under Maintenance' for demo.
  // Otherwise, it's 'Available'.
  if (room.category === 'Booked') { // Assuming 'Booked' is a category for booked rooms
    return { text: 'Booked', variant: 'destructive', className: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200' };
  }
  if (room.id === 'presidential-villa') { // Let's make presidential villa under maintenance for example
    return { text: 'Under Maintenance', variant: 'outline', className: 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200' };
  }
  return { text: 'Available', variant: 'default', className: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' };
};


export default function ManageRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Initialize rooms with a status property for filtering
    const roomsWithStatus = mockRooms.map(room => ({
      ...room,
      statusText: getRoomStatus(room).text.toLowerCase()
    }));
    setRooms(roomsWithStatus as any); // Cast to any if statusText is not in Room type
  }, []);

  const roomStats = useMemo(() => {
    const total = rooms.length;
    const booked = rooms.filter(room => getRoomStatus(room).text === 'Booked').length;
    const available = rooms.filter(room => getRoomStatus(room).text === 'Available').length;
    return [
      {
        title: 'Total Rooms',
        count: total,
        description: 'All rooms in the hotel.',
        icon: Hotel,
        color: 'text-blue-500',
      },
      {
        title: 'Available Rooms',
        count: available,
        description: 'Rooms ready for booking.',
        icon: CheckCircle2,
        color: 'text-green-500',
      },
      {
        title: 'Booked Rooms',
        count: booked,
        description: 'Currently occupied or reserved.',
        icon: MinusCircle,
        color: 'text-red-500',
      },
    ];
  }, [rooms]);
  
  const filteredRooms = useMemo(() => {
    if (!searchTerm) return rooms;
    return rooms.filter(room => 
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.id && room.id.toLowerCase().includes(searchTerm.toLowerCase())) || // Search by room number (id)
      getRoomStatus(room).text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rooms, searchTerm]);

  const handleAddRoom = () => {
    setCurrentRoom(null);
    setDialogMode('add');
    setIsFormDialogOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setCurrentRoom(room);
    setDialogMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setCurrentRoom(room);
    setIsDeleteDialogOpen(true);
  };

  const handleViewRoom = (room: Room) => {
    // For now, just log to console. In a real app, this might navigate to a detail page or open a modal.
    console.log("View room:", room);
    toast({
      title: 'View Room',
      description: `Details for room "${room.name}" would be shown here.`,
    });
  };

  const confirmDelete = () => {
    if (currentRoom) {
      setRooms(rooms.filter((r) => r.id !== currentRoom.id));
      toast({
        title: 'Room Deleted',
        description: `"${currentRoom.name}" has been successfully deleted.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCurrentRoom(null);
  };

  const handleFormSubmit = (data: RoomFormData) => {
    if (dialogMode === 'add') {
      const newRoom: Room = {
        id: `room-${Date.now()}`, // Simple ID generation
        name: data.name,
        description: data.description,
        longDescription: data.longDescription,
        pricePerNight: parseFloat(data.pricePerNight) || 0,
        imageUrl: data.imageUrl || 'https://placehold.co/600x400.png',
        imageHint: data.imageHint,
        images: data.imageUrl ? [data.imageUrl] : ['https://placehold.co/600x400.png'], 
        amenities: data.amenities?.map(a => a.text) || [],
        capacity: parseInt(data.capacity) || 1,
        beds: data.beds,
        size: data.size,
        category: data.category as Room['category'], 
        viewType: data.viewType,
        roomLayoutImageUrl: data.roomLayoutImageUrl,
        enhanceYourStay: data.enhanceYourStay?.map(e => e.text) || [],
        rating: 0, 
        features: [], 
      };
      setRooms(prevRooms => [...prevRooms, { ...newRoom, statusText: getRoomStatus(newRoom).text.toLowerCase() } as any]);
      toast({
        title: 'Room Added',
        description: `"${newRoom.name}" has been successfully added.`,
      });
    } else if (dialogMode === 'edit' && currentRoom) {
      const updatedRoom: Room = {
        ...currentRoom,
        name: data.name,
        description: data.description,
        longDescription: data.longDescription,
        pricePerNight: parseFloat(data.pricePerNight) || currentRoom.pricePerNight,
        imageUrl: data.imageUrl || currentRoom.imageUrl,
        imageHint: data.imageHint || currentRoom.imageHint,
        images: data.imageUrl ? [data.imageUrl] : currentRoom.images,
        amenities: data.amenities ? data.amenities.map(a => a.text) : currentRoom.amenities,
        capacity: parseInt(data.capacity) || currentRoom.capacity,
        beds: data.beds,
        size: data.size,
        category: data.category as Room['category'],
        viewType: data.viewType,
        roomLayoutImageUrl: data.roomLayoutImageUrl,
        enhanceYourStay: data.enhanceYourStay ? data.enhanceYourStay.map(e => e.text) : currentRoom.enhanceYourStay,
      };
      setRooms(rooms.map((r) => (r.id === currentRoom.id ? { ...updatedRoom, statusText: getRoomStatus(updatedRoom).text.toLowerCase() } as any : r)));
      toast({
        title: 'Room Updated',
        description: `"${updatedRoom.name}" has been successfully updated.`,
      });
    }
    setIsFormDialogOpen(false);
    setCurrentRoom(null);
  };

  const currentDisplayedCount = filteredRooms.length; // Simplified for now, full pagination is complex
  const totalRooms = rooms.length;

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Room Management
          </h1>
          <p className="font-body text-muted-foreground">
            Add, edit, and manage room types, details, and availability.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roomStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-body">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-headline">{stat.count}</div>
                <p className="text-xs text-muted-foreground font-body">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Top Control Bar: Search and Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6 p-4 bg-card rounded-lg shadow">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by room number, type, status..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" /> Manage Types
            </Button>
            <Button onClick={handleAddRoom} className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Room
            </Button>
          </div>
        </div>

        {/* Rooms Table */}
        <div className="bg-card rounded-lg shadow overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Room No.</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead className="hidden sm:table-cell">Occupancy</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => {
                const status = getRoomStatus(room);
                return (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.id.replace('room-', '').replace('deluxe-','').replace('ocean-','').replace('family-','').replace('presidential-','').replace('junior-','').replace('superior-','').replace('premium-','') || 'N/A'}</TableCell>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant as any} className={status.className}>
                        {status.text}
                      </Badge>
                    </TableCell>
                    <TableCell>LKR. {room.pricePerNight.toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">{room.capacity} Adult{room.capacity > 1 ? 's' : ''}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleViewRoom(room)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Room</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>View Room</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEditRoom(room)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit Room</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Edit Room</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive" onClick={() => handleDeleteRoom(room)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Room</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Delete Room</p></TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredRooms.length === 0 && (
            <div className="text-center p-8 text-muted-foreground font-body">
              {searchTerm ? 'No rooms match your filter.' : 'No rooms found. Click "Add New Room" to get started.'}
            </div>
          )}
        </div>
        
        {/* Pagination Placeholder */}
        <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
          <div>
            Showing 1 to {Math.min(10, currentDisplayedCount)} of {totalRooms} rooms
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary/20 text-primary border-primary">1</Button>
            <Button variant="outline" size="sm" disabled={totalRooms <= 10}>2</Button>
            <Button variant="outline" size="sm" disabled={totalRooms <= 10}>Next</Button>
          </div>
        </div>

      </div>

      <RoomFormDialog
        isOpen={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handleFormSubmit}
        initialData={dialogMode === 'edit' ? currentRoom : null}
        mode={dialogMode}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the room
              "{currentRoom?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrentRoom(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
