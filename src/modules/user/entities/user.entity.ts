import { BlogEntity } from '@modules/blog/entities/blog.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @OneToMany(() => BlogEntity, (blog) => blog.author)
  blogs: BlogEntity[];

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User of id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User of id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User Removed`);
  }
}
