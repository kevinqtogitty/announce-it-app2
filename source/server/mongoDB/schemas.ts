import mongoose, { Schema } from 'mongoose';

export interface AnnouncementProps {
  content: any;
  displayDate: string;
  timestamp: Date;
  announcementId: number;
  teamId: string;
}

export interface TeamProps {
  teamName: string;
  teamId: string;
  teamLeaderId: string;
  teamMembers?: teamMemberProps[];
  announcements: AnnouncementProps[];
}

export interface teamMemberProps {
  firstName: string;
  lastName: string;
  displayName?: string;
  userId: string;
}

export interface LeaderAndMemberOfProps {
  teamName: string;
  teamId: string;
}

const teamSchema = new Schema<TeamProps>({
  teamName: String,
  teamId: String,
  teamLeaderId: String,
  teamMembers: [],
  announcements: [],
});

export interface User {
  userId: string;
  dateCreated: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  leaderOf: LeaderAndMemberOfProps[];
  memberOf: LeaderAndMemberOfProps[];
}

const userSchema = new Schema<User>({
  userId: String,
  dateCreated: String,
  personalDetails: {
    firstName: String,
    lastName: String,
    email: String,
  },
  leaderOf: [],
  memberOf: [],
});

export const User = mongoose.model('User', userSchema);
export const Teams = mongoose.model('Teams', teamSchema);
