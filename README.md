# Portfolio

A full-stack MERN portfolio made of a **recruiter-facing site**, an **admin dashboard** for managing content, and a **REST API** backed by MongoDB. Content is added once through the admin forms and shows up on the public site automatically.

## Features
 
### Recruiter site (public)
- Toggle icon in the top-left corner that opens a slide-in sidebar
- Sidebar navigation: Home, Education, Skills, Projects, Certifications, Activities, Contact
- **Home:** name, undergraduate details, short bio and professional photo
- **Education:** cards for UG, HSC and SSLC
- **Skills:** skills grouped by category
- **Projects:** cards with title and short description, with a **Read more** popup showing full details, images, GitHub link and a close (X) button
- **Certifications:** cards with a **View Certificate** button that opens the certificate image in a popup
- **Activities:** papers, competitions and achievements
- **Contact:** email, LinkedIn and GitHub
- Responsive design, loading skeletons and smooth animations


### Admin site (private)
- Secure login with JWT
- Form-based create, edit and delete for Profile, Education, Skills, Projects, Certifications and Activities
- Multiple image upload with preview (stored on Cloudinary)
- Dashboard with content counts
- Confirmation dialogs and toast notifications

### Backend API
- RESTful routes with public read access and protected write access
- JWT authentication with bcrypt password hashing
- Image upload to Cloudinary
- Input validation, rate limiting, Helmet and restricted CORS

## Tech Stack
 
| Layer | Technologies |
|---|---|
| Frontend (both sites) | React (Vite), Tailwind CSS, Framer Motion, React Icons, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcrypt |
| File storage | Cloudinary, Multer |
| Hosting | Netlify (frontends), Render (API), MongoDB Atlas (database) |

## Architecture
 
```
 Admin Site (React)  --->  +------------------+  <---  Recruiter Site (React)
 (login, add/edit/delete)  |   Backend API    |        (public, read-only)
                           |  Node + Express  |
                           +--------+---------+
                                    |
                       MongoDB Atlas        Cloudinary
                       (text data)          (images, certificates)
```

## Folder Structure

```
portfolio/
├── recruiter/    # Public portfolio (React + Vite + Tailwind)
├── admin/        # Admin dashboard (React + Vite + Tailwind)
├── server/       # REST API (Node + Express + Mongoose)
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   └── server.js
├── docs/              # Screenshots and diagrams
├── .gitignore
├── LICENSE
└── README.md
```

## Author
 
**Nijitha Mol M**
Biomedical Engineering student, Full-Stack and GenAI developer
 
- Email: [nijitha2020@gmail.com](mailto:nijitha2020@gmail.com)
- LinkedIn: [linkedin.com/in/nijitha-mol](https://www.linkedin.com/in/nijitha-mol)
- GitHub: [github.com/Nijitha100604](https://github.com/Nijitha100604)

## License
 
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.