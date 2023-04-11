import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./users.entities";
import { Contacts } from "./contacts.entities";

@Entity("Clients")
export class Clients {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Users)
  user_id: Users;

  @OneToMany(() => Contacts, (contact) => contact.client_id)
  contact: Contacts[];
}

export default Clients;
