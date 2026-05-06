/**
 * NotificationService
 * 
 * This service is designed to be flexible for future SMS/Email integration.
 * Currently, it logs notifications to the console/system logs.
 * 
 * To integrate a real SMS provider:
 * 1. Purchase the SMS material/API.
 * 2. Update the 'sendSMS' method below to call your provider's API.
 */

export class NotificationService {
  static async sendSMS(to: string, message: string) {
    console.log(`[SMS MOCK] Sending to ${to}: ${message}`);
    // Future: 
    // const response = await smsProvider.send(to, message);
    return true;
  }

  static async sendEmail(to: string, subject: string, body: string) {
    console.log(`[EMAIL MOCK] Sending to ${to}: [${subject}] ${body}`);
    // Future:
    // const response = await emailProvider.send(to, subject, body);
    return true;
  }

  /**
   * High-level method for parent notifications
   */
  static async notifyParent(parentPhone: string, studentName: string, type: 'attendance' | 'finance' | 'general', details: string) {
    const message = `Abdi Adama School: ${studentName} - ${type.toUpperCase()}: ${details}`;
    return this.sendSMS(parentPhone, message);
  }
}
