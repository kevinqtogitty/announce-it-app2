// eslint-disable-next-line import/named
import { Auth } from 'firebase/auth';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export interface Props {
  auth: Auth;
}
//Protected route only for people logged in
const AuthRoutes: React.FC<Props> = ({ auth }): JSX.Element => {
  return auth.currentUser ? <Outlet /> : <Navigate to="/" />;
};

export { AuthRoutes };

//User have access to their account
//Can create personal workout log, add comments, save, read, and delete
//Can interact with team workout set by team leader

//Owner can
//Create a team
//Mkae announcements
//Make Team workouts
//Do things regular team members can
