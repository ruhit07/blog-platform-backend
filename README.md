# A backend for building RESTful APIs using Node.js, Nest.js, and TypeORM.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/ruhit07/blog-platform-backend.git
cd blog-platform-backend
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env.development

# open .env.development and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
npm run dev
```

## Environment Variables

The environment variables can be found and modified in the `.env.development` file. They come with these default values:

```bash
# API
API_PORT=3900

# JWT
JWT_ACCESS_TOKEN_SECRET=myfavouritebackendframework
JWT_ACCESS_TOKEN_EXPIRES=36000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=101
DB_NAME=task_database
```

## Project Structure

```
src\
 |--common\               # All common things
 |--config\               # Environment variables and configuration related things
 |--database\             # Database module
 |--modules\              # Modules
 |--app.controller.ts\    # App controller layer
 |--app.module.ts\        # App module layer
 |--app.service.ts        # App service layer
 |--main.ts               # App entry point
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /auth/register` - Register a new user\
`POST /auth/login` - Login a user

**User routes**:\
`GET /posts` - Get a list of all posts\
`GET /posts/:id` - Get details of a single post\
`POST /posts` - Create a new post\
`PUT /posts/:id` - Update a post\
`DELETE /posts/:id` - Delete a user
