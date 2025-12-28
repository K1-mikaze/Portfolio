# Back-end Technologies

I will use Express + Nodejs + TypeScript for the API, Looking always for security in the API.

## Why using Express?

Express is a JavaScript framework that make really easy to build APIs, is conjucntion with other libraries I could make a secure API

**Libraries to use**

- `express` use for the creation of the routes.
- `express-validator` this is to avoid SQL injection and validate data.
- `express-rate-limit` this is use for limiting the number of API calls for machine.
- `express-slow-down` Complement with rate-limiting, slow down responses after many repeted attempts instead of blocking.
- `cors` Allows to control which domains can call the API
- `helmet` set security headers to mitigate common web attacks.
- `dotenv` let us use environment variables for the API configuration.
- `Prisma` an ORM to make postgresql transactions more secure.
