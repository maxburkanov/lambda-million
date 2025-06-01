import { pool } from './db';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { name, email } = JSON.parse(event.body || '{}');
  const res = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );

  return {
    statusCode: 201,
    body: JSON.stringify(res.rows[0]),
  };
};

export const getUsers = async (): Promise<APIGatewayProxyResult> => {
  const res = await pool.query('SELECT * FROM users');

  return {
    statusCode: 200,
    body: JSON.stringify(res.rows),
  };
};