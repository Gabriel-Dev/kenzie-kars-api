import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Announcement } from "./announcement.entity";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  link: string;

  @ManyToOne(() => Announcement, { onDelete: "CASCADE" })
  @JoinColumn()
  announcement: Announcement | null;
}

export { Image };
