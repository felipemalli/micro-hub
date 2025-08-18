export const MESSAGES = {
  SUCCESS: {
    // Auth success
    USER_REGISTERED: 'User successfully registered',
    LOGIN_SUCCESS: 'User successfully logged in',
    PROFILE_RETRIEVED: 'User profile retrieved successfully',
    
    // User management success
    USERS_RETRIEVED: 'Users retrieved successfully',
    USER_RETRIEVED: 'User retrieved successfully',
    USER_UPDATED: 'User updated successfully',
    USER_DEACTIVATED: 'User deactivated successfully',
    STATS_RETRIEVED: 'User statistics retrieved successfully',
  },

  ERROR: {
    // Auth errors
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_ALREADY_EXISTS: 'User with this email already exists',
    INVALID_TOKEN: 'Invalid token',
    UNAUTHORIZED: 'Unauthorized',
    
    // Authorization errors
    ADMIN_ACCESS_REQUIRED: 'Admin access required',
    PROFILE_ACCESS_DENIED: 'You can only view your own profile',
    CANNOT_DELETE_YOURSELF: 'You cannot deactivate yourself',
    
    // Generic HTTP error
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  }
} as const;