# **Tickets Management System with Role-Based Access and PDF Report Generation**

This project is a **Tickets Management System** built using **ReactJS** and **Tailwind CSS** for the frontend, with a **JSON Server** as a mock backend for managing users, tickets, and role-based access. The system supports three roles: **Admin**, **Support Agent**, and **Employee**, each with distinct access levels and functionalities. It includes features such as viewing, adding, and updating users and tickets, along with the ability to generate detailed PDF reports for individual tickets.

---

## **Features**

### 1. **Role-Based Authentication and Access**
   - **Admin Panel**:  
     Admins have full access to all functionalities, including:
     - **View Users**: View all users and their assigned roles.
     - **Add User**: Add new users with specified roles.
     - **Update User Role**: Modify the role of any user.
     - **View Tickets**: Access the list of all tickets.
     - **Add Ticket**: Create new tickets.
     - **Update Ticket**: Edit ticket details and update their status.
     - **Generate Report**: Download PDF reports for individual tickets.
   
   - **Support Agent Panel**:  
     Support agents can perform:
     - **View Tickets**: Access and review tickets assigned to them.
     - **Add Ticket**: Create new tickets.
     - **Update Ticket**: Edit ticket details and status.

   - **Employee Panel**:  
     Employees have limited access to:
     - **View Tickets**: View only the tickets assigned to them.
     - **Add Ticket**: Submit new tickets for review.

---

### 2. **User Management**
   - **View Users**:  
     Admins can view all registered users and their roles.  
   - **Add User**:  
     Admins can add new users with predefined roles: Admin, Support Agent, or Employee.  
   - **Update User Role**:  
     Admins can modify the roles of users to better match their responsibilities (e.g., promote an employee to support agent).

---

### 3. **Ticket Management**
   - **View Tickets**:  
     Users can access tickets based on their roles:  
       - Admins: View all tickets.  
       - Support Agents: View assigned tickets.  
       - Employees: View tickets relevant to them.  
   - **Add Ticket**:  
     Any user can create new tickets by providing details like title, description, priority, and status.  
   - **Update Ticket**:  
     Admins and support agents can edit ticket details and update their status to track progress (e.g., Open, In Progress, Resolved, or Closed).

---

### 4. **PDF Report Generation**
   - **Generate Detailed Reports**:  
     Admins can generate PDF reports for individual tickets.  
   - **Report Content**:  
     Reports include ticket details such as title, description, priority, status, creation time, and last updated time.  
   - **Easy Download**:  
     The report can be downloaded by clicking the **Generate Report** button next to the ticket.

---

## **Technologies Used**

### **Frontend**
- **ReactJS**: JavaScript library for building dynamic user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive styling.
- **jsPDF**: JavaScript library for generating PDF files.  

### **Backend**
- **JSON Server**: A mock backend to simulate user and ticket management APIs.

---

## **Application Workflow**

1. **Login**:  
   Users log in using predefined credentials. Based on their role, they are redirected to their respective dashboards:  
     - Admin Panel  
     - Support Agent Panel  
     - Employee Panel  

2. **Dashboard Access**:  
   - **Admin Dashboard**: Includes user and ticket management with PDF report generation.  
   - **Support Agent Dashboard**: Provides ticket management functionality.  
   - **Employee Dashboard**: Allows viewing and adding tickets only.

3. **User Management (Admin)**:  
   Admins can view all users, add new users, and modify user roles dynamically.

4. **Ticket Management**:  
   - **View Tickets**: Accessible to all users based on their role.  
   - **Add Ticket**: Any user can create a new ticket.  
   - **Update Ticket**: Only admins and support agents can modify tickets.

5. **PDF Report Generation**:  
   - Admins can generate detailed PDF reports for tickets.  
   - The report is dynamically created with **jsPDF** and includes key ticket details.

---

## **Conclusion**

The **Tickets Management System** provides a comprehensive role-based access control mechanism, ensuring that users interact with the system based on their designated roles. The integration of PDF report generation adds value for administrative reporting and documentation. Its scalable architecture and interactive UI make it a robust solution for managing users and tickets efficiently.  

