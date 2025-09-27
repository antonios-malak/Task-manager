# Task Manager

A modern task management application built with Vue 3, Pinia, Axios, and Tailwind CSS.

## Features

### Core Features
- ✅ Display task list with filtering and search
- ✅ Add, edit, and delete tasks
- ✅ View task details
- ✅ Manage categories and priorities
- ✅ Track completion status
- ✅ Responsive user interface

### Additional Features
- 🎨 Beautiful and responsive design with Tailwind CSS
- 🔄 State management with Pinia
- 📱 Mobile-optimized interface
- 🔍 Advanced filters (Category, Status, Priority)
- 📊 Task statistics
- 🔔 Notification system
- ⚡ Progressive task loading
- 🖼️ Image display with error handling

## Technologies Used

- **Vue 3** - Core framework
- **Pinia** - State management
- **Vue Router** - Navigation
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Vue Toastification** - Toast notifications

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── TaskCard.vue
│   ├── CategoryFilter.vue
│   ├── TaskModalForm.vue
│   ├── LoadingSpinner.vue
│   ├── ConfirmDialog.vue
│   └── SidebarFilters.vue
├── views/              # Pages
│   ├── TaskList.vue
│   └── TaskDetail.vue
├── stores/             # Pinia Stores
│   ├── taskStore.js
│   └── categoryStore.js
├── services/           # API services
│   └── api.js
├── router/             # Routing configuration
│   └── index.js
├── assets/             # Static assets
│   └── icons/          # SVG icon components
├── App.vue
├── main.js
└── style.css
```

## Pages

1. **TaskList** - Main page displaying the task list
2. **TaskDetail** - Task details page

## Reusable Components

1. **TaskCard** - Task display card
2. **CategoryFilter** - Category, status, and priority filters
3. **TaskModalForm** - Add/edit task modal form
4. **LoadingSpinner** - Loading indicator
5. **ConfirmDialog** - Confirmation dialog
6. **SidebarFilters** - Sidebar filter component

## Service Files

1. **api.js** - Axios configuration with required headers

## Store Files

1. **taskStore.js** - Task state management and filters
2. **categoryStore.js** - Category state management

## Required API Endpoints

### Categories API
- `GET /categories` - Fetch all categories
- `GET /categories?id=eq.{id}` - Fetch single category

### Tasks API
- `GET /tasks` - Fetch all tasks (with filters)
- `GET /tasks?id=eq.{id}` - Fetch single task
- `POST /tasks` - Create new task
- `PATCH /tasks?id=eq.{id}` - Update task
- `DELETE /tasks?id=eq.{id}` - Delete task

## Installation and Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Environment variables are configured in vite.config.js:**
```javascript
define: {
  'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://YOUR_PROJECT_ID.supabase.co/rest/v1'),
  'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('your-anon-key-here')
}
```

3. **Run the application:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co/rest/v1/
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Supported Browsers

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 14+

## Technical Features

### State Management
- Centralized state management with Pinia
- Separation of business logic from components
- Data caching

### Error Handling
- Comprehensive API error handling
- Clear error messages for users
- Automatic retry mechanisms

### Performance
- Progressive task loading
- Image optimization
- Computed properties for derived data

### User Experience
- Loading and error states
- Interactive notifications
- Responsive design
- Modern UI components

## Key Features Implemented

### Task Management
- ✅ Create, read, update, delete tasks
- ✅ Task completion toggle
- ✅ Task filtering by category, priority, and status
- ✅ Task search functionality

### UI/UX Improvements
- ✅ Modern Tailwind CSS styling
- ✅ Loading spinners for better UX
- ✅ Toast notifications for user feedback
- ✅ Confirmation dialogs for destructive actions
- ✅ Responsive design for mobile devices

### Code Quality
- ✅ Simplified form handling (removed vee-validate complexity)
- ✅ Extracted SVG icons into reusable components
- ✅ Clean component architecture
- ✅ Proper error handling

## Recent Updates

- **Simplified Form Handling**: Removed complex vee-validate setup in favor of simple reactive forms
- **Toast Notifications**: Added success and error messages for all CRUD operations
- **Delete Functionality**: Added delete buttons with confirmation dialogs
- **Icon Components**: Extracted all SVG icons into reusable Vue components
- **Tailwind CSS**: Updated to latest version with Vite plugin

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
