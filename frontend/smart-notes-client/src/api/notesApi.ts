import api from './axios';

export const getNotes = () => api.get('/notes');
export const createNote = (title: string, content: string) => 
    api.post('/notes', {title, content});