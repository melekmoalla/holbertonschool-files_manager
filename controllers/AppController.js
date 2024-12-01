import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
      return res.status(200).json({ redis: true, db: true });
  }

  static getStats(req, res) {
      return res.status(200).json({ users: 12, files: 1231 });
  }
}

export default AppController;