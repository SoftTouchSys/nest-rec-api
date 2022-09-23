import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log({err,user,info})
    
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // if (user.status === EUserStatus.BLOCK) {
    //   throw err || new UnauthorizedException('You have been blocked by admin')
    // }
    return user;
  }
}
@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {

    return user;
  }
}
@Injectable()
export class HRAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log({err,user,info})
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user.isHR) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}