import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://escqmqujoimmoqckihih.supabase.co';
const supabaseKey = 'sb_publishable_r_oCAZzWzZ-4fK6hWFTJ0Q_eFLxbFNW';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Example interfaces
export interface Material {
  id: string;
  name: string;
  cost: number;
  unit: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  materials: Material[];
  total_cost: number;
  created_at: string;
}

// Example functions
export const getMaterials = async (): Promise<Material[]> => {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const addMaterial = async (material: Omit<Material, 'id' | 'created_at'>): Promise<Material> => {
  const { data, error } = await supabase
    .from('materials')
    .insert(material)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const addProject = async (project: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
};