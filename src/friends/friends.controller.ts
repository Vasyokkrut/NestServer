import { FriendsService } from './friends.service';
import { SendRequestDto } from './dto/send-request.dto';
import { DeleteFriendDto } from './dto/deleteFriend.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { AcceptFriendRequestDto } from './dto/acceptFriendRequest.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(JWTAuthGuard)
  @Get('getFriends')
  async getFriends(@Req() req: RequestWithUser) {
    return await this.friendsService.getFriends(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('getIncomingRequests')
  getIncomingRequests(@Req() req: RequestWithUser) {
    return this.friendsService.getIncomingRequests(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('getOutgoingRequests')
  getOutgoingRequests(@Req() req: RequestWithUser) {
    return this.friendsService.getOutgoingRequests(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Post('sendRequest')
  sendRequest(@Req() req: RequestWithUser, @Body() dto: SendRequestDto) {
    return this.friendsService.sendRequest(req.user, dto);
  }

  @UseGuards(JWTAuthGuard)
  @Post('acceptFriendRequest')
  acceptFriendRequest(@Req() req: RequestWithUser, @Body() dto: AcceptFriendRequestDto) {
    return this.friendsService.acceptFriendRequest(req.user, dto);
  }

  @UseGuards(JWTAuthGuard)
  @Post('deleteFriend')
  deleteFriend(@Req() req: RequestWithUser, @Body() dto: DeleteFriendDto) {
    return this.friendsService.deleteFriend(req.user.userId, dto)
  }
}
