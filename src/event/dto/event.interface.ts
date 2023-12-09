export interface Event {
  id: string;
  title: string;
  description: string;
  longdescription: string;
  eventurl: string;
  imageurl: string;
  keywords: string[] | null;
  timings: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  department: string;
  region: string;
  country: string | null | undefined;
  attendancemode: string;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  favorite: boolean;
}
