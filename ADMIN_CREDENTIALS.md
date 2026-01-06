# Admin Credentials

## Admin Login Information

**Email:** Admin123@gmail.com
**Password:** Admin123

## How to Access Admin Dashboard

1. Go to the website homepage
2. Click on "Admin" link in the navigation bar
3. Use the credentials above to login
4. Access the full admin dashboard with all management features

## Admin Features Available

- View all appointments
- Manage doctors (view/delete)
- Review insurance applications (approve/reject)
- Monitor billing and payments
- View uploaded medical reports
- Access system statistics

## Important Notes

- Change the admin password after first login for security
- The admin credentials are stored in the `.env` file in the backend directory
- The admin user is created using the `npm run seed:admin` script

## Environment Variables

The following environment variables are set in `backend/.env`:

```env
ADMIN_EMAIL=Admin123@gmail.com
ADMIN_PASSWORD=Admin123
```

To change the admin credentials, update these values in the `.env` file and run `npm run seed:admin` again.
