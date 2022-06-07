import '@testing-library/jest-dom/extend-expect';
import { server } from './common/api-mocks/msw-server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
