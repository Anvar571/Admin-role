import { Global, Module } from '@nestjs/common'
import { databaseProvider } from './provider/database.service';

@Global()
@Module({
	providers: [databaseProvider],
	exports: [databaseProvider],
})
export class SharedModule {}
