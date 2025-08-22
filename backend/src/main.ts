import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "@/app.module";
import { GlobalExceptionFilter } from "@/common/filters/global-exception.filter";
import { ResponseInterceptor } from "@/common/interceptors/response.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new GlobalExceptionFilter());

	app.useGlobalInterceptors(new ResponseInterceptor());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		})
	);

	app.enableCors({
		origin: process.env.FRONTEND_URLS?.split(",") || [
			"http://localhost:3000",
			"http://localhost:3001",
			"http://localhost:3002",
		],
		credentials: true,
	});

	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Micro-Hub Backend API")
		.setDescription("Backend API for micro-hub project")
		.setVersion("1.0")
		.addBearerAuth()
		.addTag("auth", "Authentication endpoints")
		.addTag("users", "User management endpoints")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	const port = process.env.PORT || 4000;
	await app.listen(port);

	if (process.env.NODE_ENV !== "production") {
		console.log(`🚀 Backend running on: http://localhost:${port}`);
		console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
		console.log(`🏥 Health check: http://localhost:${port}/api`);
	}
}

bootstrap();
