import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/entities/music.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AddAudioTrackDto } from './dto/add-audio-track.dto';
import { DeleteAudioTrackDto } from './dto/delete-audio-track.dto';
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}

  async getMusic(username: string): Promise<Music[] | number> {
    const user = await this.userRepository.findOne(
      { name: username },
      { relations: ['music'] },
    );

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return user.music;
  }

  async addAudioTrack(dto: AddAudioTrackDto, track: Express.Multer.File, userId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const fileHash = crypto.createHash('sha256').update(track.buffer).digest('hex')
    const fileName = fileHash + path.extname(track.originalname)
    const filePath = path.resolve(__dirname, '..', '..', 'music', fileName)
    const isFileExist = await new Promise(resolve => {
      fs.access(filePath, error => {
        error ? resolve(false) : resolve(true)
      })
    })

    if (!isFileExist) await new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, track.buffer, err => {
        err ? reject() : resolve()
      })
    })

    const audioTrack = this.musicRepository.create({
      title: dto.title,
      fileName: fileName,
    });
    audioTrack.user = user;

    await this.musicRepository.save(audioTrack);

    return { statusCode: HttpStatus.CREATED, message: 'created' };
  }

  async deleteAudioTrack(dto: DeleteAudioTrackDto, user) {
    return await this.musicRepository.delete({ id: dto.trackID });
  }
}
