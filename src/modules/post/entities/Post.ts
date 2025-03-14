import { User } from "../../user/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    user_id: number;

    @Column({ type: 'varchar', length: 255})
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    sub_title?: string;

    @Column({type: 'text'})
    content: string;

    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp'})
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })  
    user: User;
}