export class ResponseUtil {
    static success(data, message = 'Success', statusCode = 200) {
      return {
        success: true,
        statusCode,
        message,
        data,
        timestamp: new Date().toISOString()
      };
    }
  
    static error(message = 'Error', statusCode = 500, errors = null) {
      return {
        success: false,
        statusCode,
        message,
        errors,
        timestamp: new Date().toISOString()
      };
    }
  
    static paginated(data, page, limit, total) {
      return {
        success: true,
        statusCode: 200,
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        timestamp: new Date().toISOString()
      };
    }
  }