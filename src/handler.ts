import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createUser, getUsers } from './userController';

const env = process.env.API_ENV;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.path === `/${env}/api/v1/users` && event.httpMethod === 'POST') {
    return await createUser(event);
  }

  if (event.path === `/${env}/api/v1/users` && event.httpMethod === 'GET') {
    return await getUsers();
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};