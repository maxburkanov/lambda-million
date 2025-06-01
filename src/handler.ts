import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createUser, getUsers } from './userController';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'POST') {
    return await createUser(event);
  }

  if (event.httpMethod === 'GET') {
    return await getUsers();
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};