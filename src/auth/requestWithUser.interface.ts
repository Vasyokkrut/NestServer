import { Request } from 'express';
import { User } from 'src/entities/user.entity';

interface RequestWithUser extends Request {
  user: {
    username: string,
    userId: number
  }
}

export { RequestWithUser };
