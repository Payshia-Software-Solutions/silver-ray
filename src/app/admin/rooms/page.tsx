
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
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

// Helper function to determine status and badge variant
const getRoomStatus = (room: Room): { text: string; variant: 'default' | 'destructive' | 'outline' | 'secondary'; className: string } => {
  if (room.category === 'Booked') { // Assuming 'Booked' is a category for demo
    return { text: 'Booked', variant: 'destructive', className: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200' };
  }
  if (room.id === 'presidential-villa') { 
    return { text: 'Under Maintenance', variant: 'outline', className: 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200' };
  }
  return { text: 'Available', variant: 'default', className: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' };
};


export default function ManageRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const roomsWithStatus = mockRooms.map(room => ({
      ...room,
      statusText: getRoomStatus(room).text.toLowerCase()
    }));
    setRooms(roomsWithStatus as any); 
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
      (room.id && room.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      getRoomStatus(room).text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rooms, searchTerm]);


  const handleDeleteRoom = (room: Room) => {
    setCurrentRoom(room);
    setIsDeleteDialogOpen(true);
  };

  const handleViewRoom = (room: Room) => {
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

  const currentDisplayedCount = filteredRooms.length;
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
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/admin/rooms/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Room
              </Link>
            </Button>
          </div>
        </div>

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
                           <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Link href={`/admin/rooms/edit/${room.id}`}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit Room</span>
                              </Link>
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
