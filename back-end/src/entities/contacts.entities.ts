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

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Clients, (clients) => clients.id)
  client_id: Clients;
}
