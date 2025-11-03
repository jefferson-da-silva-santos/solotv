export default class GatewayController {
  constructor(service) {
    this.service = service;
  }
  
  async handle(
    req,
    res,
    next,
    params = {
      sendHtml: false,
      sendFile: false
    }
  ) {
    try {
      const data = await this.service.execute(req);
      if (params.sendHtml) {
        return res.sendFile(data.path, {
          headers: {
            'Content-Type': 'text/html',
             'Content-Security-Policy': "script-src 'self' 'unsafe-inline';"
          }
        })
      }

      if (params.sendFile) {
        return res.sendFile(data.path, {
          headers: {
            'Content-Type': 'application/octet-stream',
             'Content-Security-Policy': "script-src 'self' 'unsafe-inline';"
          }
        })
      }

      return res.status(200).json({
        success: true,
        data
      })
    } catch (error) {
      next(error);
    }
  }
} 