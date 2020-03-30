import { Controller, Post, Body, Get, Put, Param, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './interfaces/dog.interface';
import { UpdateDogDto } from './dto/update-dog.dto';
import { ForbiddenException } from './exception/forbidden.exception';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { JoiValidationPipe } from './validation/joi-validation.pipe';
import { createDogSchema } from './schema/create-dog.schema';
import { ClassValidationPipe } from './validation/class-validation.pipe';
import { ParseIntPipe } from './validation/parse-int.pipe';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorator/roles.decorator';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ExcludeNullInterceptor } from './interceptor/exclude-null.interceptor';
import { ErrorsInterceptor } from './interceptor/errors.interceptor';
import { get } from 'http';
import { CacheInterceptor } from './interceptor/cache.interceptor';

@Controller('dogs')
export class DogsController {
  constructor(private dogService: DogsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createDogSchema))
  async create(@Body() createDogDto: CreateDogDto) {
    this.dogService.create(createDogDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll(): Promise<Dog[]> {
    return this.dogService.findAll();
  }

  @Get('datas')
  @UseInterceptors(TransformInterceptor)
  getData(): number {
    return 2;
  }

  @Get('null')
  @UseInterceptors(ExcludeNullInterceptor)
  getNullValue(): string | null {
    return null;
  }

  @Get('error')
  @UseInterceptors(ErrorsInterceptor)
  getError(): number {
    return null;
  }

  @Get('cached')
  @UseInterceptors(CacheInterceptor)
  getCached(): string[] {
    return ['S'];
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return id;
  }

  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  async update(@Param('id') id: number, @Body() updateDogDto: UpdateDogDto) {
    if (id === 1) {
      return `Updating dog(${id}) with name ${updateDogDto.name}`;
    }
    throw new ForbiddenException;
  }

  @Post('postAlternative')
  @UsePipes(ClassValidationPipe)
  async postAlternative(@Body() updateDogDto: UpdateDogDto) {
    return updateDogDto.name;
  }

  @Post('postGuard')
  @Roles('admin')
  async postGuard(@Body() createDogDTO: CreateDogDto) {
    return this.dogService.create(createDogDTO);
  }
}