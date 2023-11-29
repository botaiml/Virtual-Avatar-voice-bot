// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsPhoneNumber('IN', { message: 'Invalid phone number format' })
  phoneNumber?: string;

  @Column()
  DOB?: string;
}
