import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 8 })
  cep: string;

  @Column({ type: "varchar", length: 150 })
  state: string;

  @Column({ type: "varchar", length: 150 })
  city: string;

  @Column({ type: "varchar", length: 150 })
  street: string;

  @Column({ type: "varchar", nullable: true })
  number: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  complement: string;

  @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}

export { Address };
