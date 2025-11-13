import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { PolicyTypesController } from './policy-types.controller';

@Module({
  controllers: [PolicyTypesController],
  providers: [SupabaseService],
})
export class AppModule {}
