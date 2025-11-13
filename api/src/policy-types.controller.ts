import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller('policy-types')
export class PolicyTypesController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async findAll() {
    return this.supabase.getPolicyTypes();
  }
}
