import { Post } from '../../post/entities/Post';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum ProfileRole {
    ALUNO = 'Aluno',
    PROFESSOR = 'Professor'

}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
	id: number;

    @Column({ type: 'varchar', length: 255})
	name: string;

    @Column({ type: 'enum', enum: ProfileRole})
	profile_role: ProfileRole;

    @Column({ type: 'text' })
	password: string;

    @Column({ type: 'varchar', length: 255})
	email: string;

    @Column({ type: 'boolean' , default: true})
	is_active: boolean;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}