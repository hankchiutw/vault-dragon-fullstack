import { Module, Global } from '@nestjs/common';
import { OrmModule } from './orm';

@Module({
  imports: [OrmModule.forTest()],
  controllers: [],
  providers: [],
})
export class AppTestingModule {}
