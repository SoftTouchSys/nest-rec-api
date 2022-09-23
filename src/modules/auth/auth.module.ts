import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailService } from 'src/common_services/sendmail.service';
import { ProfileService } from '../profile/profile.service';
// useFactory: () => ({
//   transport: 'smtps://user@domain.com:pass@smtp.domain.com',
//   defaults: {
//     from: '"nest-modules" <khizarali621@gmail.com>',
//   },
//   template: {
//     dir: __dirname + '/templates',
//     adapter: new PugAdapter(),
//     options: {
//       strict: true,
//     },
//   },
@Module({
  imports: [
    // MailerModule.forRoot({
    //   defaults: {
    //     tra
    //     from: `Recrewter <${process.env.CLIENT_EMAIL}>`,
    //   },
    //   options: {
    //     partials: {
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   },
    // }),
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    MailService,
    ProfileService
  ],
  exports: [AuthService],
})
export class AuthModule { }