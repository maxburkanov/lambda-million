import { pool } from './db';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { name, email, passwordHash, phone } = JSON.parse(event.body || '{}');
  const res = await pool.query(
    'INSERT INTO users (name, email, password_hash, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, passwordHash, phone]
  );

  return {
    statusCode: 201,
    body: JSON.stringify({name, email, passwordHash, phone}),
  };
};

export const getUsers = async (): Promise<APIGatewayProxyResult> => {
  const res = await pool.query('SELECT * FROM users');

  return {
    statusCode: 200,
    body: JSON.stringify(res.rows),
  };
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify([{ name: 'John Doe', email: 'some@email.com', passwordHash: 'hashed-password', phone: '55555555' }]),
  // };
};