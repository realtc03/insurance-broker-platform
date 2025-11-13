import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase = createClient(
    'https://yowxmyryujzttuhzlkje.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlvd3hteXJ5dWp6dHR1aHpsa2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMjI2ODIsImV4cCI6MjA3ODU5ODY4Mn0.yg08Fy7WyfPXLTPkldw_ZIONlnEWNByPgnnnYuz03fI'
  );

  async getPolicyTypes() {
    const { data } = await this.supabase.from('policy_types').select('*');
    return data;
  }
}
