import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Contacts } from "./contacts.entities";
import bcrypt from "bcryptjs";
@Entity("Clients")
export class Clients {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  password: string;

  @OneToMany(() => Contacts, (contact) => contact.clients, { cascade: true })
  contact: Contacts[];
}

export default Clients;
