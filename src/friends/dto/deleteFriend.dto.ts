import { IsNotEmpty, IsNumber } from 'class-validator'

export class DeleteFriendDto {
  @IsNotEmpty()
  @IsNumber()
  friendId: number
}
