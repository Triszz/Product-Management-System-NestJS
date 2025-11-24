import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
interface ValidationErrorResponse {
  field: string;
  errors: string[];
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (
        validationErrors: ValidationError[] = [],
      ): BadRequestException => {
        const errors: ValidationErrorResponse[] = validationErrors.map(
          (error: ValidationError) => ({
            field: error.property,
            errors: Object.values(error.constraints || {}),
          }),
        );

        return new BadRequestException({
          message: 'Validation failed',
          errors: errors,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
