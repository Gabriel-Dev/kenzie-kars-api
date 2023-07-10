import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Length } from "class-validator";
import { Announcement } from "./announcement.entity";
import { Comment } from "./comment.entity";
import { Address } from "./addresses.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", unique: true })
  cpf: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Length(8, 20)
  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", length: 11 })
  telephone: string;

  @Column({ type: "date" })
  date_of_birth: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  description: string;

  @Column({ type: "boolean", default: true, nullable: true })
  buyer: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @Column({ type: "varchar", default: null, nullable: true })
  reset_token: string | null;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcement: Announcement[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hashedPassword = getRounds(this.password);
    if (!hashedPassword) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export { User };
