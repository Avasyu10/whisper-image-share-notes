
export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export const NOTE_COLORS = [
  '#ffffff', // White
  '#fef3c7', // Light yellow
  '#dbeafe', // Light blue
  '#dcfce7', // Light green
  '#fce7f3', // Light pink
  '#f3e8ff', // Light purple
  '#fed7d7', // Light red
  '#fdf4ff', // Light lavender
];
