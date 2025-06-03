import request from 'supertest';
import path from 'path';
import { app } from '../src/server';

describe('POST /upload', () => {
  it('should upload an image file successfully', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('image', path.join(__dirname, 'test.jpg'));
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('File uploaded successfully!');
  });

  it('should return 400 if no file is uploaded', async () => {
    const response = await request(app).post('/upload');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No files were uploaded.');
  });

  it('should return 400 for invalid file type', async () => {
    try {
      const response = await request(app)
        .post('/upload')
        .attach('image', path.join(__dirname, 'test.txt'))
        .timeout({ response: 5000, deadline: 10000 });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    } catch (error) {
      console.error('Test error:', error);
      throw error;
    }
  });

  it('should handle large file upload gracefully', async () => {
    // Assuming test-large.jpg is a large file placed in the test directory
    const response = await request(app)
      .post('/upload')
      .attach('image', path.join(__dirname, 'test-large.jpg'));
    expect([200, 413]).toContain(response.status); // 413 Payload Too Large is possible
  });
});
