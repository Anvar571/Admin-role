import { Global, Module } from '@nestjs/common'
import { AccountRepositoryProvider, databaseProvider } from './provider/providers';

@Global()
@Module({
	providers: [
		databaseProvider,
		AccountRepositoryProvider,
	],
	exports: [
		databaseProvider, 
		AccountRepositoryProvider
	],
})
export class SharedModule {}
