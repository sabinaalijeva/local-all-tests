import {test, expect} from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';

test('all users: should return empty array when no users', async ({ request }) => {
    type User = {
        id: number;
        name: string;
        email: string;
        phone: string;
    }
    const response = await request.get(`${baseURL}`);
    const users: User[] = await response.json()
    for (let i = 0; i < users.length; i++) {
        await request.delete(`${baseURL}/${users[i].id}`);
    }
    const usersAfterDelete = await request.get(`${baseURL}`);
    const usersAfterDeleteJson = await usersAfterDelete.json();
    expect(usersAfterDeleteJson.length).toBe(0);
    expect(usersAfterDeleteJson).toBeInstanceOf(Array);
});