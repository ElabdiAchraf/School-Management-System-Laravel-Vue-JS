# School-Management-System-Laravel-Vue-JS

The main objective of this project is the development of a service-oriented web application based on a REST API architecture to ensure proper School Management System

**SCREENSHOTS** 

**Dashboard**
![image](https://user-images.githubusercontent.com/75706371/185798614-8bbd32d5-0959-4afb-8875-1776bd2281b3.png)

## more UI details

youtube links :
 - part1: https://www.youtube.com/watch?v=Xw9GXzWWZIM
 - part2: https://www.youtube.com/watch?v=NowmiHtcBZM

<hr />  

There are 5 types of user accounts. They include:
 
Administrators (Super Admin & Admin)

- Teacher
- Student
- Parent

**Requirements** 

Check Laravel 8 Requirements https://laravel.com/docs/8.x

**Installation**
- Install dependencies (composer install)
- Set Database Credentials & App Settings in dotenv file (.env)
- Migrate Database (php artisan migrate)
- Database seed (php artisan db:seed)

#### **FUNCTIONS OF ACCOUNTS** 

**-- SUPER ADMIN**
- Only Super Admin can delete any record
- Create any user account
 
**-- Administrators (Super Admin & Admin)**

- Manage students class/sections
- View marksheet of students
- Create, Edit and manage all user accounts & profiles
- Create, Edit and manage Exams & Grades
- Create, Edit and manage Subjects
- Manage noticeboard of school
- Notices are visible in calendar in dashboard
- Edit system settings


**-- TEACHER**
- Manage Own Class/Section
- Manage Exam Records for own Subjects
- Manage Timetable if Assigned as Class Teacher
- Manage own profile
- Upload Study Materials

**-- STUDENT**
- View teacher profile
- View own class subjects
- View own marks and class timetable
- View Payments
- View library and book status
- View noticeboard and school events in calendar
- Manage own profile

**-- PARENT**
- View teacher profile
- View own child's marksheet (Download/Print PDF)
- View own child's Timetable
- View own child's payments
- View noticeboard and school events in calendar
- Manage own profile

