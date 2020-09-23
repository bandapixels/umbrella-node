export interface Volunteer {
  user_id: number;
  x_location: number;
  y_location: number;
  type: 'Escort' | 'Lend';
}

export interface VolunteerLocation {
  x_location: number;
  y_location: number;
}
