import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfigValidation } from './config';
import { DatabaseModule } from './database/database.module';
import { BlogModule } from '@modules/blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: envConfigValidation,
    }),

    DatabaseModule,
    AuthModule,
    UserModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static nodeEnv: string;
  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.nodeEnv = this.configService.get('NODE_ENV');
    AppModule.port = +this.configService.get('API_PORT');
  }
}
