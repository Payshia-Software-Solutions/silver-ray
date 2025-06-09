
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Pencil, Trash2, Hotel, CheckCircle2, MinusCircle, Search } from 'lucide-react';
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


export default function ManageRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setRooms(mockRooms);
  }, []);

  const roomStats = useMemo(() => {
    const total = rooms.length;
    const booked = rooms.filter(room => room.category === 'Booked').length; // Assuming 'Booked' category means booked status
    const available = total - booked;
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
      (room.category === 'Booked' ? 'booked' : 'available').includes(searchTerm.toLowerCase())
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
        id: `room-${Date.now()}`,
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
      setRooms([...rooms, newRoom]);
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
      setRooms(rooms.map((r) => (r.id === currentRoom.id ? updatedRoom : r)));
      toast({
        title: 'Room Updated',
        description: `"${updatedRoom.name}" has been successfully updated.`,
      });
    }
    setIsFormDialogOpen(false);
    setCurrentRoom(null);
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-headline text-3xl font-bold">
              Room Management
            </h1>
            <p className="font-body text-muted-foreground">
              Add, edit, and manage room types, details, and availability.
            </p>
          </div>
          <Button onClick={handleAddRoom}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Room
          </Button>
        </div>

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
        
        <div className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter rooms by name, category, or status..."
              className="pl-8 w-full sm:w-[300px] md:w-[400px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="bg-card p-0 rounded-lg shadow-md overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] sm:w-[200px]">Room Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Price/Night</TableHead>
                <TableHead className="hidden lg:table-cell">Capacity</TableHead>
                <TableHead className="w-[100px] sm:w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => {
                const isBooked = room.category === 'Booked'; // Example logic
                return (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">{room.category}</TableCell>
                    <TableCell>
                      <Badge variant={isBooked ? 'destructive' : 'default'} className={isBooked ? 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200' : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'}>
                        {isBooked ? 'Booked' : 'Available'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">${room.pricePerNight}</TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{room.capacity}</TableCell>
                    <TableCell className="text-right space-x-1 sm:space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditRoom(room)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit Room</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Room</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteRoom(room)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Room</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Room</p>
                        </TooltipContent>
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

    