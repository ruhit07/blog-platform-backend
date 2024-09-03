import { UserEntity } from '@modules/user/entities/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;
  @ManyToOne(() => UserEntity, (author) => author.blogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Blog with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Blog with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Blog with id ${this.id}`);
  }
}
