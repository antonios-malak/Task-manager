# Task Manager

A modern task management application built with Vue 3, Pinia, Axios, and Tailwind CSS.

## Framework Choice Justification

**Why Vue.js over React?**

I chose Vue.js for this project because:

- **Composition API**: Provides excellent reactivity and component composition
- **Built-in reactivity**: No need for additional state management complexity
- **Template syntax**: More intuitive and readable than JSX
- **Smaller bundle size**: Vue 3 is lightweight and performant
- **Excellent TypeScript support**: Great developer experience
- **Pinia integration**: Seamless state management with Vue ecosystem
- **Vue Router**: Mature routing solution with excellent features

## State Management Approach

**Pinia Store Architecture:**

- **taskStore.js**: Manages all task-related state, API calls, and filtering
- **categoryStore.js**: Handles category data and API interactions
- **Centralized state**: Single source of truth for application data
- **Actions**: Encapsulate business logic and API calls
- **Reactive state**: Automatic UI updates when state changes
- **Error handling**: Centralized error management with toast notifications

## Component Architecture Overview

```
src/
├── components/          # Reusable UI components
│   ├── TaskCard.vue     # Individual task display card
│   ├── TaskModalForm.vue # Add/Edit task modal form
│   ├── SidebarFilters.vue # Filtering sidebar component
│   ├── LoadingSpinner.vue # Loading state component
│   └── ConfirmDialog.vue # Confirmation dialog component
├── views/              # Page-level components
│   ├── TaskList.vue    # Main task listing page
│   └── TaskDetail.vue  # Individual task detail page
├── stores/             # Pinia state management
│   ├── taskStore.js    # Task state and actions
│   └── categoryStore.js # Category state and actions
├── assets/icons/       # Reusable SVG icon components
└── services/           # API service layer
    └── api.js         # Axios configuration
```

## Features Implemented

### Core Requirements ✅
- **Task List View**: Cards with title, description, category, completion status
- **Task Images**: Proper loading and error states with fallbacks
- **Category Filtering**: Dropdown-based filtering system
- **Loading States**: Comprehensive loading indicators
- **Add Task**: Modal form with validation
- **Edit/Delete Tasks**: Full CRUD operations with confirmations
- **Task Details**: Complete task information display
- **Completion Toggle**: Status change functionality
- **Category Integration**: API-driven category management

### Additional Features 🚀
- **Responsive Design**: Mobile-first with sidebar toggle
- **Advanced Filtering**: Category, Priority, Status filters
- **Toast Notifications**: Success/error feedback system
- **Confirmation Dialogs**: Safe delete operations
- **Progressive Loading**: Load more functionality
- **Modern UI/UX**: Beautiful Tailwind CSS design
- **Error Handling**: Comprehensive error states
- **Form Validation**: Real-time validation with error messages
- **Icon System**: Custom SVG icon components
- **Teleport Modals**: Proper modal positioning

## Features

### Core Features
- ✅ Display task list with filtering and search
- ✅ Add, edit, and delete tasks
- ✅ View task details
- ✅ Manage categories and priorities
- ✅ Track completion status
- ✅ Responsive user interface

### Additional Features
- Beautiful and responsive design with Tailwind CSS
- State management with Pinia
- Mobile-optimized interface
- Advanced filters (Category, Status, Priority)
- Task statistics
- Notification system
- Progressive task loading
- Image display with error handling

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

1. **Clone the repository:**
```bash
git clone <repository-url>
cd task-manager
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment variables are configured in vite.config.js:**
```javascript
define: {
  'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://YOUR_PROJECT_ID.supabase.co/rest/v1'),
  'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('your-anon-key-here')
}
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
```

6. **Preview production build:**
```bash
npm run preview
```

## Known Limitations

- **Image Upload**: Currently only supports image URLs, no file upload     functionality
- **Real-time Updates**: No WebSocket integration for live updates
- **User Authentication**: No user login/registration system
- **Task Assignments**: No user assignment or collaboration features
- **File Attachments**: No support for file attachments beyond images
- **Advanced Search**: Basic filtering only, no full-text search

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
- ✅ Simplified form handling 
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

## Screenshots

### Task List View
![Task List](/src/assets/imgs/Screenshot%202025-TaskList.png)
*Main task listing with sidebar filters and responsive design*

### Task Detail View
![Task Detail](/src/assets/imgs/Screenshot%202025-TaskDetails.png)
*Individual task details with edit/delete actions*

### Add/Edit Task Modal
![Task Modal](/src/assets/imgs/Screenshot%202025-TaskForm.png)
*Modal form for adding and editing tasks*

### Mobile Responsive Design
![Mobile View](/src/assets/imgs/Screenshot%202025-TaskList.png)
*Mobile-optimized interface with collapsible sidebar*

## License

This project is licensed under the MIT License.