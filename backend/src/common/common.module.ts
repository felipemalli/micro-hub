import { Module, Global } from "@nestjs/common";
import { PasswordService } from "@/common/services/password.service";

@Global()
@Module({
	providers: [PasswordService],
	exports: [PasswordService],
})
export class CommonModule {}
