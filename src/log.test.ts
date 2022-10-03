import express from 'express';
import { Logger } from 'gc-json-logger';
import { Server } from 'http';
import request from 'supertest';
import { log } from './log';

jest.useFakeTimers();
jest.setSystemTime(new Date(0));

describe('log', () => {
  let server: Server;

  beforeAll((done) => {
    server = express()
      .use(log())
      .use(express.json())
      .use(express.text())
      .post('/json', (req, res) => res.status(200).json(req.body))
      .post('/text', (req, res) => res.status(200).send(req.body))
      .listen(50000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('logs text', async () => {
    const write = jest.spyOn(Logger.prototype, 'log');
    write.mockImplementation(() => {});
    await request(server)
      .post('/text?key=1')
      .set('referer', 'https://example.com/')
      .set('user-agent', 'curl/7.64.1')
      .set('content-type', 'text/plain')
      .send('{ "test": 1 }');
    expect(write.mock.calls[0]).toMatchSnapshot();
  });

  it('logs json', async () => {
    const write = jest.spyOn(Logger.prototype, 'log');
    write.mockImplementation(() => {});
    await request(server)
      .post('/json?key=1')
      .set('referer', 'https://example.com/')
      .set('user-agent', 'curl/7.64.1')
      .set('content-type', 'application/json')
      .send('{ "test": 1 }');
    expect(write.mock.calls[0]).toMatchSnapshot();
  });
});
