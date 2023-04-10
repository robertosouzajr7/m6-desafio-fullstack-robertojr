import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import Clients from "./clients.entities";

@Entity("Contacts")
export class Contacts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Clients, { onDelete: "CASCADE" })
  client_id: string;
}
