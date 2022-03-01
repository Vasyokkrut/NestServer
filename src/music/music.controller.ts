import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddAudioTrackDto } from './dto/add-audio-track.dto';
import { DeleteAudioTrackDto } from './dto/delete-audio-track.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('getMusic/:username')
  getMusic(@Param('username') username: string) {
    return this.musicService.getMusic(username);
  }

  @UseGuards(JWTAuthGuard)
  @Post('uploadAudioTrack')
  @UseInterceptors(FileInterceptor('track'))
  uploadAudioTrack(@UploadedFile() track, @Body() dto: AddAudioTrackDto, @Req() req) {
    return this.musicService.addAudioTrack(dto, track, req.user.userId);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('deleteAudioTrack')
  deleteAudioTrack(@Body() dto: DeleteAudioTrackDto, @Req() req) {
    return this.musicService.deleteAudioTrack(dto, req.user);
  }
}
