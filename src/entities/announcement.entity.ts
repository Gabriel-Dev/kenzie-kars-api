import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";
import { Image } from "./image.entity";
import { Comment } from "./comment.entity";

@Entity()
class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 250 })
  brand: string;

  @Column({ type: "varchar", length: 250 })
  model: string;

  @Column({ type: "varchar", length: 4 })
  year: string;

  @Column({ type: "integer" })
  fuel: number;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "varchar", length: 50 })
  color: string;

  @Column({ type: "varchar" })
  price_table_fipe: string;

  @Column({ type: "varchar" })
  price: string;

  @Column({ type: "varchar", length: 300 })
  description: string;

  @Column({ type: "boolean", default: true })
  published: boolean;

  @Column({ type: "varchar" })
  cover_image: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User | null;

  @OneToMany(() => Image, (image) => image.announcement)
  image: Image[];

  @OneToMany(() => Comment, (comment) => comment.announcement)
  comment: Comment[];
}

export { Announcement };
