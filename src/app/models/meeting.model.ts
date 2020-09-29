export interface Meeting {
  id: number;
  agenda: string;
  room: string;
  from: Date;
  to: Date;
  date: Date;
  type: 'VOICE' | 'VIDEO' | 'LIVE';
  participants: any[];
}
