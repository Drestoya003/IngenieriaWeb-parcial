import { Module } from '@nestjs/common';
import { OrgansService } from './organs.service';
import { OrgansController } from './organs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from './entities/organ.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrgansController],
  providers: [OrgansService],
  imports:[TypeOrmModule.forFeature([Organ]),AuthModule]
})
export class OrgansModule {}
