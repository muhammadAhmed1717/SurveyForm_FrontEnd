import supabase from '../../utils/supabase/client';

export const createUserProgressTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS user_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      progress JSONB,
      status TEXT,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    );
  `;

  const { error } = await supabase.rpc('sql', { sql });
  if (error) throw error;
  return 'Table created successfully!';
};

export const findUser = async (email) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('email', email);
  
    if (error) {
      console.error('Error retrieving entry:', error);
      return null;
    }
  
    return data;
}

export const addUserProgress = async (email: string) => {
    const status = "in-progress";
    const { data, error } = await supabase
      .from('user_progress')
      .insert([{ email, status }]);

    if (error) throw error;
    return data;
};

export const updateUserProgress = async (email: string, updates) => {
    const { data, error } = await supabase
      .from('user_progress')
      .update(updates)  
      .eq('email', email);
  
    if (error) throw error;
    return data;
};
export const deleteUserProgress = async (email: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .delete()
      .eq('email', email);
    if (error) throw error;
    return data;
};