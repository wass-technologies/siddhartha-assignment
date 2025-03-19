import { Controller, Get, Post, Body, Patch, Param, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseGuards, UseInterceptors, Query, Put } from '@nestjs/common';
import { BannerService } from './banner.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/enum';
import { BannerDto, BannerPaginationDto } from './dto/create-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MAIN_ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/Banners',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {   
    return this.bannerService.create(file.path);
  }
  
  @Get('MAIN_ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MAIN_ADMIN)
  findAll(@Query() dto: BannerPaginationDto) {
    return this.bannerService.findAll(dto);
  }
  
  //FOR VENDOR AND USER
  @Get()
  findByUser(@Query() dto: BannerPaginationDto) {
    return this.bannerService.findByUser(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MAIN_ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/Banners',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async image(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {   
    const fileData = await this.bannerService.findOne(id);    
    return this.bannerService.image(file.path, fileData);
  }

  @Put('status/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MAIN_ADMIN)
  status(@Param('id') id: string, @Body() dto: BannerDto) {
    return this.bannerService.status(id, dto);
  }
}
