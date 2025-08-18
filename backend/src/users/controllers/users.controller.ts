import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { User, UserRole } from '../../entities/user.entity';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin access required',
  })
  async findAll(@CurrentUser() currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    const users = await this.userService.findAll();
    
    return {
      message: 'Users retrieved successfully',
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user statistics (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User statistics retrieved successfully',
  })
  async getStats(@CurrentUser() currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    const stats = await this.userService.getUserStats();
    
    return {
      message: 'User statistics retrieved successfully',
      stats,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(@Param('id') id: string, @CurrentUser() currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only view your own profile');
    }

    const user = await this.userService.findById(id);
    
    return {
      message: 'User retrieved successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() currentUser: User,
  ) {
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }

    const user = await this.userService.updateProfile(id, updateProfileDto);
    
    return {
      message: 'User updated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate user (admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User deactivated successfully',
  })
  async deactivate(@Param('id') id: string, @CurrentUser() currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    if (currentUser.id === id) {
      throw new ForbiddenException('You cannot deactivate yourself');
    }

    await this.userService.deactivate(id);
    
    return {
      message: 'User deactivated successfully',
    };
  }
}