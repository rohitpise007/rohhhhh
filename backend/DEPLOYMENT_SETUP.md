# Backend Deployment Setup for Render

## Environment Variables Required

You need to set these environment variables in your Render dashboard:

### 1. MONGO_URI
Your MongoDB connection string
```
mongodb+srv://username:password@cluster.mongodb.net/hospital_db
```

### 2. JWT_SECRET
A secure secret key for JWT token signing (make it long and random)
```
your_super_secret_jwt_key_here_make_it_very_long_and_secure_123456789
```

### 3. PORT (Optional)
```
5000
```

### 4. NODE_ENV (Optional)
```
production
```

## Setting Environment Variables in Render

1. Go to your Render dashboard
2. Select your backend service
3. Click on "Environment" in the left sidebar
4. Add each environment variable with its value

## Seeding Test Data

After setting up environment variables, run these commands to seed test data:

### Seed Admin User
```bash
npm run seed:admin
```
Default admin credentials:
- Email: Admin123@gmail.com
- Password: Admin123

### Seed Test Patients
```bash
npm run seed:patients
```
Test patient credentials:
- Email: patient@test.com
- Password: password123
- Email: john@example.com
- Password: password123

### Seed Doctors
```bash
npm run seed:doctors
```
Test doctor credentials:
- Email: asharmac@example.com
- Password: password123
- Email: bkapoor@example.com
- Password: password123
(and more doctors...)

## Testing the Setup

After seeding data, you can test the login endpoints:

### Patient Login
```bash
curl -X POST https://your-backend-url.onrender.com/Plogin \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@test.com","password":"password123"}'
```

### Doctor Login
```bash
curl -X POST https://your-backend-url.onrender.com/Dlogin \
  -H "Content-Type: application/json" \
  -d '{"email":"asharma@example.com","password":"password123"}'
```

### Admin Login
```bash
curl -X POST https://your-backend-url.onrender.com/Alogin \
  -H "Content-Type: application/json" \
  -d '{"email":"Admin123@gmail.com","password":"Admin123"}'
```

## Troubleshooting

### "Invalid credentials" error
- Make sure you've run the seed scripts
- Check that environment variables are set correctly
- Verify MongoDB connection string is valid

### CORS errors
- The backend allows all origins for development
- Make sure your frontend URL is in the allowed origins if you change the CORS settings

### Database connection errors
- Check your MONGO_URI is correct
- Ensure your MongoDB cluster allows connections from Render's IP addresses
