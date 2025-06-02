import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createUser, getUsers } from './userController';

const env = process.env.API_ENV; // 'stg'
const usersRoute = `/${env}/api/v1/users`;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('event >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', event);

  if (event.path === usersRoute && event.httpMethod === 'POST') {
    return await createUser(event);
  }

  if (event.path === usersRoute && event.httpMethod === 'GET') {
    return await getUsers();
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};